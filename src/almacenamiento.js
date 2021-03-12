import { createStore } from 'redux';

const estadosIniciales = 
{

};

/**
 * Método que almacena los datos que se comparten entre las aplicaciones.
 * @author Christian García
 * @param {*} estado Estado inicial de las variables/objetos que se almacenan.
 * @param {*} accion -Accion que contiene la descripción y valor de la variable/objeto que se almacenan.
 */
function asignarValoresAlmacenamiento(estados = estadosIniciales, accion)
{
    switch(accion.type)
    {
        case 'prueba':
            return
            {
                prueba : accion.value,
                datosConsultaprueba : estados.datosConsultaprueba,
                datosSemanal : estados.datosSemanal,
            };
        default:
            return estados;
    }
}

/**
 * Método que crea el almacenamiento de los datos.
 * @author Christian García
 */
export default function crearAlmacenamiento()
{
    return createStore(asignarValoresAlmacenamiento);
}
