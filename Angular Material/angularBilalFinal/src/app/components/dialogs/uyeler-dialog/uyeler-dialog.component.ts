import { Uye } from './../../../models/Uye';
import { FormBuilder,FormGroup } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ApiService } from 'src/app/services/api.service';
import { Component, Inject, OnInit } from '@angular/core';
@Component({
  selector: 'app-uyeler-dialog',
  templateUrl: './uyeler-dialog.component.html',
  styleUrls: ['./uyeler-dialog.component.css']
})
export class UyelerDialogComponent implements OnInit {

  dialogBaslik:string;
  islem:string;
  frm:FormGroup;
  yenikayit:Uye;


  constructor(
    public apiServis:ApiService,
    public matDialog:MatDialog,
    public frmBuild:FormBuilder,
    public dialogRef:MatDialogRef<UyelerDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any

  ) { 
    this.islem=data.islem;
    this.yenikayit=data.kayit;
    if(this.islem=="ekle"){
      this.dialogBaslik="Üye Ekle"

    }
    if(this.islem=="Duzenle"){
      this.dialogBaslik="Üye Düzenle"

    }
    this.frm=this.FormOlustur()
  }

  ngOnInit() {

  }
  FormOlustur(){
    return this.frmBuild.group({
      kullanici_adi:[this.yenikayit.kullanici_adi],
      email:[this.yenikayit.sifre],
      sifre:[this.yenikayit.sifre],
      ad_soyad:[this.yenikayit.ad_soyad],
      foto:[this.yenikayit.foto],
      uye_admin:[this.yenikayit.uye_admin],

   });
  }
}
