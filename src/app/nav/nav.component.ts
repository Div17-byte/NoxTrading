import { Component,  OnInit,} from '@angular/core';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {

  isLogged:boolean;


  constructor() { }

  ngOnInit(): void {

    this.isLogged=false;

    if(localStorage.getItem("email")){
      this.isLogged=true;
    }

  }
  gotoAbt(){
    const el = document.getElementById('abtt');
    el.scrollIntoView();
  }

}
