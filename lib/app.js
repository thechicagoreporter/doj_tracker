import * as path from 'path';
import archieml from 'archieml';
import express from 'express';
import expressNunjucks from 'express-nunjucks';
import flow from 'lodash/fp/flow';
import { dldoc } from './google-drive';
import { categorize, addStatusSlugs, groupByStatus, markdownifyIntro } from './transforms';

const app = express();
const isDev = app.get('env') === 'development';

app.set('views', path.join(__dirname, 'templates'));

const njk = expressNunjucks(app, {
  watch: isDev,
  noCache: isDev,
});

const dataCtxProcessor = function addDataContextProcessor(req, ctx) {
  Object.keys(req.app.locals.data).forEach((key) => {
    ctx[key] = req.app.locals.data[key];
  });
};


const transform = flow(
  categorize,
  addStatusSlugs,
  markdownifyIntro,
  groupByStatus,
);


app.use((req, res, next) => {
  const chunks = [];
  dldoc(req.app.locals.docUrl, req.app.locals.oauth2Client)
    .on('data', data => chunks.push(data))
    .on('end', () => {
      const data = Buffer.concat(chunks).toString();
      const transformed = transform(archieml.load(data));
      req.app.locals.data = transformed;
      next();
    })
    .on('error', (err) => {
      console.log(`Cannot download Google Document: ${err}`);
    });
});

app.use(njk.ctxProc([
  dataCtxProcessor,
]));

app.get('/', (req, res) => {
  res.render('index');
});

app.get('/recommendations.json', (req, res) => {
  res.json(req.app.locals.data);
});


export default app;
