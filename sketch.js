function init() {

	// Obtenemos la cantidad de individuos y de restricciones del documento html
	var cantidad_individuos = parseInt(document.getElementById("pob").value);
	var cantidad_restricciones = parseInt(document.getElementById("rest").value);
	var cantidad_variables = parseInt(document.getElementById("variables").value);

	var res = new Array(cantidad_restricciones);

	// 2x + 3y <= 100
	res[0] = new restriction([2, 3], "<=", 100);
	// x + 2y <= 120
	res[1] = new restriction([1, 2], "<=", 120);
	// y >= 30
	res[2] = new restriction([0, 1], ">=", 30);

	// Calculamos los límites de generación de valores aleatorios de las variables
	var limites = calculateLimits(res);

	//console.log(limites);

	// Generamos la población
	var poblacion = new population(cantidad_variables, cantidad_individuos, limites);

	poblacion.show();
	poblacion.showBinary();

}

// Esta función se encarga de calcular los límites de generación de números aleatorios
function calculateLimits(restrictions) {
	var coef = restrictions[0].coeficients.length;					// Longitud de los coeficientes de las restricciones
	var limits = [];												// Arreglo donde se guardarán los límites
	var comp;														// Variable para comparaciones
	var min;														
	var max;

	/*  Para obtener las restricciones las recorremos en forma de
		columna para obtener las restricciones por variable, las
		restricciones se almacenan de la siguiente forma

		limits = [limite_inf_a, limite_sup_a, limite_inf_c, limite_sup_b, ...]

		Cuando una variable no participa en una restricción el límite inferior
		de esta se ubica en 0 (desperdicio de aleatorios)
	*/

	for(let i = 0; i < coef; i++) {

		min = 999999999999999999;
		max = -1;

		for(let j = 0; j < restrictions.length; j++) {
			
			// Si el coeficiente es 0 se coloca en 0
			if(restrictions[j].coeficients[i] == 0) {
				comp = 0;
			}
			
			// Si el coeficiente no es 0 se calcula el cociente
			else if(restrictions[j].coeficients[i] != 0) {
				comp = restrictions[j].target / restrictions[j].coeficients[i];
			}			

			if(comp < min)
				min = comp;

			if(comp > max)
				max = comp;
		}
		
		// Agregamos los límites de la variable al arreglo de límites	
		limits.push(min);
		limits.push(max);
	}

	return limits;
}

// AJAX
function loadDoc() {
  	var xhttp = new XMLHttpRequest();
  	xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
    	obtRest(this);
    }
  };

  xhttp.open("GET", "base.html", true);
  xhttp.send();
}

// Función para mostrar campos para obtener restricciones
function obtRest(xml) {
  	var cantidad_restricciones = parseInt(document.getElementById("rest").value);
  	var cantidad_variables = parseInt(document.getElementById("variables").value);
  	var xmlDoc = xml.responseXML;	
	var et = "";
	var id = 1;
	var t = 1;

  	for(let i = 0; i < cantidad_restricciones; i++) {

  		if(cantidad_variables == 1) {
  			et += "<p>a";
  			et += i+1;
  			et += "<input type='numeric' id =";
  			et += id;  			
  			id++;
  			et += ">";
  			et += "<select><option value='>='> ≥ </option><option value='<='> ≤ </option><option value='='> = </option>  </select>";
  			et += "<input type='numeric' id =";
  			et += t;
  			t++;
  			et += "></p>";
  		}

  		else if(cantidad_variables == 2) {
  			et += "<p>a";
  			et += i+1;
  			et += "<input type='numeric' id =";
  			et += id;  			
  			id++;
  			et += ">b";
  			et += i + 1;
  			et += "<input type='numeric' id =";
  			et += id;  			
  			id++;
  			et += ">";
  			et += "<select><option value='>='> ≥ </option><option value='<='> ≤ </option><option value='='> = </option>  </select>";
  			et += "<input type='numeric' id =";
  			et += t;
  			t++;
  			et += "></p>";
  		}

  		else if(cantidad_variables == 3) {
  			et += "<p>a";
  			et += i+1;
  			et += "<input type='numeric' id =";
  			et += id;  			
  			id++;
  			et += ">b";
  			et += i + 1;
  			et += "<input type='numeric' id =";
  			et += id;  			
  			id++;
  			et += ">c";
  			et += i + 1;
  			et += "<input type='numeric' id =";
  			et += id;  			
  			id++;
  			et += ">";
  			et += "<select><option value='>='> ≥ </option><option value='<='> ≤ </option><option value='='> = </option>  </select>";
  			et += "<input type='numeric' id =";
  			et += t;
  			t++;
  			et += "></p>";
  		}

  		else if(cantidad_variables == 4) {
  			et += "<p>a";
  			et += i+1;
  			et += "<input type='numeric' id =";
  			et += id;  			
  			id++;
  			et += ">b";
  			et += i + 1;
  			et += "<input type='numeric' id =";
  			et += id;  			
  			id++;
  			et += ">c";
  			et += i + 1;  			
  			et += "<input type='numeric' id =";
  			et += id;  			
  			id++;
  			et += ">d";
  			et += i + 1;
  			et += "<input type='numeric' id =";
  			et += id;  			
  			id++;
  			et += ">";
  			et += "<select><option value='>='> ≥ </option><option value='<='> ≤ </option><option value='='> = </option>  </select>";
  			et += "<input type='numeric' id =";
  			et += t;
  			t++;
  			et += "></p>";
  		}

  		else if(cantidad_variables == 5) {
  			et += "<p>a";
  			et += i+1;
  			et += "<input type='numeric' id =";
  			et += id;  			
  			id++;
  			et += ">b";
  			et += i + 1;
  			et += "<input type='numeric' id =";
  			et += id;  			
  			id++;
  			et += ">c";
  			et += i + 1;  			
  			et += "<input type='numeric' id =";
  			et += id;  			
  			id++;
  			et += ">d";
  			et += i + 1;
  			et += "<input type='numeric' id =";
  			et += id;  			
  			id++;
  			et += ">e";
  			et += i + 1;
  			et += "<input type='numeric' id =";
  			et += id;  			
  			id++;
  			et += ">";
  			et += "<select><option value='>='> ≥ </option><option value='<='> ≤ </option><option value='='> = </option>  </select>";
  			et += "<input type='numeric' id =";
  			et += t;
  			t++;
  			et += "></p>";
  		}
  	}
  	document.getElementById("restricciones").innerHTML = et;
}