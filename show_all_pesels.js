this.addEventListener('message', function(e) {
    var data = e.data;
    this.postMessage(calculate(data));
  }, false);


  function generateStartPesel(data){
    var PESEL = "";
    PESEL = data[0].substr(2,3) + data[1] + data[2];
    return PESEL;
  }

  function validate(pesel){
    let weight = [1,3,7,9,1,3,7,9,1,3];
    let sum =0;
    let controlNum = parseInt(pesel.substring(10, 11));
  
    for(let i = 0; i<weight.length;i++){
      sum += (parseInt(pesel.substring(i, i + 1)) * weight[i]);
    }
    sum = sum % 10;
    if((10 - sum) % 10 === controlNum){
      return true;
    }else return false;
  }

  function generateUniqueNumber(num){
    var blank = "00000";
    var result ="";
    return result = blank.substr(0,5-num.length)+num;
}

function calculate(data){
    var array = [];
    var start = generateStartPesel(data);
    var pesel ="";
    for (var i = 0;i<100000; i++){
        pesel = start + generateUniqueNumber(i);
        if(validate(pesel)) array.push(pesel);
        pesel = "";
    }
    return array;
}