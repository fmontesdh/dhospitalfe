import { Nota } from "./nota";
import { NotaDetalle } from "./nota-detalle";

export class PacienteNotaDetalle {
    constructor(
        public id: number,
        public nombre: string,
        public apellido: string,
        public fechaNacimiento: Date,
        public direccion: string,
        public notasVisita: NotaDetalle[],
    ) { }
}
