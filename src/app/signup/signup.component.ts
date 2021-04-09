import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';
import { Router } from "@angular/router";
import { ToastrService } from 'ngx-toastr';
import swal from 'sweetalert';


@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  valuefirstName;
  valueemail;
  valuepassword;
  valueconfirmPassword;
  valuesteamLink;
  interval;
  isLogged:boolean;
  constructor(private ds:DataService, private router: Router,private toast:ToastrService) { }

  ngOnInit(): void {

this.isLogged=false;
if(localStorage.getItem("email")){
  this.router.navigate(['/']);
}
  }

  ngOnDestroy(){
    if(this.interval){
      clearInterval(this.interval);
    }
  }

  onSignup()
  {

   this.ds.signup({firstname:this.valuefirstName,email:this.valueemail,steamLink:this.valuesteamLink, password:this.valuepassword,proPic:"default.png",userImgPath:"null",joinDate:Date.now(),isBanned:false}).subscribe((response)=>{
      if(response.status == true){

        // this.toast.success('A verification link has been sent to your email','Success',{timeOut:3000});

        swal({
          title: "Are you sure?",
          text: "Once deleted, you will not be able to recover this imaginary file!",
          icon: "warning",
          buttons: [true],
          dangerMode: true,
        })
        .then((willDelete) => {
          if (willDelete) {
            swal("Poof! Your imaginary file has been deleted!", {
              icon: "success",
            });
          } else {
            swal("Your imaginary file is safe!");
          }
        });
        swal({
          title: "Verification Sent!",
          text: "A verification link has been sent to your email !",
          icon: "success",
          buttons: ['Aww yiss!']
        });


        this.interval = setInterval(()=>{
          this.router.navigate(['/login']);
        },2000);

      }else{

        alert(response.data.err);

      }
   },(err)=>{

     alert("Internal server error ");
   });


  }

}
