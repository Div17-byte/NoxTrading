import { HttpClient } from '@angular/common/http';
import { ChangeDetectorRef, Component, Input, OnInit, Output} from '@angular/core';
import { Router } from '@angular/router';
import { EventEmitter } from 'events';
import { Subscription } from 'rxjs';
import swal from 'sweetalert';
import { DataService } from '../data.service';

@Component({
  selector: 'app-market',
  templateUrl: './market.component.html',
  styleUrls: ['./market.component.css']
})
export class MarketComponent implements OnInit {



  username;
  proPic: string;
  isLoading=false;
  baseUri:string = "http://localhost:8000"

  private authStatusSub: Subscription;

  constructor(private route:Router,private ds:DataService,private Httpc:HttpClient) { }

   ngOnInit():void  {
     this.isLoading=true;
     this.updatePic();
     this.isLoading=false;

    this.username=localStorage.getItem("firstname");

    this.ds.currPic.subscribe(message=> this.proPic = message,error=>console.log(error));

  }
  cmsoon(){
    swal('Feature Coming Soon!',{
      icon:'info'
    })
  }



  setPic(){
    console.log(sessionStorage.getItem('proPic'));
    this.proPic = sessionStorage.getItem('proPic');

  }


 async updatePic(){

    await this.ds.upDatePic().then((data)=>{
      console.log(data);
      this.proPic = this.baseUri+"/" + data['proPic_src'];


    })
  }


  logout(){


    swal("Are you sure you want to do Logout?", {
      buttons: ["Oh noez!",'Yes'],
      icon:'warning',
      dangerMode:true
    }

    ).then((logOut)=>{
if(logOut){
  this.ds.logout();
  this.route.navigate(['']);
}

    });

  }
}


