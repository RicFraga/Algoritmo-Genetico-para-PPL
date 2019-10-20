function init() {

	// Obtenemos la cantidad de individuos y de restricciones del documento html
	var cantidad_individuos = parseInt(document.getElementById("pob").value);
	var cantidad_restricciones = parseInt(document.getElementById("rest").value);
	var cantidad_variables = parseInt(document.getElementById("variables").value);

	var res = [];
	var values = [];
	var type;
	var typ;
	var targ;
	var target;
	var ofc;

	// Obtenemos la función objetivo
	for(let i = 0; i < cantidad_variables; i++) {
		ofc = "of";
		ofc += i;
		values.push(parseInt((document.getElementById(ofc)).value));
		ofc = "of";
	}

	var fo = new objectiveFunction(values, document.getElementById("objective").value);	

	values = [];

	// Obtenemos las restricciones
	for(let i = 0; i < cantidad_restricciones; i++) {
		values = [];
		typ = "t";
		targ = "tr";

		for(let j = 0; j < cantidad_variables; j++) {			
			values.push(parseInt((document.getElementById(j + (cantidad_variables * i))).value));							
		}

		typ += i;
		type = document.getElementById(typ).value;
		targ += i;
		target = parseInt((document.getElementById(targ)).value);		

		res.push(new restriction(values, type, target));
	}

	// Calculamos los límites de generación de valores aleatorios de las variables
	var limites = calculateLimits(res);	

	// Generamos la población
	var poblacion = new population(cantidad_variables, cantidad_individuos, limites);		

	for(let i = 0; i < 100; i++) {
			// calcFintess
		// Evaluamos las restricciones en la población
	for(let i = 0; i < cantidad_restricciones; i++) {
		for(let j = 0; j < cantidad_individuos; j++) {
			poblacion.population[j].evaluateRest(res[i]);
		}
	}

	var best_obtained;
	var ind_best;


	if(fo.objective == "Max") {
		best_obtained = -1;
	}

	else if(fo.objective == "Min")
		best_obtained = 999999999999999;

	// Evaluamos la f.o. en la población
	for(let i = 0; i < cantidad_individuos; i++) {		
		if(poblacion.population[i].check == true) {
			poblacion.population[i].evaluateOF(fo);

			if(fo.objective == "Max") {
				if(poblacion.population[i].obtained > best_obtained) {
					ind_best = i;
					best_obtained = poblacion.population[i].obtained;					
				}
			}

			else if(fo.objective == "Min") {
				if(poblacion.population[i].obtained < best_obtained) {
					ind_best = i;
					best_obtained = poblacion.population[i].obtained;
				}
			}
		}
	}

	/*  Para calcular la aportación al fitness de cada individuo se revisa si el objetivo de la f.o.
		es maximizar o minimizar, si se trata de maximizar se toma al especimen que obtuvo la mayor
		evaluación de la f.o. y se le suma 1, con base en el mayor se suma proporcionalmente al fintess
		de acuerdo a su valor obtenido de la f.o.
		Se hace el mismo razonamiento para la minimización pero tomando al menor	
	*/

	for(let i = 0; i < cantidad_individuos; i++) {
		if(poblacion.population[i].check == true) {
			if(fo.objective == "Max") {
				poblacion.population[i].fitness += poblacion.population[i].getObtained() / best_obtained;
			}

			else if(fo.objective == "Min") {
				poblacion.population[i].fitness += best_obtained / poblacion.population[i].getObtained();
			}
		}
	}
		poblacion.naturalSelection();
		poblacion.generate(limites);
	}

	// Mostramos a la población, el fitness y el valor obtenido de la fo de cada especimen
	/*for(let i = 0; i < cantidad_individuos; i++)
	{
		poblacion.population[i].show();
		console.log(poblacion.population[i].getFitness());
		console.log(poblacion.population[i].getObtained());
		console.log("--------------------------------------");
	}*/

	poblacion.population[ind_best].getObtained();
	poblacion.population[ind_best].show();
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

// AJAX para modificar el html
function loadDoc() {
  	var xhttp = new XMLHttpRequest();
  	xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
    	obtRestandOF(this);
    }
  };

  xhttp.open("GET", "base.html", true);
  xhttp.send();
}

// Función para mostrar campos para obtener restricciones
function obtRestandOF(xml) {
  	var cantidad_restricciones = parseInt(document.getElementById("rest").value);
  	var cantidad_variables = parseInt(document.getElementById("variables").value);
  	var xmlDoc = xml.responseXML;	
	var et = "";
	var input_id = 0;								// identificador de los input
	var type_id = "t";								// identificador de los tipos
	var target_id = "tr";							// identificador de los objetivos	
	var ofvalues = "of";							// identificador de los coeficientes de la f.o.
	var aux = 0;

	et += "<h4>Función Objetivo</h4>";

	// Obtenemos la función objetivo
	if(cantidad_variables == 1) {
		et += "<p>a<input type='numeric' id =";
		et += ofvalues + aux;		
		et += ">";
	}

	else if(cantidad_variables == 2) {
		et += "<p>a<input type='numeric' id =";
		et += ofvalues + aux;
		aux++;
		et += ">b<input type='numeric' id =";
		et += ofvalues + aux;		
		et += ">";
	}

	else if(cantidad_variables == 3) {
		et += "<p>a<input type='numeric' id =";
		et += ofvalues + aux;
		aux++;
		et += ">b<input type='numeric' id =";
		et += ofvalues + aux;
		aux++;
		et += ">c<input type='numeric' id =";
		et += ofvalues + aux;		
		et += ">";
	}

	else if(cantidad_variables == 4) {
		et += "<p>a<input type='numeric' id =";
		et += ofvalues + aux;
		aux++;
		et += ">b<input type='numeric' id =";
		et += ofvalues + aux;
		aux++;
		et += ">c<input type='numeric' id =";
		et += ofvalues + aux;
		aux++;
		et += ">d<input type='numeric' id =";
		et += ofvalues + aux;		
		et += ">";
	}

	else if(cantidad_variables == 5) {
		et += "<p>a<input type='numeric' id =";
		et += ofvalues + aux;
		aux++;
		et += ">b<input type='numeric' id =";
		et += ofvalues + aux;
		aux++;
		et += ">c<input type='numeric' id =";
		et += ofvalues + aux;
		aux++;
		et += ">d<input type='numeric' id =";
		et += ofvalues + aux;
		aux++;
		et += ">e<input type='numeric' id =";
		et += ofvalues + aux;
		et += ">";		
	}

	et += "<select id='objective'><option value='Max'>Maximizar</option><option value='Min'>Minimizar</option></select>"

	et += "<h4>Restricciones</h4>";	

	// Obtenemos las restricciones
  	for(let i = 0; i < cantidad_restricciones; i++) {

  		if(cantidad_variables == 1) {
  			et += "<p>a<input type='numeric' id =";
  			et += input_id;
  			input_id++;
  			et += "><select id =";
  			et += input_id;
  			input_id++;
  			et += "><option value='>='> ≥ </option><option value='<='> ≤ </option><option value='='> = </option>  </select><input type='numeric' id =";
  			et += target_id + i;
  			et += "></p>";
  		}

  		else if(cantidad_variables == 2) {
  			et += "<p>a<input type='numeric' id =";
  			et += input_id;
  			input_id++;
  			et += ">b<input type='numeric' id =";
  			et += input_id;
  			input_id++;
  			et += "><select id =";
  			et += type_id + i;
  			et += "><option value='>='> ≥ </option><option value='<='> ≤ </option><option value='='> = </option>  </select><input type='numeric' id =";
  			et += target_id + i;
  			et += "></p>";
  		}

  		else if(cantidad_variables == 3) {
  			et += "<p>a<input type='numeric' id =";
  			et += input_id;
  			input_id++;
  			et += ">b<input type='numeric' id =";
  			et += input_id;
  			input_id++;
  			et += ">c<input type='numeric' id =";
  			et += input_id;
  			input_id++;
  			et += "><select id =";
  			et += type_id + i;
  			et += "><option value='>='> ≥ </option><option value='<='> ≤ </option><option value='='> = </option>  </select><input type='numeric' id =";
  			et += target_id + i;
  			et += "></p>";
  		}

  		else if(cantidad_variables == 4) {
  			et += "<p>a<input type='numeric' id =";
  			et += input_id;
  			input_id++;
  			et += ">b<input type='numeric' id =";
  			et += input_id;
  			input_id++;
  			et += ">c<input type='numeric' id =";
  			et += input_id;
  			input_id++;
  			et += ">d<input type='numeric' id =";
  			et += input_id;
  			input_id++;
  			et += "><select id =";
  			et += type_id + i;
  			et += "><option value='>='> ≥ </option><option value='<='> ≤ </option><option value='='> = </option>  </select><input type='numeric' id =";
  			et += target_id + i;
  			et += "></p>";
  		}

  		else if(cantidad_variables == 5) {
  			et += "<p>a<input type='numeric' id =";
  			et += input_id;
  			input_id++;
  			et += ">b<input type='numeric' id =";
  			et += input_id;
  			input_id++;
  			et += ">c<input type='numeric' id =";
  			et += input_id;
  			input_id++;
  			et += ">d<input type='numeric' id =";
  			et += input_id;
  			input_id++;
  			et += ">e<input type='numeric' id =";
  			et += input_id;
  			input_id++;
  			et += "><select id =";
  			et += type_id + i;
  			et += "><option value='>='> ≥ </option><option value='<='> ≤ </option><option value='='> = </option>  </select><input type='numeric' id =";
  			et += target_id + i;
  			et += "></p>";
  		}
  	}

  	document.getElementById("restricciones").innerHTML = et;
}
