import Helpers from "./Helpers.js"
import Popup from './Popup.js'
'use strict'


let usuarios = []


document.addEventListener('DOMContentLoaded',async e => {
    toggle()
    navbar()

    usuarios = await cargarUsuarios()


    const options = document.querySelectorAll('#menu2 > li')

 

    options.forEach(option => {
        option.addEventListener('click',e=>{
            cargarOpcion(e)
  
        })
    })

    const p = new Popup({
        title: 'Ingreso de usuario',
        content: `<form action="" class="flex flex-col w-full">
                    <label class="font-bold" for="user">Seleccione un usuario:</label>
                    <select name="users"  class="border border-2 border-black rounded-lg text-lg p-2 m-4" id="user"></select>
                    <label class="font-bold" for="contraseña">Digite la contraseña: </label>
                    <input type="text" class="border border-2  border-black rounded-lg text-lg p-2 outline-none m-4" placeholder="Contraseña" name="" id="contraseña">
                    <p class="hidden font-bold text-red-700" id="error">Contraseña incorrecta</p>
                    </form>`,
        buttons: {
            accept: {
                title: 'Ingresar',
                callBack: () => {

                    const nombre = document.querySelector('#user').value
                    const contraseña = document.querySelector('#contraseña').value

                    if(verificarUsuario(usuarios,nombre,contraseña)){
                        document.querySelector('#error').classList.add('hidden')
                        console.log('Correcto');
                        document.querySelector('#contraseña').value = ''
                        p.close()
                    }else{
                        document.querySelector('#error').classList.remove('hidden')
                        console.log('incorrecto');
                    }
                    
                }
            },
            close: {
                title: 'Salir',
                // callBack: () => console.log('XXXXXXXXXXXXXXXX')
            }
        }
    })


    document.querySelector('#btnabrir').addEventListener('click', e => {
        p.show()
    })

})







function toggle(){
    const boton = document.querySelector('#toggle')
    boton.addEventListener('click', e => {
        document.querySelector('#menu').classList.toggle('hidden')
    })
}
function navbar(){
    window.addEventListener('scroll', e =>{
        const nav = document.querySelector('#sticky')
        const menu = document.querySelector('#menu')
        //const img = document.querySelector('#img')
        nav.classList.toggle('sticky',window.scrollY > 0)
        menu.classList.toggle('menu',window.scrollY > 0)
        //img.classList.toggle('img',window.scrollY > 0)

    })
    
}

async function cargarOpcion(e) {
    e.preventDefault()
    switch (e.target.textContent.toLowerCase()) {
        case 'conductor':       
            await Helpers.cargarPagina('./resources/views/conductores.html', '#content')
                .then(async () => await import('./conductor.js').then(async module => module.conductor.init()))
                .catch(error => console.error(error))
            break
        case 'empresa':
            await Helpers.cargarPagina('./resources/views/empresas.html', '#content')
            Helpers.validar()
            break
        case 'destino':
            await Helpers.cargarPagina('./resources/views/destinos.html', '#content')
                .then(async () => await import('./destino.js').then(async module => module.destino.init()))
                .catch(error => console.error(error))
            break
        case 'destinos ofrecidos por empresas':
            await Helpers.cargarPagina('./resources/views/vehiculos.html', '#content')
                .then(async () => await import('./vehiculo.js').then(async module => module.vehiculo.init()))
                .catch(error => console.error(error))
            break      
        case 'vehiculo':
            await Helpers.cargarPagina('./resources/views/vehiculos.html', '#content')
                .then(async () => await import('./vehiculo.js').then(async module => module.vehiculo.init()))
                .catch(error => console.error(error))
            break         
        case 'salidas':       
            await Helpers.cargarPagina('./resources/views/salidas_vehiculo.html', '#content')
                .then(async () => await import('./salida_vehiculo.js').then(async module => module.salida_vehiculo.init()))
                .catch(error => console.error(error))
            break
        case 'comprar':
            await Helpers.cargarPagina('./resources/views/venta_tiquete.html', '#content')
                .then(async () => await import('./venta.js').then(async module => module.venta.init()))
                .catch(error => console.error(error))
            break 
        default:
            await cargarPagina('/resources/views/inicio.html', '#content')
    }

}
async function cargarUsuarios(){
    usuarios = await Helpers.fetchData('./data/usuarios.json')
    return usuarios
    
}
function verificarUsuario(arr,nombre,contraseña){
    let key = false
    arr.map(usuario =>{
        if(nombre === usuario['nombre']&&contraseña===usuario['contraseña']){
            key = true
        }
    })
    return key 
}







