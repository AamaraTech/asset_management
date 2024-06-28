
import {Directive, ElementRef, Injectable} from '@angular/core';
import {
  BaseDirective2,
  StyleBuilder,
  StyleDefinition,
  StyleUtils,
  MediaMarshaller,
} from '../../core/public-api';

const FLEX_FILL_CSS = {
  'margin': 0,
  'width': '100%',
  'height': '100%',
  'min-width': '100%',
  'min-height': '100%'
};

@Injectable({providedIn: 'root'})
export class FlexFillStyleBuilder extends StyleBuilder {
  buildStyles(_input: string) {
    return FLEX_FILL_CSS;
  }
}

/**
 * 'snFill' flexbox styling directive
 *  Maximizes width and height of element in a layout container
 *
 *  NOTE: snFill is NOT responsive API!!
 */
@Directive({selector: `[snFill], [snFlexFill]`})
export class FlexFillDirective extends BaseDirective2 {
  constructor(elRef: ElementRef,
              styleUtils: StyleUtils,
              styleBuilder: FlexFillStyleBuilder,
              marshal: MediaMarshaller) {
    super(elRef, styleBuilder, styleUtils, marshal);
    this.addStyles('');
  }

  protected override styleCache = flexFillCache;
}

const flexFillCache: Map<string, StyleDefinition> = new Map();