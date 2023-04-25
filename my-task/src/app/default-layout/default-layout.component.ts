import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from '../login/login.component';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-default-layout',
  standalone: true,
  imports: [CommonModule,FormsModule],
  templateUrl: './default-layout.component.html',
  styleUrls: ['./default-layout.component.scss']
})
export class DefaultLayoutComponent {

}
