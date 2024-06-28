// environment.stage.ts - Staging Environment

// This file is intended for staging builds.
// It should be replaced during the build process by using the `fileReplacements` array.
// The list of file replacements can be found in `angular.json`.

// Staging configuration
// - `production` is set to `true` to enable Angular production mode.
// - `BASE_SERVICE_URL` points to the staging server.
export const environment = {
    production: true,
    BASE_SERVICE_URL: 'http://amigo-assetmanagement.craftyouridea.com/api/v1',
  };
