import { Component, OnInit } from '@angular/core';
import {DataService} from '../data.service';
import {Posts} from '../posts.model';
import { NgForm } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import swal from 'sweetalert';





declare var M: any;
@Component({
  selector: 'app-addpost',
  templateUrl: './addpost.component.html',
  styleUrls: ['./addpost.component.css'],
  providers: [DataService]
})

export class AddpostComponent implements OnInit {
  postModel = new Posts
  posts : Posts[];
  isPosted =false;
  currentUser;
  username=localStorage.getItem('firstname');
  steamLink=localStorage.getItem('steamLink');
  userEmail=localStorage.getItem('email');
  baseUri:string="http://localhost:8000"






  constructor(public postService: DataService,private http:HttpClient) { }

  ngOnInit(): void {
  this.getUser();
  this.readUserPosts();
  // swal("you liked it",{ buttons:{cancel:true,confirm:true},icon:'warning' })



  }

  getUser(){
    this.http.get(this.baseUri+"/getOneUser/"+localStorage.getItem("email")).subscribe(curUser=>{
      this.currentUser = curUser["gotUser"];
      console.log(this.currentUser.userImgPath+'this is img path');

    })

  }

  readUserPosts(){
    this.postService.readUserPosts({email:this.userEmail}).subscribe(
      data=>{
        this.posts=data['msg'];

      },
      error=>{
        console.log(error);
      }

    )
  }

  doDelete(p){

    swal({
      title: "Are you sure?",
      text: "Once deleted, you will not be able to recover this!",
      icon: "warning",
      buttons: [true,'Delete'],
      dangerMode: true,
    })
    .then((willDelete) => {
      if (willDelete) {

    this.postService.deletePosts(p._id).subscribe(
      data=>{
        this.readUserPosts();
      },error=>{

      }
    )
        swal("Poof! Your imaginary file has been deleted!", {
          icon: "success",
        });
      }
    });



  }

onSubmit(form: NgForm)
{

  if(form.value._id == ""){
    this.postModel.username=this.username;
    this.postModel.buyLink=this.steamLink;
    this.postModel.userEmail=this.userEmail;
    this.postModel.userImg=this.currentUser.userImgPath;
    this.postModel.userJoinDate= this.currentUser.joinDate;
    this.postService.addPosts(this.postModel).subscribe((res)=>{

     this.isPosted= true;
     this.readUserPosts();


    //
   });
  }
  this.readUserPosts();

}

}
