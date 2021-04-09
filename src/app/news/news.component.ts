import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-news',
  templateUrl: './news.component.html',
  styleUrls: ['./news.component.css']
})
export class NewsComponent implements OnInit {
  news;
  isLoading=false;

  constructor(private http:HttpClient) { }

  ngOnInit(): void {

    this.isLoading=true;
    this.http.get("http://newsapi.org/v2/everything?q=videogames&language=en&sortBy=publishedAt&apiKey=33d50ad3bd4f413aaf410801dd34ce0e").subscribe(res=>{
      this.news=res['articles'];
      console.log(this.news);
      this.isLoading=false;
    });

  }

}
