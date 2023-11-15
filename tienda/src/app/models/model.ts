//model.ts
export interface Question {
    type: string;
    category: string;
    questionText: string;
    options: string[]; // Opciones de la pregunta (solo para preguntas de opción múltiple)
    answer: string; // Respuesta de la pregunta (por ejemplo, la opción correcta)
}
export interface preguntas{
    questionText: string;
    type: string;
    category: string,
    option?: string,
    answer: string,
    opcion1?:string,
    opcion2?:string,
    opcion3?:string,
}
export interface Usuario{
    username: string;
    password: string;
    surname: string;
    middleSurname: string;
    institution: string;
    email: string;
}
export interface CategoriaI{
    title: string;
    description: string;
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
export interface Survey{
    name: string;
    description: string;
    privacy: string;
    questions: Question[];
}
