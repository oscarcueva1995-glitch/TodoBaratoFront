// src/controllers/MarcaController.js
import MarcaService from "../services/MarcaService";
import { Marca } from "../models/Marca";

const MarcaController = {
    async listarMarcas() {
        const { data } = await MarcaService.listar();
        return data.map((item) => Marca.fromResponse(item));
    },
    
    async crearMarca({ nombre, precio, cantidad }) {
        const marca = new Marca({ nombre, precio, cantidad }); 
        if (!marca.isValid()) {
            throw new Error("El nombre es obligatorio, y el precio y cantidad deben ser mayores a 0");
        }
        try {
            const { data } = await MarcaService.crear(marca.toRequestPayload());
            return Marca.fromResponse(data);
        } catch(err) {
            const mensajeBackend = err.response?.data?.message;
            throw new Error(mensajeBackend || "No se pudo crear la marca");
        }
    },

    // NUEVOS MÉTODOS
    async actualizarMarca(idmarca, { nombre, precio, cantidad }) {
        const marca = new Marca({ nombre, precio, cantidad });
        if (!marca.isValid()) {
            throw new Error("El nombre es obligatorio, y el precio y cantidad deben ser mayores a 0");
        }
        try {
            const { data } = await MarcaService.actualizar(idmarca, marca.toRequestPayload());
            return Marca.fromResponse(data);
        } catch(err) {
            const mensajeBackend = err.response?.data?.message;
            throw new Error(mensajeBackend || "No se pudo actualizar la marca");
        }
    },

    async eliminarMarca(idmarca) {
        try {
            await MarcaService.eliminar(idmarca);
        } catch(err) {
            const mensajeBackend = err.response?.data?.message;
            throw new Error(mensajeBackend || "No se pudo eliminar la marca");
        }
    }
};

export default MarcaController;