var ccForm = document.forms[0];
var ccCustName = document.getElementById('cust-name');
var ccNum    = document.getElementById('cc-number');
var ccCsvCode  = document.getElementById('csv-code');
var ccMonthExp = document.getElementById('exp-month');

ccCustName.setCustomValidity('Please enter a valid cardholder name.');
ccNum.setCustomValidity('Please enter a valid credit card number.');
ccCsvCode.setCustomValidity('CSV code should be at least 3 digits.');

ccCustName.addEventListener('input', function(event){
  if(validator.moreWordsThan(ccCustName.value, 2)){
    ccCustName.setCustomValidity('');
  } else {
    ccCustName.setCustomValidity('Please enter a valid cardholder name.');
  }
});

ccNum.addEventListener('input', function(event){
  if(validator.isCreditCard(ccNum.value.toString())){
    ccNum.setCustomValidity('');
  } else {
    ccNum.setCustomValidity('Please enter a valid credit card number.');
  }
});

ccCsvCode.addEventListener('input', function(event){
  if(validator.isOfLength(ccCsvCode.value, 3)){
    ccCsvCode.setCustomValidity('');
  } else {
    ccCsvCode.setCustomValidity('CSV code should be at least 3 digits.');
  }
});

ccForm.addEventListener('submit', function(event){
  if(validator.isAfterToday(getExpireDate(document.getElementsByTagName('select')))){
    ccMonthExp.setCustomValidity('');
    
  } else {
    ccMonthExp.setCustomValidity('This date has already passed.');
    event.preventDefault();
  }
});


function getExpireDate(selectArray){
  var mo = selectArray[0].value;
  var yr  = selectArray[1].value;
  return new Date(yr, mo);
}


