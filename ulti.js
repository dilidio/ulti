var isGameEnd = 0;
var leaveFlag = 0;

var lastChoose = 0;
var	gameStatus = 1;
var	playedCards0 = null;
var	playedCards1 = null;
var playedCards2 = null;
var currentPlayer = 0;
var lastChoose = 0;
var wasChoosed = 0;
var	isBlocked = 0;
var cards = new Array();
var bgtypes = new Array();
var gtypes = new Array();
var contra = new Array();
var playercards = new Array();
var tallon = new Array();
var pname1;
var pname2;
var pname3;
var isGame = 0;
var contraLevel = 1;
var xtab = 25;
var cardDistance = 36;
var gtypeLast = -1;
var playerCardNo = 0;
var isSelectedCard = 0;
var cwidth = 60;
var cheight = 94;
var selectedCardNo = 0;
var dx = 0;
var dy = 0;
var isSelfKill = 0;
var hcolor = -1;
var selectedCard = null;
var adu = 0;
var newUserName = null;
var chooser = null;
var user = " ";
var colorFlag = 0;
var resultFlag = 0;
var talonFlag = 0;
var contraFlag = 0;
var fin = 0;
var result = new Array();
var isgroupmember = 0;
var gtType = 0;
var gtFlag = 0;
var missingColor = [[0, 0, 0], [0, 0, 0], [0, 0, 0], [0, 0, 0]];
var mixCount = 0;
var isScore = 0;
var isOpen = 0;
var lastContraPlayer = 0;
var last20Check = 0;
var diff = 0;
var handOvers0 = null;
var handOvers1 = null;
var prevGtype = 0;
var openplayercards2 = new Array();
var openplayercards3 = new Array();
var op = null;
var p2cardno = 0;
var p3cardno = 0;
var isLocked = 0;
var lastex = 0;
var lastey = 0;

class Card {
  constructor(cardname, cardcolor, colororder, noncolororder) {
    this.cardname = cardname;
    this.cardcolor = cardcolor;
	this.colororder = colororder;
	this.noncolororder = noncolororder;
	this.x = 0;
	this.y = 0;
  }
  
  getCardName() {
    return this.cardname;
  }	
  getCardColor() {
    return this.cardcolor;
  }	
  getColorOrder() {
    return this.colororder;
  }	
  getNonColorOrder() {
    return this.noncolororder;
  }	
  getX() {
    return this.x;
  }	
  getY() {
    return this.y;	
  }	
}

class ContraObject {

    constructor() {
        this.level = [1, 1, 1,1];
		this.contraType = 0;
		this.loosed = 0;
    }

    getGameType() {
        return this.contraType;
    }
    getContra() {
        return this.level[0];
    }
    getPlayerContra(pno) {
        return this.level[pno];
    }
    getPlayerContra2() {
        return this.level[currentPlayer];
    }
    getLoosedStatus() {
        return this.loosed;
    }

}

function initContra(c, gtype) {	
	c.level[0] = 1;
	c.level[1] = 1;
	c.level[2] = 1;
	c.level[3] = 1;
	c.contraType = gtype;
	c.loosed = 0;
}

function setLoosedStatus(c, b) {
    c.loosed = b;
}

function setContra(c, contraLevel) {
	var i = 0;
	c.level[0] = contraLevel;
	if (c.contraType == 'B' || c.contraType == 'C') {
		for (i = 1; i <= 3; i++) {
			if (i == currentPlayer) {
				c.level[currentPlayer] = contraLevel;
			}
			if (i == lastChoose) {
				c.level[i] = contraLevel;
			}
			if (currentPlayer == lastChoose && c.level[i] * 2 == contraLevel) {
				c.level[i] = contraLevel;
			}
		}
	}
	else {
		c.level[1] = contraLevel;
		c.level[2] = contraLevel;
		c.level[3] = contraLevel;
	}
}

class BasicGameType {
    constructor(name, code, value) {
        this.name = name;
        this.value = value;
        this.code = code;
    }
    getCode() {
        return this.code;
    }
    getName() {
        return this.name;
    }
    getValue() {
        return this.value;
    }
}

class GameType {

    constructor(name, properties, value) {
		this.name = name;
		this.properties = properties;
		this.value = value;
    }
    getName() {
        return this.name;
    }
    getProperties() {
        return this.properties;
    }
    getValue() {
        return this.value;
    }

}



class ResultObject  {
  constructor(t, p1, p2, p3) {
	  this.t = t;
	  this.p1 = p1;
	  this.p2 = p2;
	  this.p3 = p3;
  }
}


const sleep3 = (milliseconds) => {
  return new Promise(resolve => setTimeout(resolve, milliseconds))
}


function sendGameTextMsg() {
	var a = document.getElementById("newgamemsg");
	if (a.value && a.value.length != 0) {
			addAction("msg", a.value);
	}
	a.value = "";

}


function addCard(cn, cc, co, cv) {
	var a = new Card(cn, cc, co, cv);
	cards.push(a);
}

function addBGType(x, y, z) {
	var a = new BasicGameType(x, y, z);
	bgtypes.push(a);
}

function addGType(x, y, z) {
	var a = new GameType(x, y, z);
	gtypes.push(a);
}

function addContraObject() {
	var a = new ContraObject();
	contra.push(a);
}

function loadGame() {
	if (cards.length == 0) {
		addCard("pa", 1, 4, 5);
		addCard("pf", 1, 5, 6);
		addCard("pk", 1, 6, 7);
		addCard("pasz", 1, 8, 8);
		addCard("p10", 1, 7, 4);
		addCard("p9", 1, 3, 3);
		addCard("p8", 1, 2, 2);
		addCard("p7", 1, 1, 1);
		addCard("za", 2, 4, 5);
		addCard("zf", 2, 5, 6);
		addCard("zk", 2, 6, 7);
		addCard("zasz", 2, 8, 8);
		addCard("z10", 2, 7, 4);
		addCard("z9", 2, 3, 3);
		addCard("z8", 2, 2, 2);
		addCard("z7", 2, 1, 1);
		addCard("ma", 3, 4, 5);
		addCard("mf", 3, 5, 6);
		addCard("mk", 3, 6, 7);
		addCard("masz", 3, 8, 8);
		addCard("m10", 3, 7, 4);
		addCard("m9", 3, 3, 3);
		addCard("m8", 3, 2, 2);
		addCard("m7", 3, 1, 1);
		addCard("ta", 4, 4, 5);
		addCard("tf", 4, 5, 6);
		addCard("tk", 4, 6, 7);
		addCard("tasz", 4, 8, 8);
		addCard("t10", 4, 7, 4);
		addCard("t9", 4, 3, 3);
		addCard("t8", 4, 2, 2);
		addCard("t7", 4, 1, 1);
		
        addBGType(t_parti, "P", 1);
        addBGType(t_negyasz, "A", 3);
        addBGType(t_negyvenszaz, "N", 4);
        addBGType(t_ulti, "U", 4);
        addBGType(t_betli, "B", 5);
        addBGType(t_huszszaz, "H", 6);
        addBGType(t_duri, "D", 7);
        addBGType(t_negytiz, "T", 9);
        addBGType(t_duri, "C", 7);

		addGType(t_gt1, "P", 10);
		addGType(t_gt2, "1P", 20);
		addGType(t_gt3, "AP", 35);
		addGType(t_gt4, "N", 40);
		addGType(t_gt5, "UP", 45);
		addGType(t_gt6, "B", 50);
		addGType(t_gt7, "H", 60);
		addGType(t_gt8, "AN", 65);
		addGType(t_gt9, "AU", 65);
		addGType(t_gt10, "C", 70);
		addGType(t_gt11, "NU", 75);
		addGType(t_gt12, "1AP", 75);
		addGType(t_gt13, "1N", 80);
		addGType(t_gt14, "AH", 85);
		addGType(t_gt15, "1UP", 95);
		addGType(t_gt16, "HU", 95);
		addGType(t_gt17, "TP", 100);;
		addGType(t_gt18, "1B", 100);
		addGType(t_gt19, "ANU", 105);
		addGType(t_gt20, "ND", 105);
		addGType(t_gt21, "DU", 105);
		addGType(t_gt22, "1H", 120);
		addGType(t_gt23, "AHU", 125);
		addGType(t_gt24, "HD", 125);
		addGType(t_gt25, "TN", 125);
		addGType(t_gt26, "TU", 125);
		addGType(t_gt27, "1AN", 135);
		addGType(t_gt28, "1AU", 135);
		addGType(t_gt29, "1C", 140);
		addGType(t_gt30, "NDU", 145);
		addGType(t_gt31, "TH", 145);
		addGType(t_gt32, "1NU", 155);
		addGType(t_gt33, "HDU", 165);
		addGType(t_gt34, "TNU", 165);
		addGType(t_gt35, "1AH", 175);
		addGType(t_gt36, "THU", 185);
		addGType(t_gt37, "1HU", 195);
		addGType(t_gt38, "1TP", 200);
		addGType(t_gt39, "2B", 200);
		addGType(t_gt40, "1ANU", 215);
		addGType(t_gt41, "1ND", 215);
		addGType(t_gt42, "1DU", 215);
		addGType(t_gt43, "1AHU", 255);
		addGType(t_gt44, "1HD", 255);
		addGType(t_gt45, "1TN", 255);
		addGType(t_gt46, "1TU", 255);
		addGType(t_gt47, "2C", 280);
		addGType(t_gt48, "1NDU", 295);
		addGType(t_gt49, "1TH", 295);
		addGType(t_gt50, "1TNU", 315);
		addGType(t_gt51, "2ND", 315);
		addGType(t_gt52, "2DU", 315);
		addGType(t_gt53, "2HD", 335);
		addGType(t_gt54, "1HDU", 335);
		addGType(t_gt55, "2NDU", 355);
		addGType(t_gt56, "1THU", 375);
		addGType(t_gt57, "2HDU", 375);
		
		addContraObject();
		addContraObject();
		addContraObject();
		
	}

	repaintLoad();
	
	isGameEnd = 0;
	leaveFlag = 0;
	isClosed = 0;

	gameThread();
	showDialog("waitText", 100, 100);

	user = document.getElementById("username").value;
	
	initScreen();
}



function ujJatekos(s) {
	isBlocked = false;
	sendGameAction(s + newUserName);
	hideDialog("finDialog");
    if (colorFlag == 1) {
		showDialog("colorDialog", 126, 60);		
	}
	hideDialog("talonDialog");				
    if (resultFlag == 1) {
		showDialog("resultDialog", 96, 25);		
	}
    if (contraFlag == 1) {
		showDialog("contraDialog", 186, 120);		
	}
    if (gtFlag == 1) {
		showDialog("gtDialog", 106, 120);		
	}

	repaintAll();
}



function setCBoxEnabled(c, a) {
	
	var cb = document.getElementById(c);
	if (cb) {
		if (a == 0){
			cb.disabled = true;			
		}
		else {
			cb.disabled = false;						
		}
	}
}

function setCBoxState(c, a) {
	var cb = document.getElementById(c);
	if (cb) {
		if (a == 1){
			cb.checked = true;			
		}
		else {
			cb.checked = false;						
		}
	}
}

function getCBoxState(c) {
	var ret = 0;
	var cb = document.getElementById(c);
	if (cb) {
		if (cb.checked == true) {
			ret = 1;
		}
	}
	return ret;
}

function kontrazas() {

	hideDialog("contraDialog");

    var s = "KONTRA:";
	if (contraLevel < 10) {
		s += "0" + contraLevel.toString();
	}
	else {
		s += contraLevel.toString();
	}
	
	var c = null;
    if (mixCount > 0) {
		if (getCBoxState("cbox0") == 1) {
			c = contra.at(0);
			setContra(c, contraLevel)
			s = s + c.getGameType()
		}
		if (mixCount > 1) {
			if (getCBoxState("cbox1") == 1) {
				c = contra.at(1);
				setContra(c, contraLevel)
				s = s + c.getGameType()
			}
			if (mixCount > 2) {
				if (getCBoxState("cbox2") == 1) {
					c = contra.at(2);
					setContra(c, contraLevel)
					s = s + c.getGameType()
				}
			}
		}
	}

	sendGameAction(s);
	gameStatus = 3;
	setContraText();
	currentPlayer = 0;


}

function setContraText() {
	var s = t_kontrak;
	var i = 0;
	var c = null;
	for (i = 0; i < mixCount; i++) {
		c = contra.at(i);
		if (c.getPlayerContra2() != 1) {
			s = s + getContraText(c.getPlayerContra2()) +
			 " " + getBGTypeName(c.getGameType()) + " ";
		}
	}
	setContraInfo(s);

}

function getBGTypeName(c) {
	var i = 0;
	var a = null;
	for (i = 0; i < bgtypes.length; i++) {
		a = bgtypes.at(i);
		if (c == a.getCode()) {
			return a.getName();
		}
	}
	return null;
}


function getContraText(l) {
	if (l == 2) {
		return t_kontra;
	}
	else if (l == 4) {
		return t_rekontra;
	}
	else if (l == 8) {
		return t_subkontra;
	}
	else if (l == 16) {
		return t_hirskontra;
	}
	else if (l == 32) {
		return t_mordkontra;
	}
	return " ";

}



function folytatas() {
	hideDialogs2();
	showScore(0);
	hideDialog2("talon2Label");
	tallon = new Array();
	playedCards0 = null;
	playedCards1 = null;
	playedCards2 = null;
	hideDialog2("gi");
	showDialog2("gc");
	repaintAll();
	setMessage(" ");
	setLastGt(" ");
	showDialog("talonLabel", 580, 375);

	showDialog("waitText", 100, 100);
	setPlayerInfo(" ");
	setAduInfo(" ");
	sendGameAction("RS:");

}

function startContraPart() {
	var j = 0;
	var i = 0;
	var g = gtypes.at(gtypeLast);
	var c = null;
	var p1 = g.getProperties();
	var p = null;
	for (j = 0; j < p1.length; j++) {
		p = p1.substr(j, 1);
		if (p != "1" &&	p != "2" &&	p != "3") {
			c = contra.at(i);
			initContra(c, p);
			i++;
		}

	}
	mixCount = i;
	contraLevel = 2;
	startChoosedGame();

}

function startChoosedGame() {
	var j = 0;


	isScore = 0;
	isOpen = 0;
	lastContraPlayer = 0;
	last20Check = 0;

	currentPlayer = lastChoose;
	var c = 0;

	for (j = 0; j < mixCount; j++) {
		c = contra.at(j);
		if ((!isScore == 0 && (c.getGameType() == "P" ||
				c.getGameType() == "A" ||
				c.getGameType() == "T" ||
				c.getGameType() == "D")) ||
				c.getGameType() == "N" ||
				c.getGameType() == "H") {
			isScore = 1;
			showScore(1);
		}
	}

	gameStatus = 3;


	tallon = new Array();
	showDialog("talonLabel", 580, 375);

	repaintAll();

}


function selectAdu(a) {
	adu = a;
	hideDialog("colorDialog");		
	setAduInfo(getColorText(a));
	sendGameAction("ADU:" + a.toString());
	startContraPart();
	currentPlayer = 0;
	setMessage("");
	
}

function repaintResult() {
	var i = 0;
	var s = null;
	var a = null;

	var rcanvas = document.getElementById("resPanel");
	var ctx = rcanvas.getContext("2d");
	
	ctx.fillStyle = '#017A67';
	ctx.fillRect(0, 0, 480, 220);

	
	ctx.strokeStyle = '#ACB50B';
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(1, 1);
    ctx.lineTo(479, 1);
    ctx.moveTo(1, 21);
    ctx.lineTo(479, 21);
    ctx.moveTo(1, 1);
    ctx.lineTo(1, 220);
    ctx.moveTo(1, 218);
    ctx.lineTo(479, 218);
    ctx.moveTo(1, 217);
    ctx.lineTo(479, 217);
    ctx.moveTo(479, 0);
    ctx.lineTo(479, 220);
    ctx.stroke();
	ctx.font = '12px Ariel';


	for (i = 0; i < result.length; i++) {

		a = result.at(i);

		if (fin == 1) {
			if (i == 0) {
				ctx.fillStyle = "#FFFFFF";
			}
			else if (i == 1) {
				ctx.fillStyle = "#000000";			
			}

		}
		else {
			if (i == 0) {
				ctx.fillStyle = "#000000";			
			}
			else if (adu != 0 && i == 1) {
				ctx.fillStyle = "#4E22C6";
				ctx.fillStyle = "#EDAD29";
			}
			else if ((adu == 0 && i == 1) || (adu != 0 && i == 2)) {
				ctx.fillStyle = "#000000";			
				ctx.strokeStyle = "#000000";
				ctx.beginPath();
				ctx.moveTo(3, 45 + i * 20);
				ctx.lineTo(474, 45 + i * 20);
				ctx.stroke();
			}
			else {
				ctx.fillStyle = "#FFFFFF";
			}

			if (i == result.length - 1) {
				ctx.fillStyle = "#FFFFFF";
				ctx.strokeStyle = "#FFFFFF";
				ctx.beginPath();
				ctx.moveTo(3, 25 + i * 20);
				ctx.lineTo(474, 25 + i * 20);
				ctx.stroke();
			}
		}
		

		if (i != 0) {
			if (a.t == "VEGEREDMENY") {
				s = t_vegeredmeny;
			}
			else if (a.t == "ELERTPONTSZAM") {
				s = t_elert;
			}
			else if (a.t == "ELOZOALLAS") {
				s = t_elozo;
			}
			else if (a.t == "PARTI") {
				s = t_parti;
			}
			else if (a.t == "JELENLEGIALLAS") {
				s = t_jelen;
			}
			else if (a.t == "NEGYASZ") {
				s = t_negyasz;
			}
			else if (a.t == "NEGYVENSZAZ") {
				s = t_negyvenszaz;
			}
			else if (a.t == "ULTI") {
				s = t_ulti;
			}
			else if (a.t == "BETLI") {
				s = t_betli;
			}
			else if (a.t == "HUSZSZAZ") {
				s = t_huszszaz;
			}
			else if (a.t == "DURI") {
				s = t_duri;
			}
			else if (a.t == "NEGYTIZ") {
				s = t_negytiz;
			}
			else if (a.t == "FELADOTTPARTI") {
				s = t_feladottparti;
			}
			else if (a.t == "CSENDESSZAZ") {
				s = t_csendesszaz;
			}
			else if (a.t == "CSENDESDURI") {
				s = t_csendesduri;
			}
			else if (a.t == "CSENDESULTI") {
				s = t_csendesulti;
			}
			else if (a.t == "CSENDESNEGYASZ") {
				s = t_csendesnegyasz;
			}
			else {
				s = a.t;
			}
			ctx.fillText(s, 5, 40 + i * 20);
		}
		ctx.fillText(a.p1, 160, 40 + i * 20);
		ctx.fillText(a.p2, 270, 40 + i * 20);
		ctx.fillText(a.p3, 380, 40 + i * 20);


	}


}




function talonMouseEnterAction(e) {
	
	var i = 0;
	var j = 0;
	var l = 0;
	var k = 0;
	var a = null;

	var ctx = tcanvas.getContext("2d");

	ctx.fillStyle = '#017A67';
	ctx.fillRect(0, 0, 480, 260);
	
	ctx.strokeStyle = '#ACB50B';
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(1, 1);
    ctx.lineTo(479, 1);
    ctx.moveTo(1, 21);
    ctx.lineTo(479, 21);
    ctx.moveTo(1, 1);
    ctx.lineTo(1, 260);
    ctx.moveTo(1, 258);
    ctx.lineTo(479, 258);
    ctx.moveTo(1, 257);
    ctx.lineTo(479, 257);
    ctx.moveTo(479, 0);
    ctx.lineTo(479, 260);
    ctx.stroke();

	for (i = 0; i < tallon.length; i++) {
		a = tallon.at(i);
		if (l != a.getCardColor()) {
			l = a.getCardColor();
			j++;
			k = 0;
		}
		ctx.drawImage(document.getElementById(a.getCardName()), 20 + k * 50 + (j - 1) * 10, 30 + (j - 1) * 40);
		k++;
	}

	showDialog("talonDialog", 96, 25);

}

function talonMouseLeaveAction(e) {
	hideDialog("talonDialog");				;
}


function talon2MouseEnterAction(e) {
	
	var i = 0;
	var j = 0;
	var l = 0;
	var k = 0;
	var a = null;

	var ctx = t2canvas.getContext("2d");

	ctx.fillStyle = '#017A67';
	ctx.fillRect(0, 0, 135, 105);
	
	ctx.strokeStyle = '#ACB50B';
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(1, 1);
    ctx.lineTo(135, 1);
    ctx.moveTo(1, 1);
    ctx.lineTo(1, 105);
    ctx.moveTo(1, 103);
    ctx.lineTo(134, 103);
    ctx.moveTo(134, 1);
    ctx.lineTo(134, 105);
    ctx.stroke();

	if (handOvers0 != null) {
		ctx.drawImage(document.getElementById(handOvers0.getCardName()), 5, 5);
	}
	if (handOvers1 != null) {
		ctx.drawImage(document.getElementById(handOvers1.getCardName()), 70, 5);
	}


	showDialog("talon2Dialog", 346, 100);

}

function talon2MouseLeaveAction(e) {
	hideDialog("talon2Dialog");				;
}

function addGameNewMessage(u, s) {
	
	var a = u + ": " + s;
	var msgTBody = document.getElementById("msgGameTBody");
	if (msgTBody) {
		var newTr = document.createElement("tr");
		newTr.setAttribute("class", "msgtrw");
		var newTd = null
		newTd = document.createElement("td");
		newTd.setAttribute("class", "msgtdw");
		var tnode = document.createTextNode(a);
		newTd.appendChild(tnode);
		newTr.appendChild(newTd);
//		msgTBody.appendChild(newTr);
		msgTBody.insertBefore(newTr, msgTBody.firstChild);
	}
}

function addGameNewMessage2(s) {
	
	var msgTBody = document.getElementById("msgGameTBody");
	if (msgTBody) {
		var newTr = document.createElement("tr");
		newTr.setAttribute("class", "msgtrw");
		var newTd = null
		newTd = document.createElement("td");
		newTd.setAttribute("class", "msgtdw");
		var tnode = document.createTextNode(s);
		newTd.appendChild(tnode);
		newTr.appendChild(newTd);
//		msgTBody.appendChild(newTr);
		msgTBody.insertBefore(newTr, msgTBody.firstChild);
	}
}

function hideDialog2(s) {
	var a = document.getElementById(s);
	a.style.visibility = "hidden";
	a.style.display = "none";
}


function hideDialog(s) {
	hideDialog2(s);
	
	if (s == "colorDialog") {
		colorFlag = 0;
	}
	else if (s == "resultDialog") {
		resultFlag = 0;
	}
	else if (s == "talonDialog") {
		talonFlag = 0;
	}
	else if (s == "contraDialog") {
		contraFlag = 0;
	}
	else if (s == "gtDialog") {
		gtFlag = 0;
	}
}

function hideDialogs() {
	hideDialog("resultDialog");
	hideDialog("colorDialog");
}

function hideDialogs2() {
	hideDialog("errorText");
	hideDialog("waitText");
	hideDialog("resultDialog");
	hideDialog("colorDialog");
}

function showDialog2(s) {
	var a = document.getElementById(s);
	a.style.visibility = "visible";
	a.style.display = "block";
}


function showDialog(s, x, y) {
	var a = document.getElementById(s);
	var b = document.body.getBoundingClientRect();
	var e = ucanvas.getBoundingClientRect();
	var posTop = y;
	var posLeft = x;
	a.style.position = "absolute";	
	a.style.top = posTop.toString() + "px";
	a.style.left = posLeft.toString() + "px";
	a.style.visibility = "visible";
	a.style.display = "block";
	
	if (s == "colorDialog") {
		colorFlag = 1;
	}
	else if (s == "resultDialog") {
		resultFlag = 1;
	}
	else if (s == "talonDialog") {
		talonFlag = 1;
	}
	else if (s == "contraDialog") {
		contraFlag = 1;
	}
	else if (s == "gtDialog") {
		gtFlag = 1;
	}

}


function finishGame() {
	addAction("leav", null);
	hideGamewindow();
}

function setPlayer2Name(s) {
	var tD = null;
	tD =  document.getElementById("p2Name");
	if (tD) {
		tnode = tD.firstChild;
		if (tnode) {
			tnode.data = s;
		}
	}
}

function setPlayer3Name(s) {
	var tD = null;
	tD =  document.getElementById("p3Name");
	if (tD) {
		tnode = tD.firstChild;
		if (tnode) {
			tnode.data = s;
		}
	}
}

function getRequestedCard(ccolor, corder) {
	
	var ret = null;
	var c = null;
	var i = 0;
	for (i = 0; i < cards.length; i++) {
		c = cards.at(i);
		if (c.getCardColor() == ccolor && c.getColorOrder() == corder) {
			ret = c;
			break;
		}
	}
	return ret;
}

function sortCards(a, b) {
  if (a.cardcolor * 10 + a.colororder < b.cardcolor * 10 + b.colororder) {
    return -1;
  }
  if (a.cardcolor * 10 + a.colororder > b.cardcolor * 10 + b.colororder) {
    return 1;
  }
  return 0;
}

function sortCards2(a, b) {
  if (a.cardcolor * 10 + a.noncolororder < b.cardcolor * 10 + b.noncolororder) {
    return -1;
  }
  if (a.cardcolor * 10 + a.noncolororder > b.cardcolor * 10 + b.noncolororder) {
    return 1;
  }
  return 0;
}

function setXTab() {
	cardDistance = 36 + 2 * (12 - playerCardNo);

	xtab = (670 - (cardDistance * playerCardNo + 60 - cardDistance)) / 2;
}


function setPositions() {
	var i = 0;
	var c = null;
	setXTab();
	for (i = 0; i < playerCardNo; i++) {
		c = playercards.at(i);
		c.x = xtab + i * cardDistance;
		c.y = 220;
	}
}
function repaintAll() {
	repaint(0, 0, 673, 323);
}

function repaintLoad() {
	var ctx = ucanvas.getContext("2d");
	ctx.fillStyle = '#017A67';
	ctx.fillRect(0, 0, 673, 323);
}

function isIn(xa1, ya1, xa2, ya2, xb, yb) {
	var ret = 0;
	if (xa1 < xb && xa2 > xb && ya1 < yb && ya2 > yb) {
		ret = 1;
	}	
	return ret;
}

function intersects(xa, ya, wa, ha, xb, yb, wb, hb) {
	var ret = 0;
	if (isIn(xa, ya, xa + wa, ya + ha, xb, yb) == 1 ||
		isIn(xa, ya, xa + wa, ya + ha, xb + wb, yb) == 1 ||
		isIn(xa, ya, xa + wa, ya + ha, xb, yb + hb) == 1 ||
		isIn(xa, ya, xa + wa, ya + ha, xb + wb, yb+ hb) == 1
		) {
		ret = 1;
	}	
		
	return ret;
}


function repaint(x, y, w, h) {
	try {
		var i = 0;
		var j = 0;
		var k = 0;
		var a = null;
		
		var ctx = ucanvas.getContext("2d");
		ctx.fillStyle = '#017A67';
		ctx.fillRect(x, y, w, h);
		
		if (isGame == 1) {

			if (gameStatus == 3 && isOpen == 1 &&
					 intersects(x, y, w, h, 520, 10, 88 + cwidth, cheight + 76)) {
				j = 0;
				k = 0;
				for (i = 0; i < openplayercards2.length; i++) {
					a = openplayercards2.at(i);
					ctx.drawImage(document.getElementById(a.getCardName()), 520 + j * 34 + k * 10, 10 + k * 38);
					j++;
					if (j == 3) {
						j = 0;
						k++;
					}
				}
			}
			if (gameStatus == 3 && isOpen == 1 &&
					intersects(x, y, w, h, 5, 10, 88 + cwidth, cheight + 76)) {
				j = 0;
				k = 0;
				for (i = 0; i < openplayercards3.length; i++) {
					a = openplayercards3.at(i);
					ctx.drawImage(document.getElementById(a.getCardName()), 5 + j * 34 + k * 10, 10 + k * 38);
					j++;
					if (j == 3) {
						j = 0;
						k++;
					}
				}
			}

			if (gameStatus == 1 && intersects(x, y, w, h, 255, 20, 100 + cwidth, cheight)) {
				if (handOvers0 == null) {
					ctx.beginPath();
					ctx.lineWidth = "1";
					ctx.strokeStyle = "#ECDB7D";
					ctx.rect(255, 20, cwidth, cheight);
					ctx.stroke();
				}
				else {
					ctx.drawImage(document.getElementById("bg2"), 255, 20);					
				}
				if (handOvers1 == null) {
					ctx.beginPath();
					ctx.lineWidth = "1";
					ctx.strokeStyle = "#ECDB7D";
					ctx.rect(355, 20, cwidth, cheight);
					ctx.stroke();
				}
				else {
					ctx.drawImage(document.getElementById("bg2"), 355, 20);					
				}

			}

			if (isSelectedCard == 1 || intersects(x, y, w, h, xtab, 220, cardDistance * (playerCardNo - 1) + cwidth, cheight)) {
				for (i = 0; i < playerCardNo; i++) {
					if (!(isSelectedCard == 1 && selectedCardNo == i)) {
						a = playercards.at(i);
						if (a) {
							ctx.drawImage(document.getElementById(a.getCardName()), a.getX(), a.getY());
						}
					}
				}
			}

			if (gameStatus == 3 || gameStatus == 50) {

				if (intersects(x, y, w, h, 306, 40, cwidth, cheight)) {			
					if (playedCards0 == null) {
						ctx.beginPath();
						ctx.lineWidth = "1";
						ctx.strokeStyle = "#ECDB7D";
						ctx.rect(306, 40, cwidth, cheight);
						ctx.stroke();
					}
					else {
						ctx.drawImage(document.getElementById(playedCards0.getCardName()), 306, 40);
					}
				}

				if (intersects(x, y, w, h, 206, 20, cwidth, cheight)) {			
					if (playedCards2 == null) {
						ctx.beginPath();
						ctx.lineWidth = "1";
						ctx.strokeStyle = "#B54120";
						ctx.rect(206, 20, cwidth, cheight);
						ctx.stroke();
					}
					else {
						ctx.drawImage(document.getElementById(playedCards2.getCardName()), 206, 20);
					}
				}
				if (intersects(x, y, w, h, 406, 20, cwidth, cheight)) {			
					if (playedCards1 == null) {
						ctx.beginPath();
						ctx.lineWidth = "1";
						ctx.strokeStyle = "#B54120";
						ctx.rect(406, 20, cwidth, cheight);
						ctx.stroke();
					}
					else {
						ctx.drawImage(document.getElementById(playedCards1.getCardName()), 406, 20);
					}
				}
			}

			if (isSelectedCard  == 1) {
				ctx.drawImage(document.getElementById(selectedCard.getCardName()), selectedCard.getX(), selectedCard.getY());
			}
		}
		
	} catch (err) {
		console.log("repaint");
		console.log(err.stack);
	}
	
}


function startGame(s) {

	var i = 0;
	var ccolor = 0;
	var corder = 0;
	var j = 0;

	adu = 0;
	
	isgroupmember = 1;

	contraLevel = 1;

	xtab = 25;
	cardDistance = 36;
	playedCards0 = null;
	playedCards1 = null;
	playedCards2 = null;
	handOvers0 = null;
    handOvers1 = null;
    fillChoice("gtype", -1);

	currentPlayer = 0;
	setContraInfo(" ");

	gtypeLast = -1;
	lastChoose = 0;
	gameStatus = 1;
	playercards = new Array();
	hideDialog2("gi");
	showDialog2("gc");
    setLastGt(" ");
	hideDialog2("gi");
	hideDialog("gtDialog");
	hideDialog("colorDialog");
	hideDialog("contraDialog");
	hideDialog("resultDialog");
	hideDialog2("talonLabel");
	hideDialog2("giveupDialog");
	hideDialog2("giveupPartyDialog");
	hideDialog2("finDialog");
	isBlocked = 0;
	setScore(" ");
	

	for (i = 0; i < s.length; i += 2) {
		ccolor = parseInt(s.substr(i, 1));
		corder = parseInt(s.substr(i + 1, 1));

		playercards.push(getRequestedCard(ccolor, corder));
		j++;
	}

    playerCardNo = j;

	playercards.sort(sortCards);

	setPositions();
	
	hideDialog("waitText");
	showDialog("talonLabel", 580, 375);
	showScore(1);
	setScore(t_pont + "0");
	tallon = new Array();
	openplayercards2 = new Array();
	openplayercards3 = new Array();

	repaintAll();

}

function setContraText2(c, b) {
	var ct = document.getElementById(c);
	if (ct) {
		var tnode = ct.firstChild;
		if (tnode) {
			tnode.data = b;
		}
	}
}


function addCardsToTallon() {
	tallon.push(playedCards0);
	tallon.push(playedCards1);
	tallon.push(playedCards2);
	if (adu != 0) {
		tallon.sort(sortCards);
	}
	else {
		tallon.sort(sortCards2);		
	}

}

function setScore(s) {
	var sc = document.getElementById("score");
	if (sc) {
		var tnode = sc.firstChild;
		if (tnode) {
			tnode.data = s;
		}
	}
}

function showScore(a) {
	var sc = document.getElementById("score");
	if (sc) {
		if (a == 1) {
			sc.style.visibility = "visible";
			sc.style.display = "block";
		}
		else {
			sc.style.visibility = "hidden";
			sc.style.display = "none";
		}
	}
}

function setContraInfo(s) {
	var sc = document.getElementById("contraInfo");
	if (sc) {
		var tnode = sc.firstChild;
		if (tnode) {
			tnode.data = s;
		}
		else {
			tnode = document.createTextNode(s);
			sc.appendChild(tnode);			
		}
	}
}

function setAduInfo(s) {
	var sc = document.getElementById("aduInfo");
	if (sc) {
		var tnode = sc.firstChild;
		if (tnode) {
			tnode.data = t_adu + s;
		}
		else {
			tnode = document.createTextNode(t_adu + s);
			sc.appendChild(tnode);
			
		}
	}
}

function setGtInfo(s) {
	var sc = document.getElementById("gtInfo");
	if (sc) {
		var tnode = sc.firstChild;
		if (tnode) {
			tnode.data = s;
		}
		else {
			tnode = document.createTextNode(s);
			sc.appendChild(tnode);			
		}
	}
}

function setPlayerInfo(s) {
	var sc = document.getElementById("playerInfo");
	if (sc) {
		var tnode = sc.firstChild;
		if (tnode) {
			tnode.data = t_kezdo + s;
		}
		else {
			tnode = document.createTextNode(t_kezdo + s);
			sc.appendChild(tnode);			
		}
	}
}

function setPlayOutScreen() {
	gameStatus = 2;
	repaint(180, 85, 100 + cwidth, cheight);
	hideDialog2("gc");
	showDialog2("gi");
	var g = gtypes.at(gtypeLast);
	setGtInfo(t_kivalasztott + g.getName());
	setPlayerInfo(t_bemondo + chooser);
	setAduInfo(" ");
	setContraInfo(t_kontrak);
}

function deleteCard(o, ccolor, corder) {
	var i = 0;
	var j = 0;
	var c = null;
	for (i = 0; i < o.length; i++) {
		c = o.at(i);
		if (c.getCardColor() == ccolor &&
			  c.getColorOrder() == corder) {
			j = i;
			break;
		}
	}

	var nb = o.splice(j, 1);

}


async function gameThread() {
	
	var msg = null;
	var s = null;
	var t = null;
	var r = null;
	var p1 = null;
	var p2 = null;
	var p3 = null;
	var ccolor = 0;
	var corder = 0;
	var i = 0;
	var j = 0;
	var l = 0;
	var flag = 0;
	var resultNo = 0;
	var g = null;
	var cb = null;
	var c = null;
	var bgt = null;
	var cbt = null;
	
	while (isGameEnd == 0 && isSelfKill == 0) {
		
		if (getGameActionCount() != 0) {	

			u = getGameActionUser();
			msg = getNextGameAction();

			if (!(msg.startsWith("CARDS:") ||
				 msg.startsWith("NAME2:") ||
				 msg.startsWith("NAME3:") ||
				 msg.startsWith("NOFO:") ||
				 msg.startsWith("KIDO:") ||
				 msg.startsWith("KICK:") ||
				 msg.startsWith("CURR:") ||
				 msg.startsWith("OTHER:") ||
				 msg.startsWith("SCORE:") || 
				 msg.startsWith("S2:") ||
				 msg.startsWith("S3:") ||
				 msg.startsWith("OP:") ||
				 msg.startsWith("FAD:") ||
				 msg.startsWith("CGU:") ||
				 msg.startsWith("HO:"))) {
				if (msg.startsWith("CSEL:") ||
					 msg.startsWith("OSEL:")) {
					await sleep3(1200);
				}
				else {
					await sleep3(900);
				}
			}


			if (isClosed == 0 && isBlocked == 0) {
				removeGameAction();
			}
			if (msg.startsWith("WPARTI:")) {
				await sleep3(800);
			}

			if (msg.startsWith("CARDS:")) {
				s = msg.substring(6);
				isGame = 1;
				startGame(s);
			}
			else if (msg.startsWith("NAME2:")) {
				pname2 = msg.substring(6);
				setPlayer2Name(pname2);
			}
			else if (msg.startsWith("NAME3:")) {
				pname3 = msg.substring(6);
				setPlayer3Name(pname3);
			}
			else if (msg.startsWith("HUSZ:")) {
				setMessage(u + t_husz);
			}
			else if (msg.startsWith("NEGY:")) {
				setMessage(u + t_negyven);
			}
			else if (msg.startsWith("KIDO:")) {
				addAction("leav", null);
				addNewMessage(t_kidobtak);
				hideGamewindow();
			}
			else if (msg.startsWith("NWUS:")) {
				isBlocked = 1;
				newUserName = msg.substring(5);
				var p1 = document.getElementById("finLabel");
				if (p1) {
					var tnode = p1.firstChild;
					if (tnode) {
						tnode.data = t_beallhat + newUserName + ")?";
					}
				}
				var b1 = document.getElementById("finButton2");				
				if (isGame == 1) {
					b1.style.visibility = "visible";
					b1.style.display = "block";;
				}
				else {
					b1.style.visibility = "hidden";
					b1.style.display = "none";;
				}
				hideDialog2("colorDialog");				
				hideDialog2("resultDialog");			
				hideDialog2("contraDialog");						
				hideDialog2("gtDialog");						
				hideDialog2("talon2Dialog");						

				showDialog("finDialog", 126, 120);
			}
			if (isGame == 1) {
				if (msg.startsWith("CURR:")) {
					currentPlayer = 1;
					setMessage(t_onkezdketto);
					hcolor = -1;
				}
				else if (msg.startsWith("S2:")) {
					setPlayer2Name(msg.substring(3));
				}
				else if (msg.startsWith("S3:")) {
					setPlayer3Name(msg.substring(3));
				}
				else if (msg.startsWith("TC0:")) {
					s = msg.substring(4);
					ccolor = parseInt(s.substr(0, 1));
					corder = parseInt(s.substr(1, 1));
					handOvers0 = getRequestedCard(ccolor, corder);
					handOvers0.y = 20;
					handOvers0.x = 255;
					repaintAll();
				}
				else if (msg.startsWith("TC1:")) {
					s = msg.substring(4);
					ccolor = parseInt(s.substr(0, 1));
					corder = parseInt(s.substr(1, 1));
					handOvers1 = getRequestedCard(ccolor, corder);
					handOvers1.y = 20;
					handOvers1.x = 355;
					repaintAll();
				}
				else if (msg.startsWith("SELECT:")) {
					s = msg.substring(7);
					gtypeLast = parseInt(s);
					g = gtypes.at(gtypeLast);
					setMessage(u + ": " + g.getName());
					fillChoice("gtype", gtypeLast);
					setLastGt(u + ": " + g.getName());
					wasChoosed = 1;
					lastChoose = 0;
				}
				else if (msg.startsWith("TAKE:")) {
					handOvers0 = null;
					handOvers1 = null;
					setMessage(u + t_felvette);
					repaintAll();
				}
				else if (msg.startsWith("PASS:")) {
					nextGtype();
					setMessage(u + ": " + t_passz);
					setLastGt(u + ": " + t_passz2);
					fillChoice("gtype", gtypeLast);
					wasChoosed = 1;
					lastChoose = 0;
					repaintAll();
				}
				else if (msg.startsWith("NOTTAKE:")) {
					setMessage(u + t_passzolt);
					repaintAll();
				}
				else if (msg.startsWith("CSEL:")) {
					currentPlayer = 1;
					setMessage(t_onkovetkezik);
					takeCards();
				}
				else if (msg.startsWith("OSEL:")) {
					currentPlayer = 0;
					setMessage(msg.substring(5) + t_maskovetkezik);
				}
				else if (msg.startsWith("SCORE2:")) {
					setPlayer2Name(pname2 + ": " + msg.substring(7));
				}
				else if (msg.startsWith("SCORE3:")) {
					setPlayer3Name(pname3 + ": " + msg.substring(7));
				}
				else if (msg.startsWith("OTHER:")) {
					setMessage(msg.substring(6) + t_maskezd);
					hcolor = -1;
				}
				else if (msg.startsWith("ADU:")) {
					s = msg.substring(4);
					setPlayOutScreen();
					adu = parseInt(s);
					if (adu != 0) {
						setMessage(t_adu + getColorText(adu));
						setAduInfo(getColorText(adu));
					}
					else {
						setAduInfo(" ");
					}
					startContraPart();
				}
				else if (msg.startsWith("BEGIN:")) {
					chooser = msg.substring(6);
				}
				else if (msg.startsWith("NEXT:")) {
					setMessage(t_on);
					currentPlayer = 1;
				}
				else if (msg.startsWith("ONEXT:")) {
					currentPlayer = 0;
					setMessage(msg.substring(6) + t_mas);
				}
				else if (msg.startsWith("SC:")) {
					s = msg.substring(3);

					ccolor = parseInt(s.substr(0, 1));
					corder = parseInt(s.substr(1, 1));

					if (playedCards0 == null && playedCards1 == null &&
						  playedCards2 == null) {
						hcolor = ccolor;
					}

					if (u == pname2) {
						playedCards1 = getRequestedCard(ccolor, corder);
						playedCards1.x = 406;
						playedCards1.y = 20;

						if (isOpen == 1) {
							deleteCard(openplayercards2, ccolor, corder);
							repaintAll();
						}
						else {
							repaint(406, 20, cwidth + 1, cheight + 1);
						}
					}
					else if (u == pname3) {
						playedCards2 = getRequestedCard(ccolor, corder);
						playedCards2.x = 206;
						playedCards2.y = 20;

						if (isOpen == 1) {
							deleteCard(openplayercards3, ccolor, corder);
							repaintAll();
						}
						else {
							repaint(206, 20, cwidth + 1, cheight + 1);
						}

					}
				}
				else if (msg.startsWith("CKONT:")) {
					contraLevel = parseInt(msg.substring(6, 8));
					hideDialog2("cbox0");
					hideDialog2("cbox1");
					hideDialog2("cbox2");
					hideDialog2("kontraText0");
					hideDialog2("kontraText1");
					hideDialog2("kontraText2");
					setCBoxState("cbox0", 0);
					setCBoxState("cbox1", 0);
					setCBoxState("cbox2", 0);
					setCBoxEnabled("cbox0", 1);
					setCBoxEnabled("cbox1", 1);
					setCBoxEnabled("cbox2", 1);

					i = 0;
					flag = 0;
					for (j = 0; j < mixCount; j++) {
						flag = parseInt(msg.substring(9 + j * 2, 10  + j * 2));
						if (flag != 2) {
							if (j == 0) {
								cb = "cbox0"
								cbt = "kontraText0"
							}
							else if (j == 1) {
								cb = "cbox1"
								cbt = "kontraText1"
							}
							else if (j == 2) {
								cb = "cbox2"
								cbt = "kontraText2"
							}
							c = contra.at(j);
							setContraText2(cbt, getContraText(contraLevel) +
							  " " + getBGTypeName(c.getGameType()));
							i++;
							showDialog2(cb);
							showDialog2(cbt);
							if (flag == 1) {
								setCBoxEnabled(cb, 0);
								setCBoxState(cb, 1);
							}
						}
					}
					gameStatus = 50;
					showDialog("contraDialog", 186, 120);
				}
				else if (msg.startsWith("KONTRA:")) {
					contraLevel = parseInt(msg.substring(7, 9));

					s = u + ": ";
					for (i = 0; i < msg.length - 9; i++) {
						bgt = msg.substr(9 + i, 1);
						for (j = 0; j < mixCount; j++) {
							c = contra.at(j);
							if (c.getGameType() == bgt) {
								setContra(c, contraLevel);
								s += getContraText(contraLevel) + " " + 
									  getBGTypeName(c.getGameType()) + " ";
								break;
							}
						}
					}
					if (msg.length != 9) {
						setMessage(s);
					}
					setContraText();

				}
				else if (msg.startsWith("SCORE:")) {
					t = t_pont + msg.substring(6);
					setScore(t);
				}
				else if (msg.startsWith("WPARTI:")) {
					hideDialog2("giveupPartyDialog");
					hcolor = -1;
					s = msg.substring(7);
					if (user == s) {
						addCardsToTallon();
						setMessage(t_onvitte);
					}
					else {
						setMessage(s + t_masvitte);
					}
					playedCards0 = null;
					playedCards1 = null;
					playedCards2 = null;
					repaint(206, 20, 201 + cwidth, cheight + 21);

				}
				else if (msg.startsWith("OP:")) {
					s = msg.substring(3);
					op = u;
					isOpen = 1;
					j = 0;
					for (i = 0; i < s.length; i += 2) {
						ccolor = parseInt(s.substring(i, i + 1));
						corder = parseInt(s.substring(i + 1, i + 2));

						if (u == pname2) {
							setOpenCard(openplayercards2, getRequestedCard(ccolor, corder));
						}
						else {
							setOpenCard(openplayercards3, getRequestedCard(ccolor, corder));
						}
						j++;
					}
					if (u == pname2) {
						p2cardno = 9;
						if (adu != 0) {
							openplayercards2.sort(sortCards);
						}
						else {
							openplayercards2.sort(sortCards2);							
						}
					}
					else {
						p3cardno = 9;
						if (adu != 0) {
							openplayercards3.sort(sortCards);
						}
						else {
							openplayercards3.sort(sortCards2);							
						}
					}
					repaintAll();

				}
				else if (msg.startsWith("HO:")) {
					s = msg.substring(3);
					ccolor = parseInt(s.substring(0, 1));
					corder = parseInt(s.substring(1, 2));
					handOvers0 = getRequestedCard(ccolor, corder);
					ccolor = parseInt(s.substring(2, 3));
					corder = parseInt(s.substring(3, 4));
					handOvers1 = getRequestedCard(ccolor, corder);
				}
				else if (msg.startsWith("RES:") || msg.startsWith("FIN:")) {
					if (isgroupmember == 1) {
						result = new Array();
						resultNo = parseInt(msg.substr(4, 1));
						s = msg.substring(5);
						j = 0;
						for (i = 0; i < resultNo; i++) {
							t = " ";
							if ( i != 0) {
								l = parseInt(s.substr(j, 3));
								t = s.substr(j + 3, l);
								j = j + l + 3;
							}
							l = parseInt(s.substr(j, 3));
							p1 = s.substr(j + 3, l);
							j = j + l + 3;
							l = parseInt(s.substr(j, 3));
							p2 = s.substr(j + 3, l);
							j = j + l + 3;
							l = parseInt(s.substr(j, 3));
							p3 = s.substr(j + 3, l);
							j = j + l + 3;
							r = new ResultObject(t, p1, p2, p3);
							result.push(r);
						}

						hideDialog("talonLabel");
						hideDialog("talonDialog");
						hideDialog("contraDialog");
						hideDialog("giveupDialog");
						hideDialog("giveupPartyDialog");
						showScore(0);
						if (msg.startsWith("RES:")) {
							fin = 0;
							showDialog("talon2Label", 470, 240);
						}
						else {
							hideDialog("colorDialog");
							fin = 1;
							playedCards0 = null;
							playedCards1 = null;
							playedCards2 = null;
							hideDialog2("talon2Label");

						}
						isGame = 0;
						repaintAll();
						repaintResult();
						showDialog("resultDialog", 96, 25);
					}
				}
				else if (msg.startsWith("CGU:")) {
					showDialog("giveupDialog", 5, 320);
				}
				else if (msg.startsWith("PGU:")) {
					addGameNewMessage2(u + t_bedobna);
				}
				else if (msg.startsWith("FAD:")) {
					showDialog("giveupPartyDialog", 5, 320);
				}
				else if (msg.startsWith("PAD:")) {
					addGameNewMessage2(u + t_feladna);
				}
			}
				
		}
		else {
			await sleep3(800);
		}
		
	}
	
}

function setSelfKill() {
	isSelfKill = 1;
}

function initScreen() {

	gtypeLast = -1;
	gameStatus = 1;
	handOvers0 = null;
	handOvers1 = null;
	lastChoose = 0;
	gameStatus = 1;
	playedCards0 = null;
	playedCards1 = null;
	playedCards2 = null;
	currentPlayer = 0;
	lastChoose = 0;
	wasChoosed = 0;
	isBlocked = 0;
	isClosed = 0;
	showDialog2("gi");
    hideDialog("gc");
	setLastGt(" ");
    hideDialog("gtDialog");
    hideDialog("contraDialog");
    hideDialog("resultDialog");
    hideDialog("talon2Dialog");
    hideDialog("talonLabel");
    hideDialog("giveupDialog");
    hideDialog("giveupPartyDialog");

	hideDialogs();

	setContraInfo(" ");
	setAduInfo(" ");
	setPlayerInfo(" ");


}



function mouseDownAction(e) {
	downAction(e.offsetX, e.offsetY);
}

function touchStartAction(e) {
	if (e.touches && e.touches.length == 1) {
		var uc = ucanvas.getBoundingClientRect();
		downAction(e.touches[0].clientX - uc.left, e.touches[0].clientY - uc.top);
		lastex = e.touches[0].clientX - uc.left;
		lastey = e.touches[0].clientY - uc.top;
		
	}
}


function downAction(ex, ey) {

	var i;
	var a;

	for (i = 0; i < playerCardNo; i++) {
		a = playercards.at(i);
		if (isIn(a.getX(), a.getY(), a.getX() + cwidth, a.getY() + cheight, ex, ey) == 1) {
			selectedCard = a;
			isSelectedCard = 1;
			selectedCardNo = i;
			dx = ex - a.getX();
			dy = ey - a.getY();
		}
	}
	

};

function touchEndAction(e) {
	upAction(lastex, lastey);
}


function mouseLeaveAction(e) {
	
	if (isSelectedCard == 1) {
		if (e.offsetX < 2 || e.offsetY < 2 || e.offsetX > 670 || e.offsetY > 270) {
			isSelectedCard = 0;
			selectedCard = null;
			setPositions();
			repaintAll();
		}
	}
}

function contextMenuAction(e) {
	e.preventDefault();
}

function clickAction(e) {
	isSelectedCard = 0;
	selectedCard = null;
	setPositions();
	repaintAll();
}

function dblclickAction(e) {
	isSelectedCard = 0;
	selectedCard = null;
	setPositions();
	repaintAll();
}

function mouseMoveAction(e) {
	moveAction(e.offsetX, e.offsetY);
}

function touchMoveAction(e) {
	e.preventDefault();
	if (e.touches && e.touches.length == 1) {
		var uc = ucanvas.getBoundingClientRect();
		moveAction(e.touches[0].clientX - uc.left, e.touches[0].clientY - uc.top);
		lastex = e.touches[0].clientX - uc.left;
		lastey = e.touches[0].clientY - uc.top;
	}
}

function moveAction(ex, ey) {
	
	if (isSelectedCard == 1) {

		var minX = Math.min(ex - dx, selectedCard.getX());
		var minY = Math.min(ey - dy, selectedCard.getY());
		var maxX = Math.max(ex - dx, selectedCard.getX());
		var maxY = Math.max(ey - dy, selectedCard.getY());
		selectedCard.x = ex - dx;
		selectedCard.y = ey - dy;

		repaint(minX - 1, minY - 1, maxX - minX + cwidth + 2, maxY - minY + cheight + 2);


	}
};

function mouseUpAction(e) {
	upAction(e.offsetX, e.offsetY);
}

function upAction(ex, ey) {
	if (isLocked == 0) {
		isLocked = 1;
		
		var showGTDialog = 0;
		
		if (isSelectedCard == 1) {
			var newIdx = 0;
			var i = 0;
			var showGTDialog = 0;
			var isPlayOut = 0;

			if (isSelectedCard == 1) {
				isSelectedCard = 0;
				if (selectedCard.getY() > 180 && selectedCard.getY() < 240) {
					newIdx = mod(selectedCard.getX() - xtab, cardDistance);
					if (newIdx < playerCardNo){
						var na = new Array();
						var a = null;
						for (i = 0; i < newIdx; i++) {
							a = playercards.at(i);
							if (a.getCardName() != selectedCard.getCardName()) {
								na.push(a);
							}
						}
						na.push(selectedCard);
						for (i = newIdx; i < playerCardNo; i++) {
							a = playercards.at(i);
							if (a.getCardName() != selectedCard.getCardName()) {
								na.push(a);
							}
						}	
						
						playercards = na;

					}
					
					setPositions();
					
				}
				else if (gameStatus == 1 && selectedCard.getY() > 0 && selectedCard.getY() < 100 &&
				selectedCard.getX() > 240 && selectedCard.getX() < 430) {
					if ((handOvers0 != null && handOvers1 != null) || currentPlayer != 1) {
						selectedCard.x = xtab + selectedCardNo * cardDistance;
						selectedCard.y = 220;
					}
					else {
						selectedCard.y = 20 ;

						if ((ex < 244 && handOvers0 == null) || handOvers1 != null) {
							handOvers0 = selectedCard;
							selectedCard.x = 180;

							sendGameAction("TC0:" + selectedCard.getCardColor().toString() +
									selectedCard.getColorOrder().toString());

						}
						else {
							handOvers1 = selectedCard;
							selectedCard.x = 280;
							sendGameAction("TC1:" + selectedCard.getCardColor().toString() +
									selectedCard.getColorOrder().toString());

						}

						if (handOvers0 != null && handOvers1 != null) {
							showGTDialog = 1;
						}

						playerCardNo = playerCardNo - 1;
						var nb = playercards.splice(selectedCardNo, 1);
						setPositions();

					}

				}
				else if (gameStatus == 3 && currentPlayer == 1 && playedCards0 == null &&
				selectedCard.getY() > 15 && selectedCard.getY() < 70 &&
				selectedCard.getX() > 280 && selectedCard.getX() < 335 &&
				validateCard()) {

					playedCards0 = selectedCard;
					selectedCard.x = 306;
					selectedCard.y = 40;

					playerCardNo = playerCardNo - 1;
					var nb = playercards.splice(selectedCardNo, 1);

					sendGameAction("SC:" + selectedCard.getCardColor().toString() +
							selectedCard.getColorOrder().toString());
					setPositions();
					currentPlayer = 0;

					isPlayOut = 1;
				}
				else {
					selectedCard.x = xtab + selectedCardNo * cardDistance;
					selectedCard.y = 220;
				}
				selectedCard = null;
				repaintAll();
			}

			if (showGTDialog == 1) {
				if (gtypeLast == gtypes.length - 1) {
					nextGtype();
					chooseAdu();
				}
				else {
					setMessage(t_valaszpassz);
					fillChoice("gtype2", gtypeLast);
			//		document.getElementById("gtype2").value = document.getElementById("gtype").value;
					setGTType(1);
					showDialog("gtDialog", 106, 120);
				}
			}



			if (isPlayOut) {
				setMessage("");
			}
		}
		isLocked = 0;
	}



};

function mod(v, x) {
	var a = 0;
	var b = 0;
	while (a < v) {
		a = a + x;
		b = b + 1;
	}
	return b;
}

function sendGameAction(s) {
	if (isGameEnd == 0) {
		addAction("jmsg", s);
	}
}

function setMessage() {
	
}

function getColorCount(c) {
	var i = 0;
	var ret = 0;
	for (i = 0; i < playerCardNo; i++) {
		a = playercards.at(i);
		if (a.getCardColor() == c) {
			ret++;
		}
	}
	return ret;
}

function getColorText(c) {
	if (c == 1) {
		return t_piros;
	}
	else if (c == 2) {
		return t_zold;
	}
	else if (c == 3) {
		return t_makk;
	}
	else if (c == 4) {
		return t_tok;
	}
	else {
		return " ";
	}
}



function strongestCard(c) {
	var i = 0;
	var ret = -1;
	for (i = 0; i < playerCardNo; i++) {
		a = playercards.at(i);
		if (a && a.getCardColor() == c && a.getColorOrder() > ret) {
			ret = a.getColorOrder();
		}
	}
	return ret;
}

function strongestCard2(c) {
	var i = 0;
	var ret = -1;
	for (i = 0; i < playerCardNo; i++) {
		a = playercards.at(i);
		if (a && a.getCardColor() == c && a.getNonColorOrder() > ret) {
			ret = a.getNonColorOrder();
		}
	}
	return ret;
}

function strongestCardOther(c) {
	var ret = -1;

	if (playedCards1 != null && playedCards1.getCardColor() == c) {		
		ret = playedCards1.getColorOrder();
	}
	if (playedCards2 != null && playedCards2.getCardColor() == c && playedCards2.getColorOrder() > ret) {		
		ret = playedCards2.getColorOrder();
	}

	return ret;
}

function strongestCardOther2(c) {
	var ret = -1;

	if (playedCards1 != null && playedCards1.getCardColor() == c) {		
		ret = playedCards1.getNonColorOrder();
	}
	if (playedCards2 != null && playedCards2.getCardColor() == c && playedCards2.getNonColorOrder() > ret) {		
		ret = playedCards2.getNonColorOrder();
	}

	return ret;
}

function strongestValue(c) {
	var i = 0;
	var ret = -1;
	var cvalue = -1;
	for (i = 0; i < playerCardNo; i++) {
		a = playercards.at(i);
		if (a && a.getCardColor() == c && a.getColorOrder() > cvalue) {
			ret = i;
			cvalue = a.getColorOrder();
		}
	}
	return cvalue;
}



function validateCard() {
	var c = 0;
	var sc = 0;
	var sco = 0;
	if (hcolor == -1) {
		return 1;
	}
	else {
		c = hcolor;

		if (getColorCount(c) == 0) {
			missingColor[c - 1][0] = 1;
			if (adu != 0 && getColorCount(adu) == 0) {
				missingColor[adu - 1][0] = 1;
			}
		}		
		if (selectedCard.getCardColor() != c && getColorCount(c) != 0) {
			setMessage(getColorText(c) + t_hivo);
			return 0;
		}
		if (adu != 0 && getColorCount(c) == 0 && selectedCard.getCardColor() != adu &&
				getColorCount(adu) != 0) {
			setMessage(getColorText(adu) + t_adu2);
			return 0;
		}
		if (selectedCard.getCardColor() == c) {
			if (((playedCards1 == null || playedCards1.getCardColor() != adu) &&
			(playedCards2 == null || playedCards2.getCardColor() != adu)) ||
			c == adu) {
                if (adu != 0) {
					sc = strongestCard(c);
					sco = strongestCardOther(c);
					if (sco > selectedCard.getColorOrder() && sco < sc) {
						setMessage(t_felul);
						return 0;
					}
				}
				else {
					sc = strongestCard2(c);
					sco = strongestCardOther2(c);
					if (sco > selectedCard.getNonColorOrder() && sco < sc) {
						setMessage(t_felul);
						return false;
					}
				}
			}
			else {
				return 1;
			}
		}
		if (selectedCard.getCardColor() == adu && c != adu) {
			sc = strongestCard(adu);
			if ((playedCards1 != null && playedCards1.getCardColor() == adu) ||
			(playedCards2 != null && playedCards2.getCardColor() == adu)) {
				sco = strongestCardOther(adu);
				if (sco > selectedCard.getColorOrder() && sco < sc) {
					setMessage(t_felul);
					return 0;
				}
			}
		}
	}

	return 1;

}

function check20() {
	if ((selectedCard.getColorOrder() == 3 && isCard(selectedCard.getCardColor(), 4))
			|| (selectedCard.getColorOrder() == 4 && isCard(selectedCard.getCardColor(), 3))) {
		if (adu == selectedCard.getCardColor()) {
			sendGameAction("NEGY:" + adu.toString());
			setMessage(t_negyven2);
		}
		else {
			sendGameAction("HUSZ:" + selectedCard.getCardColor().toString());
			setMessage(t_husz2);
		}
	}

}

function setMessage(t) {
	var mt =  document.getElementById("msgText");
	if (mt) {
		var tnode = mt.firstChild;
		if (tnode) {
			tnode.data = t;
		}
	}
	
}

function setCards(s) {
	var i = 0;
	var color = 0;
	var corder = 0;
	var j = 4;
	isSelectedCard = 0;

	for (i = 0; i < s.length; i += 2) {
		ccolor = parseInt(s.substr(i, 1));
		corder = parseInt(s.substr(i + 1, 1));

		playercards.push(getRequestedCard(ccolor, corder));
		j++;
	}

	playerCardNo = j;
	playercards.sort(sortCards);
	setPositions();
	repaintAll();

}


function isCard(c, o) {
	var ret = 0;
	var i = 0;
	var a = null;
	for (i = 0; i < playerCardNo; i++) {
		a = playercards.at(i);
		if (a.getCardColor() == c && a.getColorOrder() == o) {
			ret = 1;
		}
	}
	return ret;
}

function setGtTitle(s) {
	var sc = document.getElementById("gtTitle");
	if (sc) {
		var tnode = sc.firstChild;
		if (tnode) {
			tnode.data = s;
		}
		else {
			tnode = document.createTextNode(s);
			sc.appendChild(tnode);			
		}
	}
}

function setLastGt(s) {
	var sc = document.getElementById("lastGT");
	if (sc) {
		var tnode = sc.firstChild;
		if (tnode) {
			tnode.data = s;
		}
		else {
			tnode = document.createTextNode(s);
			sc.appendChild(tnode);			
		}
	}
}


function setGTType(x) {
	gtType = x;

	if (gtType == 1) {
		showDialog2("selectb");
		showDialog2("passz");
		hideDialog2("tbutton");
		hideDialog2("bbutton");
		setGtTitle(t_valaszthatojatekok);
	}
	else if (gtType == 2) {
		hideDialog2("selectb");
		showDialog2("passz");
		showDialog2("tbutton");
		hideDialog2("bbutton");
		setGtTitle(t_kartyakfelvetele);
	}
	else if (gtType == 3) {
		hideDialog2("selectb");
		hideDialog2("passz");
		showDialog2("tbutton");
		showDialog2("bbutton");
		setGtTitle(t_kartyakfelvetele);
	}
	else {
		showDialog2("selectb");
		hideDialog2("passz");
		showDialog2("tbutton");
		hideDialog2("bbutton");
		setGtTitle(t_kartyakfelvetele);
	}
}

function selectGame() {
	hideDialog("gtDialog");
	var a = document.getElementById("gtype2");
	gtypeLast = gtypeLast + diff + a.selectedIndex + 1;
	fillChoice("gtype", gtypeLast);
	wasChoosed = 1;
	lastChoose = 1;
	var g = gtypes.at(gtypeLast);
	setLastGt(g.getName());

	setMessage(t_valasztott + g.getName());

	sendGameAction("SELECT:" + gtypeLast.toString());

	if (g.getValue() == 375) {
		chooseAdu();
	}
}

function passz() {
	hideDialog("gtDialog");

	if (gtType == 1) {
		prevGtype = gtypeLast;
		nextGtype();
		fillChoice("gtype", gtypeLast);
		wasChoosed = 0;
		lastChoose = 1;
		setLastGt(t_passz2);
		sendGameAction("PASS:");
	}
	else {
		sendGameAction("NOTTAKE:");
	}
	setMessage(t_passz2);
	
}

function nextGtype() {
	var i = 0;
	var g = 0;
	var gl = 0;
	if (gtypeLast == -1) {
		gtypeLast = 0;
	}
	else {
		for (i = gtypeLast; i < gtypes.length; i++) {
			g = gtypes.at(i);
			gl = gtypes.at(gtypeLast);
			if (gl.getValue() < g.getValue()) {
				gtypeLast = i;
				break;
			}
		}
	}
}

function addItem(sc, s, v) {
	var o = document.createElement("option");
	o.text = s;
	o.value = v.toString();
	sc.appendChild(o);
}

function fillChoice(s, idx) {
	var i = 0;
	var j = 0;
	diff = 0;
	var sc = document.getElementById(s);
	var g = 0;
	var gl = 0;
	if (sc) {
	   var j = sc.options.length;
	   for(i = 0; i < j; i++) {
		  sc.remove(0);
	   }

	   idx = idx + 1;
		for (i = idx; i < gtypes.length; i++) {
			g = gtypes.at(i);
			if (gtypeLast != -1) {
				gl = gtypes.at(gtypeLast);
			}
			
			if (gtypeLast == -1 || gl.getValue() < g.getValue()) {
				addItem(sc, g.getName(), j);
				j = j + 1;
			}
			else if (gtypeLast < i) {
				diff++;
			}
		}
		sc.selectedIndex = 0;
	}
}

function setOpenCard(o, c) {
	o.push(c);
}


function setCard(c) {
	playercards.push(c);
	playerCardNo = playerCardNo + 1;
}

function takeCards() {
	if (lastChoose == 1) {
		if (wasChoosed == 1) {
			setGTType(3);
		}
		else {
		//	gtypeLast = prevGtype;
			setGTType(4);
		}
	}
	else {
		setGTType(2);
	}
	fillChoice("gtype2", gtypeLast);
	showDialog("gtDialog", 106, 120);
}



function takeCards2() {
	if (gtType == 4) {
		nextGtype();
		fillChoice("gtype2", gtypeLast);
	}

	hideDialog("gtDialog");
	setCard(handOvers0);
	setCard(handOvers1);
	currentPlayer = 1;
	handOvers0 = null;
	handOvers1 = null;
	setPositions();
	setMessage(t_tegyenlekettot);
	sendGameAction("TAKE:");

	repaintAll();
	
}

function chooseAdu() {
	var j = 0;
	var i = 0;
	var k = 0;
	var l = 0;
	var maxChance = 0;
	var maxColor = 0;
	var chance = 0;
	var husz = 0;
	var name = null;

	chooser = user;
	setPlayOutScreen();
	
	var g = gtypes.at(gtypeLast);
	var p = g.getProperties();

	if (p.indexOf("B") == -1 && p.indexOf("C") == -1) {
		if (p.substr(0, 1) == "1" || p.substr(0, 1) == "3") {
			adu = 1;
			setAduInfo(getColorText(adu));
			sendGameAction("ADU:1");
			startContraPart();
		}
		else {
			if (lastChoose == 1) {
				if (p.substr(0, 1) == "2") {
					showDialog2("pirosb");					
				} 
				else {
					hideDialog2("pirosb");					
				}
				showDialog("colorDialog", 126, 60)
			}
		}
	}
	else {
		adu = 0;
		sendGameAction("ADU:0");
		startContraPart();
	}

}

function beginGame() {
	hideDialog("gtDialog");
	sendGameAction("BEGIN:" + user);
	chooseAdu();
}

function giveUp() {
	hideDialog("giveupDialog");
	sendGameAction("PGU:");
}

function giveUpParty() {
	hideDialog("giveupPartyDialog");
    sendGameAction("PAD:");
}