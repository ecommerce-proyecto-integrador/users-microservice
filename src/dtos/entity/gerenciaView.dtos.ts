import { Column, Entity} from "typeorm"

@Entity()
export class GerenciaView{
    @Column({ primary: true, generated: true })
    idAdminView?: number;
    @Column({ nullable: true })
    idContract?: number
    @Column({ nullable: true })
    codigoCarpeta?: string
    @Column({ nullable: true })
    nombre?: string
    @Column({ nullable: true })
    rut?: string
    @Column({ nullable: true })
    correo?: string
    @Column({ nullable: true })
    telefono?: string
    @Column({ nullable: true })
    area?: string
    @Column({ nullable: true })
    tipoContrato?: string
    
    @Column({ nullable: true })
    lugarFaena?: string
    @Column({ nullable: true })
    descripcionContrato?: string
    
    @Column({ nullable: true })
    fechaInicioContrato?: string
    @Column({ nullable: true })
    fechaFinContrato: string
    @Column({ nullable: true })
    montoNeto: string
    @Column({ nullable: true })
    montoImpuesto: string
    
    @Column({ nullable: true })
    formaPago: string
    @Column({ nullable: true })
    descripcionPago: string
    
    @Column({ nullable: true })
    nombreEmpresa: string
    @Column({ nullable: true })
    rutEmpresa: string
    @Column({ nullable: true })
    direccionEmpresa: string
    @Column({ nullable: true })
    nombreRepresentante: string
    @Column({ nullable: true })
    rutRepresentante: string
    @Column({ nullable: true })
    nacionalidad: string
    @Column({ nullable: true })
    numeroContacto: string
    @Column({ nullable: true })
    direccionRepresentante: string
    @Column({ nullable: true })
    correoRepresentante: string
    
   
}