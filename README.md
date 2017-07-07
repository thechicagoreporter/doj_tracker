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

Data prep
---------

Convert a Google Spreadsheet to ArchieML.

Early on in this project, we decided that it made more sense to store the data in ArchieML than Jonah's original Google Sheet.  To regenerate ArchieML from the Google Sheet, run:

    npm run sheet2archieml

Coding style
------------

The code for this project is mostly written in JavaScript using [ES2015](https://babeljs.io/learn-es2015/) features.

For the most part, it follows the [AirBnB JavaScript coding style](https://github.com/airbnb/javascript).

To lint the code using [eslint](http://eslint.org/), run:

    npm run lint
