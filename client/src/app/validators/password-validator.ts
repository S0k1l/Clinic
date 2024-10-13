import { AbstractControl, ValidationErrors } from "@angular/forms";

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