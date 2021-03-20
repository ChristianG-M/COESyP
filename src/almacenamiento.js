import { createStore } from 'redux';

const estadosIniciales = {
  prueba: []
};

/**
 * Método que almacena los datos que se comparten entre las aplicaciones.
 * @author Christian Garcia
 * @param {*} estado Estado inicial de las variables/objetos que se almacenan.
 * @param {*} accion Accion que contiene la descripción y valor de la variable/objeto que se almacenan.
 */
function asignarValoresAlmacenamiento(estados = estadosIniciales, accion) {
  switch (accion.type) {
    case 'prueba':
      return {
        prueba: accion.value,
        datosConsultaPrueba: estados.datosConsultaPrueba,
        semana: estados.semana,
        dia: estados.dia
      };
    default:
      return estados;
  }
}

/**
 * Método que crea el almacenamiento de los datos.
 * @author Christian Garcia
 */
export default function crearAlmacenamiento() {
  return createStore(asignarValoresAlmacenamiento);
}
