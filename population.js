class population {
	constructor(coeficients, num, limits) {
		this.coeficients;									// Número de coeficientes que tendrá la población
		this.population;									// Arreglo donde se guardará la población
		this.matingPool;									// Arreglo para la "mating pool"
		this.generations;									// Número de generaciones que se han producido
		this.mutationRate;									// Tasa de mutación		

		this.population = [];
		this.matingPool = [];

		for(let i = 0; i < num; i++)
			this.population[i] = new DNA(coeficients, limits);		
	}
	
	show() {
		for(let i = 0; i < this.population.length; i++)
			this.population[i].show();
	}

	showBinary() {
		for(let i = 0; i < this.population.length; i++)
			this.population[i].showBinary();
	}

	naturalSelection() {
		this.matingPool = [];
		var best = 0;

		// Obtenemos el mejor fitness de la población
		for(let i = 0; i < this.population.length; i++) {
			if(this.population[i].getObtained() > best)
				best = this.population[i].getObtained();
		}

		// Agregamos a la mating pool a los individuos un número de veces de acuerdo a su fitness
		for(let i = 0; i < this.population.length; i++) {
			//let fitness = map(this.population[i].fitness, 0, best, 0, 1);
			let fitness = (this.population[i].fitness / best);			
			let n = Math.floor(fitness * 100);			

			for(let j = 0; j < n; j++)
				this.matingPool.push(this.population[i]);
		}		
	}

	generate(limits) {
		// Rellenamos a la población con elementos de la mating pool
		for(let i = 0; i < this.population.length; i++) {			
			let a = Math.floor(Math.random(this.matingPool.length));
      		let b = Math.floor(Math.random(this.matingPool.length));

      		let partnerA = this.matingPool[a];
      		let partnerB = this.matingPool[b];
      		let child = partnerA.crossover(partnerB, limits);
      		child.mutate(this.mutationRate);
      		this.population[i] = child;
		}
	}
}
