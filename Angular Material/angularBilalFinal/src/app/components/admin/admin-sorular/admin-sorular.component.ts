import { ActivatedRoute, Router } from '@angular/router';
import { Kategori } from './../../../models/Kategori';
import { Sorular } from './../../../models/Sorular';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialogRef, MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { AlertService } from 'src/app/services/Alert.service';
import { ApiService } from 'src/app/services/api.service';
import { ConfirmDialogComponent } from '../../dialogs/confirm-dialog/confirm-dialog.component';
import { KategoriDialogComponent } from '../../dialogs/kategori-dialog/kategori-dialog.component';
import { SorularDialogComponent } from '../../dialogs/sorular-dialog/sorular-dialog.component';

@Component({
  selector: 'app-admin-sorular',
  templateUrl: './admin-sorular.component.html',
  styleUrls: ['./admin-sorular.component.css']
})
export class AdminSorularComponent implements OnInit {
  sorular : Sorular[];
  kategoriler: Kategori[];
  kat_id:number;
  uye_id:number;
  secKat:Kategori;
  dataSource:any;
  displayedColumns=['soru_baslik','soru_tarih','uye_kullanici_adi','kategori_adi','Detay']
  @ViewChild(MatSort) sort:MatSort;
  @ViewChild(MatPaginator) paginator:MatPaginator;
  dialogRef: MatDialogRef<SorularDialogComponent>;
  dialogRefConfirm: MatDialogRef<ConfirmDialogComponent>;



  constructor(
    public apiServis: ApiService,
    public matDialog: MatDialog,
    public alert:AlertService,
    public route:ActivatedRoute
  ) { }

  ngOnInit() {
    this.KategoriListe();
    this.uye_id=parseInt(localStorage.getItem("uid"));
    this.route.params.subscribe((p:any)=>{
      if(p.kat_id){
       this.KategoriById()
        this.kat_id=p.kategori_id;
        this.SoruListele();
      }
      
    })
  }

  KategoriById(){
    
    this.apiServis.KategoriById(this.kat_id).subscribe((d:any)=>{
      this.secKat=d;
      this.SoruListele();
    })
  }

  SoruListele(){
    this.apiServis.SoruListeByKatId(this.kat_id).subscribe((d:any)=>{
    this.sorular=d;
    this.dataSource = new MatTableDataSource(d);
    this.dataSource.sort=this.sort;
    this.dataSource.paginator=this.paginator;

    });
    


  }
  KategoriListe(){
    this.apiServis.KategoriListe().subscribe((d:any)=>{
      this.kategoriler=d;
    })
  }

  KategoriSec(kat:Kategori){
    this.kat_id=kat.kategori_id;
    this.SoruListele();
  }
  Ekle(){
    var yeniKayit: Sorular= new Sorular();
    this.dialogRef=this.matDialog.open(SorularDialogComponent,{
      width:'400px',
      data:{
        kayit: yeniKayit,
        islem :'ekle'
      }
    });
    this.dialogRef.afterClosed().subscribe(d=>{
      if(d){

        yeniKayit=d;
        yeniKayit.foto="foto.jpg"
        yeniKayit.soru_tarih=new Date();
        yeniKayit.uye_id=this.uye_id;

       this.apiServis.SoruEkle(yeniKayit).subscribe((s:any)=>{
          this.alert.AlertUygula(s);
          if(s.islem){
            this.SoruListele(); 
          }

        })
      }
    })
  }
  Duzenle(kayit:Sorular){

    this.dialogRef=this.matDialog.open(SorularDialogComponent,{
      width:'400px',
      data:{
        kayit: kayit,
        islem :'duzenle'
      }
    });
    this.dialogRef.afterClosed().subscribe((d:any)=>{
      if(d){
        
        this.apiServis.SoruDuzenle(kayit).subscribe((s:any)=>{
          this.alert.AlertUygula(s);
          if(s.islem){
            this.SoruListele(); 
          }

        })
      }
    })
}
Detay(kayit:Sorular){

  this.dialogRef=this.matDialog.open(SorularDialogComponent,{
    width:'400px',
    data:{
      kayit: kayit,
      islem :'Detay'
    }
  });
  
}
  Sil(kayit:Sorular){
    this.dialogRefConfirm=this.matDialog.open(ConfirmDialogComponent,{
      width:'400px',
      
    })
    this.dialogRefConfirm.componentInstance.dialogMesaj=kayit.soru_baslik+ " Sorusu Silinecektir Onaylıyormusunuz ?";
    this.dialogRefConfirm.afterClosed().subscribe(d=>{
      if(d){
        this.apiServis.SoruSil(kayit.soru_id).subscribe((s:any)=>{
          this.alert.AlertUygula(s);
          if(s.islem){
            this.SoruListele(); 

          }

        })
      }
    })
}
}
