function CreateUser() {
    _success = function (res) {
        console.log(res);
        if (res.Success) {
            Swal.fire('Success!', res.Message, 'success').then((result) => {
                if (result.value) {
                    window.location = "/";
                }
            });
        }
    }
    _error = function (error) {
        console.log(error);

    }
    var req = new Object();
    req.Name = $('#regName').val();
    req.email = $('#regUsername').val();
    req.mobile = $('#regMobile').val();
    req.password = $('#regPassword').val();
    var dataToSend = JSON.stringify(req);
    callAjaxJson('/users', dataToSend, _success, _error, false);

}

function Login() {
    _success = function (res) {
        console.log(res);
        
        if (!!res) {
            if (!!res.accessToken && !!res.refreshToken) {
                //document.cookie='access_token='+res.accessToken;
                setCookie('access_token', res.accessToken, 2);
                //console.log(getCookie('access_token'));
                
                window.location.href="/dashboard";
                
            }
        }
    }
    _error = function (error) {
        console.log(error);

    }
    var req = new Object();
    req.email = $('#username').val();
    req.password = $('#password').val();
    var dataToSend = JSON.stringify(req);
    callAjaxJson('/auth', dataToSend, _success, _error, false);

}
function logout(){
    setCookie('access_token', '', 0);
    //console.log(getCookie('access_token'));
    window.location.href="/";
}