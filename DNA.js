class DNA {
	constructor(coeficients_length, limits) {
		this.genes = [];													// Arreglo donde se guardarán los coeficientes
		this.binary = [];													// Arreglo donde se guardará el código binario
		this.fitness = 0;													// Fitness del individuo
		this.check = false;
		this.obtained = 0;

		// Generamos los valores con los límites obtenidos de las restricciones
		for(let i = 0; i < limits.length; i = i + 2)
			this.genes.push(Math.random() * ((limits[i+1] + 1)  - limits[i]) + limits[i]);

		// Guardamos las representaciones en código binario
		for(let i = 0; i < this.genes.length; i++)
			this.binary.push(this.genes[i].toString(2));
	}

	show() {
		for(let i = 0; i < this.genes.length; i++)
			console.log(i + 1 + " : " + this.genes[i]);		
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
			console.log(":c");
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
			for(let i = 0; i < objectiveFunction.coeficients.length; i++) {
				this.obtained += this.genes[i] * objectiveFunction.coeficients[i];
			}
		}
	}

	crossover(partner, limits) {
	
		// Creamos un nuevo hijo aleatorio
    	var child = new DNA(this.genes.length, limits);

    	var midpoint;
    	var gene;

    	// Mitad de uno y mitad de otro	
    	for(let i = 0; i < this.binary.length; i++) {
    		// Tomamos un punto al azar en los genes
	    	midpoint = Math.floor(Math.random(this.binary[i].length));

	    	gene = "";

	    	for(let j = 0; j < this.binary[i].length; j++) {
	    		if(j > midpoint)
	    			gene += this.binary[i][j];

	    		else
	    			gene += partner.binary[i][j];
	    	}

	    	child.binary[i] = gene;

	    	// Transformamos el binario a decimal y lo asignamos al DNA
	    	child.genes[i] = parseInt(child.binary, 2);
    	}

    	return child;
  }

  	// Based on a mutation probability, picks a new random character
  	mutate(mutationRate) {
  		for(let i = 0; i < this.binary.length; i++) {
  			for(let j = 0; j < this.binary[i].length; j++) {
  				if(Math.random() < mutationRate) {
  					var a = Math.floor((Math.random() * (2 - 0)) + 0);
  					this.binary[i] = a;
  					this.genes[i] = parseInt(this.binary[i], 2);
  				}
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