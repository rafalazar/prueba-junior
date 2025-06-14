import { Directive, effect, ElementRef, inject, Injector, input, OnInit, Renderer2, Signal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { NgControl } from '@angular/forms';
import { debounceTime, fromEvent, merge } from 'rxjs';

type ValidatorErrorDetail = {
  [key: string]: any; 
  requiredLength?: number;
  requiredPattern?: string;
};

@Directive({
  selector: '[errorMessagesInput]',
})
export class ErrorMessagesInputDirective implements OnInit {
  private _elementRef = inject(ElementRef);
  private _control = inject(NgControl);
  private _renderer = inject(Renderer2);
  private _injector = inject(Injector); 

  private _errorSpan: HTMLElement | null = null;

  customErrormessages = input<{ [key: string]: string }>({});

  private _trigger!: Signal<unknown>;

  ngOnInit(): void {
    const statusChanges$ = this._control.statusChanges;
    const blur$ = fromEvent(this._elementRef.nativeElement, 'blur');

    if (statusChanges$) {
      this._trigger = toSignal(
        merge(statusChanges$, blur$).pipe(debounceTime(100)),
        { injector: this._injector }
      );
    }

    this._handleErrors();
  }

  private _handleErrors(): void {
    effect(() => {
      this._trigger();

      if (
        this._control.invalid &&
        (this._control.touched || this._control.dirty)
      ) {
        this._showError();
        return;
      }

      this._removeError();
    }, { injector: this._injector });
  }

  private _showError(): void {
    this._removeError();

    const errors = this._control.errors;
    if (!errors) return;

    const firstErrorKey = Object.keys(errors)[0];
    const errorMessage = this._getErrorMessage(firstErrorKey, errors[firstErrorKey]);

    this._errorSpan = this._renderer.createElement('span');
    this._renderer.addClass(this._errorSpan, 'text-red-600');
    this._renderer.addClass(this._errorSpan, 'font-bold');
    this._renderer.addClass(this._errorSpan, 'text-sm');

    if (!this._errorSpan) return;

    this._errorSpan.textContent = errorMessage;

    this._elementRef.nativeElement.parentElement?.insertBefore(
      this._errorSpan,
      this._elementRef.nativeElement.nextSibling
    );
  }

  private _removeError(): void {
    if (this._errorSpan) {
      this._renderer.removeChild(this._elementRef.nativeElement.parentElement, this._errorSpan);
      this._errorSpan = null;
    }
  }

  private _getErrorMessage(errorKey: string, errorValue: ValidatorErrorDetail): string {
    const customMessages = this.customErrormessages();
    if (customMessages[errorKey]) {
      return customMessages[errorKey];
    }

    const defaultErrorMessages: { [key: string]: string | ((err: ValidatorErrorDetail) => string) } = {
      required: 'Es obligatorio',
      minlength: (err) => `Debe tener al menos ${err.requiredLength} caracteres`,
      maxlength: (err) => `No puede superar los ${err.requiredLength} caracteres`,
      pattern: 'El formato no es correcto',
    };

    const messageOrFn = defaultErrorMessages[errorKey];

    return typeof messageOrFn === 'function'
      ? messageOrFn(errorValue)
      : String(messageOrFn || '');
  }
}
