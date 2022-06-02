using bilal_internet_prg_api.Models;
using bilal_internet_prg_api.ViewModel;
using System.Linq;

namespace bilal_internet_prg_api.Auth
{
    public class UyeService
    {
        DB01Entities1 db = new DB01Entities1();

        public UyelerModel UyeOturumAc(string kadi, string parola)
        {
            UyelerModel uye = db.Uyeler.Where(s => s.kullanici_adi == kadi && s.sifre == parola).Select(x => new UyelerModel()
            {
                uye_id = x.uye_id,
                ad_soyad = x.ad_soyad,
                email = x.email,
                kullanici_adi = x.kullanici_adi,
                foto = x.foto,
                sifre = x.sifre,
                uye_admin = x.uye_admin
            }).SingleOrDefault();
            return uye;

        }
    }
}
