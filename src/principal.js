import  * as singleSpa from 'single-spa';
import CargadorAplicaciones from './cargador-aplicaciones';
//import '../recursos/scss/';

const promesas = [];

/**
 * Método que contiene los datos para cargar las aplicaciónes en Single SPA.
 * @author Christian Garcia
 */
async function cargarAplicaciones()
{
    const cargadorAplicaciones = new CargadorAplicaciones();

    promesas.push
    (
        cargadorAplicaciones.cargarAplicacion
        (
            'app-encabezado', //Nombre interno que se le asignará a la aplicación
            '/', // Path que determina cuando la aplicación esta activa
            '/app-encabezado/principal.js', //Ubicación del JS principal de la app que se va a registrar
        ),
    );
}

/**
 * Método que espera a que se registren todas la aplicaciones.
 * @author Christian Garcia
 */
async function iniciar()
{
    cargarAplicaciones();

    await Promise.all(promesas);

    singleSpa.start();
}

iniciar();