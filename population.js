class population {
	constructor(num) {
		this.population;									// Arreglo donde se guardará la población
		this.matingPool;									// Arreglo para la "mating pool"
		this.generations;									// Número de generaciones que se han producido
		this.mutationRate;									// Tasa de mutación

		this.population = [];

		for(let i = 0; i < num; i++)
			this.population[i] = new DNA(coeficients);

		this.matingPool = [];
		this.calcFitness();		
	}


}