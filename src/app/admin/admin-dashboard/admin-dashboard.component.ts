import { Component, OnInit } from '@angular/core';
import { Posts } from 'src/app/posts.model';
import { AdminService } from '../admin.service';
import {User} from '../user.model';
import swal from 'sweetalert';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.css']
})
export class AdminDashboardComponent implements OnInit {

  filterUser:string;
  filterImage:string;
  totalUsers;
  totalPosts;
  posts:Posts[]=[];
  users:User[]=[];

  constructor(private adminService:AdminService,private router:Router) { }

  ngOnInit(): void {
    this.getAllUsers();
    this.getAllPosts();
    this.removechatBot();

    if(!sessionStorage.getItem('Admin_email')){
      this.router.navigate(['/admin/admin_login'])
      swal('Authorization Error',{
        icon:'error',
        dangerMode:true
      })
    }
  }
  removechatBot(){
    const sc = document.getElementById('chatbot');
    if(sc)
    sc.remove();
  }

  getAllUsers(){
    this.adminService.adminGetUsers()
    this.adminService.getAllUserUpdatedListner().subscribe(user=>{
      this.users=user;
      console.log(this.users);

      this.totalUsers = this.users.length;


    })
  }

  getAllPosts(){
    this.adminService.adminGetPosts();
    this.adminService.getAllPostUpdatedListner().subscribe(post=>{
      this.posts=post;
      this.totalPosts= this.posts.length;
      console.log(this.posts);

    })
  }


  adminLogout(){
    swal("Are you sure?", {
      dangerMode: true,
      buttons: [true,true],
      icon:'info'
    }).then((log)=>{
      if(log){
        sessionStorage.removeItem('Admin_email');
        this.router.navigate(['/admin/admin_login'])
      }
    });


  }

  DeletePost(id:string){
    swal('Are you sure?',{
      dangerMode:true,
      buttons:[true,true],
      icon:'error'
    }).then((confirm)=>{
      if(confirm){

        this.adminService.adminDeletePost(id).then(res=>{
          if(res){
            swal('Post deleted successfully',{icon:'success'});
            this.getAllPosts();
          }
        })
      }
    })
  }

  banUser(id:string){

    this.adminService.adminBanUser(id).then(res=>{
      if(res){
      }
    }).then(()=>{
      this.getAllUsers();
    })
  }

  UnbanUser(id:string){
    this.adminService.adminUnBanUser(id).then(res=>{
      if(res){

      }
  }).then(()=>{
    this.getAllUsers();
  })

  }

  DeleteUser(id:string){

      this.adminService.adminDeleteUser(id).subscribe(res=>{
      if(!res){ swal('User could not be removed',{icon:'error'}) }
      else{
        swal({
          title: "Are you sure!",
          icon: "info",
          buttons: [true,true],
          dangerMode: true,
        })
        .then((willDelete) => {
          if (willDelete) {
            swal('User has been deleted',{icon:'success'})
            this.getAllUsers();
          }
        });
      }
   })
  }
}
