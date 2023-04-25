import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginService } from '../services/login.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-custom-layout',
  standalone: true,
  imports: [CommonModule,FormsModule],
  templateUrl: './custom-layout.component.html',
  styleUrls: ['./custom-layout.component.scss']
})
export class CustomLayoutComponent   {
  username: string = '';
  password: string = '';
  private loginService =inject(LoginService) ;
   submit(){
    if (this.loginService.authenticate(this.username, this.password)) {
      alert('login successfully');
    } else {
      alert('login failed');
    }
  }
}
