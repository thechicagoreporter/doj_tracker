/**
 * Render a path in the Express app to a string.
 */

import * as http from 'http';

/**
 * Render a path in the Express app to a string.
 *
 * @param {Application} app Express application object.
 * @param {string} path Path to be rendered to a string.
 * @param {function} callback Callback function that will be called with the signature
 *   callback(content, err) where content is the rendered HTML string and err is an
 *   error object.
 */
export default (app, path, callback) => {
  // Express is tightly coupled with Node's
  // [http.Server](https://nodejs.org/api/http.html#http_class_http_server).
  // That is, there's not a good way to render the output of a view without
  // either creating an HTTP request or repeating middleware logic.
  // Rather than mocking request and response objects, just momentarily run a local
  // HTTP server on a free port that we'll kill when we're done capturing the output.
  const server = http.createServer(app);

  server.on('listening', () => {
    // The server is listening on a port so we're ready to make a request to
    // get the rendered content.

    // Capture information about the server hostname and port since we're
    // just running it on some odd free port.
    const serverAddress = server.address();
    const chunks = [];
    // Make the HTTP request to the server
    const req = http.request({
      method: 'GET',
      hostname: serverAddress.address,
      path: path,
      port: serverAddress.port,
    }, (res) => {
      // The request succeeded, handle the response.
      res.setEncoding('utf8');
      // When we get data, just save it to an array.
      res.on('data', data => chunks.push(data));
      res.on('end', () => {
        // We're done getting data back from our server.  Close the server
        // and call the callback with the response HTML.
        server.close();
        callback(chunks.join(""));
      });
    });

    req.on('error', (err) => {
      callback(null, err)
    });

    req.end();
  });

  server.listen({
    port: undefined,
  });
}
