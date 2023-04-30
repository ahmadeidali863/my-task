import { Component, ElementRef, EventEmitter, OnDestroy, OnInit, Output, Renderer2, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginService } from '../services/login.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { DefaultLayoutComponent } from '../default-layout/default-layout.component';
import { CustomLayoutComponent } from '../custom-layout/custom-layout.component';
import { Subscription } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { DomSanitizer } from '@angular/platform-browser';


@Component({
    selector: 'app-login',
    standalone: true,
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss'],
    imports: [CommonModule, FormsModule]
})
export class LoginComponent implements OnInit,OnDestroy {
 
  //layoutComponent = DefaultLayoutComponent;
  
  layoutname: string = '';
  layoutnamebol:  boolean =false ;
  username: string = '';
  showPassword: boolean =false;
  password: string = '';
  errorMessage: string = '';
  
  html: any;
  cssUrl: string = '';
  fileName: string = '';

  private loginService =inject(LoginService) ;
  private route =inject(ActivatedRoute);
  private renderer =inject(Renderer2);
  private http =inject(HttpClient);
  private sanitizer =inject(DomSanitizer);
  private scssSubscription: Subscription = new Subscription();
  private htmlSubscription: Subscription = new Subscription();
  private routeSubscription: Subscription = new Subscription();
 
  
  ngOnDestroy(): void {
    this.htmlSubscription.unsubscribe();
    this.scssSubscription.unsubscribe();
    this.routeSubscription.unsubscribe();
  }

  constructor() {
  }
  
   ngOnInit(){
    
    // this.layoutname = this.route.snapshot.paramMap.get("id") || "";
    // if ( this.layoutname == 'DefaultLayoutComponent' ) {
    //   this.layoutname = '';
    //   this.layoutComponent = DefaultLayoutComponent;
    // }else if(this.layoutname == 'CustomLayoutComponent'){
    //   //this.layoutComponent = CustomLayoutComponent;
    // }

    this.layout();
}

  onSubmit(loginfrm:any): void {

    if (loginfrm.form.valid) {
      if (this.username == '') {
        console.log('username is ' + '  .')
        return;
      }else if(this.password == ''){
        console.log('password is ' + '  .')
      }else{
        if (this.loginService.authenticate(this.username, this.password)) {
          alert('login successfully');
        } else {
          alert('login failed');
        }
      }
  }
  }
  submit(){
    if (this.loginService.authenticate(this.username, this.password)) {
      alert('login successfully');
    } else {
      alert('login failed');
    }
  }


  layout(){
    this.routeSubscription = this.route.params.subscribe(params => {
      this.fileName = params['layout'];
      if ( this.fileName == '' || this.fileName == undefined ) {
        this.layoutnamebol = false;
      }else{
        this.loadhtmlfile();
        this.layoutnamebol = true;
      }
    
        });
    
  }


  loadhtmlfile(){
    this.htmlSubscription = this.http.get(`/assets/html/${this.fileName}.html`, { responseType: 'text' })
    .subscribe({
    next: html => {
    this.html = this.sanitizer.bypassSecurityTrustHtml(html);
    this.loadscssfile();
    },
    error: err => {
      console.error(`Failed to load layout ${this.fileName}: ${err.message}`);
    },
    complete: () => {
      console.log(`Page with layout ${this.fileName} : ${this.html}`);
    }
  });
  }
  loadscssfile(){
  
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