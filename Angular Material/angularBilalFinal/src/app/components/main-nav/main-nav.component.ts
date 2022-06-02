import { Kategori } from './../../models/Kategori';
import { ApiService } from 'src/app/services/api.service';
import { Component, OnInit } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';

@Component({
  selector: 'app-main-nav',
  templateUrl: './main-nav.component.html',
  styleUrls: ['./main-nav.component.css']
})
export class MainNavComponent  implements OnInit{ 
 public kategoriler: Kategori[];
 public kullanici_adi : string;
  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      shareReplay()
    );

  constructor(private breakpointObserver: BreakpointObserver,
              public apiServis:ApiService
    ) {}
  ngOnInit(): void {
    this.KategoriListele();
    if(this.apiServis.oturumKontrol){
      this.kullanici_adi=localStorage.getItem("kullanici_adi")
    }
  }

  OturumKapat(){
    localStorage.clear();
    location.href="/"
  }

  KategoriListele(){
    this.apiServis.KategoriListe().subscribe((d:any)=>{
    this.kategoriler=d;

    });
  }
}
