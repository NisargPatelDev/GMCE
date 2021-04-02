var count = 0;
$(document).ready(function () {
    $('#DateRange').daterangepicker();
    $('#DateRange').val("");

    count++;
    if (count != 0) {
        GetAllReceipts();
    }
})
$(document).on('click', '#ClearDateRange', function () {
    $('#DateRange').val("");
    if (count != 0) {
        Table.destroy();
        GetAllReceipts();
    }
})
var Table = "";
function GetAllReceipts() {
    var TotalPaidFess = 0;
    var countData = 0;
    var StartDate = "";
    var EndDate = "";
    var isfiltered = 0;
    if ($('#DateRange').val() != "") {
        isfiltered = 1;
        var date = $('#DateRange').val().split("-");
        split = date[0].split('/');
        split2 = date[1].split('/');
        StartDate = [split[1], split[0], split[2]].join('/').trim();
        EndDate = [split2[1], split2[0].trim(), split2[2]].join('/').trim();
    }
    if (user == "admin") {
        Table = $("#example1").DataTable(
            {
                deferRender: true,
                "searching": true,
                "responsive": true, "lengthChange": true, "autoWidth": false,
                /*       "buttons": ["copy", "csv", "excel", "pdf", "print", "colvis"],*/
                "ajax": {
                    "url": "/Home/GetAllReceiptForFE?minDate=" + StartDate + "&maxDate=" + EndDate,
                    "type": "GET",
                    "datatype": "json"
                },

                "columns": [
                    { "data": "Receipt_No", "width": "5%" },
                    {
                        "data": "Date", "width": "10%",
                        mRender: function (data, type, full) {
                            var split = data.split('-');
                            var Date = [split[2], split[1], split[0]].join('/');
                            return Date;
                        }
                    },
                    { "data": "STD_ID" },
                    { "data": "Student_name", "width": "25%" },
                    { "data": "Cource" },
                    {
                        "data": "PaidFess",
                        mRender: function (data, type, full) {
                            if (countData == 0) {
                                TotalPaidFess += full.PaidFess;
                            }
                            return full.PaidFess;
                        }
                    },
                    { "data": "Payment_type" },
                    {
                        "data": "Payment_type",
                        "width": "5%",
                        mRender: function (data, type, full) {
                            return `    `;
                        }

                    },
                    {
                        "data": "ID",
                        mRender: function (data, type, full) {
                            countData++;
                            return `<a style="width:1%" onclick="GetReceiptById(${full.ID})"><center><i class="fas fa-edit"></i></center></a>
                                <a style="width:1%" onclick="deleteReceipt(${full.ID})"><center><i class="fas fa-trash-alt"></i></center></a>`;
                        }
                    },
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
                        extend: 'excel',
                        className: 'btn btn-dark rounded-0',
                        text: '<i class="far fa-file-excel"></i> Excel',                          
                        title: "COLLECTION REPORT (" + StartDate + "-" + EndDate+")",
                        exportOptions: {
                            title: 'GMP COLLECTION REPORT',
                            columns: 'th:not(:last-child)'
                        },
                        messageTop: function () {
                            if (StartDate != null) {
                                return `(${StartDate} - ${EndDate})`;
                            }
                            else {
                                return `(All})`;
                            }

                        },
                        messageBottom: null
                    },
                    {
                        extend: 'pdf',
                        className: 'btn btn-dark rounded-0',
                        text: '<i class="far fa-file-pdf"></i> Pdf',
                        title: "COLLECTION REPORT (" + StartDate + "-" + EndDate + ")",
                        exportOptions: {
                            title: 'GMP COLLECTION REPORT',
                            columns: 'th:not(:last-child)'
                        },
                        messageTop: function () {
                            if (StartDate != null) {
                                return `(${StartDate} - ${EndDate})`;
                            }
                            else {
                                return `(All})`;
                            }

                        },
                        messageBottom: null
                    },
                    {
                        extend: 'print',
                        className: 'btn btn-dark rounded-0',
                        text: '<i class="fas fa-print"></i> Print',
                        title: "COLLECTION REPORT (" + StartDate + "-" + EndDate + ")",
                        exportOptions: {
                            title: 'GMP COLLECTION REPORT',
                            columns: 'th:not(:last-child)'
                        },
                        messageTop: function () {
                            if (StartDate != null) {
                                return `(${StartDate} - ${EndDate})`;
                            }
                            else {
                                return `(All})`;
                            }

                        },
                        messageBottom: null
                    }
                ],
                "initComplete": function (settings, json) {

                    GetTotal(TotalPaidFess);
                }
            }
        );
    }
    else {
        Table = $("#example1").DataTable(
            {
                deferRender: true,
                "searching": true,
                "responsive": true, "lengthChange": true, "autoWidth": false,
                /*       "buttons": ["copy", "csv", "excel", "pdf", "print", "colvis"],*/
                "ajax": {
                    "url": "/Home/GetAllReceiptForFE?minDate=" + StartDate + "&maxDate=" + EndDate,
                    "type": "GET",
                    "datatype": "json"
                },

                "columns": [
                    { "data": "Receipt_No", "width": "5%" },
                    {
                        "data": "Date", "width": "10%",
                        mRender: function (data, type, full) {
                            var split = data.split('-');
                            var Date = [split[2], split[1], split[0]].join('/');
                            return Date;
                        }
                    },
                    { "data": "STD_ID" },
                    { "data": "Student_name", "width": "25%" },
                    { "data": "Cource" },
                    {
                        "data": "PaidFess",
                        mRender: function (data, type, full) {
                            if (countData == 0) {
                                TotalPaidFess += full.PaidFess;
                            }
                            return full.PaidFess;
                        }
                    },
                    { "data": "Payment_type" },
                    {
                        "data": "Payment_type",
                        "width": "5%",
                        mRender: function (data, type, full) {
                            return `    `;
                        }

                    },                    
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
                        extend: 'excel',
                        className: 'btn btn-dark rounded-0',
                        text: '<i class="far fa-file-excel"></i> Excel',                        
                        messageBottom: null,
                        exportOptions: {
                            title: 'GMP COLLECTION REPORT',
                            columns: 'th:not(:last-child)'
                        },
                        messageTop: function () {
                            if (StartDate != null) {
                                return `(${StartDate} - ${EndDate})`;
                            }
                            else {
                                return `(All})`;
                            }
                             
                        },
                        messageBottom: null
                    },
                    {
                        extend: 'pdf',
                        className: 'btn btn-dark rounded-0',
                        text: '<i class="far fa-file-pdf"></i> Pdf',
                        exportOptions: {
                            title: 'GMP COLLECTION REPORT',
                            columns: 'th:not(:last-child)'
                        },
                        messageTop: function () {
                            if (StartDate != null) {
                                return `(${StartDate} - ${EndDate})`;
                            }
                            else {
                                return `(All})`;
                            }

                        },
                        messageBottom: null
                    },
                    {
                        extend: 'print',
                        className: 'btn btn-dark rounded-0',
                        text: '<i class="fas fa-print"></i> Print',
                        exportOptions: {
                            title: 'GMP COLLECTION REPORT',
                            columns: 'th:not(:last-child)'
                        },
                        messageTop: function () {
                            if (StartDate != null) {
                                return `(${StartDate} - ${EndDate})`;
                            }
                            else {
                                return `(All})`;
                            }

                        },
                        messageBottom: null
                    }
                ],
                "initComplete": function (settings, json) {

                    GetTotal(TotalPaidFess);
                }
            }
        );
    }
   


}

function GetTotal(TotalPaidFess) {

    Table.row.add({
        "Receipt_No": "TOTAL",
        "Date": "",
        "STD_ID": " ",
        "Student_name": " ",
        "Cource": TotalPaidFess,
        "PaidFess": "",
        "Payment_type": " ",
        "Payment_type": " ",
        "ID": " ",

    }).draw();
   

    var htmlString = `TOTAL COLLECTION : ${TotalPaidFess}`
    $('#TotalCollection').html(htmlString);

}

var ReceiptNo = "";
var Dueefee = "";
function GetReceiptById(id) {
    $.get('/Home/GetReceiptById?id=' + id, function (res) {
        $('#DateE').val(res.Date);
        $('#ReceiptNoE').val(res.Receipt_No);
        ReceiptNo = res.Receipt_No;
        $('#STDIDE').val(res.STD_ID);
        $('#StudentNameE').val(res.Student_name);
        $('#CourceE').val(res.Cource);
        $('#TotalFeeE').val(res.PaidFess);
        Dueefee = res.PaidFess;
        $('#FeesInWordsE').val(res.FessInWords);
        $("input[name=FeesTypeE][value=" + res.Payment_type + "]").attr('checked', 'checked');
        $('#EditReceiptModal').modal('show');
        $('#HdnId').val(res.ID);
    })

}



$(document).on('click', '#btnEditReceipt', function () {
    ValidateRegistration();
})

function ValidateRegistration() {
    if ($('#DateE').val() == "") {
        alert("PLease Enter Date");
    }
    else if ($('#ReceiptNoE').val() == "") {
        alert("PLease Enter Receipt No");
    }
    else if ($('#STDIDE').val() == "") {
        alert("PLease Enter STD ID");
    }
    else if ($('#StudentNameE').val() == "") {
        alert("PLease Enter Correct STD ID");
    }

    else if ($('#TotalFeeE').val() == "") {
        alert("PLease Enter Fees Paid");
    }
    else {
        if (ReceiptNo != $('#ReceiptNoE').val()) {
            $.get('/home/IsReceiptNoAlreadyExsist?no=' + $('#ReceiptNoE').val(), function (res) {
                if (res == 1) {
                    ResgisterReceipt();
                }
                else {
                    alert("Receipt No Alerday Exist!!");
                }
            })
        }
        else {
            ResgisterReceipt();
        }
    }

}

function ResgisterReceipt() {
    var ReObj = {
        STDID: $('#STDIDE').val(),
        Date: $('#DateE').val(),
        Receipt_No: $('#ReceiptNoE').val(),
        PaidFess: $('#TotalFeeE').val(),
        FessInWords: $('#FeesInWordsE').val(),
        Payment_type: $('input[name="FeesTypeE"]:checked').val()
    };
    var Due = Dueefee - $('#TotalFeeE').val();
    $.ajax({
        url: "/Home/EditReceipt?id=" + parseInt($('#HdnId').val()) + '&duefees=' + Math.abs(Due),
        data: ReObj,
        type: "POST",
        dataType: "json",
        success: function () {
            $('#EditReceiptModal').modal('hide');
            alert("Receipt NO : " + $('#ReceiptNoE').val() + " is Edited");

            location.reload();
        }

    });
}

$(document).on('keyup', '#TotalFeeE', function () {
    var FessInWord = inWords($('#TotalFeeE').val());
    $('#FeesInWordsE').val(FessInWord);
})

$(document).on('focusout', '#STDIDE', function () {
    if ($('#STDIDE').val() != "") {
        $.get('/Home/GetStudentBySTDID?id=' + $('#STDIDE').val(), function (res) {
            if (res == "null") {
                $('#StudentNameE').val("");
                $('#CourceE').val("");
            }
            $('#StudentNameE').val(res.Student_name);
            $('#CourceE').val(res.Cource);

            TotalFees = res.Total_fees;
        })
    }
    else {
        $('#StudentNameE').val("");
        $('#CourceE').val("");
    }

})

$(document).on('change', '#DateRange', function () {
    if (count != 0) {
        Table.destroy();
        GetAllReceipts();
    }

})

function deleteReceipt(id) {
    swal({
        title: "Are you sure?",
        text: "You Want To DELETE This Student",
        icon: "warning",
        buttons: true,
        dangerMode: true,
    })
        .then((willDelete) => {
            if (willDelete) {
                $.ajax({
                    url: "/Home/RemoveReceipt?id=" + id,
                    type: "POST",
                    dataType: "json",
                    success: function () {
                        swal("Receipt DELETED", {
                            icon: "success",
                        });
                        Table.destroy();
                        GetStudentList();
                    }
                });

            } else {
                swal("Receipt Is Not Deleted");
            }
        });

}
