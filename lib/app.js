import * as path from 'path';
import archieml from 'archieml';
import express from 'express';
import expressNunjucks from 'express-nunjucks';
import moment from 'moment';
import slugify from 'slugify';
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
    const newR = Object.assign({}, r);

    if (r.updates) {
      newR.updates = r.updates.map((u) => {
        const date = moment(u.date, 'M/D/YYYY');
        return Object.assign({}, u, {
          date: date.format('MMMM D, YYYY'),
        });
      });
    }

    newR.statusSlug = slugify((r.status || data.statuses[0]).toLowerCase());

    return newR;
  })
  .forEach((r) => {
    let category = categoriesMap[r.category];

    if (!category) {
      category = {
        name: r.category,
        slug: slugify(r.category).toLowerCase(),
        recommendations: [],
      };
      categories.push(r.category);
      categoriesMap[r.category] = category;
    }

    category.recommendations.push(r);
  });

  return Object.assign({}, data, {
    categories: categories.map(c => categoriesMap[c]),
    statuses: data.statuses.map((s) => {
      return {
        status: s,
        slug: slugify(s).toLowerCase(),
      };
    }),
  });
};

app.all('*', (req, res, next) => {
  const chunks = [];
  dldoc(req.app.locals.docUrl, req.app.locals.oauth2Client)
    .on('data', data => chunks.push(data))
    .on('end', () => {
      const data = Buffer.concat(chunks).toString();
      req.app.locals.data = transform(archieml.load(data));
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
