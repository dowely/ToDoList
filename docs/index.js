var items = [];

function loadData(){
	
	fillArray('dane.json', iHandleResponse);
	
	function fillArray(url,cFunction){
		var xhttp = new XMLHttpRequest();
		xhttp.onreadystatechange = function() {
			if(this.readyState == 4 && this.status == 200) {
				cFunction(this);
			}
		};
		xhttp.open("GET", url, true);
		xhttp.send();
	}
	
	function iHandleResponse(xhttp) {
		var rawData = xhttp.responseText;
		items = JSON.parse(rawData);
		
		for(x in items) {
		show(items[x]);
		}
	}
}

function tryPost(){
	
	var xhttp = new XMLHttpRequest();
	xhttp.open("POST","/save",false);
	xhttp.setRequestHeader("Content-type", "text/plain");
	xhttp.send(JSON.stringify(items));
}

/*
var items = [{txt : "Oddać auto do mechanika" , checkMark : false},{txt : "Zrobić zakupy w Biedronce" , checkMark : true},{txt : "Odebrać garnitur z pralni" , checkMark : false}];
*/

/*funkcja tymczasowa
function showArray(){
	var tabela = "";
	for (x in items) {
		tabela += items[x].txt + " , ";
	}
	document.getElementById('demo').innerHTML = tabela;
}
*/

/*
function onPageLoad(){
	for(x in items) {
		show(items[x]);
	}
}
*/


function badInput(txt,wiersz) {
	document.getElementById('errorBox').classList.remove('hidden');
	document.getElementsByTagName('p')[0].innerHTML = txt;
	if(!(wiersz === undefined)) powielonyInput(wiersz);
}

function addItem(){
	var item = document.getElementById('item').value;
	resecik();
	var powielonyWiersz = checkForRepetition(item);
	
	if (item == '') {
		badInput('Musisz coś wpisać');
	} else if (powielonyWiersz == 0){
		document.getElementById('errorBox').classList.add('hidden');
		clearRepetitionFocus();
		var line = new Entry(item);
		items.push(line);
		show(line);
	} else badInput('Ta pozycja już jest na liście', powielonyWiersz);
}

function removeItem(wiersz, obj){
	for (x in items){
		if (items[x].txt == obj.txt){
			items.splice(Number(x),1);
			break;
		}
	}
	var liToBeRemoved = wiersz.parentNode;
	document.getElementById('theList').removeChild(liToBeRemoved);
}

function powielonyInput(indeks){
	clearRepetitionFocus();
	var rows = document.getElementById('theList').children;
	rows[indeks-1].style.boxShadow = "0px 0px 6px 3px #EA313D inset";
}

function clearRepetitionFocus(){
	var rows = document.getElementById('theList').children;
	for(var k=0 ; k < rows.length ; k++ ) rows[k].style.boxShadow = "none";
}

function checkForRepetition(userInput){
	for (x in items) {
		if (items[x].txt.toUpperCase() == userInput.toUpperCase()) return Number(x)+1;	
	}
	return 0;
}

function Entry(item){
	this.txt = item;
	this.checkMark = false;
}

function show(objLine){
	var ul = document.getElementById('theList');
	var li = document.createElement('LI');
	
	var span = document.createElement('SPAN');
	span.innerHTML = (objLine.txt);
	span.addEventListener('click', function() {changeStatus(this, objLine);});
	
	var iconCancel = document.createElement('I');
	iconCancel.classList.add('material-icons');
	iconCancel.innerHTML = "cancel";
	iconCancel.addEventListener('click', function () {removeItem(this, objLine);});
	
	var iconCheck = document.createElement('I');
	iconCheck.classList.add('material-icons' , 'hidden');
	iconCheck.innerHTML = "check";
	
	li.appendChild(iconCheck);
	li.appendChild(span);
	li.appendChild(iconCancel);
	ul.appendChild(li);
	
	if (objLine.checkMark == true) {
		span.style.textDecoration = 'line-through';
		iconCheck.classList.toggle('hidden');
	}
}

function changeStatus(wiersz, obj){
	for (x in items) {
		if (items[x].txt == obj.txt){
			if(items[x].checkMark == false){
				items[x].checkMark = true;
				wiersz.style.textDecoration = 'line-through';
				wiersz.parentElement.firstChild.classList.toggle('hidden');
			}else {
				items[x].checkMark = false;
				wiersz.style.textDecoration = 'none';
				wiersz.parentElement.firstChild.classList.toggle('hidden')
			}
		}
	}	
}

function resecik(){
	document.getElementById('item').value = '';
}

function enterKey(e){
	if (e.key == "Enter") addItem();
}
var lorem = "It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for 'lorem ipsum' will uncover many web sites still in their infancy. Various versions have evolved over the years, sometimes by accident, sometimes on purpose (injected humour and the like).";