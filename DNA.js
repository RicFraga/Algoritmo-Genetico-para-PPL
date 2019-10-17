class DNA {
	constructor(coeficients_length, limits) {
		this.genes = [];													// Arreglo donde se guardarán los coeficientes
		this.binary = [];													// Arreglo donde se guardará el código binario
		this.fitness = 0;													// Fitness del individuo

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

}