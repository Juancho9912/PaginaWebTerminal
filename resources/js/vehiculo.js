import Helpers from "./Helpers.js"

export class vehiculo{


    static init = async () =>{
        this.cargarVehiculo()
        Helpers.validar()

    }

    static async cargarVehiculo(){
        const data = await Helpers.fetchData('./data/carros.json')
        Helpers.populateSelectList('#vehiculo',data,'tipo','tipo')
        const data2 = await Helpers.fetchData('./data/empresa.json')
        Helpers.populateSelectList('#empresa',data2,'nombre','nombre')
    
        data[0].orden.forEach(dato=>{
            dato.forEach(num =>{
                Helpers.mostrarSillas(num,'vehiculo')
            })
        })
    
        document.querySelector('#vehiculo').addEventListener('change',e=>{
            e.preventDefault()
            this.cargarSillas(e.target.value)
        })
        
    }
    static async cargarSillas(carro) {
        console.log("hola");
        const data = await Helpers.fetchData('./data/carros.json')
        document.querySelector('#sillas').innerHTML =''
        
    
        data.forEach(dato =>{
            if (dato.tipo === carro) {
                dato.orden.forEach(orden =>{
                    orden.forEach(num =>{
                        Helpers.mostrarSillas(num,'vehiculo')
                    })  
                }) 
            }
        })
        
    }
}