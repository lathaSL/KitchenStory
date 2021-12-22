import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css']
})
export class OrderComponent implements OnInit {
selectedItems;
totalcost;
showOrdDtl: boolean;
showConfirm: boolean;
showorderconfirm: boolean;

orderForm: FormGroup =new FormGroup({
  name : new FormControl('',Validators.required)
})
  constructor(private router :Router) { 
    this.selectedItems=   this.router.getCurrentNavigation().extras.state['selectedItems']; 

  }

  ngOnInit(): void {
    this.showOrdDtl=true;
    this.showConfirm=false;
    this.showorderconfirm=false;
    console.log(this.selectedItems)
    this.totalcost=0;
      // this.selectedItems=   this.router.getCurrentNavigation().extras.state['selectedItems']; 
      for(let i=0; i < this.selectedItems.length;i++) { 
        this.totalcost+=+this.selectedItems[i].price
      }

  

  }
  callPayment(){
    this.showOrdDtl=false;
    this.showConfirm=true;
    this.showorderconfirm=false;
  }
  confirmpg(){
    this.showOrdDtl=true;
    this.showConfirm=false;
    this.showorderconfirm=true;
  }
}
