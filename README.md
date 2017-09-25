Chicago Reporter DOJ Tracker
============================

A tracker for United States Department of Justice recommendations for reforming the Chicago Police Department.

Preflight project management can be found [here](https://app.asana.com/0/266435719787280/266435719787302).

The repository for this project is [here](https://github.com/thechicagoreporter/doj_tracker/).

Bugs and feature requests should be reported in the [GitHub issue tracker](https://github.com/thechicagoreporter/doj_tracker/issues).

Assumptions
-----------

* git
* Node.js - This was developed and tested under version 6.11.1, the LTS version as of July 27, 2017.

Installation
------------

### Clone the repository

    git clone https://github.com/thechicagoreporter/doj_tracker.git

### Install build dependencies

    npm install

### Create Google Credentials

TODO: Should we just use a service account?

This application uses the Google Drive API to pull the settlements data from a Google Document.  The Drive API uses OAuth 2.0 for authentication, which you can read about [here](https://developers.google.com/drive/v3/web/about-auth).

Navigate to this [Drive API wizard](https://console.developers.google.com/flows/enableapi?apiid=drive) in your browser.

Select an existing project, or create a new one.

Click the "Go to credentials" button.

In the "Where will you be calling the API from?" select element, choose "Other UI (e.g. Windows, CLI tool)".

In the "What data will you be accessing?"  choose "User data".

Click the "What credentials do I need?" button.

Enter a name in the "Name" text input, such as "My workstation".

Click the "Create client ID" button.

Enter "DOJ Tracker" in the "Product name shown to users" text input.

Click the "Continue" button.

Click the "Download" button and save the file as `client_id.json` in the projectdirectory that you cloned with git.

Click the "Done" button.

Updating an existing installation
---------------------------------

To bring an existing installation up-to-date, first change directory to wherever you cloned the repo on installation:

    cd ~/projects/doj-tracker

Then pull in new changes to the source code:

    git pull

Then install any JavaScript dependencies that have changed:

    npm install

Run the local development server
--------------------------------

Running the local development server happens by running an [npm script](https://docs.npmjs.com/misc/scripts):

    npm start

This should open a browser window with the URL http://localhost:8080/.

Be sure to check the configuration section below to see more about the environment variables you'll need to set to provide configuration for the script.  You'll likely want to source some environment variables first, like this:

    sh -ac '. ./.env; npm start'

You may get the error: /usr/bin/env: ‘node’: No such file or directory. This may be because the package manager installed it under nodejs. In which case do a symlink:

    sudo ln -s /usr/bin/nodejs /usr/bin/node

and then trying serving again.

The first time you run this command, you will see a prompt like this:

	Authorize this app by visiting this url: https://accounts.google.com/o/oauth2/auth?access_type=offline&scope=https%3A%2F%2Fwww.googleapis.com%2Fauth%2Fdrive.readonly&response_type=code&client_id=757802846504-lpo28bffqnot23kgnhq3l4q6u9ioaedh.apps.googleusercontent.com&redirect_uri=urn%3Aietf%3Awg%3Aoauth%3A2.0%3Aoob
	Enter the code from that page here:

Visit the URL in the message and follow the dialog to allow access to the "DOJ Tracker" app.  You will be presented with a code that you should copy and paste after the "Enter the code from that page here" prompt.

Validate data
-------------

It might be useful to validate that the data parsed and transformed from the Google doc has the neccesary values to successfully render the app.  There is a node script that you can run to do this:

    sh -ac '. ./.env; npm run validate'

Publishing
----------

Publishing also happens by running an [npm script](https://docs.npmjs.com/misc/scripts):

    npm run publish

See the configuration section for information about the environment variables you'll need to set to successfully publish.  You'll probably want to source them from a .env file like this:

    sh -ac '. ./.env.staging; npm run publish'

Local Testing with WordPress
----------------------

For local testing of publication to WordPress and the interaction between styles defined in this app and the Chicago Reporter site, I used the [Varying Vagrant Vagrants](https://varyingvagrantvagrants.org/) (VVV) Vagrant configuration recommended by INN for developing with the [Chicago Reporter's WordPress theme](https://github.com/INN/umbrella-chicagoreporter).  INN has [documentation](https://github.com/INN/docs/blob/master/staffing/onboarding/vvv-setup.md) for setting up VVV on your system.

After getting VVV set up and creating a local Chicago Reporter site, the site should be available at http://chicagoreporter.vagrant.dev/.

WordPress Preparation
---------------------

You'll need to install the [Application Passwords](https://wordpress.org/plugins/application-passwords/) plugin which essentially allows creating application-specific API keys.

Create a service user account that will be used for publishing to WordPress using the WordPress REST API.  Make sure this role has adequate permissions to edit posts.  The "Editor" role worked for me.

In the user management section of the WordPress admin, create an application password for the service user account.  Make sure to make a note of the password somewhere.

Create a new post where the tracker HTML will be uploaded.  While a post will be created the first time you publish if you don't specify a post ID, it's easier to get everything set up beforehand.  You might want to create a separate post for staging.  In either case, make sure you make note of the post IDs, which you can find from the URL parameter of the post in the WordPress admin.

Tracker Configuration
---------------------

Configuration is through environment variables, as is recommended by the [Twelve-Factor App](https://12factor.net/config) philosophy.  The configuration variables largely relate to deployment.

### AWS\_ACCESS\_KEY

AWS access key credential used to publish static assets to S3.

### AWS\_SECRET\_KEY

AWS access key secret used to publish static assets to S3.

### DOCUMENT\_URL

URL to Google Document containing ArchieML that provides data for this app.

### FB\_APP\_ID

Facebook application ID.  This is needed to make social sharing using Facebook work.

### S3\_URL

URL to the S3 bucket where static assets will be published, beginning with `s3://`.

### S3\_HTTP\_URL

URL to the S3 bucket where static assets will be published, beginning with `http://`.

### SHARE\_URL

URL to use for social sharing widgets.  This is neccessary because when baking the static site, we can't get the page URL from `window.location`.

### TOKEN\_PATH

Path where Google Drive API OAuth token will be stored.  Defaults to `${HOME}/.credentials/doj_tracker.json`.

### WP\_USERNAME

WordPress service account user name used to publish the app HTML into WordPress.

### WP\_PASSWORD

WordPress service account password used to publish the app HTML into WordPress.

### WP\_POST\_ID

If defined, existing WordPress post that will be updated.

### WP\_POST\_TITLE

Title of WordPress post where app is published.

### WP\_URL

Root URL for the WordPress site where this app will be published.

### PUB\_YEAR, PUB\_MONTH, PUB\_DAY

Date of original publication, to be used by WP post update to avoid resetting pub date.

### Putting configuration in an environment file

I've found that it's convenient to define environment variables in a .env file, which is just a text file where each line is just a `VAR=VAL` declaration.  It's widely used with tools like [Docker Compose](https://docs.docker.com/compose/env-file/).

An example .env file might look something like this:

    FB_APP_ID=999999999999999
    WP_URL=http://chicagoreporter.com
    WP_USERNAME=some-service-account-username
    WP_PASSWORD="aaaa aaaa aaaa aaaa aaaa aaaa"
    WP_POST_TITLE="Monitor Chicago’s police reforms"
    WP_POST_ID=42
    AWS_ACCESS_KEY=AKIAASSADADAS93245IA
    AWS_SECRET_KEY=adhjiadhadASF478432sfsdfgsdfsjgsahafSAa6
    S3_URL=s3://projects.chicagoreporter.com/graphics/dojtracker/
    S3_HTTP_URL=http://projects.chicagoreporter.com/graphics/dojtracker/
    DOCUMENT_URL=https://docs.google.com/document/d/23748sfafasfgafasfasr34287892347342asdfafaas/edit

Note that the credentials in the above example are mocked.

You could make multiple files, such as `.env` for local development, `.env.staging` for staging and `.env.production` for production.  Then, add the variables to the environment before running the npm scripts.

For example, to start the local development server:

    sh -ac '. ./.env; npm start'

Or, to publish to staging:

    sh -ac '. ./.env.staging; npm run publish'

In the above examples, the `sh` command runs our npm script in a separate shell.  That way, the environment variables don't pollute the environment in our main shell.  The `-a` option exports all variables, so the variables sourced from the `.env` file via `. ./.env` will be available to the npm script.  The `-c` option specifies the command to run in the shell.  In this case, we specify two commands, separated by a `;`.  The first sources the environment variables and the second runs the npm script.

Sharing pre-fliltered URLs
--------------------------

There are a few hash-based URL routes that will pre-filter the initial list of recommendations.

### By category

Append a hash-based route of the form `#/categories/:categorySlug`, where `:categorySlug` is the slugfied form of a category name, to the end of the URL.

For example:

    http://chicagoreporter.com/99-reforms/#/categories/officer-wellness-and-safety

## By status

Append a hash-based route of the form `#/statuses/:statusSlug`, where `:statusSlug` is the slugified form of a status, to the end of the URL.

For example:

    http://chicagoreporter.com/99-reforms/#/statuses/implemented

Adding new state variables
--------------------------

The data that drives the app lives in an Google Document that is parsed as ArchieML.

The most important information in the document are the recommendations which are part of the `recommendations` array.  However, there are a number of other properties such as `lede` and `intro_text` that are used to render the app.

The Google Doc is retrieved and converted to text via a request to the Google Drive API that is initiated by Webpack when bundling or running the development server.  The parsed ArchieML is then transofmed into a more useable format by a series of JavaScript functions and the final data is passed to Redux to set the initial application state.  The state object is used by React to render the app.

To add a new state variable:

* Add it near the top of the Google Doc using the appropriate ArchieML syntax.
* camelCase variable names are preferred because they look nicer when referencedd in the JavaScript code.
* Add the new property name to the accepted list of properties in the `pruneProps()` transform functon in `src/transforms.js`.
* Add a really basic reducer in `src/reducers/slices.js`. The exported function name should be the same as your property name.


Data prep
---------

Convert a Google Spreadsheet to ArchieML.

Early on in this project, we decided that it made more sense to store the data in ArchieML than Jonah's original Google Sheet.  To regenerate ArchieML from the Google Sheet, run:

    npm run sheet2archieml

Troubleshooting
---------------

During the development process, we found that comments placed in certain places added square brackets into the text export of the document which broke ArchieML parsing.  It might be helpful to run the `dldoc` command to inspect the raw text export of the document.

    ./bin/dldoc --client-secret=client_id.json https://docs.google.com/document/d/16IQIgNn2DXD5AMlMZE2SsrYJCBWJhSykrelscAY5ek4/edit

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


Build process
-------------

TODO: Describe build process including the role of npm scripts, Webpack, Babel and the custom processing scripts.

A tour of the code
------------------

For someone not following the dizzying pace of contemporary front-end development, you'll probably notice some new things in the code.

* [ES2015](https://babeljs.io/learn-es2015/) JavaScript syntax
   * Arrow functions
   * Spread operator
   * `const` and `let` keywords
   * `import` to load modules
* [CSS modules](https://github.com/css-modules/css-modules)
* [JSX](https://facebook.github.io/react/docs/introducing-jsx.html)


TODO: Describe the new technologies in greater detail.

TODO: Describe project directory structure.

Design philosophy
-----------------

### Use central state

Coming from doing a lot of React programming, I've come to like lifting state to have a single point of authority for application state.  I also like making DOM updates based on this state.  The alternative, which will be familiar to people who built complex, jQuery-based applications, is to store state in the DOM itself, or attached data.  This quickly gets unwieldy.

[Redux](http://redux.js.org/) is a bit to wrap your head around, but provides a clean set of idioms for managing state changes.  We're using it for this project.

Credits
-------

Twitter, Facebook and envelope icons are from the [Font Awesome](http://fontawesome.io/) project and converted to SVG by [Font-Awesome-SVG-PNG](https://github.com/encharm/Font-Awesome-SVG-PNG).
