class restriction {
	constructor(coeficients, type, target) {
		this.coeficients = coeficients;				// Coeficientes de la restricción
		this.type = type;							// Tipo de restricción ">=", "<=", "="
		this.target = target;						// Valor al lado izquierdo de la desigualdad
	}
}