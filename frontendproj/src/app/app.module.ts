import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FooditemComponent } from './components/fooditem/fooditem.component';
import { UsersComponent } from './components/users/users.component';
import { HeaderComponent } from './components/header/header.component';
import { HomeComponent } from './components/home/home.component';
import { AdminhomeComponent } from './components/adminhome/adminhome.component';
import { ChangepwdComponent } from './components/changepwd/changepwd.component';
import { OrderComponent } from './components/order/order.component';

@NgModule({
  declarations: [
    AppComponent,
    FooditemComponent,
    UsersComponent,
    HeaderComponent,
    HomeComponent,
    AdminhomeComponent,
    ChangepwdComponent,
    OrderComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent,UsersComponent,FooditemComponent]
})
export class AppModule { }
