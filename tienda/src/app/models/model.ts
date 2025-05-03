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
export interface Login{
    UserName: string;
    Password: string;
}
export interface Compras {//compras a los proveedores
    CompraID: number;
    FechaCompra: Date;
    ProveedorID: number;
    TotalCompra: number;
}
export interface DetalleCompras{//compras a los proveedores
    DetalleCompraID: number;
    CompraID: number;
    ProductoID: number;
    CantidadComprada: number;
    PrecioUnitario: number;
    Subtotal: number;
    FechaDetalle: Date;
}
export interface Ventas {//compras de los usuarios
    VentaID: number;
    FechaVenta: Date;
    UsuarioID: number;
    TotalVenta: number;
}
export interface DetalleVentas {//compras de los usuarios
    DetalleVentaID: number;
    VentaID: number;
    ProductoID: number;
    CantidadVendida: number;
    PrecioUnitario: number;
    Subtotal: number;
    FechaDetalle: Date;
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
export interface HistorialItem {
    producto: Productos;
    detalle: DetalleVentas;
    fechaVenta: Date;
  }
  