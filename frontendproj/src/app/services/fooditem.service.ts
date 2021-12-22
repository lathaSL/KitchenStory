import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Fooditem } from '../models/fooditem.model';


@Injectable({
  providedIn: 'root'
})
export class FooditemService {
  url = 'http://localhost:3000/fooditem/';

  constructor(private http :HttpClient) { }

  addFoodItem(fooditem:Fooditem){
    console.log("addFoodItem")
    return this.http.post(this.url, fooditem);
  }
  getFoodItemListByName(name:string) {
    return this.http.get<Fooditem[]>(this.url+`${name}`);
  }

  getFoodItemList() {
    return this.http.get<Fooditem[]>(this.url);
  }

  getFoodItembyId(id: string) {
    return this.http.get(this.url+`/${id}`);
  }

  updateFoodItem(fooditem:Fooditem){
    return this.http.put(`${this.url}/${fooditem._id}`, fooditem);
  }

  deleteFoodItem(id : string){
    return this.http.delete(`${this.url}/${id}`);
  }
}
