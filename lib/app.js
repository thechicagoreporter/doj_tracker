import * as path from 'path';
import archieml from 'archieml';
import express from 'express';
import expressNunjucks from 'express-nunjucks';
import moment from 'moment';
import { dldoc } from './google-drive';

const app = express();
const isDev = app.get('env') === 'development';

app.set('views', path.join(__dirname, 'templates'));

const njk = expressNunjucks(app, {
  watch: isDev,
  noCache: isDev,
});

const dataCtxProcessor = function addDataContextProcessor(req, ctx) {
  ctx.data = req.app.locals.data;
};

app.use(njk.ctxProc([
  dataCtxProcessor,
]));

const transform = function transformData(data) {
  const categories = [];
  const categoriesMap = {};

  data.recommendations
  .map((r) => {
    if (r.updates) {
      return Object.assign({}, r, {
        updates: r.updates.map((u) => {
          const date = moment(u.date, 'M/D/YYYY');
          return Object.assign({}, u, {
            date: date.format('MMMM D, YYYY'),
          });
        }),
      });
    }

    return r;
  })
  .forEach((r) => {
    let category = categoriesMap[r.category];

    if (!category) {
      category = {
        name: r.category,
        recommendations: [],
      };
      categories.push(r.category);
      categoriesMap[r.category] = category;
    }

    category.recommendations.push(r);
  });

  return Object.assign({}, data, {
    categories: categories.map(c => categoriesMap[c]),
  });
};

app.all('*', (req, res, next) => {
  const chunks = [];
  dldoc(req.app.locals.docUrl, req.app.locals.oauth2Client)
    .on('data', data => chunks.push(data))
    .on('end', () => {
      req.app.locals.data = transform(archieml.load(Buffer.concat(chunks).toString()));
      next();
    });
});

app.get('/', (req, res) => {
  res.render('index');
});

app.get('/recommendations.json', (req, res) => {
  res.json(req.app.locals.data);
});

export default app;
