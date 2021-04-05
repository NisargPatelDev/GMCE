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
    var TotalDue = 0;
    var countData = 0;
    var StartDate = "";
    var EndDate = "";
    var tStartDate = "";
    var tEndDate = "";
    var isfiltered = 0;
    if ($('#DateRange').val() != "") {
        isfiltered = 1;
        var date = $('#DateRange').val().split("-");
        split = date[0].split('/');
        split2 = date[1].split('/');
        StartDate = [split[0], split[1], split[2]].join('/').trim();
        EndDate = [split2[0], split2[1].trim(), split2[2]].join('/').trim();
        tStartDate = [split[1], split[0], split[2]].join('/').trim();
        tEndDate = [split2[1], split2[0].trim(), split2[2]].join('/').trim();
    }
    Table = $("#example1").DataTable(
        {
            deferRender: true,
            "responsive": true, "lengthChange": true, "autoWidth": false,
            /*       "buttons": ["copy", "csv", "excel", "pdf", "print", "colvis"],*/
            "ajax": {
                "url": "/Home/GetOutStandingReport?minDate=" + StartDate + "&maxDate=" + EndDate,
                "type": "GET",
                "datatype": "json"
            },           
            "columns": [
                {
                    "data": "STD_ID",
                    mRender: function (data, type, full) {
                        return data.toUpperCase();
                    }
                },
                {
                    "data": "Student_name", "width": "25%",
                    mRender: function (data, type, full) {
                        return data.toUpperCase();
                    }
                },
                {
                    "data": "Cource",
                    mRender: function (data, type, full) {
                        return data.toUpperCase();
                    }},
                { "data": "Total_fees" },
                {
                    "data": "Due_fees",
                    mRender: function (data, type, full) {
                        if (countData == 0) {
                            TotalDue += parseInt(data);
                        }
                        return data;
                    }
                },
                {
                    "data": "ID",
                    mRender: function (data, type, full) {                      
                        return "";
                    }
                },
                {
                    "data": "ID",
                    mRender: function (data, type, full) {
                        return "";
                    }
                },
                {
                    "data": "ID",
                    mRender: function (data, type, full) {
                        countData++;
                        return "";
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
                    title: "GMP OUTSTANDING REPORT (" + tStartDate + "-" + tEndDate + ")",
                    
                },
                {
                    extend: 'pdf',
                    className: 'btn btn-dark rounded-0',
                    text: '<i class="far fa-file-pdf"></i> Pdf',
                    title: "GMP OUTSTANDING REPORT (" + tStartDate + "-" + tEndDate + ")",
                },
                {
                    extend: 'print',
                    className: 'btn btn-dark rounded-0',
                    text: '<i class="fas fa-print"></i> Print',
                    title: "GMP OUTSTANDING REPORT (" + tStartDate + "-" + tEndDate + ")",
                }
            ],
            "initComplete": function (settings, json) {
                
                GetTotal(TotalDue);
            }
        }
    );


}

function GetTotal(TotalDue) {

    Table.row.add({
        "STD_ID": "TOTAL DUE :",
        "Student_name": "",        
        "Cource": " ",
        "Total_fees": "",
        "Due_fees": TotalDue,
        "ID": " ",
        "ID": " ",
        "ID": " ",

    }).draw();


    var htmlString = `TOTAL DUE : ${TotalDue}`
    $('#TotalCollection').html(htmlString);

}

$(document).on('change', '#DateRange', function () {
    if (count != 0) {
        Table.destroy();
        GetAllReceipts();
    }

})
