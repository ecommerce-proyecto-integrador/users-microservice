import { Entity, Column,PrimaryGeneratedColumn,OneToMany } from "typeorm";
import { EquipoIntegranteRol } from "./equipoIntegranteRol.dto";

@Entity()
export class Roles {
  
  @PrimaryGeneratedColumn()
  idRoles: number;

  @Column()
  name: string;
  
  
  @OneToMany(() => EquipoIntegranteRol, equipoIntegrante => equipoIntegrante.rol)
  equipoIntegrantes?: EquipoIntegranteRol[];

}