import Helpers from "./Helpers.js"

export class destinos_empresas{

    static init = async () =>{
        const data4 = await Helpers.fetchData('./data/ciudades.json')
        Helpers.populateSelectList('#ciudad',data4,'ciudad','ciudad')
        const data5 = await Helpers.fetchData('./data/empresa.json')
        Helpers.populateSelectList('#empresa',data5,'nombre','nombre')
        Helpers.validar()

    }
}