import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from 'src/app/models/user.model';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-changepwd',
  templateUrl: './changepwd.component.html',
  styleUrls: ['./changepwd.component.css']
})
export class ChangepwdComponent implements OnInit {
  userName;
  chgPwdForm: FormGroup =new FormGroup({
    name : new FormControl('',Validators.required),
    password:new FormControl('',Validators.required),
    // newpassword1: new FormControl('',Validators.required),
    // newpassword2: new FormControl('',Validators.required)
  })

  Users:User[]

  get frm(){
    return this.chgPwdForm.controls
  } 
  constructor(private userservice: UsersService,   private fb: FormBuilder,
    private router: Router,) {
    this.userName=sessionStorage.getItem('username');
    // this.router.getCurrentNavigation().extras.state['user'].name; 
    
  }

  ngOnInit(): void {
    
    this.chgPwdForm = this.fb.group({
      _id: [''],
      name: [this.userName, Validators.required],
      password: ['', Validators.required],
      role:[''],
      newpassword1: ['', Validators.required],
      newpassword2: ['', Validators.required],

    })
  }
  changePassword(){ 
    console.log(this.chgPwdForm.value);
    console.log(this.userName);

    this.userservice.updateUser(this.chgPwdForm.value).subscribe((response) => {
      if (response){
        alert ("Password Changed!!");
        // this.showChgPwd=false;
       } 
     else{
        alert ("Check entered credentials!!")
    }
     })
  
  }

}
