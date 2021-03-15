using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace GMCE.Models
{
    public class Student
    {
        public string Registration_date { get; set; }
        public string Start_date { get; set; }
        public string STD_ID { get; set; }
        public string Student_name { get; set; }
        public string Cource { get; set; }
        public string Student_mobile { get; set; }
        public string Parents_mobile { get; set; }
        public string Total_fees { get; set; }
        public string Fees_Payment { get; set; }
        public string Status { get; set; }
        public string DOB { get; set; }
        public Nullable<int> Age { get; set; }
        public string Gender { get; set; }
    }
}