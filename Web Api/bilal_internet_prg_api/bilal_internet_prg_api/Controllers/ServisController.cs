using bilal_internet_prg_api.Models;
using bilal_internet_prg_api.ViewModel;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;


namespace bilal_internet_prg_api.Controllers
{
    
    public class ServisController : ApiController
    {
        DB01Entities1 db = new DB01Entities1();
        SonucModel sonuc = new SonucModel();
        #region Kategori

        [HttpGet]
        [Route("api/kategoriliste")]

        public List<KategoriModel> KategoriListe()
        {
            List<KategoriModel> liste = db.Kategori.Select(x => new KategoriModel()
            {
                kategori_id = x.kategori_id,
                kategori_adi = x.kategori_adi,
                KatSoruSay = x.Sorular.Count
            }).ToList();

            return liste;
        }

        [HttpGet]
        [Route("api/kategoribyid/{kategori_id}")]
        public KategoriModel KategoriById(int kategori_id)
        {
            KategoriModel kayit = db.Kategori.Where(s => s.kategori_id == kategori_id).Select(x => new KategoriModel()
            {
                kategori_id = x.kategori_id,
                kategori_adi = x.kategori_adi,
                KatSoruSay = x.Sorular.Count
            }).SingleOrDefault();
            return kayit;
        }

        [HttpPost]
        [Route("api/kategoriekle")]
        public SonucModel KategoriEkle(KategoriModel model)
        {
            if (db.Kategori.Count(s => s.kategori_adi == model.kategori_adi) > 0)
            {
                sonuc.islem = false;
                sonuc.mesaj = "Girilen Kategori Adı Kayıtlıdır!";
                return sonuc;
            }

            Kategori yeni = new Kategori();
            yeni.kategori_adi = model.kategori_adi;
            db.Kategori.Add(yeni);
            db.SaveChanges();

            sonuc.islem = true;
            sonuc.mesaj = "Kategori Eklendi";
            return sonuc;
        }

        [HttpPut]
        [Route("api/kategoriduzenle")]
        public SonucModel KategoriDuzenle(KategoriModel model)
        {
            Kategori kayit = db.Kategori.Where(s => s.kategori_id == model.kategori_id).FirstOrDefault();

            if (kayit == null)
            {
                sonuc.islem = false;
                sonuc.mesaj = "Kayıt Bulunamadı!";
                return sonuc;
            }

            kayit.kategori_adi = model.kategori_adi;
            db.SaveChanges();

            sonuc.islem = true;
            sonuc.mesaj = "Kategori Düzenlendi";
            return sonuc;
        }

        [HttpDelete]
        [Route("api/kategorisil/{kategori_id}")]
        public SonucModel KategoriSil(int kategori_id)
        {
            Kategori kayit = db.Kategori.Where(s => s.kategori_id == kategori_id).FirstOrDefault();
            if (kayit == null)
            {
                sonuc.islem = false;
                sonuc.mesaj = "Kayıt Bulunamadı!";
                return sonuc;
            }

            if (db.Sorular.Count(s => s.kategori_id == kategori_id) > 0)
            {
                sonuc.islem = false;
                sonuc.mesaj = "Üzerinde Makale Kayıtlı Kategori Silinemez!";
                return sonuc;
            }

            db.Kategori.Remove(kayit);
            db.SaveChanges();

            sonuc.islem = true;
            sonuc.mesaj = "Kategori Silindi";
            return sonuc;
        }
        #endregion

        #region Sorular


        [HttpGet]
        [Route("api/soruliste")]
        public List<SorularModel> SoruListe()
        {
            List<SorularModel> liste = db.Sorular.Select(x => new SorularModel()
            {
                soru_id = x.soru_id,
                soru_baslik = x.soru_baslik,
                soru_icerik = x.soru_icerik,
                foto = x.foto,
                kategori_id = x.kategori_id,
                kategori_adi = x.Kategori.kategori_adi,
                soru_tarih = x.soru_tarih,
                uye_id = x.uye_id,
                uye_kullanici_adi = x.Uyeler.kullanici_adi

            }).ToList();

            return liste;
        }
        [HttpGet]
        [Route("api/sorulistesoneklenenler/{s}")]
        public List<SorularModel> SoruListeSonEklenenler(int s)
        {
            List<SorularModel> liste = db.Sorular.OrderByDescending(o => o.soru_id).Take(s).Select(x => new SorularModel()
            {
                soru_id = x.soru_id,
                soru_baslik = x.soru_baslik,
                soru_icerik = x.soru_icerik,
                foto = x.foto,
                kategori_id = x.kategori_id,
                kategori_adi = x.Kategori.kategori_adi,
                soru_tarih = x.soru_tarih,
                uye_id = x.uye_id,
                uye_kullanici_adi = x.Uyeler.kullanici_adi

            }).ToList();

            return liste;
        }
        [HttpGet]
        [Route("api/sorulistebykatid/{kategori_id}")]
        public List<SorularModel> SoruListeByKatId(int kategori_id)
        {
            List<SorularModel> liste = db.Sorular.Where(s => s.kategori_id == kategori_id).Select(x => new SorularModel()
            {
                soru_id = x.soru_id,
                soru_baslik = x.soru_baslik,
                soru_icerik = x.soru_icerik,
                foto = x.foto,
                kategori_id = x.kategori_id,
                kategori_adi = x.Kategori.kategori_adi,
                soru_tarih = x.soru_tarih,
                uye_id = x.uye_id,
                uye_kullanici_adi = x.Uyeler.kullanici_adi

            }).ToList();

            return liste;
        }
        [HttpGet]
        [Route("api/sorulistebyuyeid/{uye_id}")]
        public List<SorularModel> SoruListeByUyeId(int uye_id)
        {
            List<SorularModel> liste = db.Sorular.Where(s => s.uye_id == uye_id).Select(x => new SorularModel()
            {
                soru_id = x.soru_id,
                soru_baslik = x.soru_baslik,
                soru_icerik = x.soru_icerik,
                foto = x.foto,
                kategori_id = x.kategori_id,
                kategori_adi = x.Kategori.kategori_adi,
                soru_tarih = x.soru_tarih,
                uye_id = x.uye_id,
                uye_kullanici_adi = x.Uyeler.kullanici_adi

            }).ToList();

            return liste;
        }

        [HttpGet]
        [Route("api/soruebyid/{soru_id}")]
        public SorularModel SoruById(int soru_id)
        {
            SorularModel kayit = db.Sorular.Where(s => s.soru_id == soru_id).Select(x => new SorularModel()
            {
                soru_id = x.soru_id,
                soru_baslik = x.soru_baslik,
                soru_icerik = x.soru_icerik,
                foto = x.foto,
                kategori_id = x.kategori_id,
                kategori_adi = x.Kategori.kategori_adi,
                soru_tarih = x.soru_tarih,
                uye_id = x.uye_id,
                uye_kullanici_adi = x.Uyeler.kullanici_adi
            }).SingleOrDefault();
            return kayit;
        }

        [HttpPost]
        [Route("api/soruekle")]
        public SonucModel SoruEkle(SorularModel model)
        {
            if (db.Sorular.Count(s => s.soru_baslik == model.soru_baslik) > 0)
            {
                sonuc.islem = false;
                sonuc.mesaj = "Girilen Soru Başlığı Kayıtlıdır!";
                return sonuc;
            }

            Sorular yeni = new Sorular();
            yeni.soru_baslik = model.soru_baslik;
            yeni.soru_icerik = model.soru_icerik;
            yeni.soru_tarih = model.soru_tarih;
            yeni.kategori_id = model.kategori_id;
            yeni.uye_id = model.uye_id;
            yeni.foto = model.foto;
            db.Sorular.Add(yeni);
            db.SaveChanges();

            sonuc.islem = true;
            sonuc.mesaj = "Soru Eklendi";
            return sonuc;
        }

        [HttpPut]
        [Route("api/soruduzenle")]
        public SonucModel SoruDuzenle(SorularModel model)
        {
            Sorular kayit = db.Sorular.Where(s => s.soru_id == model.soru_id).SingleOrDefault();
            if (kayit == null)
            {
                sonuc.islem = false;
                sonuc.mesaj = "Kayıt Bulunamadı!";
                return sonuc;
            }
            kayit.soru_baslik = model.soru_baslik;
            kayit.soru_icerik = model.soru_icerik;
            kayit.soru_tarih = model.soru_tarih;
            kayit.kategori_id = model.kategori_id;
            kayit.uye_id = model.uye_id;
            kayit.foto = model.foto;
            db.SaveChanges();

            sonuc.islem = true;
            sonuc.mesaj = "Makale Düzenlendi";
            return sonuc;

        }

        [HttpDelete]
        [Route("api/sorusil/{soru_id}")]
        public SonucModel SoruSil(int soru_id)
        {
            Sorular kayit = db.Sorular.Where(s => s.soru_id == soru_id).SingleOrDefault();
            if (kayit == null)
            {
                sonuc.islem = false;
                sonuc.mesaj = "Kayıt Bulunamadı!";
                return sonuc;
            }

            if (db.Cevaplar.Count(s => s.soru_id == soru_id) > 0)
            {
                sonuc.islem = false;
                sonuc.mesaj = "Üzerinde Yorum Kayıtlı Makale Silinemez!";
                return sonuc;
            }

            db.Sorular.Remove(kayit);
            db.SaveChanges();

            sonuc.islem = true;
            sonuc.mesaj = "Makale Silindi";
            return sonuc;
        }
        #endregion

        #region Üye

        [HttpGet]
        [Route("api/uyeliste")]
        public List<UyelerModel> UyeListe()
        {
            List<UyelerModel> liste = db.Uyeler.Select(x => new UyelerModel()
            {
                uye_id = x.uye_id,
                ad_soyad = x.ad_soyad,
                email = x.email,
                kullanici_adi = x.kullanici_adi,
                foto = x.foto,
                sifre = x.sifre,
                uye_admin = x.uye_admin
            }).ToList();

            return liste;
        }

        [HttpGet]
        [Route("api/uyebyid/{uyeId}")]
        public UyelerModel UyeById(int uyeId)
        {
            UyelerModel kayit = db.Uyeler.Where(s => s.uye_id == uyeId).Select(x => new UyelerModel()
            {
                uye_id = x.uye_id,
                ad_soyad = x.ad_soyad,
                email = x.email,
                kullanici_adi = x.kullanici_adi,
                foto = x.foto,
                sifre = x.sifre,
                uye_admin = x.uye_admin
            }).SingleOrDefault();

            return kayit;
        }

        [HttpPost]
        [Route("api/uyeekle")]
        public SonucModel UyeEkle(UyelerModel model)
        {
            if (db.Uyeler.Count(s => s.kullanici_adi == model.kullanici_adi || s.email == model.email) > 0)
            {
                sonuc.islem = false;
                sonuc.mesaj = "Girilen Kullanıcı Adı veya E-Posta Adresi Kayıtlıdır!";
                return sonuc;
            }

            Uyeler yeni = new Uyeler();
            yeni.ad_soyad = model.ad_soyad;
            yeni.email = model.email;
            yeni.kullanici_adi = model.kullanici_adi;
            yeni.foto = model.foto;
            yeni.sifre = model.sifre;
            yeni.uye_admin = model.uye_admin;

            db.Uyeler.Add(yeni);
            db.SaveChanges();
            sonuc.islem = true;
            sonuc.mesaj = "Üye Eklendi";
            return sonuc;
        }

        [HttpPut]
        [Route("api/uyeduzenle")]
        public SonucModel UyeDuzenle(UyelerModel model)
        {
            Uyeler kayit = db.Uyeler.Where(s => s.uye_id == model.uye_id).SingleOrDefault();

            if (kayit == null)
            {
                sonuc.islem = false;
                sonuc.mesaj = "Kayıt Bulunamadı";
                return sonuc;
            }
            kayit.ad_soyad = model.ad_soyad;
            kayit.email = model.email;
            kayit.kullanici_adi = model.kullanici_adi;
            kayit.foto = model.foto;
            kayit.sifre = model.sifre;
            kayit.uye_admin = model.uye_admin;

            db.SaveChanges();
            sonuc.islem = true;
            sonuc.mesaj = "Üye Düzenlendi";

            return sonuc;
        }

        [HttpDelete]
        [Route("api/uyesil/{uyeId}")]
        public SonucModel UyeSil(int uyeId)
        {
            Uyeler kayit = db.Uyeler.Where(s => s.uye_id == uyeId).SingleOrDefault();

            if (kayit == null)
            {
                sonuc.islem = false;
                sonuc.mesaj = "Kayıt Bulunamadı";
                return sonuc;
            }

            if (db.Sorular.Count(s => s.uye_id == uyeId) > 0)
            {
                sonuc.islem = false;
                sonuc.mesaj = "Üzerinde Makale Kaydı Olan Üye Silinemez!";
                return sonuc;
            }

            if (db.Cevaplar.Count(s => s.uye_id == uyeId) > 0)
            {
                sonuc.islem = false;
                sonuc.mesaj = "Üzerinde Yorum Kaydı Olan Üye Silinemez!";
                return sonuc;
            }

            db.Uyeler.Remove(kayit);
            db.SaveChanges();
            sonuc.islem = true;
            sonuc.mesaj = "Üye Silindi";
            return sonuc;
        }
        #endregion

        #region Cevaplar
        [HttpGet]
        [Route("api/cevapliste")]
        public List<CevaplarModel> CevapListe()
        {
            List<CevaplarModel> liste = db.Cevaplar.Select(x => new CevaplarModel()
            {
                cevap_id = x.cevap_id,
                cevap_icerik = x.cevap_icerik,
                soru_id = x.soru_id,
                uye_id = x.uye_id,
                tarih = x.tarih,
                KullaniciAdi = x.Uyeler.kullanici_adi,
                SoruBaslik = x.Sorular.soru_baslik,

            }).ToList();
            return liste;
        }
        [HttpGet]
        [Route("api/cevaplistebyuyeid/{uyeId}")]
        public List<CevaplarModel> CevapListeByUyeId(int uyeId)
        {
            List<CevaplarModel> liste = db.Cevaplar.Where(s => s.uye_id == uyeId).Select(x => new CevaplarModel()
            {
                cevap_id = x.cevap_id,
                cevap_icerik = x.cevap_icerik,
                soru_id = x.soru_id,
                uye_id = x.uye_id,
                tarih = x.tarih,
                KullaniciAdi = x.Uyeler.kullanici_adi,
                SoruBaslik = x.Sorular.soru_baslik,

            }).ToList();
            return liste;
        }
        [HttpGet]
        [Route("api/cevaplistebymakaleid/{soruId}")]
        public List<CevaplarModel> CevapListeBymakaleId(int soruId)
        {
            List<CevaplarModel> liste = db.Cevaplar.Where(s => s.soru_id == soruId).Select(x => new CevaplarModel()
            {
                cevap_id = x.cevap_id,
                cevap_icerik = x.cevap_icerik,
                soru_id = x.soru_id,
                uye_id = x.uye_id,
                tarih = x.tarih,
                KullaniciAdi = x.Uyeler.kullanici_adi,
                SoruBaslik = x.Sorular.soru_baslik,

            }).ToList();
            return liste;
        }
        [HttpGet]
        [Route("api/cevaplistesoneklenenler/{s}")]
        public List<CevaplarModel> CevapListeSonEklenenler(int s)
        {
            List<CevaplarModel> liste = db.Cevaplar.OrderByDescending(o => o.soru_id).Take(s).Select(x => new CevaplarModel()
            {
                cevap_id = x.cevap_id,
                cevap_icerik = x.cevap_icerik,
                soru_id = x.soru_id,
                uye_id = x.uye_id,
                tarih = x.tarih,
                KullaniciAdi = x.Uyeler.kullanici_adi,
                SoruBaslik = x.Sorular.soru_baslik,
            }).ToList();
            return liste;
        }


        [HttpGet]
        [Route("api/cevapbyid/{cevapId}")]

        public CevaplarModel CevapById(int cevapId)
        {
            CevaplarModel kayit = db.Cevaplar.Where(s => s.cevap_id == cevapId).Select(x => new CevaplarModel()
            {
                cevap_id = x.cevap_id,
                cevap_icerik = x.cevap_icerik,
                soru_id = x.soru_id,
                uye_id = x.uye_id,
                tarih = x.tarih,
                KullaniciAdi = x.Uyeler.kullanici_adi,
                SoruBaslik = x.Sorular.soru_baslik,
            }).SingleOrDefault();

            return kayit;
        }

        [HttpPost]
        [Route("api/cevapekle")]
        public SonucModel CevapEkle(CevaplarModel model)
        {
            if (db.Cevaplar.Count(s => s.uye_id == model.uye_id && s.soru_id == model.soru_id && s.cevap_icerik == model.cevap_icerik) > 0)
            {
                sonuc.islem = false;
                sonuc.mesaj = "Aynı Kişi, Aynı Soruya Aynı Cevabı Veremez!";
                return sonuc;
            }

            Cevaplar yeni = new Cevaplar();
            yeni.cevap_id = model.cevap_id;
            yeni.cevap_icerik = model.cevap_icerik;
            yeni.soru_id = model.soru_id;
            yeni.uye_id =model.uye_id;
            yeni.tarih = model.tarih;
            db.Cevaplar.Add(yeni);
            db.SaveChanges();

            sonuc.islem = true;
            sonuc.mesaj = "Yorum Eklendi";

            return sonuc;
        }
        [HttpPut]
        [Route("api/cevapduzenle")]
        public SonucModel CevapDuzenle(CevaplarModel model)
        {

            Cevaplar kayit = db.Cevaplar.Where(s => s.cevap_id == model.cevap_id).SingleOrDefault();

            if (kayit == null)
            {
                sonuc.islem = false;
                sonuc.mesaj = "Kayıt Bulunamadı!";
                return sonuc;
            }

            kayit.cevap_id = model.cevap_id;
            kayit.cevap_icerik = model.cevap_icerik;
            kayit.soru_id = model.soru_id;
            kayit.uye_id = model.uye_id;
            kayit.tarih = model.tarih;
            
            db.SaveChanges();

            sonuc.islem = true;
            sonuc.mesaj = "Yorum Düzenlendi";

            return sonuc;
        }

        [HttpDelete]
        [Route("api/cevapsil/{cevapId}")]
        public SonucModel CevapSil(int cevapId)
        {
            Cevaplar kayit = db.Cevaplar.Where(s => s.cevap_id == cevapId).SingleOrDefault();

            if (kayit == null)
            {
                sonuc.islem = false;
                sonuc.mesaj = "Kayıt Bulunamadı!";
                return sonuc;
            }

            db.Cevaplar.Remove(kayit);
            db.SaveChanges();

            sonuc.islem = true;
            sonuc.mesaj = "Cevap Silindi";

            return sonuc;
        }


#endregion

    }
}
