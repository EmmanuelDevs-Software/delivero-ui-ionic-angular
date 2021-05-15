import { Directive, HostListener, Input, Renderer2 } from '@angular/core';
import { DomController, isPlatform } from '@ionic/angular';

@Directive({
  selector: '[appHideHeader]'
})
export class HideHeaderDirective {
  @Input('appHideHeader') header: any;
  private headerHeight = isPlatform('ios') ? 44 : 56;
  private children: any;

  constructor(
    private render: Renderer2,
    private domCtrl: DomController
  ) { }

  ngAfterViewInit(): void {
    //Called after ngAfterContentInit when the component's view has been initialized. Applies to components only.
    //Add 'implements AfterViewInit' to the class.
    this.header = this.header.el;
    this.children = this.header.children;
    console.log(this.children);
    
  }


  @HostListener('ionScroll', ['$event']) onContentScroll($event: any) {
    const scrollTop: number = $event.detail.scrollTop;
    let newPosition = -scrollTop;

    if (newPosition < -this.headerHeight) {
      newPosition = -this.headerHeight
    }

    let newOpacity = 1 - (newPosition / -this.headerHeight);

    this.domCtrl.write(() => {
      this.render.setStyle(this.header, 'top', newPosition + 'px');
      for (let c of this.children) {
        this.render.setStyle(c, 'opacity', newOpacity)
      }
    })
  }

}
