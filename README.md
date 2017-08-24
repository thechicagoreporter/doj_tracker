Chicago Reporter DOJ Tracker
============================

A tracker for United States Department of Justice recommendations for reforming the Chicago Police Department.

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

Run the local development server
--------------------------------

    npm run serve

You may get the error: /usr/bin/env: ‘node’: No such file or directory. This may be because the package manager installed it under nodejs. In which case do a symlink:

    sudo ln -s /usr/bin/nodejs /usr/bin/node

and then trying serving again.

The first time you run this command, you will see a prompt like this:

	Authorize this app by visiting this url: https://accounts.google.com/o/oauth2/auth?access_type=offline&scope=https%3A%2F%2Fwww.googleapis.com%2Fauth%2Fdrive.readonly&response_type=code&client_id=757802846504-lpo28bffqnot23kgnhq3l4q6u9ioaedh.apps.googleusercontent.com&redirect_uri=urn%3Aietf%3Awg%3Aoauth%3A2.0%3Aoob
	Enter the code from that page here:

Visit the URL in the message and follow the dialog to allow access to the "DOJ Tracker" app.  You will be presented with a code that you should copy and paste after the "Enter the code from that page here" prompt.

Local Testing with WordPress
----------------------

For local testing of publication to WordPress and the interaction between styles defined in this app and the Chicago Reporter site, I used the [Varying Vagrant Vagrants](https://varyingvagrantvagrants.org/) (VVV) Vagrant configuration recommended by INN for developing with the [Chicago Reporter's WordPress theme](https://github.com/INN/umbrella-chicagoreporter).  INN has [documentation](https://github.com/INN/docs/blob/master/staffing/onboarding/vvv-setup.md) for setting up VVV on your system.

After getting VVV set up and creating a local Chicago Reporter site, the site should be available at http://chicagoreporter.vagrant.dev/.

WordPress Configuration
-----------------------

You'll need to install the [Application Passwords](https://wordpress.org/plugins/application-passwords/) plugin which essentially allows creating application-specific API keys.

Create a service user account that will be used for publishing to WordPress using the WordPress REST API.  Make sure this role has adequate permissions to edit posts.  The "Editor" role worked for me.

In the user management section of the WordPress admin, create an application password for the service user account.  Make sure to make a note of the password somewhere.

Create a new post where the tracker HTML will be uploaded.  While a post will be created the first time you publish if you don't specify a post ID, it's easier to get everything set up beforehand.  You might want to create a separate post for staging.  In either case, make sure you make note of the post IDs, which you can find from the URL parameter of the post in the WordPress admin.

Tracker Configuration
---------------------

Configuration is through environment variables and largely relates to deployment.

### DOCUMENT\_URL

URL to Google Document containing ArchieML that provides data for this app.

### TOKEN\_PATH

Path where Google Drive API OAuth token will be stored.  Defaults to `${HOME}/.credentials/doj_tracker.json`.

### AWS\_ACCESS\_KEY

AWS access key credential used to publish static assets to S3.

### AWS\_SECRET\_KEY

AWS access key secret used to publish static assets to S3.

### S3\_URL

URL to the S3 bucket where static assets will be published, beginning with `s3://`.

### S3\_HTTP\_URL

URL to the S3 bucket where static assets will be published, beginning with `http://`.

### WP\_URL

Root URL for the WordPress site where this app will be published.

### WP\_USERNAME

WordPress service account user name used to publish the app HTML into WordPress.

### WP\_PASSWORD

WordPress service account password used to publish the app HTML into WordPress.

### WP\_POST\_TITLE

Title of WordPress post where app is published.

### WP\_POST\_ID

If defined, existing WordPress post that will be updated.

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

### Use central state

Coming from doing a lot of React programming, I've come to like lifting state to have a single point of authority for application state.  I also like making DOM updates based on this state.  The alternative, which will be familiar to people who built complex, jQuery-based applications, is to store state in the DOM itself, or attached data.  This quickly gets unwieldy.

[Redux](http://redux.js.org/) is a bit to wrap your head around, but provides a clean set of idioms for managing state changes.  We're using it for this project.
