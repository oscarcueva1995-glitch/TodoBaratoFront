export class Marca {
    constructor ({ idmarca = null,
        nombre = "",
        estado = true,
        precio = 0.0,
        cantidad = 1,
        total = 0.0,
        created_at = null,
        updated_at = null } = {}){
            this.idmarca = idmarca;
            this.nombre = nombre;
            this.estado = estado;
            this.precio = precio;
            this.cantidad = cantidad;
            this.total = total;
            this.created_at = created_at;
            this.updated_at = updated_at;
        }
    static fromResponse(data){
        return new Marca(data);
    }

    toRequestPayload() {
        return {
            nombre: this.nombre,
            estado: this.estado,
            precio: this.precio,
            cantidad: this.cantidad,
        };
    }

    isValid() {
        return typeof this.nombre == "string" && this.nombre.trim().length > 0 && this.nombre.length <= 200 && this.precio > 0 && this.cantidad > 0;
    }

}