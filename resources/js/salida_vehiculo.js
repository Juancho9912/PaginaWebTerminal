import Helpers from "./Helpers.js"

export class salida_vehiculo{

    static init = async () =>{
        const data1 = await Helpers.fetchData('./data/empresa.json')
        Helpers.populateSelectList('#empresa',data1,'nombre','nombre')
        const data2 = await Helpers.fetchData('./data/conductores.json')
        Helpers.populateSelectList('#conductor',data2,'nombre','nombre')
        const data3 = await Helpers.fetchData('./data/carros.json')
        Helpers.populateSelectList('#vehiculo',data3,'tipo','tipo')
        Helpers.validar()
    }

}