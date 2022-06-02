import { CevaplarDialogComponent } from './components/dialogs/cevaplar-dialog/cevaplar-dialog.component';
import { UyelerDialogComponent } from './components/dialogs/uyeler-dialog/uyeler-dialog.component';
import { AdminUyelerComponent } from './components/admin/admin-uyeler/admin-uyeler.component';
import { KategoriComponent } from './components/kategori/kategori.component';
import { SoruComponent } from './components/soru/soru.component';
import { AuthInterceptor } from './services/AuthInterceptor';
import { SafeHtmlPipe } from './../pipes/safeHtml-pipe.pipe';
import { Sorular } from './models/Sorular';
import { SorularDialogComponent } from './components/dialogs/sorular-dialog/sorular-dialog.component';
import { KategoriDialogComponent } from './components/dialogs/kategori-dialog/kategori-dialog.component';
import { AdminCevaplarComponent } from './components/admin/admin-cevaplar/admin-cevaplar.component';

import { AdminSorularComponent } from './components/admin/admin-sorular/admin-sorular.component';
import { AdminKategoriComponent } from './components/admin/admin-kategori/admin-kategori.component';
import { AdminComponent } from './components/admin/admin/admin.component';
import { LoginComponent } from './components/login/login.component';
import { MainNavComponent } from './components/main-nav/main-nav.component';
import { ConfirmDialogComponent } from './components/dialogs/confirm-dialog/confirm-dialog.component';
import { AlertService } from './services/Alert.service';
import { AlertDialogComponent } from './components/dialogs/alert-dialog/alert-dialog.component';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HomeComponent } from './components/home/home.component';
import { MaterialModule } from './material.module';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { ApiService } from './services/api.service';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LoginComponent,
    SoruComponent,
    KategoriComponent,
    //dialoglar
    AlertDialogComponent,
    ConfirmDialogComponent,
     MainNavComponent,
     KategoriDialogComponent,
     SorularDialogComponent,
     UyelerDialogComponent,
     CevaplarDialogComponent,
     

     
     //admin
     AdminComponent,
     AdminSorularComponent,
     AdminKategoriComponent,
     AdminCevaplarComponent,
     AdminSorularComponent,
     AdminUyelerComponent,
    
     SafeHtmlPipe,
   
   
    
     
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    HttpClientModule,
    ReactiveFormsModule,
    
    
  ],
  entryComponents:[
    AlertDialogComponent,
    ConfirmDialogComponent,
    KategoriDialogComponent,
    SorularDialogComponent,
    UyelerDialogComponent,
    CevaplarDialogComponent
    
    
  ],
  providers: [AlertService,ApiService,SafeHtmlPipe,
  
    {provide: HTTP_INTERCEPTORS, useClass:AuthInterceptor, multi:true}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
