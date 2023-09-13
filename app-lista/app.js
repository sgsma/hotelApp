require('colors');
const { guardarDB } = require('./helpers/guardarArchivo');
const { inquirerMenu, pausa, leerInput } = require('./helpers/inquirer');
const Tareas = require('./models/tareas');

console.clear();

const main = async () => {
    let opt = '';
    const tareas = new Tareas();
    do {
        opt = await inquirerMenu();

        switch (opt) {
            case '1':
                await tareas.crearTareas(); 
                await pausa(); 
                break;

            case '2':
                tareas.listarTareas();
                await pausa();
                break;
            case '3':
                tareas.listarTareasCompletas();
                await pausa();
                break;
            case '4':
                tareas.listarTareasIncompletas();
                await pausa();
                break;
            case '5':
                await tareas.completarTarea();
                await pausa();
                break;
            case '6':
                await tareas.borrarTarea();
                await pausa();
                break;

            case '0':
                break;

            default:
                console.log('Opción no válida. Por favor, seleccione una opción válida.');
                break;
        }
    } while (opt !== '0');
}

main();
