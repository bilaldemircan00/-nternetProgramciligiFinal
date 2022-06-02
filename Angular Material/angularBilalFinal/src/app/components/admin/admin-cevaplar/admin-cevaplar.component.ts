import { Cevaplar } from './../../../models/Cevaplar';
import { Component, OnInit, ViewChild } from '@angular/core';
import { CevaplarDialogComponent } from '../../dialogs/cevaplar-dialog/cevaplar-dialog.component';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { Kategori } from 'src/app/models/Kategori';
import { ConfirmDialogComponent } from '../../dialogs/confirm-dialog/confirm-dialog.component';
import { ActivatedRoute } from '@angular/router';
import { AlertService } from 'src/app/services/Alert.service';
import { ApiService } from 'src/app/services/api.service';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-admin-cevaplar',
  templateUrl: './admin-cevaplar.component.html',
  styleUrls: ['./admin-cevaplar.component.css']
})
export class AdminCevaplarComponent implements OnInit {

  cevaplar : Cevaplar[];
  kategoriler: Kategori[];
  kat_id:number;
  uye_id:number;
  secKat:Kategori;
  dataSource:any;
  displayedColumns=['cevap_icerik','uye_id','soru_id','KullaniciAdi','SoruBaslik','tarih','Detay']
  @ViewChild(MatSort) sort:MatSort;
  @ViewChild(MatPaginator) paginator:MatPaginator;
  dialogRef: MatDialogRef<CevaplarDialogComponent>;
  dialogRefConfirm: MatDialogRef<ConfirmDialogComponent>;

  constructor(
    public apiServis: ApiService,
    public matDialog: MatDialog,
    public alert:AlertService,
    public route:ActivatedRoute
  ) { }

  ngOnInit() {
    this.CevapListele();
  }
 

  CevapListele(){
    this.apiServis.CevapListe().subscribe((d:any)=>{
    this.cevaplar=d;
    this.dataSource = new MatTableDataSource(d);
    this.dataSource.sort=this.sort;
    this.dataSource.paginator=this.paginator;
      console.log(d);
    });
    


  }
  
 
  Ekle(){
    var yeniKayit: Cevaplar= new Cevaplar();
    this.dialogRef=this.matDialog.open(CevaplarDialogComponent,{
      width:'400px',
      data:{
        kayit: yeniKayit,
        islem :'ekle'
      }
    });
    this.dialogRef.afterClosed().subscribe(d=>{
      if(d){

        yeniKayit=d;
       

        yeniKayit.tarih=new Date();
        

       this.apiServis.CevapEkle(yeniKayit).subscribe((s:any)=>{
          this.alert.AlertUygula(s);
          if(s.islem){
            this.CevapListele(); 
          }

        })
      }
    })
  }
  Duzenle(kayit:Cevaplar){

    this.dialogRef=this.matDialog.open(CevaplarDialogComponent,{
      width:'400px',
      data:{
        kayit: kayit,
        islem :'duzenle'
      }
    });
    this.dialogRef.afterClosed().subscribe((d:any)=>{
      if(d){
        
        this.apiServis.CevapDuzenle(kayit).subscribe((s:any)=>{
          this.alert.AlertUygula(s);
          if(s.islem){
            this.CevapListele(); 
          }

        })
      }
    })
}
Detay(kayit:Cevaplar){

  this.dialogRef=this.matDialog.open(CevaplarDialogComponent,{
    width:'400px',
    data:{
      kayit: kayit,
      islem :'Detay'
    }
  });
  
}
  Sil(kayit:Cevaplar){
    this.dialogRefConfirm=this.matDialog.open(ConfirmDialogComponent,{
      width:'400px',
      
    })
    this.dialogRefConfirm.componentInstance.dialogMesaj=kayit.cevap_icerik+ " Cevabı Silinecektir Onaylıyormusunuz ?";
    this.dialogRefConfirm.afterClosed().subscribe(d=>{
      if(d){
        this.apiServis.SoruSil(kayit.cevap_id).subscribe((s:any)=>{
          this.alert.AlertUygula(s);
          if(s.islem){
            this.CevapListele(); 

          }

        })
      }
    })
}

}
