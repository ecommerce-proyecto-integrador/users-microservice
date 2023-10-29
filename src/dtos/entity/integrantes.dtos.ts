/*import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from "typeorm";
import { EquipoIntegranteRol } from "./equipoIntegranteRol.dto";

@Entity()
export class Integrantes {
  
  @PrimaryGeneratedColumn()
  idIntegrante: number;

  @Column()
  correo: string;
  
  
  
  @OneToMany(() => EquipoIntegranteRol, equipoIntegrante => equipoIntegrante.integrante)
  equipoIntegrantes?: EquipoIntegranteRol[]
}
*/