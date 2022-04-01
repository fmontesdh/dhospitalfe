import { Doctor } from "./doctor";

export class NotaDetalle {
    constructor(
        public id: number,
        public descripcion: string,
        public fechaNota: Date,
        public doctor: Doctor
    ) { }
}