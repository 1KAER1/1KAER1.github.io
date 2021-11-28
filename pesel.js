function validateOnePesel(){
    var worker = new Worker('validate_one_pesel.js');
  
    worker.addEventListener('message', function(e) {
      var pesels = document.getElementById("pesels");
      pesels.innerHTML = e.data;
    }, false);
  
    var year = document.getElementById("year").value;
    var month = document.getElementById("month").value;
    var day = document.getElementById("day").value;
    var pesel = document.getElementById("numbers").value;
    worker.postMessage([year,month,day,pesel]);
  }
  
  function showAllPesels(){
    var worker1 = new Worker('show_all_pesels.js');
  
    worker1.addEventListener('message', function(e) {
      var pesels = document.getElementById("pesels");
      pesels.innerHTML = e.data.join("\n");
    }, false);
  
    var year = document.getElementById("year").value;
    var month = document.getElementById("month").value;
    var day = document.getElementById("day").value;
  
    worker1.postMessage([year,month,day]);
  }
  
  function byNumber(){
    var worker2 = new Worker('find_valid_pesels.js');
  
    worker2.addEventListener('message', function(e) {
      var pesels = document.getElementById("pesels");
      pesels.innerHTML = e.data.join("\n");
    }, false);
  
    var pesel = document.getElementById("numbers").value;
  
    worker2.postMessage(pesel);
  }