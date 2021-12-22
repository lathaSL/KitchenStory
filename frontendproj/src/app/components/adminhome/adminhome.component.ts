import { Component, OnInit } from '@angular/core';
import { HostListener } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-adminhome',
  templateUrl: './adminhome.component.html',
  styleUrls: ['./adminhome.component.css']
})
export class AdminhomeComponent implements OnInit {
 

  constructor(private router: Router,) {
  }

  ngOnInit(): void {
    
    sessionStorage.removeItem("username");
    this.router.navigate(["/home"]);//,{ state: { user:this.userForm.value } }

    console.log (sessionStorage.getItem("username"));
    
  }
  // @HostListener('window:unload', ['$event'])
  //   unloadHandler(event) {
  //       window.sessionStorage.clear();
  //   }
}
