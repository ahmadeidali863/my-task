import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginService } from '../services/login.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { DefaultLayoutComponent } from '../default-layout/default-layout.component';
import { CustomLayoutComponent } from '../custom-layout/custom-layout.component';


@Component({
    selector: 'app-login',
    standalone: true,
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss'],
    imports: [CommonModule, FormsModule]
})
export class LoginComponent implements OnInit {
  layoutComponent = DefaultLayoutComponent;
  
  layoutname: any ;
  username: string = '';
  showPassword: boolean =false;
  password: string = '';
  errorMessage: string = '';
  private loginService =inject(LoginService) ;
  private activatedRoute =inject(ActivatedRoute);
  constructor() {
  }
  
   ngOnInit(){
    this.layoutname = this.activatedRoute.snapshot.paramMap.get("id") || "";
    if ( this.layoutname == 'DefaultLayoutComponent' ) {
      this.layoutname = '';
      this.layoutComponent = DefaultLayoutComponent;
    }else if(this.layoutname == 'CustomLayoutComponent'){
      //this.layoutComponent = CustomLayoutComponent;
    }
    
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
}