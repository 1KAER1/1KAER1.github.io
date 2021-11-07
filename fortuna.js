
var game = {
  zdobyte: 0,
  zycia: 1,
}

//alert(data[0]['country']);
//var elem = document.getElementById("panstwa");
//elem.innerHTML = data[0]['country'];

//alert(data.length);
//alert(data[0]['country'][2]);

for (var i = 0; i < data[0]["country"].length; i += 1) {
  //alert(data[0]['country'][i]);
}



addElement("wrap");
//LISTENERS

document.getElementById("graj").addEventListener("click", Sprawdz_Litery);
//alert(game.zycia);


//FUNKCJE
function Sprawdz_Litery() {
  var liter = document.getElementById("wpisz_litere").value;
  alert(liter);
  alert(getRandomInt(10, 20));
}


function addElement(mydiv) {

  my_div = document.getElementById(mydiv);

  for (var i = 0; i <= data[66]["country"].length - 1; i++) {
    newDiv2 = document.createElement("span");
    newDiv2.classList.add("letter")
    newDiv2.innerHTML = data[66]["country"][i];
    document.body.appendChild(newDiv2)
  }

  
}

function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min;
}
