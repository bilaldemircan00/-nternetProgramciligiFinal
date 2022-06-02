import { AdminUyelerComponent } from './components/admin/admin-uyeler/admin-uyeler.component';
import { KategoriComponent } from './components/kategori/kategori.component';
import { SoruComponent } from './components/soru/soru.component';
import { AuthInterceptor } from './services/AuthInterceptor';
import { AuthGuard } from './services/AuthGuard';


import { AdminCevaplarComponent } from './components/admin/admin-cevaplar/admin-cevaplar.component';
import { AdminSorularComponent } from './components/admin/admin-sorular/admin-sorular.component';
import { AdminKategoriComponent } from './components/admin/admin-kategori/admin-kategori.component';
import { AdminComponent } from './components/admin/admin/admin.component';
import { LoginComponent } from './components/login/login.component';
import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';


const routes: Routes = [
  {
    path:'',
    component: HomeComponent
  },
  {
    path:'login',
    component: LoginComponent
  },
  {
    path:'sorular/:soru_id',
    component: SoruComponent
  },
  {
    path:'cevaplar/:cevap_id',
    component: SoruComponent
  },
  {
    path:'kategori/:kategori_id',
    component: KategoriComponent
  },
  {
    path:'admin',
    component: AdminComponent
    
  },
  {
    path:'admin/kategori',
    component: AdminKategoriComponent,
    
  },
  {
    path:'admin/uyeler',
    component: AdminUyelerComponent,
    
  },
  
  {
    path:'admin/sorular',
    component: AdminSorularComponent,
    
  },
  {
    path:'admin/sorular/:kategori_id',
    component: AdminSorularComponent
  },
  {
    path:'admin/cevaplar',
    component: AdminCevaplarComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
