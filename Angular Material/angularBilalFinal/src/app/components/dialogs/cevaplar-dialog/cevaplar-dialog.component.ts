import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Cevaplar } from 'src/app/models/Cevaplar';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-cevaplar-dialog',
  templateUrl: './cevaplar-dialog.component.html',
  styleUrls: ['./cevaplar-dialog.component.css']
})
export class CevaplarDialogComponent implements OnInit {

  dialogBaslik:string;
  yeniKayit:Cevaplar;
  islem:string;
  frm:FormGroup;



  constructor(
    public apiServis:ApiService,
    public matDialog:MatDialog,
    public frmBuild:FormBuilder,
    public dialogRef:MatDialogRef<CevaplarDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any

  ) {
    this.islem=data.islem;
    if(this.islem=="ekle"){
      this.dialogBaslik="Cevap Ekle"
      this.yeniKayit=new Cevaplar();
    }
    if(this.islem=="duzenle"){
      this.dialogBaslik="Cevap Düzenle"
      this.yeniKayit=data.kayit;
    }
    if(this.islem=="Detay"){
      this.dialogBaslik="Cevap Detay"
      this.yeniKayit=data.kayit;

    }
    this.frm=this.FormOlustur();
   }

  ngOnInit() {
    
  }
  FormOlustur(){
    return this.frmBuild.group({
      cevap_icerik:[this.yeniKayit.cevap_icerik],
      uye_id:[this.yeniKayit.uye_id],
      soru_id:[this.yeniKayit.soru_id],
      kullanici_adi:[this.yeniKayit.kullanici_adi],
      SoruBaslik:[this.yeniKayit.SoruBaslik],
      tarih:[this.yeniKayit.tarih],

   });
  }
  

}
