this.addEventListener('message', function (e) {
  var data = e.data;
  var PESEL = "";
  console.log(data[0]);
  console.log(data[1]);
  console.log(data[2]);
  console.log(data[3]);
  PESEL = data[0] + data[1] + data[2] + data[3];
  this.postMessage(validate(PESEL));
}, false);

function validate(pesel) {
  
  var weight = new Array(1, 3, 7, 9, 1, 3, 7, 9, 1, 3);
  var sum = 0;

  for (var i = 0; i < weight.length; i++) {
    sum += (parseInt(pesel.substring(i, 1)) * weight[i]);
  }

  var check = (sum % 10) - 10;
  console.log(check);

  if(check == 10){
    check = 0;
  }

  if(check == pesel.substr(pesel.length - 1, 1)){
    console.log("ok");
    return "Prawidłowy PESEL";    
  } else {
    console.log("Not ok");
    return "Nieprawidłowy PESEL";
  }
}