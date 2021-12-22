import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  url = 'http://localhost:3000/user';

  constructor(private http :HttpClient) { }

  adduser(user:User){
    return this.http.post(this.url, user);
  }


  getUserList() {
    return this.http.get<User[]>(this.url);
  }

  getUserbyId(id: string) {
    return this.http.get(this.url+`/${id}`);
  }
  getUserbyNameAndPwd(user: User) {
    return this.http.post(this.url,user);
  }

  updateUser(user:User){
    return this.http.put(this.url, user);
  }

  deleteUser(id : string){
    return this.http.delete(`${this.url}/${id}`);
  }
}
