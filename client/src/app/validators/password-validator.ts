import { AbstractControl, ValidationErrors, ValidatorFn } from "@angular/forms";

export function passwordValidator (control: AbstractControl): ValidationErrors | null {
    const password = control.value;

    const hasUppercase = /[A-Z]/.test(password);

    const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);

    if (!hasUppercase || !hasSpecialChar) {
      return {
        uppercase: !hasUppercase,
        specialChar: !hasSpecialChar
      };
    }
    
    return null;
}

export function confirmPasswordValidator(control: AbstractControl): ValidationErrors | null {
  const password = control.get('password');
  const confirmPassword = control.get('confirmPassword');

  return password && confirmPassword && password.value === confirmPassword.value ? null : { confirmPasswordMismatch: true };
}
