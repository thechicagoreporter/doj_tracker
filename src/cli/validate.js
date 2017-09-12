import * as path from 'path';
import flow from 'lodash/fp/flow';
import * as drive from '../google-drive';
import getLocals from '../staticsite/getlocals';
import {
  hasRecommendations,
  hasRecommendationCount,
  recommendationsValid,
  hasLede,
  hasIntro,
  hasChartTitle,
  hasChartCaption,
  hasCredits,
  hasShareEmailSubject,
  hasShareEmailBody,
  hasMethodology,
  hasTweetText,
} from '../validators';
import {
  hasId,
  hasGist,
  hasSpecific,
  hasAgencyResponsible,
  hasStatus,
  hasUpdates,
  updatesValid,
} from '../validators/recommendation';
import {
  hasDate,
  hasStatus as updateHasStatus,
  hasNotes,
} from '../validators/update';

const validateUpdate = flow(
  hasDate,
  updateHasStatus,
  hasNotes,
);

const validateRecommendation = flow(
  hasId,
  hasGist,
  hasSpecific,
  hasAgencyResponsible,
  hasStatus,
  hasUpdates,
  updatesValid(validateUpdate),
);

const validate = flow(
  hasRecommendations,
  hasRecommendationCount,
  recommendationsValid(validateRecommendation),
  hasLede,
  hasIntro,
  hasChartTitle,
  hasChartCaption,
  hasCredits,
  hasShareEmailSubject,
  hasShareEmailBody,
  hasMethodology,
  hasTweetText,
);

const main = function cliMain(argv) {
  const docUrl = argv._[0];
  const tokenFilename = process.env.TOKEN_FILENAME || 'doj_tracker.json';
  const tokenPath = path.join(drive.DEFAULT_TOKEN_DIR, tokenFilename);
  const clientIdPath = process.env.CLIENT_ID_PATH || 'client_id.json';

  getLocals(docUrl, clientIdPath, tokenPath).then((locals) => {
    validate(locals);
  });
};

export default main;
