import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup,AbstractControl, Validators, FormBuilder } from '@angular/forms';
import { MustMatch, PasswordStrengthValidator, usernameValidator} from './validator'


@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})


export class FormComponent implements OnInit {
  registerForm:FormGroup;
  userForm:boolean=false;
  adminForm:boolean=false;
  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
    
      this.registerForm=this.fb.group({
        'fname': ['',Validators.compose([Validators.required,usernameValidator])],
        'lname' : ['',Validators.required],
        'email': [''],
        'auth':['',Validators.required],
        
        'dob': ['',Validators.required],
        'address':['',Validators.required],
        'tel': ['',Validators.compose([Validators.required,Validators.pattern('^\\s*(?:\\+?(\\d{1,3}))?[-. (]*(\\d{3})[-. )]*(\\d{3})[-. ]*(\\d{4})(?: *x(\\d+))?\\s*$')])],
        'gender': ['',Validators.required],
        'psw': ['',Validators.compose([Validators.required, PasswordStrengthValidator])],
        'pswrpt': ['',[Validators.required]],
       
        'file': ['',Validators.required],
        'skills':new FormArray([
          new FormControl(null,Validators.required),
      
        ],
        ),
      },{
        validator: MustMatch('psw','pswrpt')
      }
      );
    
      this.registerForm.get("auth").statusChanges
      .subscribe(data=> {
        this.changeValidators()
      })
    
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
  changeValidators(){
    if (this.adminForm) {
      this.registerForm.controls["email"].setValidators([Validators.required,Validators.email]);
      
    } else {
      this.registerForm.controls["email"].clearValidators();
      
    }
 
    this.registerForm.get("email").updateValueAndValidity();
    
 
       
  }
  checkAdmin(){
    this.adminForm=true;
      // this.registerForm.controls['email'].setValidators([Validators.required,Validators.email]);
      // this.registerForm.controls['email'].updateValueAndValidity();
    
     }
     checkUser(){
      this.userForm=true;
      this.adminForm=false;
    
      // this.registerForm.controls['email'].clearValidators();
      //       this.registerForm.controls['email'].updateValueAndValidity();
     }
  }


