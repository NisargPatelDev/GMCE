

function GetDatatable() {
    
    $("#example1").DataTable({
            "responsive": true, "lengthChange": false, "autoWidth": false,
            "buttons": ["copy", "csv", "excel", "pdf", "print", "colvis"]
        }).buttons().container().appendTo('#example1_wrapper .col-md-6:eq(0)');           
}

var count = 0;
$(document).ready(function () {
    debugger
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

function GetStudentList() {
    debugger
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
    $.get('/Home/GetStudentList?minDate=' + StartDate +"&maxDate="+EndDate, function (res) {
        debugger
        var data = res;
        var htmlString = "";
        for (var i = 0; i < data.length; i++) {
            var RegisterDate = new Date(parseInt(data[i]["Registration_date"].substr(6)));
            RegisterDate = RegisterDate.toLocaleDateString();
            split = RegisterDate.split('/');
            RegisterDate = [split[1], split[0], split[2]].join('/'); 
            split = data[i]["Start_date"].split('-');
            StartDate = [split[2], split[1], split[0]].join('/');                         
            htmlString +=` <tr>
                    <td>${data[i]["STD_ID"].toUpperCase()}</td>
                    <td>${data[i]["Student_name"].toUpperCase()}</td>
                    <td>${data[i]["Cource"].toUpperCase()}</td>
                    <td>${data[i]["Total_fees"]}</td>
                    <td>${data[i]["Student_mobile"]}</td>
                    <td>${RegisterDate}</td>                    
                    <td>${StartDate}</td>                    
                    <td>${data[i]["Gender"]}</td>                    
                    <td style="width:1%" onclick="MoveStudent(${data[i]["ID"]})"><center><i class="fas fa-box-open"></i></center></td>                    
          </tr>`            
        }
        $('#StudentListBody').html(htmlString);
        if (isfiltered != 1) {
            GetDatatable();
        }
           
        
       
    })
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
        GetStudentList();
    }   
})


$(document).on('change', '#DateRange', function () {
    if (count != 0) {
        GetStudentList();    
    }
   
})

function MoveStudent(id) {
    var htmlString = ` <div class="col-6">
                        <button type="button" id="Passout" onclick="Passout(${id})" class="btn btn-block btn-warning btn-lg">PASSOUT</button>
                    </div>
                    <div class="col-6">
                        <button type="button" id="Dropout" onclick="Dropout(${id})" class="btn btn-block btn-danger btn-lg">DROPOUT</button>
                    </div>`
    $('#MoveStd').html(htmlString);
    $('#modal-default').modal({
        show: true,
        closeOnEscape: true
    });

}

function Passout(id) {    
    swal({
        title: "Are you sure?",
        text: "You Want To Move This Student To Passout",
        icon: "warning",
        buttons: true,
        dangerMode: true,
    })
        .then((willDelete) => {
            if (willDelete) {
                swal("Student Moved To Passout", {
                    icon: "success",
                });
            } else {
                swal("Your imaginary file is safe!");
            }
        });
}
