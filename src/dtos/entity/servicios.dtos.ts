import { Column, Entity} from "typeorm"

@Entity()
export class Servicio{
    @Column({ primary: true, generated: true })
    idServicio?: number;

    @Column({ nullable: true })
    codigoCarpeta?: string;
    
    @Column({ nullable: true })
    nombreServicio?: string;

    @Column({ nullable: true })
    valorServicio?: string;
    
    @Column({ nullable: true })
    cantidad?: string;

    @Column({ nullable: true })
    unidadMedida?: string;
   
}