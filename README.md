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

### Use Redux

[Redux](http://redux.js.org/) is a bit to wrap your head around, but after trying to avoid using something like this, I found I was doing stuff like storing state in CSS classes.  Doing things like this made for more confusing logic.
