/**
 * Calcula una puntuación de 0 a 20 basada en el percentil del resultado dentro de un array de resultados
 * @param {number} resultado - El valor del resultado a evaluar
 * @param {Array<number>} arrayResultados - Array de resultados para comparar y calcular el percentil
 * @returns {number} - Puntuación de 0 a 20 basada en el percentil
 */
export const calcularPuntuacion = (resultado, arrayResultados) => {
  // Si no hay resultados para comparar, devolver 0
  if (!arrayResultados || arrayResultados.length === 0) {
    return 0;
  }

  // Ordenar el array de resultados de menor a mayor
  const resultadosOrdenados = [...arrayResultados].sort((a, b) => a - b);
  
  // Encontrar la posición del resultado en el array ordenado
  const posicion = resultadosOrdenados.findIndex(r => r >= resultado);
  
  // Si el resultado es menor que todos los del array, su posición será 0
  const indice = posicion === -1 ? resultadosOrdenados.length : posicion;
  
  // Calcular el percentil (0 a 1)
  const percentil = indice / resultadosOrdenados.length;
  
  // Convertir el percentil a una escala de 0 a 20
  return Math.round(percentil * 20);
};