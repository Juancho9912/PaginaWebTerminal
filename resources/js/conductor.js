import Helpers from "./Helpers.js"

export class conductor{

    static init = async () =>{
        await Helpers.cargarPagina('/resources/views/conductores.html', '#content')
        const data = await Helpers.fetchData('./data/empresa.json')
        Helpers.populateSelectList('#empresa',data,'nombre','nombre')
        Helpers.validar()

    }

}