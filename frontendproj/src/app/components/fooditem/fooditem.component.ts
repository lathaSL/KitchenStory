import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Fooditem } from 'src/app/models/fooditem.model';
import { FooditemService } from 'src/app/services/fooditem.service';

@Component({
  selector: 'app-fooditem',
  templateUrl: './fooditem.component.html',
  styleUrls: ['./fooditem.component.css']
})
export class FooditemComponent implements OnInit {
  user: boolean;
  editmode:boolean;
  addmode:boolean;
  displayList:boolean;
  userName: String;
  selectedItemsList;
  searchValue;
  checkedIDs;
  // fooditemSelected;
  myGroup;
  FoodItems: Fooditem[]

  searchForm: FormGroup =new FormGroup({
    name : new FormControl('',Validators.required)
  })
  listForm: FormGroup =new FormGroup({
    name : new FormControl('',Validators.required)
  })
  addForm: FormGroup =new FormGroup({
    name : new FormControl('',Validators.required),
    price:new FormControl('',Validators.required),
    category: new FormControl('',Validators.required),
  })
  get frm(){
    return this.searchForm.controls
  } 
get addfrm(){
    return this.addForm.controls
  } 

  constructor(
    private fooditemservice: FooditemService,
    private fb: FormBuilder,
    private router: Router,

    )
{}
  


  ngOnInit(): void {
    this.user=true;
    this.getFoodItemsList();

    this.editmode=false;
    this.addmode=false;
    this.displayList=true;
    this.addForm = this.fb.group({
      _id: [''],
      name: ['', Validators.required],
      price: ['', Validators.required],
      category: ['', Validators.required]
    })
    this.listForm = this.fb.group({
      _id: [''],
      name: ['', Validators.required],
      price: ['', Validators.required],
      category: ['', Validators.required]
    })
    this.userName=sessionStorage.getItem('username');
    if (this.userName){
      this.user=false;
    }
  

      

  }
  fetchSelectedItems() {
    this.selectedItemsList = this.FoodItems.filter((value, index) => {
      return value._id
    });
  }
  getFoodItemsList() {
    this.fooditemservice.getFoodItemList().subscribe((response: Fooditem[]) => {
      this.FoodItems = response
      console.log(this.FoodItems)
      let fooditemSelected:boolean[];
      fooditemSelected= []
      for(let i=0; i < this.FoodItems.length;i++) { 
          fooditemSelected.push(false);
    }

      this.myGroup = this.fb.group({
        myCategory: this.fb.array(fooditemSelected)
        
      });
      console.log(this.listForm.get("category").value);      

    })
  }
  onOrderFoodItem(){//fooditem: Fooditem) {
    console.log(this.myGroup.get('myCategory').value);

    this.fetchCheckedIDs();
    console.log(this.checkedIDs)
//     this.FoodItems.forEach((value, index) => {
//       // if (value.) {
// // }
//     });
    // this.fetchSelectedItems()
    }
    changeSelection() {
      this.fetchSelectedItems()
    }
    fetchCheckedIDs() {
      this.checkedIDs = []


      this.selectedItemsList=this.myGroup.get('myCategory');


      for(let i=0; i < this.selectedItemsList.value.length;i++) { 
        if (this.selectedItemsList.value[i]){
          this.checkedIDs.push(this.FoodItems[i]);

        }
    }
    console.log(this.checkedIDs)
    this.router.navigate(["/order"],{ state: { selectedItems:this.checkedIDs} })

      // this.FoodItems=this.checkedIDs;
    }
    onDeleteFoodItem(id) {
    if (confirm('Do you want to delete this item?')) {
        this.fooditemservice.deleteFoodItem(id).subscribe((response)=>{
            this.getFoodItemsList();
            alert('Deleted successfully');
           },
          (err) => { console.log(err) }
        

          )
    }    
  }
  onAddFoodItem() {
    this.addmode=true;
    this.displayList=false;
  }
  callBuyOrAddFoodItem(){
    console.log("ss"+this.user)
    if (this.user){
      
    this.onOrderFoodItem();
  }
  else{
    this.onAddFoodItem();
  }
}
submit(){
 this.fooditemservice.addFoodItem(this.addForm.value).subscribe(
  (response) => {
    console.log(response);
    this.getFoodItemsList();
    this.addmode=false;
    this.displayList=true;
    alert("Added Successfully!!")
  },
  (err) => { console.log(err) }
)
}

onSearchChange(event: Event): void { 
  this.searchValue=(<HTMLInputElement>event.target).value;
 
  console.log(this.searchValue);
  this.fooditemservice.getFoodItemListByName(this.searchValue).subscribe(
    (response)=>{

      console.log(response);
      this.FoodItems = response;

      let fooditemSelected:boolean[];
      fooditemSelected= []
      for(let i=0; i < this.FoodItems.length;i++) { 
          fooditemSelected.push(false);
    }

      this.myGroup = this.fb.group({
        myCategory: this.fb.array(fooditemSelected)
        
      });

    }
  )
}

}
