import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { Transport, ClientsModule } from '@nestjs/microservices';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Users } from './dtos/entity/user.dtos';
import { Recovery } from './dtos/entity/recovery.dtos';
import { JwtModule } from '@nestjs/jwt'; // Asegúrate de importar JwtModule
import { Equipos } from './dtos/entity/equipos.dtos';
//import { Integrantes } from './dtos/entity/integrantes.dtos';
import { EquipoIntegranteRol } from './dtos/entity/equipoIntegranteRol.dto';
import { Roles } from './dtos/entity/roles.dtos';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'USERS_SERVICE',
        transport: Transport.RMQ,
        options: {
          urls: ['amqp://localhost:5672'],
          queue: 'users_queue',
          queueOptions: {
            durable: false,
          },
        },
      },
    ]),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3307,
      username: 'user_crud',
      password: 'root',
      database: 'db_crud',
      autoLoadEntities: true,
      synchronize: true,
    }),
    TypeOrmModule.forFeature([Users,Recovery,Equipos,EquipoIntegranteRol,Roles/*,Integrantes*/]),
    JwtModule.register({
      secret: 'tu_clave_secreta', // Reemplaza con tu clave secreta real
      signOptions: { expiresIn: '1h' }, // Opciones de firma del token
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}