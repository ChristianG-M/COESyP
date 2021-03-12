import * as singleSpa from 'single-spa';
import crearAlmacenamiento from './almacenamiento';
import DistribuidorEventoGlobal from './distribuidor-evento-global';

export default class CargadorAplicaciones
{
    constructor()
    {
        this.distribuidorEventoGlobal = new DistribuidorEventoGlobal();
    }

    /**
     * Método que carga la aplicación en Single SPA.
     * @author Christian García
     * @param {*} nombre Nombre de la aplicación.
     * @param {*} prefijo Path que se le asigno a cada una de las aplicaciones.
     * @param {*} urlAplicacion URL donde se encuentra la aplicación.
     */
    cargarAplicaciones( nombre, prefijo, urlAplicacion )
    {
        const almacenamientoPersonalizado = {
            this.distribuidorEventoGlobal: this.distribuidorEventoGlobal,
        };
        almacenamientoPersonalizado.store = crearAlmacenamiento();
        this.distribuidorEventoGlobal.registrarAlmacenamiento(almacenamientoPersonalizado.store);
        // eslint-disable-next-line no-undef
        singleSpa.registerApplication(nombre, () => SystemJS.import(urlAplicacion),
        this.validarPrefijo(prefijo), almacenamientoPersonalizado);
    }

    /**
     * Método que valida si el path de la aplicación coincide con el que se muestra en el navegador.
     * @author Christian García
     * @param {*} prefijo Path que se definio para cada una de las aplicaciones del front.
     */
    // eslint-disable-next-line class-methods-use-this
    validarPrefijo(prefijo)
    {
        // eslint-disable-next-line func-names
        return function ( location )
        {
            return location.pathname.startsWith(prefijo);
            // eslint-disable-next-line semi
        }
    }
}
