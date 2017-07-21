Chicago Reporter DOJ Tracker
============================

A tracker for United States Department of Justice recommendations for reforming the Chicago Police Department.

Assumptions
-----------

* git
* Node.js

Installation
------------

Clone the repository:

    git clone https://github.com/thechicagoreporter/doj_tracker.git

Install build dependencies:

    npm install

Run the local development server
--------------------------------

    npm run serve

Deployment
----------

For now, while we're in development of this app, we're deploying both HTML and assets to S3.  In order to deploy to the appropriate S3 bucket, you'll need to set the following environment variables with you AWS credentials:

  * AWS\_ACCESS\_KEY
  * AWS\_SECRET\_KEY

Then run this npm script to build the project and publish it:

    npm run publish:staging

TODO: Add separate staging and production deployment instructions

Data prep
---------

Convert a Google Spreadsheet to ArchieML.

Early on in this project, we decided that it made more sense to store the data in ArchieML than Jonah's original Google Sheet.  To regenerate ArchieML from the Google Sheet, run:

    npm run sheet2archieml

Coding style
------------

The code for this project is mostly written in JavaScript using [ES2015](https://babeljs.io/learn-es2015/) features.

For the most part, it follows the [AirBnB JavaScript coding style](https://github.com/airbnb/javascript).

Having a coding style, and using a tool to make sure you're following it is a good way to avoid simple logic errors and make your code more readable for future you and other developers.

To lint the code using [eslint](http://eslint.org/), run:

    npm run lint

In the code, you may see comments that look like this:

    // eslint-disable-next-line import/prefer-default-export

These just disable a particular coding style [rules](http://eslint.org/docs/rules/) when the exception is appropriate.

Browser support
---------------

tl;dr This app should work in modern web browsers (IE9+).

The client-side JavaScript uses:

* `Document.querySelectorAll()`, which is supported in IE8+.
* `el.addEventListener()`, which is supported in IE9+

Design philosophy
-----------------

### Avoid DOM manipulation, view libraries

For the client-side code, avoid using libraries to manipulate the DOM or render HTML, [even jQuery](http://youmightnotneedjquery.com/).  This makes the page load lighter and also makes the code as accessible as possible to JavaScript developers who may be unfamiliar with a particular library.

### Use central state

Coming from doing a lot of React programming, I've come to like lifting state to have a single point of authority for application state.  I also like making DOM updates based on this state.  The alternative, which will be familiar to people who built complex, jQuery-based applications, is to store state in the DOM itself, or attached data.  This quickly gets unwieldy.

[Redux](http://redux.js.org/) is a bit to wrap your head around, but provides a clean set of idioms for managing state changes.  We're using it for this project.
