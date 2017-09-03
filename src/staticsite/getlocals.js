import * as fs from 'fs';
import archieml from 'archieml';
import flow from 'lodash/fp/flow';
import { authorize, dldoc } from '../google-drive';
import {
  updateRecommendations,
  recommendationLookup,
  addAgencies,
  addCategories,
  reshapeStatuses,
  renderLede,
  renderIntro,
  renderCredits,
  renderChartCaption,
  renderChartTitle,
  groupByStatus,
  renameProps,
  pruneProps,
} from '../transforms';

const transform = flow(
  updateRecommendations,
  recommendationLookup,
  addAgencies,
  addCategories,
  reshapeStatuses,
  groupByStatus,
  renderLede,
  renderIntro,
  renderCredits,
  renderChartCaption,
  renderChartTitle,
  renameProps,
  pruneProps,
);

export default (docUrl, clientIdPath, tokenPath) => new Promise((resolve, reject) => {
  fs.readFile(clientIdPath, (err, content) => {
    if (err) {
      reject(`Error loading client secret file: ${err}\n`);
      return;
    }

    const authOptions = {
      tokenPath,
    };

    authorize(JSON.parse(content), authOptions, (oauth2Client) => {
      const chunks = [];
      dldoc(docUrl, oauth2Client)
      .on('data', data => chunks.push(data))
      .on('end', () => {
        const data = Buffer.concat(chunks).toString();
        const transformed = transform(archieml.load(data));

        resolve(transformed);
      });
    });
  });
});
