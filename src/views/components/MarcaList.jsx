import DataTable from "react-data-table-component";

const colums = [
    { name : "ID", selector: (row) => row.idmarca, sortable: true},
    { name : "Nombre", selector: (row) => row.nombre, sortable: true},
    {
        name: "Estado",
        selector: (row) => row.estado,
        cell: (row) => (
            <span className={row.estado ? "badge badge-active": "badge badge-inactive"}>
                {row.estado ? "Activo" : "Inactivo"}
            </span>
        ),
    },
    { 
        name: "Precio", 
        selector: (row) => row.precio, 
        sortable: true,
        format: (row) => `S/ ${row.precio ? row.precio.toFixed(2) : '0.00'}`
    },
    { 
        name: "Cantidad", 
        selector: (row) => row.cantidad, 
        sortable: true 
    },
    { 
        name: "Total", 
        selector: (row) => row.total, 
        sortable: true,
        format: (row) => `S/ ${row.total ? row.total.toFixed(2) : '0.00'}` 
    },
    {
        name: "Creada",
        selector: (row) => row.created_at,
        cell: (row) => (row.created_at ? new Date(row.created_at).toLocaleString() : "-"),
    },
];

function MarcaList({ marcas, onEditar, onEliminar }) {
    
    const columnasConAcciones = [
        ...colums,
        {
            name: "Acciones",
            cell: (row) => (
                // Cambiado a className usando las clases de tu CSS
                <div className="acciones-container">
                    <button 
                        onClick={() => onEditar(row)} 
                        className="btn-accion btn-editar">
                        Editar
                    </button>
                    <button 
                        onClick={() => onEliminar(row.idmarca)} 
                        className="btn-accion btn-eliminar">
                        Eliminar
                    </button>
                </div>
            ),
            ignoreRowClick: true,
            allowOverflow: true,
            button: true,
        }
    ];

    return(
        <DataTable
        columns={columnasConAcciones}
        data={marcas}
        pagination={false}
        responsive // <--- ESTO QUITA LA BARRA DE SCROLL HORIZONTAL
        />
    );
}

export default MarcaList;