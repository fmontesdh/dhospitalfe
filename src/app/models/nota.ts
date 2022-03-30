export class Nota {
    constructor(
        public id: number,
        public descripcion: string,
        public fechaNota: Date,
        public paciente_id: number,
        public doctor_id: number,
    ) { }
}
