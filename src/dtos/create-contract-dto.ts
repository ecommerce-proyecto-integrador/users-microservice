import  { IsString } from "class-validator"

export class CreateContractDto{
    @IsString()
    codigoCarpeta:string
    @IsString()
    nombre: string
    @IsString()
    rut: string
    @IsString()
    correo: string
    @IsString()
    telefono: string
    @IsString()
    area: string
    
    @IsString()
    tipoContrato: string
     
    @IsString()
    lugarFaena: string
    @IsString()
    descripcionContrato: string
    
    @IsString()
    fechaInicioContrato: string
    @IsString()
    fechaFinContrato: string
    @IsString()
    montoNeto: string
    @IsString()
    montoImpuesto: string
    
    @IsString()
    formaPago: string
    @IsString()
    descripcionPago: string
    
    @IsString()
    nombreEmpresa: string
    @IsString()
    rutEmpresa: string
    @IsString()
    direccionEmpresa: string
    @IsString()
    nombreRepresentante: string
    @IsString()
    rutRepresentante: string
    @IsString()
    nacionalidad: string
    @IsString()
    numeroContacto: string
    @IsString()
    direccionRepresentante: string
    @IsString()
    correoRepresentante: string
    
    
    
}