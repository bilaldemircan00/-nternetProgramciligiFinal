import { Kategori } from './../../models/Kategori';
import { Sorular } from './../../models/Sorular';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-kategori',
  templateUrl: './kategori.component.html',
  styleUrls: ['./kategori.component.css']
})
export class KategoriComponent implements OnInit {
  sorular:Sorular[];
  kategori_id:number;
  kat:Kategori;

  constructor() { }
  public apiServis:ApiService;
  public route:ActivatedRoute;
  ngOnInit() {
    this.route.params.subscribe((p:any)=>{
      if(p.soruId){
          this.kategori_id=p.kategori_id;
          this.SoruListeByKatId();
          this.KategoriById();
      }
    })
  }
  KategoriById(){
    this.apiServis.KategoriById(this.kategori_id).subscribe((d:any)=>{
      this.kat=d;

    })
  }
  SoruListeByKatId(){
     this.apiServis.SoruListeByKatId(this.kategori_id).subscribe((d:any)=>{
       this.sorular=d;
       console.log(d);
     })
  }
}
