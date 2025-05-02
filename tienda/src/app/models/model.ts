//model.ts
export interface Categoria {
    id: number;
    NombreCategoria: string;
    Descripcion: string;
    ImagenID: number;
    imagenBase64?: string;
}
export interface Productos{
    ProductoID: number;
    NombreProducto: string;
    Descripcion: string;
    Precio: number;
    CantidadEnStock: number;
    CategoriaID: number;
    ProveedorID: number;
    ImagenID: number;
    imagenBase64?: string;
    hover: boolean;
    CategoriaNombre?: string;
    NombreProveedor?: string;
}
export interface Usuario{
    username: string;
    password: string;
    surname: string;
    middleSurname: string;
    institution: string;
    email: string;
}
export interface Proveedores{
    ProveedorID: number;
    NombreProveedor: string;
    ContactoProveedor: string;
    DireccionProveedor: string;
    ImagenID: number;
    imagenBase64?: string;
}
export class Encuesta {
    id!: number;
    titulo!: string;
    descripcion!: string;    
    imagen!: string;
    static titulo: any;
}
export interface Login{
    UserName: string;
    Password: string;
}
export interface encuestas{
    imagen:string;
    titulo:string;
    categoria:string;
    descripcion:string;
}
interface Fotos {
    name: string;
    extension: string;
    data: string;
}
export interface PerfilImagen{
    name:string;
    extension:string;
    data:string;
}
export interface CarritoTemporal{
    CarritoID: number;
    UsuarioID: number;
    ProductoID: number;
    Cantidad: number;
    FechaAgregado: Date;
    ImagenID: number;
    imagenBase64?: string;
}
export interface CarritoConDetalles extends CarritoTemporal {
    NombreProducto: string;
    PrecioUnitario: number;
    ImagenBase64: string;
    Subtotal: number;
}
  