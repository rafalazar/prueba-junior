import { Directive, ElementRef, OnInit, Renderer2, inject, input } from '@angular/core';

@Directive({
  selector: '[formInputStyle]',
  standalone: true,
})
export class FormInputStyleDirective implements OnInit {
  private _elementRef = inject(ElementRef);
  private _renderer = inject(Renderer2);

  maxWidth = input<string | null>('15rem');

  private _baseClasses = [
    'border',
    'border-gray-500',
    'rounded-xl',
    'p-2',
    'placeholder:text-gray-400',
    'transition-colors',
    'focus:border-blue-500',
    'focus:outline-none'
  ];

  constructor() {}

  ngOnInit(): void {
    this._baseClasses.forEach(cls => {
      this._renderer.addClass(this._elementRef.nativeElement, cls);
    });

    if (this.maxWidth()) {
      this._renderer.setStyle(this._elementRef.nativeElement, 'max-width', this.maxWidth());
    }
  }
}