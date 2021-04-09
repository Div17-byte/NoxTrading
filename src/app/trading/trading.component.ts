import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {DataService} from '../data.service';
import {Posts} from '../posts.model';
@Component({
  selector: 'app-trading',
  templateUrl: './trading.component.html',
  styleUrls: ['./trading.component.css']
})
export class TradingComponent implements OnInit {

  constructor(private router:Router,private postService:DataService) { }

  ngOnInit(): void {
  }

  newPost()
  {
    this.router.navigate(['/addpost']);
  }

}
