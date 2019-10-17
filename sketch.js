var cantidad_individuos = 1;
var cantidad_restricciones = 3;

function init() {	

	var res = new Array(cantidad_restricciones);

	// 2x + 3y <= 100
	res[0] = new restriction([2, 3], "<=", 100);
	// x + 2y <= 120
	res[1] = new restriction([1, 2], "<=", 120);
	// y >= 30
	res[2] = new restriction([0, 1], ">=", 30);

	// Calculamos los límites de generación de valores aleatorios de las variables
	var limites = calculateLimits(res);
	console.log(limites);

	// Generamos la población
	var poblacion = new population(2, cantidad_individuos, limites);

	poblacion.show();
		
	
}

// Esta función se encarga de calcular los límites de generación de números aleatorios
function calculateLimits(restrictions) {	
	var coef = restrictions[0].coeficients.length;
	var limits = [];
	var comp;
	var min;
	var max;

	for(let i = 0; i < coef; i++) {

		min = 999999999999999999;
		max = -1;

		for(let j = 0; j < restrictions.length; j++) {
			if(restrictions[j].coeficients[i] == 0) {
				comp = 0;
			}
			
			else if(restrictions[j].coeficients[i] != 0) {
				comp = restrictions[j].target / restrictions[j].coeficients[i];
			}			

			if(comp < min)			
				min = comp;				

			if(comp > max)			
				max = comp;
		}
		
		limits.push(min);
		limits.push(max);
	}

	return limits;
}