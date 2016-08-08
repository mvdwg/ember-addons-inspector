# ember-addons-inspector
[![Build Status](https://travis-ci.org/san650/ember-addons-inspector.svg?branch=master)](https://travis-ci.org/san650/ember-addons-inspector)
![Latest version](https://img.shields.io/npm/v/ember-addons-inspector.svg)

Get all the information about the addons registered in your Ember project (addon
or application). This addon adds an `inspect` command which facilitates
inspecting your project and learn all about the addons registered in it.

## Sinopsis

List all the addons in the project

```
$ ember inspect:all

Inspecting app...

Found 36 addon(s), 0 disabled.

* ember-buffered-proxy (0.5.1)
  An Ember Object Proxy with change buffering

* ember-cli-app-version (1.0.0)
  Add App version number to Ember Inspector Info Tab

* ember-cli-babel (5.1.6)
  This Ember-CLI plugin uses [Babel](https://babeljs.io/) to allow you to use ES6 syntax with your Ember-CLI project.

* ember-cli-dependency-checker (1.2.0)
  Ember CLI addon for detecting missing npm and bower dependencies before executing ember commands

...
```

and then you can inspect an individual addon

```
$ ember inspect ember-cli-mirage
A client-side mock HTTP server to develop, test and demo your Ember app

      version: 0.1.13
     homepage: https://github.com/samselikoff/ember-cli-mirage
         bugs: https://github.com/samselikoff/ember-cli-mirage/issues
   repository: git+https://github.com/samselikoff/ember-cli-mirage.git
       author: Sam Selikoff
      license: MIT

   Blueprints:
     ember-cli-mirage - Installer blueprint
     factory - Generates a mirage factory.
     fixture - Generates a mirage fixture.
```

This is work in progress and the idea is to add tons of information about the
addons.

## Installation

```
$ ember install ember-addons-inspector
```

## Development

### Source code

```
$ git clone https://github.com/san650/ember-addons-inspector.git
```

### Running Tests

```
$ npm test
```

### Project's health

TBA

## License

ember-addons-inspector is licensed under the MIT license.

See [LICENSE](./LICENSE.md) for the full license text.
