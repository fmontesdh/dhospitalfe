export class Doctor {
    constructor(
        public id: number,
        public nombre: string,
        public apellido: string,
        public fechaNacimiento: Date,
        public direccion: string,
        public hospital_id: number
    ) { }
}
