import { Component, input } from '@angular/core';

@Component({
  selector: 'text-error',
  template: `
     <span class="text-red-600 font-bold" [class]="customClass()">
      {{ textError() }}
    </span>
  `,
})
export class TextErrorComponent {
  textError = input.required<string>();
  customClass = input<string>('');
}
