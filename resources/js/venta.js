import Helpers from "./Helpers.js"

export class venta{

    static init = async () =>{
        this.cargarVenta()

    }


    static async cargarVenta(){

        const data = await Helpers.fetchData('./data/ciudades.json')
        Helpers.populateSelectList('#ciudad',data,'ciudad','ciudad')

        const data2 = await Helpers.fetchData('./data/ciudades.json')
        Helpers.populateSelectList('#ciudadDestino',data2,'ciudad','ciudad')

        const data3 = await Helpers.fetchData('./data/carros.json')
        Helpers.populateSelectList('#fecha',data3,'fecha','fecha')
    
        data3[0].orden.forEach(dato=>{
            dato.forEach(num =>{
                Helpers.mostrarSillas(num,'venta')
            })
        })
        
        document.querySelector('#fecha').addEventListener('change',e=>{
            e.preventDefault()
            this.cargarSillasVenta(e.target.value)
        })
    }
    
    static async cargarSillasVenta(fecha) {
        const data = await Helpers.fetchData('./data/carros.json')
        document.querySelector('#sillas').innerHTML =''
        
    
        data.forEach(dato =>{
            if (dato.fecha === fecha) {
                dato.orden.forEach(orden =>{
                    orden.forEach(num =>{
                        Helpers.mostrarSillas(num,'venta')
                    })  
                }) 
            }
        })
        
    }
    
}