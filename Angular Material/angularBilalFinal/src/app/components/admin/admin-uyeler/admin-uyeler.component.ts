import { Sonuc } from './../../../models/Sonuc';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { ApiService } from 'src/app/services/api.service';
import { Uye } from './../../../models/Uye';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { UyelerDialogComponent } from '../../dialogs/uyeler-dialog/uyeler-dialog.component';
import { ConfirmDialogComponent } from '../../dialogs/confirm-dialog/confirm-dialog.component';
import { AlertService } from 'src/app/services/Alert.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-admin-uyeler',
  templateUrl: './admin-uyeler.component.html',
  styleUrls: ['./admin-uyeler.component.css']
})
export class AdminUyelerComponent implements OnInit {

  uyeler:Uye[];
  displayedColumns=['kullanici_adi','email','sifre','ad_soyad','foto','uye_admin','islemler',]
  dataSource:any
  @ViewChild(MatSort) sort:MatSort;
  @ViewChild(MatPaginator) paginator:MatPaginator;
  dialogRef:MatDialogRef<UyelerDialogComponent>
  dialogRefConfirm: MatDialogRef<ConfirmDialogComponent>;


  constructor(
    public apiServis:ApiService,
    public matDialog:MatDialog,
    public alert:AlertService,
    public route:ActivatedRoute
  ) { }

  
  ngOnInit() {
    this.UyeListe();
  
  }

  UyeListe(){
    this.apiServis.UyeListe().subscribe((d:any)=>{
    this.uyeler=d;
    this.dataSource = new MatTableDataSource(this.uyeler);
    this.dataSource.sort=this.sort;
    this.dataSource.paginator=this.paginator;
   

    })
  }

  Ekle(){
    var yenikayit:Uye = new Uye();
    this.dialogRef=this.matDialog.open(UyelerDialogComponent,{
      width:"400px",
      data:{
        kayit: yenikayit,
        islem:'ekle'
      }
    })

    this.dialogRef.afterClosed().subscribe((d:any)=>{
      yenikayit.kullanici_adi=d.kullanici_adi;
      yenikayit.email=d.email;
      yenikayit.sifre=d.sifre;
      yenikayit.ad_soyad=d.ad_soyad;
      yenikayit.foto=d.foto;
      yenikayit.uye_admin=d.uye_admin;
      this.apiServis.UyeEkle(yenikayit).subscribe((s:any)=>{
        this.alert.AlertUygula(s);
        if(s.islem){
          this.UyeListe();
        }

      })
    });
  }
  Duzenle(kayit:Uye){

   
    this.dialogRef=this.matDialog.open(UyelerDialogComponent,{
      width:"400px",
      data:{
        kayit: kayit,
        islem:'Duzenle'
      }
    })
    this.dialogRef.afterClosed().subscribe((d:any)=>{

      kayit.kullanici_adi=d.kullanici_adi;
      kayit.email=d.email;
      kayit.sifre=d.sifre;
      kayit.ad_soyad=d.ad_soyad;
      kayit.foto=d.foto;
      kayit.uye_admin=d.uye_admin;


      this.apiServis.UyeDuzenle(kayit).subscribe((s:any)=>{
        this.alert.AlertUygula(s);

      })
    });
  }
  Detay(){

 }

 Sil(){

 }
  }

