
function callAjaxJson(url, dataToSend, _success, _error, showLoading) {
    header={'authorization':'Bearer '+getCookie('access_token')}
    if (showLoading == undefined || showLoading == true){
        showMask();
    }
    var _logouthandler = function (response) {
        if (showLoading == undefined || showLoading == true) {
            console.log("Called hideMask");
            hideMask();
        }
        if (typeof (response.sessiontimeout) != "undefined") {
            //alert('Your session has timed out. Please login and retry.');
            swal({
                    title: 'Session alert!',
                    text: 'Your session has timed out. Please login and retry.',
                    timer: 3000,
                    type: 'warning'
                }).then(
                    function () { console.log('I was closed'); window.location.href = "/"; },
                    // handling the promise rejection
                    function (dismiss) {
                        if (dismiss === 'timer') {
                            console.log('I was closed by the timer'); window.location.href = "/";
                        }
                    }
                )
         
            return;
        } else if (typeof (response.NoAccess) != "undefined") {
            //alert('You are not having access to this page.');
            swal({
                title: 'Access Denied!',
                text: 'You are not having access to this page.',
                timer: 3000,
                type: 'warning'
            }).then(
                   function () { console.log('I was closed'); window.location.href = response.RedirectUrl; },
                   // handling the promise rejection
                   function (dismiss) {
                       if (dismiss === 'timer') {
                           console.log('I was closed by the timer'); window.location.href = response.RedirectUrl;
                       }
                   }
               )
            return;
        }
        else {
            _success(response);
            
        }
    };
    var _errorhandler = function (response) {
         hideMask();
        if (typeof (response.sessiontimeout) != "undefined") {
            swal('Information', 'Your session has timed out. Please login and retry.', 'info');// alert('Your session has timed out. Please login and retry.');
            window.location.href = "/";
            return;
        }
        else {
            _error(response);
        }
    };
    $.ajax({
        type: "POST",
        url: url,
        data: dataToSend,
        headers:header,
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: _logouthandler,
        error: _errorhandler
 
    });
}
function callAjaxJsonGet(method,url, dataToSend, _success, _error, showLoading,header) {
   
    if (showLoading == undefined || showLoading == true){
        showMask();
    }
    
    var _errorhandler = function (response) {
         hideMask();
        if (response.statusText == "Unauthorized" || response.status==401) {
            swal.fire({
                title: 'Session alert!',
                text: 'Your session has timed out. Please login and retry.',
                timer: 3000,
                type: 'warning'
            }).then(
                function () { console.log('I was closed'); window.location.href = "/"; },
                // handling the promise rejection
                function (dismiss) {
                    if (dismiss === 'timer') {
                        console.log('I was closed by the timer'); window.location.href = "/";
                       } 
                    });
        }
        else {
            _error(response);
        }
    };
    $.ajax({
        type: method,
        url: url,
        data: dataToSend,
        headers:header,
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: _success,
        error: _errorhandler
 
    });
}
function callAjaxFormGet(url, dataToSend, _success, _error, showLoading,header) {
   
    if (showLoading == undefined || showLoading == true){
        showMask();
    }
    
    var _errorhandler = function (response) {
         hideMask();
        if (response.statusText == "Unauthorized" || response.status==401) {
            swal.fire({
                title: 'Session alert!',
                text: 'Your session has timed out. Please login and retry.',
                timer: 3000,
                type: 'warning'
            }).then(
                function () { console.log('I was closed'); window.location.href = "/"; },
                // handling the promise rejection
                function (dismiss) {
                    if (dismiss === 'timer') {
                        console.log('I was closed by the timer'); window.location.href = "/";
                       } 
                    });
        }
        else {
            _error(response);
        }
    };
    $.ajax({
        type: "POST",
        url: url,
        data: dataToSend,
        headers:header,
        processData: false,
        contentType: false,
        success: _success,
        error: _errorhandler
 
    });
}
function showMask() {

    $.LoadingOverlay("show", {
        image: window.location.origin + '/content/images/loading.gif'
        //,fontawesome: "fa fa-spinner fa-spin"
    });
}

function hideMask() {
   // $.LoadingOverlay("hide", true);
}

function setCookie(cname, cvalue, exdays) {
    var d = new Date();
    d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
    var expires = "expires="+d.toUTCString();
    document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
  }
  
  function getCookie(cname) {
    var name = cname + "=";
    var ca = document.cookie.split(';');
    for(var i = 0; i < ca.length; i++) {
      var c = ca[i];
      while (c.charAt(0) == ' ') {
        c = c.substring(1);
      }
      if (c.indexOf(name) == 0) {
        return c.substring(name.length, c.length);
      }
    }
    return "";
  }


function printDiv(id) {
    var divName= id;

     var printContents = document.getElementById(divName).innerHTML;
     var originalContents = document.body.innerHTML;

     document.body.innerHTML = printContents;

     window.print();

     document.body.innerHTML = originalContents;
}

function formatDateToString(date){
    // 01, 02, 03, ... 29, 30, 31
    var dd = (date.getDate() < 10 ? '0' : '') + date.getDate();
    // 01, 02, 03, ... 10, 11, 12
    var MM = ((date.getMonth() + 1) < 10 ? '0' : '') + (date.getMonth() + 1);
    // 1970, 1971, ... 2015, 2016, ...
    var yyyy = date.getFullYear();
 
    // create the format you want
    return (dd + "-" + MM + "-" + yyyy);
 }