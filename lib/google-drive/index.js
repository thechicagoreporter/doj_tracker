import * as fs from 'fs';
import * as path from 'path';
import * as readline from 'readline';
import * as url from 'url';
import * as google from 'googleapis';
import GoogleAuth from 'google-auth-library';

const SCOPES = ['https://www.googleapis.com/auth/drive.readonly'];
const TOKEN_DIR = path.join(
  (process.env.HOME || process.env.HOMEPATH || process.env.USERPROFILE),
  '.credentials',
);
const TOKEN_PATH = path.join(TOKEN_DIR, 'dlsheet.json');

/**
 * Store token to disk be used in later program executions.
 *
 * @param {Object} token The token to store to disk.
 */
const storeToken = function storeTokenToDisk(token) {
  try {
    fs.mkdirSync(TOKEN_DIR);
  } catch (err) {
    if (err.code !== 'EEXIST') {
      throw err;
    }
  }
  fs.writeFile(TOKEN_PATH, JSON.stringify(token));
  process.stderr.write(`Token stored to ${TOKEN_PATH}\n`);
};

/**
 * Get and store new token after prompting for user authorization, and then
 * execute the given callback with the authorized OAuth2 client.
 *
 * @param {google.auth.OAuth2} oauth2Client The OAuth2 client to get token for.
 * @param {getEventsCallback} callback The callback to call with the authorized
 *     client.
 */
const getNewToken = function getNewOauth2Token(oauth2Client, callback) {
  const authUrl = oauth2Client.generateAuthUrl({
    access_type: 'offline',
    scope: SCOPES,
  });
  process.stderr.write(`Authorize this app by visiting this url: ${authUrl}\n`);
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });
  rl.question('Enter the code from that page here: ', (code) => {
    rl.close();
    oauth2Client.getToken(code, (err, token) => {
      if (err) {
        process.stderr.write(`Error while trying to retrieve access token ${err}\n`);
        return;
      }
      // eslint-disable-next-line no-param-reassign
      oauth2Client.credentials = token;
      storeToken(token);
      callback(oauth2Client);
    });
  });
};

/**
 * Create an OAuth2 client with the given credentials, and then execute the
 * given callback function.
 *
 * @param {Object} credentials The authorization client credentials.
 * @param {function} callback The callback to call with the authorized client.
 */
export const authorize = function oauth2Authorize(credentials, callback) {
  const clientSecret = credentials.installed.client_secret;
  const clientId = credentials.installed.client_id;
  const redirectUrl = credentials.installed.redirect_uris[0];
  const auth = new GoogleAuth();
  const oauth2Client = new auth.OAuth2(clientId, clientSecret, redirectUrl);

  // Check if we have previously stored a token
  fs.readFile(TOKEN_PATH, (err, token) => {
    if (err) {
      getNewToken(oauth2Client, callback);
    } else {
      oauth2Client.credentials = JSON.parse(token);
      callback(oauth2Client);
    }
  });
};

/**
 * Get Google Drive file ID from a Google Spreadsheet URL.
 *
 * @param {String} spreadsheetUrl The Google Spreadsheet URL.
 */
const fileIdFromUrl = function sheetFileIdFromUrl(spreadsheetUrl) {
  const parsed = url.parse(spreadsheetUrl);
  const pathBits = parsed.path.split('/');

  const fileId = pathBits[pathBits.length - 1];
  if (fileId !== 'edit') {
    return fileId;
  }

  return pathBits[pathBits.length - 2];
};

export const dlsheet = function downloadSheetAsXlsx(spreadsheetUrl, auth) {
  const fileId = fileIdFromUrl(spreadsheetUrl);
  const service = google.drive('v3');

  return service.files.export({
    // Note: this uses ES2015's property shorthand for when the property name
    // and variables match
    auth,
    fileId,
    mimeType: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
  });
};

export const dldoc = function downloadDocAsText(docUrl, auth) {
  const fileId = fileIdFromUrl(docUrl);
  const service = google.drive('v3');

  return service.files.export({
    // Note: this uses ES2015's property shorthand for when the property name
    // and variables match
    auth,
    fileId,
    mimeType: 'text/plain',
  });
};
