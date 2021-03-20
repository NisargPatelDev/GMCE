$(document).ready(function () {
    $('#StudentList').removeClass("active");
    $('#AdmissionForm').removeClass("active");
    $('#receipt').removeClass("active");
    $('#Reports').removeClass("active");
    $('#receipt').addClass("active");
    $('#CreateReportPlus').click();
    GetAllReceipts();

})
var TotalFees = "";
$(document).on('focusout', '#STDID', function () {
    if ($('#STDID').val() != "") {
        $.get('/Home/GetStudentBySTDID?id=' + $('#STDID').val(), function (res) {
            if (res == "null") {
                $('#StudentName').val("");
                $('#Cource').val("");
            }
            $('#StudentName').val(res.Student_name);
            $('#Cource').val(res.Cource);
            $('#DueFee').val(res.Total_fees);
            TotalFees = res.Total_fees;
        })
    }
    else {
        $('#StudentName').val("");
        $('#Cource').val("");
    }

})

$(document).on('keyup', '#TotalFee', function () {
    var PayingFess = parseInt($('#TotalFee').val());
    if ($('#TotalFee').val() == "") {
        $('#DueFee').val(TotalFees);
    }
    else {
        var DueFee = parseInt(TotalFees) - PayingFess;
        $('#DueFee').val(DueFee);
    }

})

var a = ['', 'one ', 'two ', 'three ', 'four ', 'five ', 'six ', 'seven ', 'eight ', 'nine ', 'ten ', 'eleven ', 'twelve ', 'thirteen ', 'fourteen ', 'fifteen ', 'sixteen ', 'seventeen ', 'eighteen ', 'nineteen '];
var b = ['', '', 'twenty', 'thirty', 'forty', 'fifty', 'sixty', 'seventy', 'eighty', 'ninety'];

function inWords(num) {
    if ((num = num.toString()).length > 9) return 'overflow';
    n = ('000000000' + num).substr(-9).match(/^(\d{2})(\d{2})(\d{2})(\d{1})(\d{2})$/);
    if (!n) return; var str = '';
    str += (n[1] != 0) ? (a[Number(n[1])] || b[n[1][0]] + ' ' + a[n[1][1]]) + 'crore ' : '';
    str += (n[2] != 0) ? (a[Number(n[2])] || b[n[2][0]] + ' ' + a[n[2][1]]) + 'lakh ' : '';
    str += (n[3] != 0) ? (a[Number(n[3])] || b[n[3][0]] + ' ' + a[n[3][1]]) + 'thousand ' : '';
    str += (n[4] != 0) ? (a[Number(n[4])] || b[n[4][0]] + ' ' + a[n[4][1]]) + 'hundred ' : '';
    str += (n[5] != 0) ? ((str != '') ? 'and ' : '') + (a[Number(n[5])] || b[n[5][0]] + ' ' + a[n[5][1]]) + 'only ' : '';
    return str;
}

//document.getElementById('TotalFee').onkeyup = function () {
//    document.getElementById('FeesInWords').innerHTML = inWords(document.getElementById('TotalFee').value);

//};

$(document).on('keyup', '#TotalFee', function () {
    var FessInWord = inWords($('#TotalFee').val());
    $('#FeesInWords').val(FessInWord);
})


function CreateReceipt() {
    var ReObj = {
        STDID: $('#STDID').val(),
        Date: $('#Date').val(),
        Receipt_No: $('#ReceiptNo').val(),
        PaidFess: $('#TotalFee').val(),
        FessInWords: $('#FeesInWords').val(),
        Payment_type: $('input[name="FeesType"]:checked').val()
    };

    $.ajax({
        url: "/Home/AddReciept",
        data: ReObj,
        type: "POST",
        dataType: "json",
        success: function (result) {
            if (result != "0") {
                alert("Receipt Created");
                ClearReceiptForm()
                GetAllReceipts();
            }
            else {
                alert("Receipt No Already Exsits")
                $('#ReceiptNo').val("");
            }

        },
        error: function (errormessage) {
            alert(errormessage.responseText);
        }
    });
}

function ValidateReceipt() {
    var flag = 0;
    if ($('#Date').val() == "") {
        alert("PLease Enter Date");
    }
    else if ($('#ReceiptNo').val() == "") {
        alert("PLease Enter Receipt No");
    }
    else if ($('#STDID').val() == "") {
        alert("PLease Enter STD ID");
    }
    else if ($('#StudentName').val() == "") {
        alert("PLease Enter Correct STD ID");
    }

    else if ($('#TotalFee').val() == "") {
        alert("PLease Enter Fees Paid");
    }
    else {
        CreateReceipt();
    }
}

$(document).on('click', '#bntCreateReceipt', function () {

    ValidateReceipt();

})

function ClearReceiptForm() {
    $('#Date').val("");
    $('#ReceiptNo').val("");
    $('#STDID').val("");
    $('#StudentName').val("");
    $('#Cource').val("");
    $('#TotalFee').val("");
    $('#FeesInWord').val("");
}

function GetReceiptById(id) {
    debugger
}

function GetAllReceipts() {
    $("#example1").DataTable(
        {
            "responsive": true, "lengthChange": true, "autoWidth": false,
            /*       "buttons": ["copy", "csv", "excel", "pdf", "print", "colvis"],*/
            "ajax": {
                "url": "/Home/GetAllReceipt",
                "type": "GET",
                "datatype": "json"
            },
            "columns": [
                { "data": "STD_ID" },
                { "data": "Receipt_No" },
                { "data": "Date" },
                { "data": "Student_name" },
                { "data": "Cource" },
                { "data": "PaidFess" },
                { "data": "Due_fees" },
                { "data": "Payment_type" },
                //{
                //    "data": "Action",
                //    "name": "Action",
                //    mRender: function (data, type, full) {
                //        return `<button>Edit</button>`;
                //    }
                //}
            ],
            "dom": 'Bfrtip',
            "buttons": [
                {
                    extend: 'copy',
                    className: 'btn btn-dark rounded-0',
                    text: '<i class="far fa-copy"></i> Copy'
                },
                {
                    extend: 'excel',
                    className: 'btn btn-dark rounded-0',
                    text: '<i class="far fa-file-excel"></i> Excel'
                },
                {
                    extend: 'pdf',
                    className: 'btn btn-dark rounded-0',
                    text: '<i class="far fa-file-pdf"></i> Pdf'
                },
                {
                    extend: 'csv',
                    className: 'btn btn-dark rounded-0',
                    text: '<i class="fas fa-file-csv"></i> CSV'
                },
                {
                    extend: 'print',
                    className: 'btn btn-dark rounded-0',
                    text: '<i class="fas fa-print"></i> Print'
                }
            ]
        });
}

$(document).on('click', '#ReceiptList', function () {

    $('#CreateReportPlus').click();
})

$(document).on('click', '#CreateReportPlus', function () {
    var coutn = 0;
    if (coutn != 0) {
        $('#ReceiptList').click();
    }
    coutn++;
    
})
