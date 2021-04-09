import { Component, OnInit } from '@angular/core';
import { NgForm} from '@angular/forms';
import { AdminService } from '../admin.service';
@Component({
  selector: 'app-admin-login',
  templateUrl: './admin-login.component.html',
  styleUrls: ['./admin-login.component.css']
})
export class AdminLoginComponent implements OnInit {

  constructor(private adminService:AdminService) { }

  ngOnInit(): void {
    this.removechatBot();
  }
  removechatBot(){
    const sc = document.getElementById('chatbot');
    if(sc)
    sc.remove();
  }



  onLogin(form:NgForm){

    if(form.invalid){return}
    this.adminService.adminLogin(form.value.username,form.value.password);

  }

}


