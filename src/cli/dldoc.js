import * as fs from 'fs';
import * as path from 'path';
import { DEFAULT_TOKEN_DIR, authorize, dldoc } from '../google-drive';

const main = function cliMain(argv) {
  const docUrl = argv._[0];

  fs.readFile(argv['client-secret'], (err, content) => {
    if (err) {
      process.stderr.write(`Error loading client secret file: ${err}\n`);
      return;
    }

    const tokenFilename = process.env.TOKEN_FILENAME || 'doj_tracker.json';
    const tokenPath = path.join(DEFAULT_TOKEN_DIR, tokenFilename);
    const authOptions = {
      tokenPath,
    };

    authorize(JSON.parse(content), authOptions, (oauth2Client) => {
      dldoc(docUrl, oauth2Client)
        .on('data', data => process.stdout.write(data));
    });
  });
};

export default main;
