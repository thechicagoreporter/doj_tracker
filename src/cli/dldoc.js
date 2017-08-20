import * as fs from 'fs';
import { authorize, dldoc } from '../google-drive';

const main = function cliMain(argv) {
  const docUrl = argv._[0];

  fs.readFile(argv['client-secret'], (err, content) => {
    if (err) {
      process.stderr.write(`Error loading client secret file: ${err}\n`);
      return;
    }

    authorize(JSON.parse(content), (oauth2Client) => {
      dldoc(docUrl, oauth2Client)
        .on('data', data => process.stdout.write(data));
    });
  });
};

export default main;
