// environment.prod.ts - Production Environment

// This file is intended for production builds.
// It should be replaced during the build process by using the `fileReplacements` array.
// The list of file replacements can be found in `angular.json`.

// Production configuration
// - `production` is set to `true` to enable Angular production mode.
// - `BASE_SERVICE_URL` points to the production server.
export const environment = {
  production: true,
  BASE_SERVICE_URL: 'http://amigo-assetmanagement.craftyouridea.com/api/v1/',
};
