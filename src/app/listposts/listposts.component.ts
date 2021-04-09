import { Component, OnInit } from '@angular/core';
import {Router,NavigationEnd} from '@angular/router';
import {DataService} from '../data.service';
import {Posts} from '../posts.model';

@Component({
  selector: 'app-listposts',
  templateUrl: './listposts.component.html',
  styleUrls: ['./listposts.component.css']
})
export class ListpostsComponent implements OnInit {
 interval;
 searchText;
 gameFilter;
 totalPost;
 userimg;
 username=localStorage.getItem('firstname');
  public posts:Posts[]
  constructor(private _dataService:DataService,private router :Router) {}

  ngOnInit(): void {
    this.readPosts();
    this.interval = setInterval(()=>{
      this.readPosts()
    },30000);



  }

  ngOnDestroy(){
    if(this.interval)
    {
      clearInterval(this.interval);
    }
    
  }


  readPosts(){
    this._dataService.readPosts().subscribe(
      data=>{


        this.posts=data['msg'];
        this.totalPost= Object.keys(this.posts).length;
        console.log(this.posts);


      },
      error=>{
        console.log(error);
      }

    )
  }

}
