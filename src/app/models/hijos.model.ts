export class Hijo {
  idHijo: number;
  idPersonal: number;
  tipoDoc: string;
  numeroDoc: string;
  apPaterno: string;
  apMaterno: string;
  nombre1: string;
  nombre2: string;
  nombreCompleto: string;
  fechaNac: Date;

  constructor(
    idHijo: number,
    idPersonal: number,
    tipoDoc: string,
    numeroDoc: string,
    apPaterno: string,
    apMaterno: string,
    nombre1: string,
    nombre2: string,
    nombreCompleto: string,
    fechaNac: Date,
  ) {
    this.idHijo = idHijo;
    this.idPersonal = idPersonal;
    this.tipoDoc = tipoDoc;
    this.numeroDoc = numeroDoc;
    this.apPaterno = apPaterno;
    this.apMaterno = apMaterno;
    this.nombre1 = nombre1;
    this.nombre2 = nombre2;
    this.nombreCompleto = nombreCompleto;
    this.fechaNac = fechaNac;
  }
}