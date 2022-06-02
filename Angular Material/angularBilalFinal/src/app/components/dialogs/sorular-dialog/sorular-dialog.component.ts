import { ApiService } from './../../../services/api.service';
import { Sorular } from './../../../models/Sorular';
import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Kategori } from 'src/app/models/Kategori';

@Component({
  selector: 'app-sorular-dialog',
  templateUrl: './sorular-dialog.component.html',
  styleUrls: ['./sorular-dialog.component.css']
})
export class SorularDialogComponent implements OnInit {
  dialogBaslik:string;
  yeniKayit:Sorular;
  islem:string;
  frm:FormGroup;
  kategoriler:Kategori[];



  constructor(
    public dialogRef:MatDialogRef<SorularDialogComponent>,
    public frmBuild:FormBuilder,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public apiServis : ApiService

  ) {
    this.islem=data.islem;
    if(this.islem=="ekle"){
      this.dialogBaslik="Soru Ekle"
      this.yeniKayit=new Sorular();
    }
    if(this.islem=="duzenle"){
      this.dialogBaslik="Soru Düzenle"
      this.yeniKayit=data.kayit;
    }
    if(this.islem=="Detay"){
      this.dialogBaslik="Soru Detay"
      this.yeniKayit=data.kayit;

    }
    this.frm=this.FormOlustur();
   }

  ngOnInit() {
    this.KategoriListe();
  }
  FormOlustur(){
    return this.frmBuild.group({
      soru_baslik:[this.yeniKayit.soru_baslik],
      soru_icerik:[this.yeniKayit.soru_icerik],
      kategori_id:[this.yeniKayit.kategori_id],
   });
  }
  KategoriListe(){
    this.apiServis.KategoriListe().subscribe((d:any)=>{
      this.kategoriler=d;
    })
  }

}
