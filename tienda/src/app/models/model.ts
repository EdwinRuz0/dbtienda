//model.ts
export interface Categoria {
    id: number;
    NombreCategoria: string;
    Descripcion: string;
}
export interface Historial{
    AuditoriaID: number;
    NombreTabla: string;
    Operacion:string;
    Usuario:string;
    FechaHora:string;
    DatosAnteriores:string;
    DatosNuevos:string;
}
export interface Productos{
    ProductoID?: number;
    NombreProducto: string;
    Descripcion: string;
    Precio: number;
    CantidadEnStock: number;
    CategoriaID?: number;
    ProveedorID?: number;
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
export interface Imagen {
    ImageName: string;
    ImageData: string;
}
