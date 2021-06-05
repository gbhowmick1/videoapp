import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class VideoService {
  // private _url:String = 'https://video-api.glitch.me';
  // private _url:String = 'http://localhost:3000';
  private _url:String = '';//for heroku deploy
  constructor(private http:HttpClient) { }

  getVideos(){
    let token = localStorage.getItem("token");
    return this.http.get(`${this._url}/api/videos?token=${token}`);
  }
  //adding a function to add a video
  postVideos(title:string,desc:string,url:string){
    return this.http.post(`${this._url}/api/video`,{'title':title, 'description':desc, 'url':url})
  }
  //deleteVideos
  deleteVideos(id:any){
    return this.http.delete(`${this._url}/api/video/${id}`);
  }
  //Update videos
  updateVideos(id:any,title:string, description:string,url:string){
    return this.http.patch(`${this._url}/api/video/${id}`,{'title':title,'description':description,'url':url})
  }
}
