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

}