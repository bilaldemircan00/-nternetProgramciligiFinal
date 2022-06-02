using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace bilal_internet_prg_api.ViewModel
{
    public class SorularModel
    {
        public int soru_id { get; set; }
        public string soru_baslik { get; set; }
        public string soru_icerik { get; set; }
        public string foto { get; set; }
        public System.DateTime soru_tarih { get; set; }
        public int kategori_id { get; set; }
        public string kategori_adi { get; set; }
        public int uye_id { get; set; }
        public string uye_kullanici_adi { get; set; }
    }
}