import { Cevaplar } from '../models/Cevaplar';
import { Uye } from './../models/Uye';
import { Sorular } from '../models/Sorular';
import { Kategori } from './../models/Kategori';

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  apiUrl = "http://localhost:49217/api/";

  constructor(
    public http: HttpClient
  ) { }

  /*   Oturum İşlemleri Başla  */
  tokenAl(kullanici_adi: string, parola: string) {
    var data = "username=" + kullanici_adi + "&password=" + parola + "&grant_type=password";
    var reqHeader = new HttpHeaders({ "Content-Type": "application/x-www-form-urlencoded" });
    return this.http.post(this.apiUrl + "/token", data, { headers: reqHeader });
  }
  oturumKontrol() {
    if (localStorage.getItem("token")) {
      return true;
    }
    else {
      return false;
    }
  }

  yetkiKontrol(yetkiler: any[]) {
    var sonuc: boolean = false;

    var uyeYetkiler: string[] = JSON.parse(localStorage.getItem("uyeYetkileri"));

    if (uyeYetkiler) {
      yetkiler.forEach(element => {
        if (uyeYetkiler.indexOf(element) > -1) {
          sonuc = true;
        }
      });
    }

    return sonuc;
  }

  /*   Oturum İşlemleri Bitiş  */


  /*  API  */

  KategoriListe() {
    return this.http.get(this.apiUrl + "/kategoriliste");
  }
  KategoriById(katId: number) {
    return this.http.get(this.apiUrl + "/kategoribyid/" + katId);
  }
  KategoriEkle(kat: Kategori) {
    return this.http.post(this.apiUrl + "/kategoriekle", kat);
  }
  KategoriDuzenle(kat: Kategori) {
    return this.http.put(this.apiUrl + "/kategoriduzenle", kat);
  }
  KategoriSil(katId: number) {
    return this.http.delete(this.apiUrl + "/kategorisil/" + katId);
  }

  SoruListe() {
    return this.http.get(this.apiUrl + "/soruliste");
  }
  SoruListeSonEklenenler(s: number) {
    return this.http.get(this.apiUrl + "/sorulistesoneklenenler/" + s);
  }
  SoruListeByKatId(katId: number) {
    return this.http.get(this.apiUrl + "/sorulistebykatid/" + katId);
  }
  SoruListeByUyeId(uyeId: number) {
    return this.http.get(this.apiUrl + "/sorulistebyuyeid/" + uyeId);
  }
  SoruById(makaleId: number) {
    return this.http.get(this.apiUrl + "/sorubyid/" + makaleId);
  }
  SoruEkle(makale: Sorular) {
    return this.http.post(this.apiUrl + "/soruekle", makale);
  }
  SoruDuzenle(makale: Sorular) {
    return this.http.put(this.apiUrl + "/soruduzenle", makale);
  }
  SoruSil(makaleId: number) {
    return this.http.delete(this.apiUrl + "/sorusil/" + makaleId);
  }

  UyeListe() {
    return this.http.get(this.apiUrl + "/uyeliste");
  }
  UyeById(uyeId: number) {
    return this.http.get(this.apiUrl + "/uyebyid/" + uyeId);
  }
  UyeEkle(uye: Uye) {
    return this.http.post(this.apiUrl + "/uyeekle", uye);
  }
  UyeDuzenle(uye: Uye) {
    return this.http.put(this.apiUrl + "/uyeduzenle", uye);
  }
  UyeSil(uyeId: number) {
    return this.http.delete(this.apiUrl + "/uyesil/" + uyeId);
  }

  CevapListe() {
    return this.http.get(this.apiUrl + "/cevapliste");
  }
  CevapListeByUyeId(uye_id: number) {
    return this.http.get(this.apiUrl + "/cevaplistebyuyeid/" + uye_id);
  }
  CevapListeBymakaleId(makaleId: number) {
    return this.http.get(this.apiUrl + "/cevaplistesoneklenenler/" + makaleId);
  }
  CevapListeSonEklenenler(s: number) {
    return this.http.get(this.apiUrl + "/cevapliste/" + s);
  }
  CevapById(yorumId: number) {
    return this.http.get(this.apiUrl + "/cevapbyid/" + yorumId);
  }
  CevapEkle(yorum: Cevaplar) {
    return this.http.post(this.apiUrl + "/cevapekle", yorum);
  }
  CevapDuzenle(yorum: Cevaplar) {
    return this.http.put(this.apiUrl + "/cevapduzenle", yorum);
  }
  CevapSil(yorumId: number) {
    return this.http.delete(this.apiUrl + "/cevapsil/" + yorumId);
  }
}
