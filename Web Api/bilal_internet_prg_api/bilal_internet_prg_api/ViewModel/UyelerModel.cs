using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace bilal_internet_prg_api.ViewModel
{
    public class UyelerModel
    {
        public int uye_id { get; set; }
        public string kullanici_adi { get; set; }
        public string email { get; set; }
        public string sifre { get; set; }
        public string ad_soyad { get; set; }
        public string foto { get; set; }
        public int uye_admin { get; set; }
    }
}