import { Component, ElementRef, OnDestroy, OnInit, Renderer2, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Subscription } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { LayoutService } from '../services/layout.service';
import { HttpClient, HttpClientModule } from '@angular/common/http';

@Component({
  standalone:true,
  imports:[CommonModule,HttpClientModule],
  selector: 'app-default-layout',
  templateUrl: './default-layout.component.html',
  styleUrls: ['./default-layout.component.scss']
})
export class DefaultLayoutComponent implements OnInit, OnDestroy {

//   pageTitle: string = '';
//   layoutHtml: string = '';
//   layoutSubscription: Subscription | undefined;
//  private layoutService =inject(LayoutService) ;
//   private route =inject(ActivatedRoute);
//   constructor(
//   ) { }

//   ngOnInit() {
//     const layoutName = this.route.snapshot.paramMap.get('layout');
//     if (layoutName != null){
//       this.layoutSubscription = this.layoutService.loadLayout(layoutName).subscribe({
//         next: html => {
//           this.layoutHtml = html;
//         },
//         error: err => {
//           console.error(`Failed to load layout ${layoutName}: ${err.message}`);
//         },
//         complete: () => {
//           this.pageTitle = `Page with layout "${layoutName}"`;
//         }
//       });
//     }else{
//       console.error('layoutName = null')
//     }
    
//   }

 // ngOnDestroy() {
//     if (this.layoutSubscription) {
//       this.layoutSubscription.unsubscribe();
//     }
 // }
  ngOnDestroy() {
    this.removeCssLink();
  }
html: string ='';
cssUrl: string = '';
fileName: string = '';
  constructor(
    private route: ActivatedRoute,
    private elRef: ElementRef,
    private renderer: Renderer2,
     private http: HttpClient) {}

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.fileName = params['layout'];
      this.http.get(`/assets/html/${this.fileName}.html`, { responseType: 'text' })
        .subscribe(html => {
          this.html = html;
          this.addCssLink();
        });
    });
  }

  private addCssLink() {
    this.cssUrl = `/assets/scss/${this.fileName}.scss`;
    const link = this.renderer.createElement('link');
    this.renderer.setAttribute(link, 'rel', 'stylesheet');
    this.renderer.setAttribute(link, 'type', 'text/css');
    this.renderer.setAttribute(link, 'href', this.cssUrl);
    this.renderer.appendChild(this.elRef.nativeElement.ownerDocument.head, link);
  }

  private removeCssLink() {
    const link = this.elRef.nativeElement.ownerDocument.head.querySelector(`link[href="${this.cssUrl}"]`);
    if (link) {
      this.renderer.removeChild(this.elRef.nativeElement.ownerDocument.head, link);
    }
  }
}
