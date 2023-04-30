import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DefaultLayoutComponent } from './default-layout/default-layout.component';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: '/login'
  },
  {
    path: 'login',
    loadComponent: () => import('./login/login.component').then(m => m.LoginComponent),
  }
  ,
  {
    path: 'login/:layout',
    loadComponent: () => import('./login/login.component').then(m => m.LoginComponent),
  }
  // {
  //      path: '',
  //      pathMatch: 'full',
  //      redirectTo: '/page'
  //    },
  // {
  //   path: 'page',
  //   loadComponent: () => import('./default-layout/default-layout.component').then(m => m.DefaultLayoutComponent),
  // },
  // {
  //   path: 'page/:layout',
  //   loadComponent: () => import('./default-layout/default-layout.component').then(m => m.DefaultLayoutComponent),
  // }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
