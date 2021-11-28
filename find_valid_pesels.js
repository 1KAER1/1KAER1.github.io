this.addEventListener('message', function(e) {
    var data = e.data;
    this.postMessage(dateGenerator(data));
  }, false);

  function dateGenerator(data){
      var array = [];
      var startDate = new Date(1930,0,1);
      var endDate = new Date(2050,0,1);
      var year; var day; var month; var pesel = "";
      while(startDate.getTime() !== endDate.getTime()){
        day = startDate.getDate();
        month = startDate.getMonth()+1;
        year = startDate.getFullYear();
        pesel = year.toString().substr(2,3) + fillZero(month.toString()) + fillZero(day.toString()) + data;
        if(validate(pesel)){
            array.push(pesel);
        }
        startDate.setTime(startDate.getTime() + 86400000);
      }
      return array;
  }

  function fillZero(num){
    var blank = "00";
    var result ="";
    return result = blank.substr(0,2-num.length)+num;
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