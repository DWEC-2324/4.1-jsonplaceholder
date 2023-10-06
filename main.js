'use strict'

async function main() {

    const idUser = prompt('Introduce la ID de un usuario');
    if (isNaN(idUser) || idUser.trim() == '') {
        alert('Debes introducir un numero')
    } else {
        const datos = await pideDatos(idUser)
        if (datos === null) {
            console.log('No existe el usuario')
        }
        console.log('Id' + datos.id)
        console.log('Nickname'+ datos.username)
        console.log('Nombre' + datos.name)
    }

    if (isNaN(idUser) || idUser.trim() == '') {
        alert('Debes introducir un numero')
    } else {
        const tareas = await pideDatosTareas(idUser)
        if (tareas === null) {
            console.log('No existe el usuario')
        }
        console.log(tareas)
    }

    const idPost = prompt('Introduce la ID de un usuario para borrar');
    if (isNaN(idPost) || idPost.trim() == '') {
        alert('Debes introducir un numero')
    } else {
        const post = await borrarDatos(idPost)
        console.log(post)
    }

    const idTare = prompt('Introduce la ID de una tarea para modificar el estado');
    if (isNaN(idTare) || idTare.trim() == '') {
        alert('Debes introducir un numero')
    } else {
        const tare = await modificarDatos(idTare)
        console.log(tare.completed)
    }

    const nomTarea = prompt('Introduce el titulo de la nueva tarea');
    if (isNaN(idTare) || idTare.trim() == '') {
        alert('Debes introducir un numero')
    } else {
        const tare = await anyadirTarea(nomTarea)
        console.log(tare)
    }

    async function pideDatos(idUser) {
        const response = await fetch('https://jsonplaceholder.typicode.com/users/' + idUser);
        if (!response.ok) {
            throw `Error ${response.status} de la BBDD: ${response.statusText}`
        }
        const myData = await response.json(); // recordad que .json() tb es una promesa
        return myData;
    }

    async function pideDatosTareas(idUser) {
        const response = await fetch('https://jsonplaceholder.typicode.com/todos?userId=' + idUser);
        if (!response.ok) {
            throw `Error ${response.status} de la BBDD: ${response.statusText}`
        }
        const myData = await response.json(); // recordad que .json() tb es una promesa
        return myData;


    }

    async function borrarDatos(idPost) {
        const response = await fetch('https://jsonplaceholder.typicode.com/posts/' + idPost, {
            method: 'DELETE',
        });
        if (!response.ok) {
            throw `Error ${response.status} de la BBDD: ${response.statusText}`
        }
        const myData = await response.json(); // recordad que .json() tb es una promesa
        return myData;
    }

    async function modificarDatos(idTare) {
        const response = await fetch('https://jsonplaceholder.typicode.com/todos/' + idTare, {
            method: 'PATCH',
            body: JSON.stringify({
                completed: false,
            }),
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
            },
        });
        if (!response.ok) {
            throw `Error ${response.status} de la BBDD: ${response.statusText}`
        }
        const myData = await response.json(); // recordad que .json() tb es una promesa
        return myData;
    }

    async function anyadirTarea(nomTarea) {
        const response = await fetch('https://jsonplaceholder.typicode.com/todos', {
            method: 'POST',
            body: JSON.stringify({
                userId: idUser,
                title: nomTarea,
                completed: false
            }),
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
            },
        });
        if (!response.ok) {
            throw `Error ${response.status} de la BBDD: ${response.statusText}`
        }
        const myData = await response.json(); // recordad que .json() tb es una promesa
        return myData;
    }

}

main();