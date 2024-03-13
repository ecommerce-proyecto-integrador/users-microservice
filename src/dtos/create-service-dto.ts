import  { IsString } from "class-validator"

export class CreateServiceDto{
    @IsString()
    codigoCarpeta:string
    @IsString()
    nombreServicio: string
    @IsString()
    valorServicio: string
    @IsString()
    cantidad: string
    @IsString()
    unidadMedida: string
    
}