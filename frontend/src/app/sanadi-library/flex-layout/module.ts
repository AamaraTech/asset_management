
import {Inject, ModuleWithProviders, NgModule, PLATFORM_ID} from '@angular/core';
import {isPlatformServer} from '@angular/common';

import {
  SERVER_TOKEN,
  LayoutConfigOptions,
  LAYOUT_CONFIG,
  DEFAULT_CONFIG,
  BreakPoint,
  BREAKPOINT,
} from './core/public-api';
import { FlexModule } from './flex/module';
import { ExtendedModule } from './extended/module';
import { GridModule } from './grid/module';

/**
 * FlexLayoutModule -- the main import for all utilities in the Angular Layout library
 * * Will automatically provide Flex, Grid, and Extended modules for use in the application
 * * Can be configured using the static withConfig method, options viewable on the Wiki's
 *   Configuration page
 */
@NgModule({
  imports: [FlexModule, ExtendedModule, GridModule],
  exports: [FlexModule, ExtendedModule, GridModule]
})
export class FlexLayoutModule {

  /**
   * Initialize the FlexLayoutModule with a set of config options,
   * which sets the corresponding tokens accordingly
   */
  static withConfig(configOptions: LayoutConfigOptions,
                    // tslint:disable-next-line:max-line-length
                    breakpoints: BreakPoint|BreakPoint[] = []): ModuleWithProviders<FlexLayoutModule> {
    return {
      ngModule: FlexLayoutModule,
      providers: configOptions.serverLoaded ?
        [
          {provide: LAYOUT_CONFIG, useValue: {...DEFAULT_CONFIG, ...configOptions}},
          {provide: BREAKPOINT, useValue: breakpoints, multi: true},
          {provide: SERVER_TOKEN, useValue: true},
        ] : [
          {provide: LAYOUT_CONFIG, useValue: {...DEFAULT_CONFIG, ...configOptions}},
          {provide: BREAKPOINT, useValue: breakpoints, multi: true},
        ]
    };
  }

  constructor(@Inject(SERVER_TOKEN) serverModuleLoaded: boolean,
              @Inject(PLATFORM_ID) platformId: Object) {
    if (isPlatformServer(platformId) && !serverModuleLoaded) {
      console.warn('Warning: Flex Layout loaded on the server without FlexLayoutServerModule');
    }
  }
}