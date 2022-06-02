import { Sonuc } from './../../models/Sonuc';
import { AlertService } from './../../services/Alert.service';
import { ApiService } from './../../services/api.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  
  

  constructor(
    public apiServis:ApiService,
    public alert:AlertService
  ) { }

  ngOnInit() {
  }
  OturumAc(kullanici_adi:string,parola:string){
      this.apiServis.tokenAl(kullanici_adi,parola).subscribe((d:any)=>{
        localStorage.setItem("token", d.acces_token)
        localStorage.setItem("uid", d.uye_id)
        localStorage.setItem("kullanici_adi", d.kullanici_adi)
        localStorage.setItem("uyeYetkileri", d.uyeYetkileri)
        location.href="/"



        
      }, err=>{
        var s : Sonuc = new Sonuc();
        s.islem=false;
        s.mesaj="kullanıcı adı veya parola geçersiz..."
        this.alert.AlertUygula(s);
      });
  }

}
