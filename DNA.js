class DNA {
	constructor(coeficients_length, limits) {
		this.genes = [];													// Arreglo donde se guardarán los coeficientes
		this.binary = [];													// Arreglo donde se guardará el código binario
		this.fitness = 0;													// Fitness del individuo
		this.check = false;
		this.obtained = undefined;


		// Generamos los valores con los límites obtenidos de las restricciones
		for(let i = 0; i < limits.length; i = i + 2)
			this.genes.push(Math.random() * (limits[i+1]  - limits[i]) + limits[i]);

		// Guardamos las representaciones en código binario
		for(let i = 0; i < this.genes.length; i++)
			this.binary.push(this.genes[i].toString(2));
	}

	show() {
		for(let i = 0; i < this.genes.length; i++)
			console.log(this.genes[i]);
	}

	showBinary() {
		for(let i = 0; i < this.binary.length; i++)
			console.log(this.binary[i]);
	}

	evaluateRest(restriction) {
		var total = 0;
		var tolerance;

		try {
			for(let i = 0; i < this.genes.length; i++)
				total += this.genes[i] * restriction.coeficients[i];
		} catch(error) {
			console.log("");
		}

		if(restriction.type == "<=") {
			if(total <= restriction.target) {
				this.fitness++;
				this.check = true;
			}
		}

		else if(restriction.type == ">=") {
			if(total >= restriction.target) {
				this.fitness++;
				this.check = true;
			}
		}

		else if(restriction.type == "=") {
			tolerance = total * 0.05;

			if((total >= (total - tolerance)) && (total <= (total + tolerance))) {
				this.fitness++;
				this.check = true;
			}
		}
	}

	evaluateOF(objectiveFunction) {
		if(this.check == true) {
			this.obtained = 0;
			for(let i = 0; i < objectiveFunction.coeficients.length; i++) {
				this.obtained += this.genes[i] * objectiveFunction.coeficients[i];
			}
		}		
	}

	getFitness() {
		return this.fitness;
	}

	getObtained() {
		return this.obtained;
	}
}