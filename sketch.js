function init() {
	console.log(":3");

}

function calculateLimits(restrictions) {
	var coef = restrictions[0].coeficients.length;
	var limits = new Array(2 * coef);
	var comp;
	var min = 999999999999999999;
	var max = -1;

	for(let i = 0; i < restrictions.length; i++) {
		for(let j = 0; j < coef; j++) {
			if(restrictions[i].coeficients[j] != 0) {
				comp = restrictions[i].target / restrictions[i].coeficients[j];

				if(comp < min) {
					min = comp;
				}

				if(comp > max) {
					max = comp;
				}
			}
		}

		limits[i] = min;
		limits[i + 1] = max;
	}
}