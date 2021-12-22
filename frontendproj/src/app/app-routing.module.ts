import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminhomeComponent } from './components/adminhome/adminhome.component';
import { ChangepwdComponent } from './components/changepwd/changepwd.component';

import { FooditemComponent } from './components/fooditem/fooditem.component';
import { HomeComponent } from './components/home/home.component';
import { OrderComponent } from './components/order/order.component';
import { UsersComponent } from './components/users/users.component';

const routes: Routes = [
  {path: 'home', component: HomeComponent},
  {path: 'user', component:UsersComponent},
  {path: 'fooditem', component:FooditemComponent},
  {path:'admin',component:AdminhomeComponent},
  {path: 'chgpwd' , component:ChangepwdComponent},
  {path: 'order', component:OrderComponent}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
