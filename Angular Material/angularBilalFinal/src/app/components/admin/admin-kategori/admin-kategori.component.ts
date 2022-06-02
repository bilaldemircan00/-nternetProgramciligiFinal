import { ConfirmDialogComponent } from './../../dialogs/confirm-dialog/confirm-dialog.component';
import { Sonuc } from './../../../models/Sonuc';
import { AlertService } from './../../../services/Alert.service';
import { KategoriDialogComponent } from './../../dialogs/kategori-dialog/kategori-dialog.component';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Kategori } from 'src/app/models/Kategori';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-admin-kategori',
  templateUrl: './admin-kategori.component.html',
  styleUrls: ['./admin-kategori.component.css']
})
export class AdminKategoriComponent implements OnInit {
  kategoriler : Kategori[];
  dataSource:any;
  displayedColumns=['kategori_adi','KatSoruSay','Detay']
  @ViewChild(MatSort) sort:MatSort;
  @ViewChild(MatPaginator) paginator:MatPaginator;
  dialogRef: MatDialogRef<KategoriDialogComponent>;
  dialogRefConfirm: MatDialogRef<ConfirmDialogComponent>;



  constructor(
    public apiServis: ApiService,
    public matDialog: MatDialog,
    public alert:AlertService
  ) { }

  ngOnInit() {
    this.KategoriListele();
  }

  KategoriListele(){
    this.apiServis.KategoriListe().subscribe((d:any)=>{
    this.kategoriler=d;
    this.dataSource = new MatTableDataSource(d);
    this.dataSource.sort=this.sort;
    this.dataSource.paginator=this.paginator;

    });


  }

  Ekle(){
    var yeniKayit: Kategori= new Kategori();
    this.dialogRef=this.matDialog.open(KategoriDialogComponent,{
      width:'400px',
      data:{
        kayit: yeniKayit,
        islem :'ekle'
      }
    });
    this.dialogRef.afterClosed().subscribe(d=>{
      if(d){
        this.apiServis.KategoriEkle(d).subscribe((s:any)=>{
          this.alert.AlertUygula(s);
          if(s.islem){
            this.KategoriListele(); 
          }

        })
      }
    })
  }
  Duzenle(kayit:Kategori){

    this.dialogRef=this.matDialog.open(KategoriDialogComponent,{
      width:'400px',
      data:{
        kayit: kayit,
        islem :'duzenle'
      }
    });
    this.dialogRef.afterClosed().subscribe(d=>{
      if(d){
        kayit.kategori_adi=d.kategori_adi; 
        this.apiServis.KategoriDuzenle(kayit).subscribe((s:any)=>{
          this.alert.AlertUygula(s);
          if(s.islem){
            this.KategoriListele(); 
          }

        })
      }
    })
}
  Sil(kayit:Kategori){
    this.dialogRefConfirm=this.matDialog.open(ConfirmDialogComponent,{
      width:'400px',
      
    })
    this.dialogRefConfirm.componentInstance.dialogMesaj=kayit.kategori_adi+ " Kategorisi Silinecektir Onaylıyormusunuz ?";
    this.dialogRefConfirm.afterClosed().subscribe(d=>{
      if(d){
        this.apiServis.KategoriSil(kayit.kategori_id).subscribe((s:any)=>{
          this.alert.AlertUygula(s);
          if(s.islem){
            this.KategoriListele(); 

          }

        })
      }
    })
}
}
