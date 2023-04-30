import { Component, OnDestroy, OnInit, Renderer2, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Subscription } from 'rxjs';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { HttpClient, HttpClientModule } from '@angular/common/http';

@Component({
  standalone:true,
  imports:[CommonModule,HttpClientModule,RouterModule],
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
 private scssSubscription: Subscription = new Subscription();
 private htmlSubscription: Subscription = new Subscription();
 private routeSubscription: Subscription = new Subscription();

  route = inject(ActivatedRoute) ;
  renderer = inject(Renderer2) ;
  http = inject(HttpClient) ;

html: string ='';
cssUrl: string = '';
fileName: string = '';

  constructor() {}
  
  ngOnDestroy(): void {
    this.htmlSubscription.unsubscribe();
    this.scssSubscription.unsubscribe();
    this.routeSubscription.unsubscribe();
  }

  ngOnInit() {
   this.routeSubscription = this.route.params.subscribe(params => {
      this.fileName = params['layout'];
      this.htmlSubscription = this.http.get(`/assets/html/${this.fileName}.html`, { responseType: 'text' })
        .subscribe({
        next: html => {
        this.html = html;
        },
        error: err => {
          console.error(`Failed to load layout ${this.fileName}: ${err.message}`);
        },
        complete: () => {
          console.log(`Page with layout ${this.fileName} : ${this.html}`);
        }
      });
        });

    const style = this.renderer.createElement('style');
    style.type = 'text/css';
    this.scssSubscription = this.http.get(`/assets/scss/${this.fileName}.scss`, { responseType: 'text' })
    .subscribe({
      next: scss => {
        style.innerHTML = `${scss}`;
      },
      error: err => {
        console.error(`Failed to load layout ${this.fileName}: ${err.message}`);
      },
      complete: () => {
        console.log(`Page with layout ${this.fileName} : ${style.innerHTML}`);
      }
    });
    this.renderer.appendChild(document.head, style);
  
  }

}
