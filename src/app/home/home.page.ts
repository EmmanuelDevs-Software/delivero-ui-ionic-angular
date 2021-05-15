import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {


  public categories = [];
  public highlights = [];
  public featured = [];
  public showLocationDetail = false;


  public catSlideOpts = {
    freeMode: true,
    slidesPerView: 3.5,
    slidesOffsetBefore: 11,
    spaceBetween: 10
  };


  public highlightOptions = {
    freeMode: true,
    slidesPerView: 1.05,
    centeredSlides: true,
    spaceBetween: 10,
    loop: true
  }

  public featuredSlideOpts = {
    freeMode: true,
    slidesPerView: 1.2,
    centeredSlides: true,
    spaceBetween: 10,
  }
  constructor(private http: HttpClient) { }



  ngOnInit() {
    this.http.get('https://devdactic.fra1.digitaloceanspaces.com/foodui/home.json')
      .subscribe((res: any) => {
        console.log(res);
        this.categories = res.categories;
        this.highlights = res.highlights;
        this.featured = res.featured;
      })
  }

  doRefresh(ev) {
    setTimeout(() => {      
      ev.target.complete();
    }, 2000)
  }


  onScroll(ev){
    const offset = ev.detail.scrollTop;    
    this.showLocationDetail = offset >50;
  }

}