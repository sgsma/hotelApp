const Tarea = require('./tarea');
const { guardarDB, cargarDB } = require('../helpers/guardarArchivo');
const { leerInput } = require('../helpers/inquirer');

class Tareas {

    get listadoArr() {
        return Object.values(this._listado);
    }

    constructor() {
        this._listado = {};
        this.cargarTareas();
    }

    cargarTareas() {
        const tareasGuardadas = cargarDB();
        tareasGuardadas.forEach(tarea => {
            this._listado[tarea.id] = tarea;
        });
    }

    async crearTareas() {
        const tareasNuevas = [];
        console.log('Ingrese las reservas, presione 0 cuando haya terminado ');
        let desc = await leerInput();

        while (desc !== '0') {
            const tarea = new Tarea(desc);
            this._listado[tarea.id] = tarea;
            tareasNuevas.push(tarea);
            desc = await leerInput();
        }

        if (tareasNuevas.length > 0) {
            console.log('Reservaciones hechas:');
            tareasNuevas.forEach((tarea, index) => {
                console.log(`${index + 1}. ${tarea.desc}`);
            });
            this.guardarTareas();
        } else {
            console.log('No hay reservaciones aún, vuelve al menú para crear una.');
        }
    }

    listarTareas() {
        console.log('Reservaciones hechas');
        this.listadoArr.forEach((tarea, index) => {
            const estado = tarea.completadoEn ? 'Confirmada' : 'Por confirmar';
            console.log(`${index + 1}. ${tarea.desc} - Estado: ${estado}`);
        });
    }

    listarTareasCompletas() {
        const tareasCompletas = this.listadoArr.filter(tarea => tarea.completadoEn !== null);
        console.log('Reservaciones confirmadas');
        tareasCompletas.forEach((tarea, index) => {
            console.log(`${index + 1}. ${tarea.desc}`);
        });
    }


    listarTareasIncompletas() {
        const tareasIncompletas = this.listadoArr.filter(tarea => tarea.completadoEn === null);
        console.log('Reservaciones canceladas');
        tareasIncompletas.forEach((tarea, index) => {
            console.log(`${index + 1}. ${tarea.desc}`);
        });
    }

    async completarTarea() {
        this.listarTareasIncompletas();
        console.log('Ingrese los números de las reservas que desea confirmar (separados por coma): ');
        const Completar = await leerInput();
        const CompletarArray = Completar.split(',').map(id => parseInt(id.trim()) - 1);
      
        const tareasIncompletas = this.listadoArr.filter(tarea => tarea.completadoEn === null);
      
        const tareasAConfirmar = CompletarArray.map(indexCompletar => {
          if (indexCompletar >= 0 && indexCompletar < tareasIncompletas.length) {
            return tareasIncompletas[indexCompletar];
          }
          return null;
        }).filter(tarea => tarea !== null);
      
        if (tareasAConfirmar.length > 0) {
          console.log('Reservas seleccionadas:');
          tareasAConfirmar.forEach((tarea, index) => {
            console.log(`${index + 1}. ${tarea.desc}`);
          });
      
          console.log('Para confirmar la reservación marque: "s": ');
          const confirmacion = await leerInput();
          if (confirmacion.toLowerCase() === 's') {
            tareasAConfirmar.forEach(tareaACompletar => {
              tareaACompletar.completadoEn = new Date().toISOString();
              console.log(`La reserva "${tareaACompletar.desc}" se ha marcado como confirmada`);
            });
      
            this.guardarTareas();
            console.log('Reservación confirmada exitosamente');
          } else {
            console.log('No se han confirmado reservas');
          }
        } else {
          console.log('No ha seleccionado reservas para confirmar');
        }
      }

    async borrarTarea() {
        this.listarTareas();
        console.log('Ingrese los números de las reservas que desea eliminar (separados por coma): ');
        const Borrar = await leerInput();
        const TareasBorrarArray = Borrar.split(',').map(id => parseInt(id.trim()) - 1);

        const tareasAEliminar = [];

        TareasBorrarArray.forEach(indexBorrar => {
            if (indexBorrar >= 0 && indexBorrar < this.listadoArr.length) {
                const tareaAEliminar = this.listadoArr[indexBorrar];
                console.log(`Reserva marcada para eliminar: ${tareaAEliminar.desc}`);
                tareasAEliminar.push(tareaAEliminar);
            } else {
                console.log(`Número de reserva no válido: ${indexBorrar + 1}`);
            }
        });

        if (tareasAEliminar.length > 0) {
            console.log('Para eliminar presione: "s": ');
            const confirmacion = await leerInput();
            if (confirmacion.toLowerCase() === 's') {
                tareasAEliminar.forEach(tareaAEliminar => {
                    delete this._listado[tareaAEliminar.id];
                    console.log(`Reserva eliminada: ${tareaAEliminar.desc}`);
                });

                this.guardarTareas();
                console.log('Reservas eliminadas exitosamente.');
            } else {
                console.log('No se han eliminado Reservas');
            }
        } else {
            console.log('No se han seleccionado reservas para eliminar.');
        }
    }



    guardarTareas() {
        guardarDB(Object.values(this._listado));
    }

}

module.exports = Tareas;
