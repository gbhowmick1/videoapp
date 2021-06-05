import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { UserService } from '../user.service';
import { VideoService } from '../video.service';

@Component({
  selector: 'app-video',
  templateUrl: './video.component.html',
  styleUrls: ['./video.component.css'],
}) 
export class VideoComponent implements OnInit {
  public videos: any = [];
  public selectedVideo: any = {
    _id: null,
    title: null,
    description: null,
    url: null,
  };
  constructor(
    private videoService: VideoService,
    private toastrService: ToastrService,
    private userService:UserService,
    private router:Router,
  ) {}

  ngOnInit(): void {
    if(this.userService.getToken()!=null){
      this.populate();
    }else{
      this.toastrService.error('Please Login to Continue ...');
      this.router.navigate(['/users']); 
    }
    
  }
  populate() {
    this.videoService.getVideos().subscribe((data) => {
      console.log(data);
      this.videos = data;
    });
  }
  onSubmit(videoData, btn) {
    let title = videoData.value.t1;
    let desc = videoData.value.t2;
    let url = videoData.value.t3;
    if (btn.innerHTML == 'Add') {
    console.log(videoData.value);
      this.videoService.postVideos(title, desc, url).subscribe((data) => {
        console.log(data);
        this.populate();
        //alert(data['message']);
        this.toastrService.success(data['message']);
      });
    } else {
      //Update code
      console.log('update code');
      this.videoService
        .updateVideos(this.selectedVideo._id, title, desc, url)
        .subscribe((data) => {
          // alert(data['message']);
          this.toastrService.info(data['message']);
          this.populate();
        });
    }
    videoData.reset();
  }
  onSelectVideo(video, btn) {
    console.log(video);
    this.selectedVideo = video;
    btn.innerHTML = 'Update';
  }
  onDeleteVideo(videoData:any,_id: any) {
    var r = confirm('Do you want to delete this Record? ');
    if (r) {
      console.log(_id);
      this.videoService.deleteVideos(_id).subscribe((data) => {
        // alert(data['message']);
        this.toastrService.info(data['message']);
        this.populate();
      });
    }
    videoData.reset();
  }
  logout(){
    this.userService.removeToken();
    this.toastrService.info('You have Successfully Logged Out !');
    this.router.navigate(['/users']);
  }
}




