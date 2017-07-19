/* eslint-env node */
module.exports = {
  scenarios: [
    {
      name: 'ember-release',
      bower: {
        dependencies: {
          'ember': 'components/ember#release'
        },
        resolutions: {
          'ember': 'release'
        }
      },
      npm: {
        devDependencies: {
          'ember-source': null
        }
      }
    },
    {
      name: 'node-tests',
      command: 'npm run nodetest',
      bower: {
        dependencies: {}
      }
    }
  ]
};
