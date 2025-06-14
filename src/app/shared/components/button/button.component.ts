import { CommonModule } from '@angular/common';
import { Component, input, output } from '@angular/core';

@Component({
  selector: 'app-button',
  template: `
    <button
      class="py-2 px-4 rounded-2xl border-none text-white cursor-pointer disabled:bg-gray-500 disabled:cursor-auto"
      [ngClass]="{'bg-amber-200': isDisabled()}"
      [class]="customClass()"
      [type]="isSubmit() ? 'submit' : 'button'"
      [disabled]="isDisabled()"
      (click)="onClick()"
    >
      <ng-content />
    </button>
  `,
  imports: [CommonModule],
})
export class ButtonComponent {
  isSubmit = input<boolean>(false);
  isDisabled = input<boolean>(true);
  clickEmitter = output<void>();
  customClass = input<string>('');

  onClick() {
    this.clickEmitter.emit();
  }
}
