


function GetDatatable() {

    $("#example1").DataTable({
        "responsive": true, "lengthChange": false, "autoWidth": false,
        "buttons": ["copy", "csv", "excel", "pdf", "print", "colvis"]
    }).buttons().container().appendTo('#example1_wrapper .col-md-6:eq(0)');
}

var count = 0;
$(document).ready(function () {
    
    $('#DateRange').daterangepicker();
    $('#DateRange').val("");
    count++;   
    if (count != 0) {
        GetStudentList();
    }
    $('#StudentList').removeClass("active");
    $('#AdmissionForm').removeClass("active");
    $('#recipet').removeClass("active");
    $('#Reports').removeClass("active");
    $('#StudentList').addClass("active");

})
var DataCount = 0;
var Table = "";
function GetStudentList() {
   
    var StartDate = "";
    var EndDate = "";
    var isfiltered = 0;
    if ($('#DateRange').val() != "") {
        isfiltered = 1;
        var date = $('#DateRange').val().split("-");
        split = date[0].split('/');
        split2 = date[1].split('/');
        StartDate = [split[1], split[0], split[2]].join('/');
        EndDate = [split2[1], split2[0], split2[2]].join('/');
    }
    debugger
    if (user == "admin") {
        Table = $("#example1").DataTable(
            {
                deferRender: true,
                "responsive": true, "lengthChange": true, "autoWidth": false,
                /*       "buttons": ["copy", "csv", "excel", "pdf", "print", "colvis"],*/
                "ajax": {
                    "url": '/Home/GetStudentList?minDate=' + StartDate + " &maxDate=" + EndDate + "&stdType=" + $('#SelectStdType').val(),
                    "type": "GET",
                    "datatype": "json"
                },

                "columns": [
                    {
                        "data": "STD_ID",
                        "width": "5%",
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
                        }
                    },
                    { "data": "Total_fees", "width": "5%" },
                    { "data": "Due_fees" },
                    { "data": "Student_mobile" },
                    {
                        "data": "Registration_date",
                        mRender: function (data, type, full) {
                            var RegisterDate = new Date(parseInt(data.substr(6)));
                            RegisterDate = RegisterDate.toLocaleDateString();
                            split = RegisterDate.split('/');
                            RegisterDate = [split[1], split[0], split[2]].join('/');
                            return RegisterDate;
                        }
                    },
                    {
                        "data": "Start_date",
                        mRender: function (data, type, full) {
                            var split = data.split('-');
                            var StartDate = [split[2], split[1], split[0]].join('/');
                            return StartDate;
                        }
                    },
                    {
                        "data": "ID",
                        mRender: function (data, type, full) {

                            return `<a style="width:1%" onclick="MoveStudent(${data})" > <center><i class="fas fa-box-open"></i></center></a>`;
                        }
                    },
                    {
                        "data": "ID",
                        mRender: function (data, type, full) {

                            return `<a style="width:1%" onclick="GetStudentById(${data})"><center><i class="fas fa-edit"></i></center></a>
                        <a style="width:1%" onclick="deleteStudent(${data})"><center><i class="far fa-trash-alt"></i></center></a>`;
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
                        /* title : ,*/
                        exportOptions: {
                            columns: [0, 1, 2, 3, 4, 5, 6, 7]
                        }
                    },
                    {
                        extend: 'pdf',
                        className: 'btn btn-dark rounded-0',
                        text: '<i class="far fa-file-pdf"></i> Pdf',
                        exportOptions: {
                            columns: [0, 1, 2, 3, 4, 5, 6, 7]
                        }
                    },
                    {
                        extend: 'print',
                        className: 'btn btn-dark rounded-0',
                        text: '<i class="fas fa-print"></i> Print',
                        exportOptions: {
                            columns: [0, 1, 2, 3, 4, 5, 6, 7]
                        }
                    },
                    'colvis'
                ],
                //"initComplete": function (settings, json) {
                //    debugger
                //    GetTotal(TotalPaidFess);
                //}
            }
        );

    }
    else {
        Table = $("#example1").DataTable(
            {
                deferRender: true,
                "responsive": true, "lengthChange": true, "autoWidth": false,
                /*       "buttons": ["copy", "csv", "excel", "pdf", "print", "colvis"],*/
                "ajax": {
                    "url": '/Home/GetStudentList?minDate=' + StartDate + " &maxDate=" + EndDate + "&stdType=" + $('#SelectStdType').val(),
                    "type": "GET",
                    "datatype": "json"
                },

                "columns": [
                    {
                        "data": "STD_ID",
                        "width": "5%",
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
                        }
                    },
                    { "data": "Total_fees", "width": "5%" },
                    { "data": "Due_fees" },
                    { "data": "Student_mobile" },
                    {
                        "data": "Registration_date",
                        mRender: function (data, type, full) {
                            var RegisterDate = new Date(parseInt(data.substr(6)));
                            RegisterDate = RegisterDate.toLocaleDateString();
                            split = RegisterDate.split('/');
                            RegisterDate = [split[1], split[0], split[2]].join('/');
                            return RegisterDate;
                        }
                    },
                    {
                        "data": "Start_date",
                        mRender: function (data, type, full) {
                            var split = data.split('-');
                            var StartDate = [split[2], split[1], split[0]].join('/');
                            return StartDate;
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
                        /* title : ,*/
                        exportOptions: {
                            columns: [0, 1, 2, 3, 4, 5, 6, 7]
                        }
                    },
                    {
                        extend: 'pdf',
                        className: 'btn btn-dark rounded-0',
                        text: '<i class="far fa-file-pdf"></i> Pdf',
                        exportOptions: {
                            columns: [0, 1, 2, 3, 4, 5, 6, 7]
                        }
                    },
                    {
                        extend: 'print',
                        className: 'btn btn-dark rounded-0',
                        text: '<i class="fas fa-print"></i> Print',
                        exportOptions: {
                            columns: [0, 1, 2, 3, 4, 5, 6, 7]
                        }
                    },
                    'colvis'
                ],
                //"initComplete": function (settings, json) {
                //    debugger
                //    GetTotal(TotalPaidFess);
                //}
            }
        );

    }
    
    //$.get('/Home/GetStudentList?minDate=' + StartDate + "&maxDate=" + EndDate + "&stdType=" + $('#SelectStdType').val(), function (res) {
    //    debugger
    //    var data = res;
    //    var htmlString = "";
    //    for (var i = 0; i < data.length; i++) {
    //        var RegisterDate = new Date(parseInt(data[i]["Registration_date"].substr(6)));
    //        RegisterDate = RegisterDate.toLocaleDateString();
    //        split = RegisterDate.split('/');
    //        RegisterDate = [split[1], split[0], split[2]].join('/');
    //        split = data[i]["Start_date"].split('-');
    //        StartDate = [split[2], split[1], split[0]].join('/');
    //        htmlString += ` <tr>
    //                <td>${data[i]["STD_ID"].toUpperCase()}</td>
    //                <td>${data[i]["Student_name"].toUpperCase()}</td>
    //                <td>${data[i]["Cource"].toUpperCase()}</td>
    //                <td>${data[i]["Total_fees"]}</td>
    //                <td>${data[i]["Due_fees"]}</td>       
    //                <td>${data[i]["Student_mobile"]}</td>
    //                <td>${RegisterDate}</td>                    
    //                <td>${StartDate}</td>                                                          
    //                <td style="width:1%" onclick="MoveStudent(${data[i]["ID"]})"><center><i class="fas fa-box-open"></i></center></td>                    
    //                <td style="width:1%" onclick="GetStudentById(${data[i]["ID"]})"><center><i class="fas fa-edit"></i></center></td>                    
    //      </tr>`
    //    }
    //    $('#StudentListBody').html(htmlString);

    //    if (DataCount == 0) {
    //        GetDatatable();
    //    }
    //    DataCount++;


    //})
}

//function getStudentListWithFilter() {
//    debugger

//    $.get('/Home/GetStudentWithFilter?minDate=' + StartDate +'&maxDate='+EndDate, function (res) {
//        debugger
//        var data = res;
//        var htmlString = "";
//        for (var i = 0; i < data.length; i++) {
//            htmlString += ` <tr>
//                    <td>${data[i]["STD_ID"]}</td>
//                    <td>${data[i]["Student_name"]}</td>
//                    <td>${data[i]["Cource"]}</td>
//                    <td>${data[i]["Total_fees"]}</td>
//                    <td>${data[i]["Student_mobile"]}</td>
//                    <td>${data[i]["Start_date"]}</td>                    
//                    <td style="width:1%" onclick="MoveStudent(${data[i]["ID"]})"><center><i class="fas fa-box-open"></i></center></td>                    
//          </tr>`
//        }
//        $('#StudentListBody').html(htmlString);     
//    })

//}

$(document).on('click', '#ClearDateRange', function () {
    $('#DateRange').val("");
    if (count != 0) {
        Table.destroy();
        GetStudentList();
    }
})


$(document).on('change', '#DateRange', function () {
    if (count != 0) {
        Table.destroy();
        GetStudentList();
    }

})

function MoveStudent(id) {
    var htmlString = ` <div class="col-4">
                        <button type="button" id="Passout" onclick="Passout(${id})" class="btn btn-block btn-warning btn-lg">PASSOUT</button>
                    </div>
                    <div class="col-4">
                        <button type="button" id="Dropout" onclick="Dropout(${id})" class="btn btn-block btn-danger btn-lg">DROPOUT</button>
                    </div>
                     <div class="col-4">
                        <button type="button" id="Dropout" onclick="Running(${id})" class="btn btn-block btn-danger btn-lg">Running</button>
                    </div>`
    $('#MoveStd').html(htmlString);
    $('#modal-default').modal({
        show: true,
        closeOnEscape: true
    });

}

function Passout(id) {
    $("#modal-default").modal('hide');
    swal({
        title: "Are you sure?",
        text: "You Want To Move This Student To Passout",
        icon: "warning",
        buttons: true,
        dangerMode: true,
    })
        .then((willDelete) => {
            if (willDelete) {
                $.ajax({
                    url: "/Home/MoveStudent?id=" + id + "&moveTo=PASSOUT",
                    type: "POST",
                    dataType: "json",
                    success: function () {
                        swal("Student Moved To Passout", {
                            icon: "success",
                        });
                        Table.destroy();
                        GetStudentList();
                    }
                });

            } else {
                swal("Moving Process Canceld");
            }
        });
}

function Dropout(id) {
    $("#modal-default").modal('hide');
    swal({
        title: "Are you sure?",
        text: "You Want To Move This Student To Dropout",
        icon: "warning",
        buttons: true,
        dangerMode: true,
    })
        .then((willDelete) => {
            if (willDelete) {
                $.ajax({
                    url: "/Home/MoveStudent?id=" + id + "&moveTo=DROPOUT",
                    type: "POST",
                    dataType: "json",
                    success: function () {
                        swal("Student Moved To Dropout", {
                            icon: "success",
                        });
                        Table.destroy();
                        GetStudentList();
                    }
                });

            } else {
                swal("Moving Process Canceld");
            }
        });
}

function Running(id) {
    $("#modal-default").modal('hide');
    swal({
        title: "Are you sure?",
        text: "You Want To Move This Student To Running",
        icon: "warning",
        buttons: true,
        dangerMode: true,
    })
        .then((willDelete) => {
            if (willDelete) {
                $.ajax({
                    url: "/Home/MoveStudent?id=" + id + "&moveTo=RUNNING",
                    type: "POST",
                    dataType: "json",
                    success: function () {
                        swal("Student Moved To Running", {
                            icon: "success",
                        });
                        Table.destroy();
                        GetStudentList();
                    }
                });

            } else {
                swal("Moving Process Canceld");
            }
        });
}
var STDID = "";
function GetStudentById(id) {
    $.get('/Home/GetStudentById?id=' + id, function (res) {
        
        var RegisterDate = new Date(parseInt(res.Registration_date.substr(6)));
        RegisterDate = RegisterDate.toLocaleDateString();
        split = RegisterDate.split('/');
        if (split[0].length == 1) {
            RegisterDate = [split[2], "0" + split[0], split[1]].join('-');
        }
        if (split[1].length == 1) {
            RegisterDate = [split[2], split[0], "0" +split[1]].join('-');
        }
        if (split[0].length == 1 && split[1].length == 1) {
            RegisterDate = [split[2], "0" +split[0], "0" + split[1]].join('-');
        }
       
        $('#RegistrationDate').val(RegisterDate.toString());
        $('#StartDate').val(res.Start_date);
        $('#STDID').val(res.STD_ID);
        $('#StudentName').val(res.Student_name);    
        $('#Cource').val(res.Cource);
        $('#StudentMO').val(res.Student_mobile);
        $('#ParentsMo').val(res.Parents_mobile);
        $('#TotalFee').val(res.Total_fees);       
        $("input[name=FeesType][value=" + res.Fees_Payment + "]").attr('checked', 'checked');
        $("input[name=Gender][value=" + res.Gender + "]").attr('checked', 'checked');
        $('#DOB').val(res.DOB);
        $('#Age').val(res.Age);
        $('#HidId').val(res.ID);
        $("#STDID").prop('disabled', false);
        STDID = res.STD_ID;
    })
    $('#EditModal').modal('show');
}

$(document).on('change', '#SelectStdType', function () {
    isfiltered = 1;
    Table.destroy();
    GetStudentList();
})

$(document).on('click', '#btnEditStudent', function () {
    ValidateRegistration();
})

function ValidateRegistration() {
    var flag = 0;
    if ($('#RegistrationDate').val() == "") {
        alert("PLease Enter Registration Date");
    }
    else if ($('#StartDate').val() == "") {
        alert("PLease Enter Start Date");
    }
    else if ($('#STDID').val() == "") {
        alert("PLease Enter STD ID");
    }
    else if ($('#StudentName').val() == "") {
        alert("PLease Enter Student Name");
    }
    else if ($('#Cource').val() == "") {
        alert("PLease Enter Course");
    }
    else if ($('#TotalFee').val() == "") {
        alert("PLease Enter Total Fee");
    }
    else if ($('#DOB').val() == "") {
        alert("PLease Enter D.O.B");
    }   
    else if ($('#StudentMO').val() != "") {
        if ($('#StudentMO').val().length != 10) {
            alert("Please Enter 10 Digit Number in Student Mo")
        }
        else {
            flag = 1;
        }

    }
    else if ($('#ParentsMo').val() != "") {
        if ($('#ParentsMo').val().length != 10) {
            alert("Please Enter 10 Digit Number in Parents Mo")
        }
        else {
            flag = 1;
        }
    }
    if (flag == 1) {
        if (STDID != $('#STDID').val()) {
            $.get('/home/IsStudentIdAlreadyExsist?id=' + $('#STDID').val(), function (res) {
                if (res == 1) {
                    ResgisterStudent();
                }
                else {
                    alert("STD Alerday Exist!!");
                }
            })
        }
        else {
            ResgisterStudent();
        }
       
       
    }
}

function ResgisterStudent() {
    var stdObj = {
        Registration_date: $('#RegistrationDate').val(),
        Start_date: $('#StartDate').val(),
        STD_ID: $('#STDID').val(),
        Student_name: $('#StudentName').val(),
        Cource: $('#Cource').val(),
        Student_mobile: parseInt($('#StudentMO').val()),
        Parents_mobile: parseInt($('#ParentsMo').val()),
        Total_fees: $('#TotalFee').val(),
        Fees_Payment: $('input[name="FeesType"]:checked').val(),
        Status: "RUNNING",
        DOB: $('#DOB').val(),
        Age: $('#Age').val(),
        Gender: $('input[name="Gender"]:checked').val()
    };

    $.ajax({
        url: "/Home/EditStudent?id=" + $('#HidId').val(),
        data: stdObj,
        type: "POST",
        dataType: "json",
        success: function () {
            $('#EditModal').modal('hide');
                alert("STD ID : " + $('#STDID').val() + " Name : " + $('#StudentName').val() + " is Edited");
            Table.destroy();
            GetStudentList();
        }
       
    });
}
$(document).on('change', '#DOB', function () {
    var birthday = new Date($('#DOB').val());
    var ageDifMs = Date.now() - birthday.getTime();
    var ageDate = new Date(ageDifMs); // miliseconds from epoch
    var Age = Math.abs(ageDate.getUTCFullYear() - 1970);
    $('#Age').val(Age);
})

function deleteStudent(id) {
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
                    url: "/Home/RemoveStudent?id=" + id,
                    type: "POST",
                    dataType: "json",
                    success: function () {
                        swal("Student DELETED", {
                            icon: "success",
                        });
                        Table.destroy();
                        GetStudentList();
                    }
                });

            } else {
                swal("Student Is Not Deleted");
            }
        });

}


