import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';
import { HttpClient } from '@angular/common/http';
import swal from 'sweetalert';
import {MarketComponent} from '../market/market.component';



@Component({
  providers:[MarketComponent],
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  FullName;
  email;
  password;
  steamlink;
  SelectedProPic;
  proPic_src;
  try;
  baseUri:string="http://localhost:8000";





  constructor(private Mar:MarketComponent,private ds : DataService, private Httpc: HttpClient) { }

  ngOnInit(): void {




    //get the profile pic address saved in the server
     this.Httpc.get(this.baseUri+'/profile-picture/' + localStorage.getItem('email')).subscribe((res:any)=>{
       if(res.success == true){
         this.proPic_src = this.baseUri+"/" + res.proPic_src;

         localStorage.setItem("proPic" ,this.proPic_src);

       }else{
        this.proPic_src = "../../assets/img/default.png";

       }
     });

      if(localStorage.getItem('email')){
        this.Httpc.get(this.baseUri+'/get-details/'+localStorage.getItem('email')).subscribe((resp:any)=>{
          if(resp.status == "200")
          {
            this.ds.filldetails(resp.data);
            this.FullName = resp.data.FullName;
            this.email = resp.data.email;
            this.password = resp.data.password;
            this.steamlink= resp.data.steamLink;



          }
        });
      }
  // }

  }


  fileSelectAndUpload(event: Event)
  {

    const file = (event.target as HTMLInputElement).files[0];
    console.log(file);
    var fd = new FormData();
     fd.append("profilePic", file, localStorage.getItem('email'));

       this.Httpc.post(this.baseUri+"/upload-profile-picture/"+ localStorage.getItem('email'),fd).subscribe((res:any)=>{
       this.proPic_src = res.proPic_src;
       sessionStorage.setItem('proPic',res.proPic_src);
       localStorage.setItem('proPic',res.proPic_src);
       this.ds.changePic(res.proPic_src);
     });

  }


  savedetails(){

    var data = {firstName:this.FullName,password:this.password};
    this.Httpc.post(this.baseUri+"/save-details/"+ localStorage.getItem('email'),data).subscribe((res:any)=>{


       swal('Details Have been updated',{icon:'success'});
       localStorage.setItem("firstname",this.FullName);

    });
  }

  cancelChanges(){

     this.FullName = this.ds.details.FullName;
     this.email = this.ds.details.email;
     this.password = this.ds.details.password;

  }

}
