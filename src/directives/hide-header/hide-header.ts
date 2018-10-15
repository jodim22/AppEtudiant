import { Directive, Input, ElementRef, Renderer } from "@angular/core";

/**
 * Generated class for the HideHeaderDirective directive.
 *
 * See https://angular.io/api/core/Directive for more info on Angular
 * Directives.
 */
@Directive({
  selector: '[hide-header]' // Attribute selector
})
export class HideHeaderDirective {

  constructor() {
    console.log('Hello HideHeaderDirective Directive');
  }

}
