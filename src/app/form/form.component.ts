import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup,AbstractControl, Validators } from '@angular/forms';
import { FileValidator } from './file-input.validator';
import { PasswordStrengthValidator} from './password.validator';


@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent implements OnInit {
  registerForm:FormGroup;
  constructor() { }

  ngOnInit(): void {
    this.registerForm=new FormGroup({
      'fname': new FormControl('',Validators.required),
      'lname' : new FormControl('',Validators.required),
      'email': new FormControl('',[Validators.required,Validators.email]),
      'dob': new FormControl('',Validators.required),
      'address':new FormControl('',Validators.required),
      'tel': new FormControl('',[Validators.required,Validators.pattern('^\\s*(?:\\+?(\\d{1,3}))?[-. (]*(\\d{3})[-. )]*(\\d{3})[-. ]*(\\d{4})(?: *x(\\d+))?\\s*$')]),
      'gender': new FormControl('',Validators.required),
      'psw': new FormControl('',[Validators.required,PasswordStrengthValidator]),
      'pswrpt': new FormControl('',[Validators.required]),
     
      'file': new FormControl('',[FileValidator.validate,Validators.required]),
      'skills':new FormArray([
        new FormControl(null,Validators.required),
    
      ]),
    }
    );
  }
  onSubmit(){
    
    if(!this.registerForm.valid)
    {
      this.markFormGroupTouched(this.registerForm);
      console.log(this.registerForm);
    }
    else{
      console.log(this.registerForm);
    }
  }
  get formArr(){
    return this.registerForm.get('skills') as FormArray;
  }
  onAdd(){
    (<FormArray>this.registerForm.get('skills')).push(new FormControl(null,Validators.required));
  }

  onDelete(i:number){
    this.formArr.removeAt(i);
  }
  private markFormGroupTouched(formGroup: FormGroup) {
    (<any>Object).values(formGroup.controls).forEach(control => {
      control.markAsTouched();

      if (control.controls) {
        this.markFormGroupTouched(control);
      }
    });
  }
 
}
