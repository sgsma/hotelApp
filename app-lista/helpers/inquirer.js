require('colors');
const inquirer = require('inquirer');

const preguntas = [
    {
        type: 'list',
        name: 'opcion',
        message: '¿Que deseas hacer?',
        choices: [
            {
                value: '1',
                name: `${'1.'.red} ${'Hacer reservación'.yellow}`
            },
            {
                value: '2',
                name: `${'2.'.red} ${'reservaciones'.yellow}`
            },
            {
                value: '3',
                name: `${'3.'.red} ${'Reservaciones confirmadas'.yellow}`
            },
            {
                value: '4',
                name: `${'4.'.red} ${'Reservaciones por confirmar'.yellow}`
            },
            {
                value: '5',
                name: `${'5.'.red} ${'Confirmar reservaciones'.yellow}`
            },
            {
                value: '6',
                name: `${'6.'.red} ${'Eliminar reservación'.yellow}`
            },
            {
                value: '0',
                name: `${'0.'.red} ${'Salir'.yellow}`
            },
        ],
    },
];

const inquirerMenu = async () => {
    console.log("=======================================".red);
    console.log("         BIENVENIDO A SARA HOSTAL".yellow);
    console.log("=======================================".red);

    let otp = '';

    const opt = await inquirer.prompt(preguntas).then(data => {
        otp = data['opcion']
    });

    return otp;
    
}

const pausa = async () => {
    const question = [
        {
            type: 'input',
            name: 'enter',
            message: `\nPresione ${'ENTER'.red} para continuar \n`
        }
    ]

    let pau = '';
    console.log('\n');
    await inquirer.prompt(question).then(data => {
        pau = data['enter']
    });
}

const leerInput = async () => {
    const question = [
        {
            type: 'input',
            name: 'desc',
            message: ' ',
            validate(value) {
                if (value.length === 0) {
                    return 'Por favor ingrese 0 para finalizar las reservaciones';
                }
                return true;
            }
        }
    ]

    let leer = '';
    await inquirer.prompt(question).then(data => {
        leer = data['desc'];
    });

    return leer;
}


module.exports = {
    inquirerMenu,
    leerInput,
    pausa,
    
}