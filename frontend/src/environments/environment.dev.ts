// environment.dev.ts - Development Environment

// This file is intended for development builds.
// It should be replaced during the build process by using the `fileReplacements` array.
// The list of file replacements can be found in `angular.json`.

// Development configuration
// - `production` is set to `false` to enable Angular development mode.
// - `BASE_SERVICE_URL` points to the development server.
export const environment = {
    production: false,
    BASE_SERVICE_URL: 'https://amigo-assetmanagement.craftyouridea.com/api/v1',
  };
