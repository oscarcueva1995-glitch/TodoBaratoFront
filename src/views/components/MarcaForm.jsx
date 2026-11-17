import { useState, useEffect } from "react"; // 1. Importamos useEffect

function MarcaForm({ onCrear, loading, marcaEditando }){ // 2. Recibimos marcaEditando
    const [nombre, setNombre] = useState("");
    const [precio, setPrecio] = useState(""); 
    const [cantidad, setCantidad] = useState(""); 
    const [error, setError] = useState("");

    // 3. Efecto para rellenar los campos cuando se selecciona una marca para editar
    useEffect(() => {
        if (marcaEditando) {
            setNombre(marcaEditando.nombre || "");
            setPrecio(marcaEditando.precio !== undefined ? marcaEditando.precio : "");
            setCantidad(marcaEditando.cantidad !== undefined ? marcaEditando.cantidad : "");
        } else {
            // Si marcaEditando es null, limpiamos el formulario
            setNombre("");
            setPrecio("");
            setCantidad("");
        }
    }, [marcaEditando]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");
        try {
            await onCrear({ 
                nombre, 
                precio: parseFloat(precio), 
                cantidad: parseInt(cantidad) 
            });
            // Limpiamos los campos después de guardar con éxito
            setNombre("");
            setPrecio(""); 
            setCantidad(""); 
        }catch(err){
            setError(err.message);
        }
    };

    return(
        <form className="marca-form" onSubmit={handleSubmit}>
            {/* 4. Cambiamos el título dinámicamente */}
            <h2>{marcaEditando ? "Editar Marca" : "Nueva Marca"}</h2>
            
            <label htmlFor="nombre">Nombre</label>
            <input
                id="nombre"
                type="text"
                value={nombre}
                onChange={(e) => setNombre(e.target.value)}
                placeholder="Ej: Toyota"
                maxLength={200}
                required
            />

            <label htmlFor="precio">Precio</label>
            <input
                id="precio"
                type="number"
                step="0.01"
                value={precio}
                onChange={(e) => setPrecio(e.target.value)}
                placeholder="Ej: 150.50"
                required
            />

            <label htmlFor="cantidad">Cantidad</label>
            <input
                id="cantidad"
                type="number"
                value={cantidad}
                onChange={(e) => setCantidad(e.target.value)}
                placeholder="Ej: 5"
                required
            />

            {error && <p className="form-error">{error}</p>}
            
            {/* 5. Cambiamos el texto del botón dinámicamente */}
            <button type="submit" disabled={loading}>
                {loading ? "Guardando..." : (marcaEditando ? "Actualizar marca" : "Crear marca")}
            </button>
        </form>
    );
}

export default MarcaForm;