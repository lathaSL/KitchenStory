import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from 'src/app/models/user.model';
import { UsersService } from 'src/app/services/users.service';


@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {
  userForm: FormGroup =new FormGroup({
    name : new FormControl('',Validators.required)
    
  })
  url="/home"

  get frm(){
    return this.userForm.controls
  } 
  Users:User[]
  constructor(
    private userservice: UsersService,
    private fb: FormBuilder,
    private router: Router,
    ){

   }

  ngOnInit(): void {
    this.userForm = this.fb.group({
      _id: [''],
      name: ['', Validators.required],
      password: ['', Validators.required],
      role: ['']
    })
  }
login(){
  console.log(this.userForm.value);

  this.userservice.getUserbyNameAndPwd(this.userForm.value).subscribe((response) => {
    if (response){

     this.url="/fooditem";
     console.log(this.url);
     sessionStorage.setItem('username', this.userForm.get('name').value);

     this.router.navigate([this.url]);//,{ state: { user:this.userForm.value } }

     } 
   else{
      alert ("Invalid credentials!!")
  }
   })

}


}
