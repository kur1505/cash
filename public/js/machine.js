function getPrevReading(){
    header={'authorization':'Bearer '+getCookie('access_token')}
    var machineNo=$('#drpMachineNo').val();
    if(!!machineNo){
        _success=function(result){
            if(result.length!=0){
                $('#txtprevreading').val(result[0].currentReading);
            }
            else{
                $('#txtprevreading').val(0);
            }
        }
        _error=function(err){
            Swal.fire('Success!', 'Please try Again', 'info');
        }
        callAjaxJsonGet('GET','/productbymachineNo',{'machineNo':machineNo},_success,_error,false,header);
    }
    else{
        Swal.fire('Error!', 'Please Select Machine', 'error');
    }
}
function Addreading() {
    header={'authorization':'Bearer '+getCookie('access_token')}
    _success = function (res) {
        console.log(res);
        if (res.Success) {
            Swal.fire('Success!', res.Message, 'success').then((result) => {
                if (result.value) {
                    location.reload(true);
                }
            });
        }
    }
    _error = function (error) {
        console.log(error);

    }
    var req = new FormData();

    req.append ('machineNo', $('#drpMachineNo').val());
    req.append ('dateTime' , $('#txtdate').val());
    req.append ('currentReading' , $('#txtcurrentreading').val());
    req.append ('previousReading' , $('#txtprevreading').val());
    req.append ('total' , $('#txttotalbalance').val());
    req.append ('ProductImage' , $( '#imgInp' )[0].files[0]);

    callAjaxFormGet('/product', req, _success, _error, false,header);

}
function Addmachine() {
   
    _success = function (res) {
        console.log(res);
        if (res.Success) {
            Swal.fire('Success!', res.Message, 'success').then((result) => {
                if (result.value) {
                    location.reload(true);
                }
            });
        }
    }
    _error = function (error) {
        console.log(error);

    }
    var req = new Object();
    req.machineName = $('#txtmachinename').val();
    var dataToSend = JSON.stringify(req);
    callAjaxJson('/machine', dataToSend, _success, _error, false);
}

function deleteMachine(Id){
    Swal.fire({
        title: 'Are you sure?',
        text: 'You will not be able to recover this imaginary file!',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Yes, delete it!',
        cancelButtonText: 'No, keep it'
      }).then((result) => {
        if (result.value) {
            if(!!Id){
                header={'authorization':'Bearer '+getCookie('access_token')}
                _dashsuccess=function(dashRes){
                    if(dashRes.Success){
                        Swal.fire('Deleted!','Your imaginary file has been deleted.','success').then((res)=>{
                            if(res.value){
                              location.reload(true);
                            }
                        });
                    }
                    else{
                        Swal.fire('Error','Please try Again','error')
                    }
                                             
                      }
                      _dasherror = function (dasherror) {
                        Swal.fire('Error','Please try Again','error')
                      }
                      callAjaxJsonGet('DELETE','/machine/'+Id,'',_dashsuccess,_dasherror,false,header);   
            }
            else{
                Swal.fire('Error','Please try Again','error')
            }
        } else if (result.dismiss === Swal.DismissReason.cancel) {
          Swal.fire(
            'Cancelled',
            'Your imaginary file is safe :)',
            'error'
          )
        }
      })
   

}