![Fair Projects](./public/images/FairProjects.png "FairProjects")

[![Build Status](https://travis-ci.org/mihaeu/fair-projects.svg?branch=develop)](https://travis-ci.org/mihaeu/fair-projects)
[![Code Climate](https://codeclimate.com/github/mihaeu/fair-projects/badges/gpa.svg)](https://codeclimate.com/github/mihaeu/fair-projects)
[![Test Coverage](https://codeclimate.com/github/mihaeu/fair-projects/badges/coverage.svg)](https://codeclimate.com/github/mihaeu/fair-projects/coverage)
[![Join the chat at https://gitter.im/mihaeu/fair-projects](https://badges.gitter.im/Join%20Chat.svg)](https://gitter.im/mihaeu/fair-projects?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge&utm_content=badge)

> Fair projects for students from students ...

Fair Projects is a web app based on the MEAN stack. It's purpose is to help professors and students with managing their projects' assignments.

## Table of Contents


1. [Getting Started](#getting-started)
1. [Tests](#tests)
1. [Project Structure](#project-structure)
1. [How to Contribute](#how-to-contribute)
1. [Contributors](#contributors)

## Getting Started

Make sure you have node installed (preferably 0.12.7, check the [wiki](https://github.com/mihaeu/fair-projects/wiki/Linux-&-OS-X-Node-Installation) for instructions on how to do that):

```bash
git clone https://github.com/mihaeu/fair-projects
cd fair-projects

# install dependencies (invokes both npm and bower)
npm install

# start app and open browser at localhost:3000
npm start

# for convenience we'd recommend you to install grunt-cli
npm install --global grunt-cli

# start node server, watch for file changes and run tests automatically
# see Gruntfile.js for details
grunt
```

If you're having difficulties finding out where to start editing or adding files for a new feature, refer to [Project Structure](#project-structure)

## Tests

### Client-Side Unit Tests

Client side unit tests and have been written with [Jasmine](jasmine.github.io) and are executed via [Karma](karma-runner.github.io):

```
# during development you might want to have the test runner running continuously
grunt

# if all you want is a single run
grunt test:client
```

To execute tests with Travis we're using PhantomJS instead of Chrome. Check out the `grunt karma:travis` task if you're interested.

### Server-Side Unit Tests

Server side unit tests have been written with [Jasmine](jasmine.github.io) and are executed via [jasmine-node](https://github.com/mhevery/jasmine-node):

```
grunt test:server
```

### E2E Tests

End-to-End tests have been written using [Protractor](https://angular.github.io/protractor) and [Jasmine](jasmine.github.io). Grunt integration is not working 100%. Make sure you download and start the `webdriver-manager` manually before running the tests:

```
# only once
webdriver-manager update

# assuming global installation
# (shouldn't be necessary, but Grunt plugin is broken)
webdriver-manager start

# start server (in separate window or with & in the background)
grunt nodemon:dev

# execute the tests
grunt test:e2e
```

## Project Structure
We found that a lot of Javascript projects have a different project structures, so we decided to document ours here:

```bash
.
├── bower.json                          # front-end dependencies
├── config
│   └── db.js                           # db configuration
├── Gruntfile.js                        # our task runner of choice
├── node_modules                        # .gitignore
│   └── ...
├── package.json                        # project information, back-end dependencies and scripts
├── private                             # all back-end code
│   ├── controllers
│   │   ├── ProjectController.js
│   │   └── SubjectController.js
│   ├── models
│   │   └── Subject.js
│   ├── routers                         # split routes up where necessary
│   │   ├── ProjectRouter.js
│   │   └── SubjectRouter.js
│   └── routes.js
├── public                              # this is the root of the server
│   ├── bower_components                # (Note: these should probably be outside and processed to dist)
│   │   └── ...
│   ├── dist                            # front-end dependencies after processing
│   │   ├── scripts.min.js
│   │   └── style.min.css
│   ├── images
│   │   ├── FairProjectsLogo.png
│   │   └── FairProjects.png
│   ├── index.html                      # front-end entry point
│   ├── js
│   │   ├── app.js                      # central Angular file
│   │   ├── controllers                 # Angular controllers
│   │   └── services                    # Angular services
│   ├── styles
│   │   └── style.css
│   └── views                           # Angular templates
│       ├── project
│       └── subject
├── README.md                           # this file
├── server.js                           # main bootstrap file, starts db, server, ...
└── tests
    ├── e2e                             # protractor tests
    │   └── spec.js
    ├── karma.conf.js
    ├── protractor.conf.js
    └── unit
        ├── client                      # jasmine front-end tests
        └── server                      # jasmine back-end tests
```

## How to Contribute

 - stick to the project structure (or tell us why it sucks)
 - stick to our project and coding guidelines (we're using the brilliant [AirBnB JavaScript Style Guide](https://github.com/airbnb/javascript))
 - send us a PR

## Contributors

 - Markus Rodler
 - Fabian Gerbig
 - Marinus Noichl
 - Michael Haeuslmann

**Proudly developed @** [![FH Rosenheim Logo](http://www.fh-rosenheim.de/typo3conf/ext/in2template/Resources/Public/Images/favicon.ico)](http://fh-rosenheim.de) **University of Applied Sciences Rosenheim**
