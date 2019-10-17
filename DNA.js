class DNA {
	constructor(coeficients_length, limits) {
		this.genes = [];													// Arreglo donde se guardarán los coeficientes
		this.fitness = 0;													// Fitness del individuo

		// Generamos los valores con los límites obtenidos de las restricciones
		for(let i = 0; i < limits.length; i = i + 2)
			this.genes.push(Math.random() * (limits[i+1]  - limits[i]) + limits[i]);			
	}

	show() {
		for(let i = 0; i < this.genes.length; i++)
			console.log(this.genes[i]);
	}

}