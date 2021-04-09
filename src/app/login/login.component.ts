import { Component, OnInit, ViewChild } from '@angular/core';
import { DataService } from '../data.service';
import { Router } from '@angular/router'
import {ToastrService} from 'ngx-toastr';
import swal from 'sweetalert';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit {
  valuepassword;
  valueemail;
  isLogged:boolean;
  isBanned:boolean;
  isError = false;
  constructor(private ds:DataService, private route:Router,private toastr:ToastrService) { }

  ngOnInit(): void {

    this.isLogged=false;
    if(localStorage.getItem("email")){
    this.route.navigate(['/']);
     }

  }

  async onLogin(){

       await this.ds.checkban(this.valueemail).then((data)=> this.isBanned=data['isBanned'])
       console.log(this.isBanned);
       if(this.isBanned){
        swal("You have been banned by the Admin",{icon:'error'})
        this.valueemail='';
        this.valuepassword=''
        return;
       }
       else{
       this.ds.login({email:this.valueemail, password:this.valuepassword}).subscribe((response)=>{
        //get the response and fill it in cookie and then fill the details object in data.service to make it available all the time to profile page and other pages.
        if(response.status == true){
          localStorage.setItem("email", response.data.email);
          localStorage.setItem("firstname", response.data.FullName);
          localStorage.setItem('steamLink', response.data.steamLink);
           this.ds.filldetails({FullName: response.data.FullName, email:response.data.email, password:response.data.password,});
           this.route.navigate(['/market']);
           this.ds.authStatusListener.next(true);

        }else{
          swal('Invalid Username or Password',{icon:'error'})
         // this.toastr.error('Invalid Username or Password','Error',{timeOut:3000});

        }


    }, (err)=>{

      swal('Unknown Error',{icon:'error'})
    });
  }

  }


}
