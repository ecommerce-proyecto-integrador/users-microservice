import { Entity, PrimaryGeneratedColumn, ManyToOne, JoinColumn,Column } from "typeorm";
import { Equipos } from "./equipos.dtos";
//import { Integrantes } from "./integrantes.dtos";
import { Roles } from "./roles.dtos";

@Entity()
export class EquipoIntegranteRol {
  @PrimaryGeneratedColumn()
  id?: number;
  
  @ManyToOne(() => Equipos, equipo => equipo.equipoIntegrantes)
  @JoinColumn()
  equipo?: Equipos;

  /*
  @ManyToOne(() => Integrantes, integrante => integrante.equipoIntegrantes)
  @JoinColumn()
  integrante?: Integrantes;
  */
  @Column()
  correoIntegrante: string;

  @ManyToOne(() => Roles, rol => rol.equipoIntegrantes)
  @JoinColumn()
  rol?:Roles;
}