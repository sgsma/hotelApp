const { v4: uuidv4 } = require('uuid');

class Tarea {
    id = '';
    desc = '';
    completadoEn = null;


    constructor( desc ){

        this.id = uuidv4();
        this.desc = desc;
        this.completadoEn = null;
    }
    completar() {
        this.completadoEn = new Date().toISOString();
    }

    obtenerFechaHoraCompletado() {
        if (this.completadoEn) {
            const fechaHora = new Date(this.completadoEn);
            return fechaHora.toLocaleString();
        } else {
            return 'No completada aún';
        }
    }
}

module.exports = Tarea;