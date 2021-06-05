import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { UserService } from '../user.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {
 
  constructor(private userService:UserService,
              private toastrService:ToastrService,
              private router:Router,
  ) { }

  ngOnInit(): void {
  }
  //adding signup function
  onSignUp(signupData){
    console.log("signupData");
    console.log(signupData.value);
    this.userService.signUp(signupData.value.uname,signupData.value.email,signupData.value.pass1)
    .subscribe(data=>{
      console.log("inside data");
       console.log(data);
      this.toastrService.success(data['message']);
    })
    signupData.reset();
  }

  onSignIn(signinData){
    console.log(signinData.value)
    this.userService.signIn(signinData.value.username,signinData.value.passw)
    .subscribe(data=>{
      console.log(data);
      // this.toastrService.info(data['message']);
      if(data['message'] == 'success'){
        this.toastrService.success('Login Successfull !');
        this.userService.setToken(data['token']);
        this.router.navigate(['/videos']);
      }else{
        this.toastrService.error('Invalid Username or Password !');
        this.userService.removeToken();
      }
    })
    signinData.reset();
  }
}
 