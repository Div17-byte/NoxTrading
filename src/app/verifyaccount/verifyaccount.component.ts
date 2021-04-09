import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute} from '@angular/router';
import { DataService } from '../data.service';
import swal from 'sweetalert';

@Component({
  selector: 'app-verifyaccount',
  templateUrl: './verifyaccount.component.html',
  styleUrls: ['./verifyaccount.component.css']
})
export class VerifyaccountComponent implements OnInit {
  hash;
  verified;
  constructor( private router:Router, private ar:ActivatedRoute, private ds:DataService) { }

  ngOnInit(): void {

    this.ar.queryParamMap.subscribe((data)=>{
      this.hash = data.get("hash");
    });

    this.ds.verifyAccount({hash:this.hash}).subscribe((res:any)=>{
      if(res.status == true){
        localStorage.setItem('email', res.data.email);

        this.verified = 1;
        swal('Congratulations! Your account has been verified',{icon:'success'})

        this.router.navigate(['/login']);
      }else{

         this.verified = 0;
         alert(res.data.err);
         swal(res.data.err,{
           icon:'error'
         })
         this.router.navigate(['/sign-up']);
      }
    }, (err)=>{
      this.verified = 0;

      swal('Unkown Server error',{icon:'error'})
    })



  }

}
