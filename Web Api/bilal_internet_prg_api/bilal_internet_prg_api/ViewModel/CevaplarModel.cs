using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace bilal_internet_prg_api.ViewModel
{
    public class CevaplarModel
    {
        public int cevap_id { get; set; }
        public string cevap_icerik { get; set; }
        public int uye_id { get; set; }
        public int soru_id { get; set; }
        public string KullaniciAdi { get; set; }
        public string SoruBaslik { get; set; }
        public System.DateTime tarih { get; set; }
    }
}