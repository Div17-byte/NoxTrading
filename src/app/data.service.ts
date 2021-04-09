import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';


import {Posts} from './posts.model';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  private picSource = new BehaviorSubject("");
  currPic = this.picSource.asObservable();

  private isAuthenticated=false;
  posts:Posts;
  proPic;
  showposts:Posts[];
  private baseUri:string="http://localhost:8000";

  //http://localhost:8000
  authStatusListener= new Subject<boolean>();

  details;
  constructor(private httpclient: HttpClient,private router:Router) { }

  changePic(message:string){
    this.picSource.next(message)
  }
  getAuthStatusListener(){
    return this.authStatusListener.asObservable();
  }
  getIsAuth(){
    return this.isAuthenticated;
  }
  setisAuth(val:boolean){
    this.isAuthenticated = val;
  }
  addPosts(pst:Posts)
  {
    return this.httpclient.post(this.baseUri+'/addpost',pst)
  }

  readPosts()
  {
    return this.httpclient.get(this.baseUri+'/read');
  }

  readUserPosts(data)
  {
    return this.httpclient.post(this.baseUri+'/readUser',data);
  }


  updatePosts(pst:Posts)
  {
    return this.httpclient.put(this.baseUri+'/update',pst)
  }

  deletePosts(id:string){
    return this.httpclient.delete(this.baseUri+'/delete/'+id);
  }

  upDatePic(){

     const data =this.httpclient.get(this.baseUri+'/profile-picture/' + localStorage.getItem('email')).toPromise();
     return data;


  }






  filldetails(data){
    //takes the data from login and fills it in details object , this can be used through out the execution.
    this.details = {};
    this.details.FullName = data.FullName;
    this.details.email = data.email;
    this.details.password = data.password;

  }


  detailsFiller(){
    //if details in ds is already filled that is the user has come to the proflepage after login then just get the details to be printed on the profile page
    if(this.details != undefined)
    {

      return this.details;

    }
    else{
      //if details in ds is not filled already that is the user has not come directly from login page then get the email from local storage and get the details from database and save it in details
       if(localStorage.getItem('email')){
         this.httpclient.get(this.baseUri+'/get-details/'+localStorage.getItem('email')).subscribe((resp:any)=>{
           if(resp.status == "200")
           {
             this.filldetails(resp.data);


             return this.details;
           }
         });
       }
    }
  }

  logout(){
    localStorage.removeItem('email');
    this.isAuthenticated=false;
  }
  checkban(email:string){
    const data = this.httpclient.get(this.baseUri+"/Check_ban_status/"+email).toPromise();
    return data;
  }


  login(data):any{
    this.isAuthenticated=true;
    return this.httpclient.post(this.baseUri+'/login', data);
  }

  signup(data):any{
    return this.httpclient.post(this.baseUri+'/sign-up', data);
  }

  verifyAccount(data){
    return this.httpclient.post(this.baseUri+"/verify-account",data);
  }



  authenticationCheck():Boolean{
    if(localStorage.getItem('email')){
      return true;
    }
    else{
      return false;
    }
  }




}
