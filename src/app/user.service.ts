import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  // private _url:String = 'https://video-api.glitch.me';
  // private _url:String = 'http://localhost:3000';
  private _url:String = '';//for heroku deploy
  constructor(private http:HttpClient) { }
  
  signUp(name:string, email:string, passW:string){
    return this.http.post(`${this._url}/api/users/signup`,{'name':name, 'email':email,'pass1':passW});
  }

  signIn(email:string,pass1:string){
    return this.http.post(`${this._url}/api/users/signin`,{'email':email,'pass1':pass1})
  }
//  Adding functionalities for token
  setToken(token:string){
    localStorage.setItem("token",token);
  }
  getToken(){
    let token = localStorage.getItem("token");
    return token;
  }
  removeToken(){
    localStorage.clear();
  }
} 
