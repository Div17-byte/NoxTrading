import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import swal from 'sweetalert';
import {Admin} from './admin.model';
import { Router } from '@angular/router';
import { User } from './user.model';
import {Posts} from '../posts.model';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AdminService {
users:User[]=[];
posts:Posts[]=[];
private allUserUpdated = new Subject<User[]>();
private allPostUpdated = new Subject<Posts[]>();
private baseUri:string="http://localhost:8000";
//http://localhost:8000
constructor(private http:HttpClient,private router:Router) { }

getAllUserUpdatedListner(){
  return this.allUserUpdated.asObservable();
}

getAllPostUpdatedListner(){
  return this.allPostUpdated.asObservable();
}


  adminLogin(username:string,password:string){
    const adminData:Admin ={admin_name:username,admin_pass:password}
    this.http.post(this.baseUri+"/admin_login",adminData)
    .subscribe(response =>{
      if(response){

        let admin_email = response['doc'];

        sessionStorage.setItem('Admin_email',admin_email);
        console.log(response);

       swal('Login Authorized',{icon:'success'});
      this.router.navigate(['/admin/admin_dashboard']);
      }
    },error=>{
      swal('Invalid Credentials',{icon:'error'});
    })

  }

  adminGetUsers(){
  this.http.get<{res:User[]}>(this.baseUri+"/admin_get_users").subscribe(resp=>{
    this.users=resp.res;
    this.allUserUpdated.next([...this.users]);
  })
  }

adminGetPosts(){
  this.http.get<{res:Posts[]}>(this.baseUri+"/admin_get_posts").subscribe(resp=>{
    this.posts=resp.res;
    this.allPostUpdated.next([...this.posts]);
  })
}

adminBanUser(id:string){
return this.http.get<{doc:User[]}>(this.baseUri+"/admin_banUser/"+id).toPromise();

}

adminUnBanUser(id:string){
return this.http.get(this.baseUri+"/admin_UnbanUser/"+id).toPromise();

}

adminDeleteUser(id:string){
 return this.http.delete(this.baseUri+"/admin_delete_User/"+id);
    // swal('User has been successfully removed',{icon:'success'})

}

adminDeletePost(id:string){
  return this.http.delete(this.baseUri+"/admin_delete_Post/"+id).toPromise();
     // swal('post has been successfully removed',{icon:'success'})

 }


}
