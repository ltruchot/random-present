var arrayShuffle = function (arr) {
    for (var i = 0; i < arr.length - 1; i++) {
        var j = i + 1 + Math.floor(Math.random() * (arr.length - i - 1));
        var temp = arr[j];
        arr[j] = arr[i];
        arr[i] = temp;
    }
    return arr;
};

require([
	"dojo/_base/array",	
	"dojo/dom",
	"dojo/dom-attr",
	"dojo/dom-construct",
	"dojo/on",	
	"dojo/query",
	"dojo/ready"
],

function (array, dom, domAttr, domConstruct, on,  query, ready) {
	ready(function () {

		var btnLauncher = dom.byId("btnLaunch");
		var btnRandom = dom.byId("btnRandom");
		var tabResult = dom.byId("tabResult");
		var inptNbr = dom.byId("iptNbr");

		on(btnLauncher, "click", function () {
			var headRow = domConstruct.toDom('<tr><th>Nom</th><th>Cadeau &agrave;...</th></tr>');		
			var numberOfPerson = domAttr.get(iptNbr, "value");	

			//rewrite table head
			domConstruct.empty(tabResult);
			domConstruct.place(headRow, tabResult);

			//write a line by person
			for (var i = 0; i < numberOfPerson; i++) {	
				var row = domConstruct.toDom('<tr><td><input type="text" class="nameField" /></td><td><input type="text" class="randomNameField" /></td></tr>');
				domConstruct.place(row, tabResult);
			}		

		});

		on(btnRandom, "click", function () {
			var names = [];
			query(".nameField").forEach(function (iptNode) {
				var name = domAttr.get(iptNode, "value");	
				if (name) {
					names.push(name);
				}				
			});
			var randomNames = arrayShuffle(names);
			query(".randomNameField").forEach(function (iptNode, idx) {
				if (idx < randomNames.length) {
					var name = domAttr.set(iptNode, "value", randomNames[idx]);
				}		
			});
		});
	});
});