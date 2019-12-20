function CreateUser() {
    _success = function (res) {
        console.log(res);
        if (!!res) {
            Swal.fire('Success!', 'You are register Successfully', 'success').then((result) => {
                if (result.value) {
                    window.location = "/";
                }
            });
        }
		else{
			Swal.fire('Error!', 'Please Try Again', 'error');
		}
    }
    _error = function (error) {
        console.log(error);
Swal.fire('Error!', 'Please Try Again', 'error');
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
		else{
			Swal.fire('Error!', 'Please Try Again', 'error');
		}
    }
    _error = function (error) {
        console.log(error);
Swal.fire('Error!', 'Please Try Again', 'error');
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