import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup,AbstractControl, Validators, FormBuilder } from '@angular/forms';
import { FileValidator } from './file-input.validator';
import { PasswordStrengthValidator} from './password.validator';


@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent implements OnInit {
  registerForm:FormGroup;
  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
    this.registerForm=this.fb.group({
      'fname': ['',Validators.required],
      'lname' : ['',Validators.required],
      'email': ['',Validators.required,Validators.email],
      'dob': ['',Validators.required],
      'address':['',Validators.required],
      'tel': ['',Validators.required,Validators.pattern('^\\s*(?:\\+?(\\d{1,3}))?[-. (]*(\\d{3})[-. )]*(\\d{3})[-. ]*(\\d{4})(?: *x(\\d+))?\\s*$')],
      'gender': ['',Validators.required],
      'psw': ['',Validators.required,PasswordStrengthValidator],
      'pswrpt': ['',[Validators.required]],
     
      'file': ['',[FileValidator.validate,Validators.required]],
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
