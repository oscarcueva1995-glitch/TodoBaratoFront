import { useEffect, useState } from "react";
import MarcaController from "../../controllers/MarcaController";
import MarcaForm from "../components/MarcaForm";
import MarcaList from "../components/MarcaList";

function MarcasPage(){
    const [marcas, setMarcas] = useState([]);
    const [loading, setLoading] = useState(false); // Corregido: inicializado como false
    const [error, setError] = useState("");
    const [marcaEditando, setMarcaEditando] = useState(null); // <-- AGREGADO: Para saber qué marca editar

    const cargarMarcas = async () => {
        setLoading(true);
        setError("");
        try{
            const data = await MarcaController.listarMarcas();
            setMarcas(data);
        }catch(err){
            setError("No se pudo cargar la lista de marcas");
        }finally{
            setLoading(false);
        }
    };

    useEffect(() => {
        cargarMarcas();
    }, []);

    // <-- MODIFICADO: Ahora maneja tanto la creación como la edición -->
    const handleGuardar = async (form) => {
        setLoading(true);
        try{
            if (marcaEditando) {
                await MarcaController.actualizarMarca(marcaEditando.idmarca, form);
                setMarcaEditando(null); // Salimos del modo edición
            } else {
                await MarcaController.crearMarca(form);
            }
            await cargarMarcas();
        }finally{
            setLoading(false);
        }
    };

    // <-- AGREGADO: Función para eliminar -->
    const handleEliminar = async (idmarca) => {
        if (window.confirm("¿Seguro que deseas eliminar esta marca?")) {
            try {
                await MarcaController.eliminarMarca(idmarca);
                await cargarMarcas();
            } catch (err) {
                alert(err.message);
            }
        }
    };

    // <-- AGREGADO: Función para preparar la edición -->
    const handleEditar = (marca) => {
        setMarcaEditando(marca);
    };

    return(
        <div className="marcas-page">
            <h1>Marcas - Todo Barato</h1>
            
            {/* Le pasamos la marca que se está editando al formulario */}
            <MarcaForm 
                onCrear={handleGuardar} 
                loading={loading} 
                marcaEditando={marcaEditando} 
            />
            
            {error && <p className="page-error">{error}</p>}
            
            {loading && marcas.length === 0 ? (
                <p>Cargando marcas...</p> 
            ) : (
                <MarcaList 
                    marcas={marcas} 
                    onEditar={handleEditar} 
                    onEliminar={handleEliminar} 
                />
            )}
        </div>
    );

}

export default MarcasPage;