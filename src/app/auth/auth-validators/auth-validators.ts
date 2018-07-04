import {AbstractControl, AsyncValidatorFn, ValidationErrors, ValidatorFn} from '@angular/forms';
import {Observable, of, timer} from 'rxjs';
import {switchMapTo} from 'rxjs/operators';

export function debounceValidator(validator: ValidatorFn, time): AsyncValidatorFn {
  return (control: AbstractControl): Observable<ValidationErrors | null> =>
    timer(time).pipe(
      switchMapTo(of(validator(control)))
    );
}

export function repeatValidator(original: AbstractControl | string): ValidatorFn {

  return (control: AbstractControl): ValidationErrors | null => {
    const originalControl = original instanceof AbstractControl ?
      original :
      control.parent && control.parent.controls[original];

    const different = originalControl ?
      control.value !== originalControl.value :
      false;
    return different ?
              {'valueRepeat': {original: originalControl.value, repeated: control.value}}
              : null;
  };
}

export function updateValidator(target: AbstractControl | string): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const targetControl: AbstractControl = target instanceof  AbstractControl ?
      target :
      control.parent && control.parent.controls[target];
    if (targetControl) {
      targetControl.updateValueAndValidity();
    }
    return null;
  };
}

