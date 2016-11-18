var uName = document.getElementById('uname');
var passwd = document.getElementById('pword');
var elems = [uName, passwd];

loginValidate();

for(el in elems){
  elems[el].addEventListener('input', function(event){
    loginValidate();
  });
}

function loginValidate(){
  for(var i=0; i < elems.length; i++){
    if(validator.isOfLength(elems[i].value, 2)){
      elems[i].setCustomValidity('');
    } else {
      elems[i].setCustomValidity('Must contain at least 2 characters.');
    }
  }
}



