import httpClient from "./httpClient";

const RESOURCE = "/marcas";

const MarcaService = {
    listar: () => httpClient.get(RESOURCE),
    crear: (payload) => httpClient.post(RESOURCE, payload),
    
    // <-- AGREGADO: Para actualizar y eliminar -->
    actualizar: (idmarca, payload) => httpClient.put(`${RESOURCE}/${idmarca}`, payload),
    eliminar: (idmarca) => httpClient.delete(`${RESOURCE}/${idmarca}`)
};

export default MarcaService;