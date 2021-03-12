export default class DistribuidorEventoGlobal
{
    constructor()
    {
        this.almacenes = [];
    }

    /**
     * Método que realiza el registro del almacenamiento de cada una de las aplicaciones.
     * @author Christian Garcia
     * @param {*} almacen Almacen que contiene las variables/objetos de cada una de las aplicaciones.
     */
    registrarAlmacenamiento( almacen )
    {
        this.almacenes.push(almacen);
    }

    /**
     * Método que recorre los almacenes para guardar las variables/objetos de cada una de las aplicaciones.
     * @author Christian Garcia
     * @param {*} evento
     */
    envio(evento)
    {
        this.almacenes.forEach((almacen) => almacen.dispatch(evento));
    }
}
