import { Cevaplar } from './../../models/Cevaplar';
import { Sorular } from './../../models/Sorular';
import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Sonuc } from 'src/app/models/Sonuc';
import { AlertService } from 'src/app/services/Alert.service';
import { ApiService } from 'src/app/services/api.service';
import { ConfirmDialogComponent } from '../dialogs/confirm-dialog/confirm-dialog.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  sorular:Sorular[];
  cevaplar:Cevaplar[];
  constructor(
    public apiServis:ApiService
  ) { }

  ngOnInit() {

    this.SonEklenenler();
    this.SonEklenenlerCevap();
  }
  SonEklenenler(){
    this.apiServis.SoruListeSonEklenenler(5).subscribe((d:any)=>{
      this.sorular=d;

    });

  }
  SonEklenenlerCevap(){
    this.apiServis.CevapListeSonEklenenler(5).subscribe((d:any)=>{
      this.cevaplar=d;
console.log(d);
    });

  }

}
