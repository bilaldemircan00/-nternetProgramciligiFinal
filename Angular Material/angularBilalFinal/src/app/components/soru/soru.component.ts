import { Sorular } from './../../models/Sorular';
import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-soru',
  templateUrl: './soru.component.html',
  styleUrls: ['./soru.component.css']
})
export class SoruComponent implements OnInit {

  soru_id:number;
  sorular:Sorular;
  constructor() { }
  public apiServis:ApiService;
  public route:ActivatedRoute;


  ngOnInit() {
    this.route.params.subscribe((p:any)=>{
      if(p.soruId){
          this.soru_id=p.soruId;
          this.SoruById();
      }
    })
  }

  SoruById(){
    this.apiServis.SoruById(this.soru_id).subscribe((d:any)=>{
      this.sorular=d;
    })
  }
}
