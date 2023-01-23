export default class Helpers {

    static populateSelectList = (selector, items = [], value = '', text = '') => {
        let list = document.querySelector(selector)
        list.options.length = 0
        items.forEach(item => list.add(new Option(item[text], item[value])))
        return list // <-- OJO
    }
    static fetchData = async (url, options = {}, type = 'json') => {

        if (Object.entries(options).length > 0) {
            if (!("headers" in options)) {
                options.headers = {
                    "Content-Type": "application/json",
                }
            }
            if ("body" in options) {
                options.body = JSON.stringify(options.body)
            }
        }

        const response = await fetch(url, options)

        if (!response.ok) {
            throw new Error(`${response.status} - ${response.statusText}`)
        }

        return await response[type]() // <-- OJO
    }
    static cargarPagina = async (url, container) => {
        const response = await fetch(url)
        const element = document.querySelector(container)
    
        if (response.ok) {
            const html = await response.text()
            element.innerHTML = html
            return element
        }
    
        throw new Error(`${response.status} - ${response.statusText}`)
    }
    static validar(){
    
        const formulario = document.querySelector('#form')
        const inputs = document.querySelectorAll('#form input')
    
        inputs.forEach(input =>{
            input.addEventListener('keyup', e=>this.comprobar(input))
            input.addEventListener('blur', e=>this.comprobar(input))
        })
        formulario.addEventListener('submit', e=>{
            let key
            e.preventDefault();
            inputs.forEach(input =>{
                if(input.classList.contains('incorrecto')){
                    key=false
                }else{
                    key=true
                }
            })
            if (key) {
                console.log("sirve");
            }else{
                console.error("Campos incorrectos");
            }
        })
    }
    static comprobar(obj) {
        const lowerCase = obj.name.toLowerCase()
        
    
        if (this.expresiones[lowerCase].test(obj.value)) {
            document.querySelector(`#${obj.id}`).classList.remove('incorrecto')
            document.querySelector(`#${obj.id}`).classList.add('correcto')
            document.querySelector(`#error_${lowerCase}`).classList.add('hidden')
        } else {
            document.querySelector(`#${obj.id}`).classList.add('incorrecto')
            document.querySelector(`#${obj.id}`).classList.remove('correcto')
            document.querySelector(`#error_${lowerCase}`).classList.remove('hidden')
        }
    }
    static mostrarSillas(num, string) {
        const contenedor = document.querySelector('#sillas')
    
        const libre = `
                        <div class="w-16 bg-green-400 p-1 cursor-pointer hover:bg-green-600 rounded-md">
                            <img src="./resources/assets/sillas.png" alt="">
                        </div>
                        `
        const ocupado = `
                        <div class="w-16 bg-red-400 p-1 rounded-md" title="Ocupado">
                            <img src="./resources/assets/sillas.png" alt="">
                        </div>
                        `
        const reserva = `
                        <div class="w-16 bg-yellow-300 p-1 rounded-md" title="Reservado">
                            <img src="./resources/assets/sillas.png" alt="">
                        </div>
                        `
        const conductor = `
                        <div class="w-16">
                            <img src="./resources/assets/conductor.png" alt="">
                        </div>
                        `
        const escalera = `
                        <div class="w-16 ">
                            <img src="./resources/assets/escaleras.png" alt="">
                        </div>
                        `
    
        const pasillo = `
                        <div class="w-16"> </div>
                        `
    
        const silla = `
                        <div class="w-16 ">
                            <img src="./resources/assets/sillas.png" alt="">
                        </div>
                        `
        
        if(string === 'vehiculo'){
            switch (num) {
                case 0:
                    contenedor.insertAdjacentHTML('beforeend', pasillo)
                    break
                case 4:
                    contenedor.insertAdjacentHTML('beforeend', conductor)
                    break
                case 5:
                    contenedor.insertAdjacentHTML('beforeend', escalera)
                    break
                default:
                    contenedor.insertAdjacentHTML('beforeend', silla)
                    break;
            }
        }else{
            switch (num) {
                case 3:
                    contenedor.insertAdjacentHTML('beforeend', ocupado)
                    break;
                case 1:
                    contenedor.insertAdjacentHTML('beforeend', libre)
                    break;
                case 2:
                    contenedor.insertAdjacentHTML('beforeend', reserva)
                    break;
                case 0:
                    contenedor.insertAdjacentHTML('beforeend', pasillo)
                    break;
                case 4:
                    contenedor.insertAdjacentHTML('beforeend', conductor)
                    break;
                case 5:
                    contenedor.insertAdjacentHTML('beforeend', escalera)
                    break; 
            }
        }
    }
    static expresiones = {
        identificacion: /^[a-zA-Z0-9]{4,16}$/, // Letras, numeros
        nombre: /^[a-zA-ZÀ-ÿ\s]{1,40}$/, // Letras y espacios, pueden llevar acentos.
        telefono: /^\d{7,14}$/, // 7 a 14 numeros.
        correo: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
        vehiculo: /^[a-zA-Z0-9]{3,8}$/,
        datetime: /^([0-9]{2}[\/-][0-9]{2}[\/-][0-9]{4} [0-9]{2}:[0-9]{2} ?( [aAPp].[mM])?)$/,
        valor: /^[0-9]+(.[0-9]{3})?$/,
        interno: /^[a-zA-A0-9]{3,8}$/,
        destino: /^[a-zA-ZÀ-ÿ\s]{1,40}$/
    }
}