import { AbstractControl, ValidationErrors } from "@angular/forms"

// export const PasswordStrengthValidator = function (control: AbstractControl): ValidationErrors | null {

//   let value: string = control.value;

//   if (!value) {
//     return null
//   }

//   let upperCaseCharacters = /[A-Z]+/g
//   if (upperCaseCharacters.test(value) === false) {
//     return { passwordStrength: `Password has to contine Upper case characters,current value ${value}` };
//   }

//   let lowerCaseCharacters = /[a-z]+/g
//   if (lowerCaseCharacters.test(value) === false) {
//     return { passwordStrength: `Password has to contine lower case characters,current value ${value}` };
//   }


//   let numberCharacters = /[0-9]+/g
//   if (numberCharacters.test(value) === false) {
//     return { passwordStrength: `Password has to contine number characters,current value ${value}` };
//   }
//   if(value.length<8){
//       return {passwordStrength: `Password should contain atleast 8 character,current value ${value}`};
//   }

//   let specialCharacters = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/
//   if (specialCharacters.test(value) === false) {
//     return { passwordStrength: `Password has to contine special character,current value ${value}` };
//   }
//   return null;
// }


export const PasswordStrengthValidator = function (control: AbstractControl): ValidationErrors | null {

  let value: string = control.value;

  if (!value) {
    return null
  }

  var strongRegex = new RegExp("^(?=.*[A-Z])(?=.*[!@#$&*])(?=.*[0-9])(?=.*[a-z].).{10,}");
  if (strongRegex.test(value) === false) {
    return { passwordStrength: `Invalid Password.` };
  }
  return null;
}