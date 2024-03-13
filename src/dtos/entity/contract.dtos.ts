import { Column, Entity} from "typeorm"

@Entity()
export class Contract{
    @Column({ primary: true, generated: true })
    idContract?: number;
    @Column({ nullable: true })
    codigoCarpeta?: string
    @Column()
    nombre: string
    @Column()
    rut: string
    @Column()
    correo?: string
    @Column()
    telefono?: string
    @Column()
    area?: string
    @Column()
    tipoContrato?: string
    
    @Column()
    lugarFaena?: string
    @Column()
    descripcionContrato?: string
    
    @Column()
    fechaInicioContrato?: string
    @Column()
    fechaFinContrato: string
    @Column()
    montoNeto: string
    @Column()
    montoImpuesto: string
    
    @Column()
    formaPago: string
    @Column()
    descripcionPago: string
    
    @Column()
    nombreEmpresa: string
    @Column()
    rutEmpresa: string
    @Column()
    direccionEmpresa: string
    @Column()
    nombreRepresentante: string
    @Column()
    rutRepresentante: string
    @Column()
    nacionalidad: string
    @Column()
    numeroContacto: string
    @Column()
    direccionRepresentante: string
    @Column()
    correoRepresentante: string
    
   
}