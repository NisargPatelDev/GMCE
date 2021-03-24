
$(document).ready(function () {
    $('#StudentList').removeClass("active");
    $('#AdmissionForm').removeClass("active");
    $('#recipet').removeClass("active");
    $('#Reports').removeClass("active");
    $('#AdmissionForm').addClass("active");    
    GetStdId();

})

function GetStdId() {
    $.get('/Home/GetStdId', function (res) {
        $('#STDID').val(res);

    })
}

$(document).on('click', '#bntRegister', function () {
    ValidateRegistration();

})

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
        Due_fees: $('#TotalFee').val(),
        Fees_Payment: $('input[name="FeesType"]:checked').val(),
        Status: "RUNNING",
        DOB: $('#DOB').val(),
        Age: $('#Age').val(),
        Gender: $('input[name="Gender"]:checked').val()
    };

    $.ajax({
        url: "/Home/RegisterStudent",
        data: stdObj,
        type: "POST",
        dataType: "json",
        success: function (result) {
            if (result != "0") {
                alert("STD ID : " + $('#STDID').val() + " Name : " + $('#StudentName').val() + " is registerd");
                ClearRegistrationForm()
            }
            else {
                $('#STDID').val("");
                alert("STD ID already Exsist")
            }

        },
        error: function (errormessage) {
            alert(errormessage.responseText);
        }
    });
}

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
    else  {
        ResgisterStudent();
    }

    if (flag == 1) {
        ResgisterStudent();
    }
}
function ClearRegistrationForm() {
    $('#RegistrationDate').val("");
    $('#StartDate').val("");
    $('#STDID').val("");
    $('#StudentName').val("");
    $('#Cource').val("");
    $('#StudentMO').val("");
    $('#ParentsMo').val("");
    $('#TotalFee').val("");
    $('#Age').val("");
    $('#DOB').val("");
    GetStdId();
    $("#STDID").prop('disabled', true);
}

$(document).on('change', '#RegistrationDate', function () {
    $("#STDID").prop('disabled', false);
})

$(document).on('change', '#DOB', function () {
    var birthday = new Date($('#DOB').val());
    var ageDifMs = Date.now() - birthday.getTime();
    var ageDate = new Date(ageDifMs); // miliseconds from epoch
    var Age = Math.abs(ageDate.getUTCFullYear() - 1970);
    $('#Age').val(Age);
})


