import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { Transport, ClientsModule } from '@nestjs/microservices';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Users } from './dtos/entity/user.dtos';
import { Recovery } from './dtos/entity/recovery.dtos';
import { JwtModule } from '@nestjs/jwt'; // Asegúrate de importar JwtModule


@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'USERS_SERVICE',
        transport: Transport.RMQ,
        options: {
          urls: ['amqp://rabbitmq:5672'], // sin docker es localhost
          queue: 'users_queue',
          queueOptions: {
            durable: false,
          },
        },
      },
    ]),TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'silly.db.elephantsql.com',
      port: 5432,
      username: 'elxuemtd',
      password: 'LGo6aUDv0jkn-3bFRV8G9Kni9VA5CKDn',
      database: 'elxuemtd',
      autoLoadEntities: true,
      synchronize: true,
    }),
      /*
    TypeOrmModule.forRoot({
      type: 'mysql', //mysql
      host: 'mysql', // mysql
      port: 3306, // sin docker es 3308 // docker 3306
      username: 'user_crud', // user_crud
      password: 'root', // root
      database: 'db_crud', // db_crud
      autoLoadEntities: true,
      synchronize: true,
    }),*/
    TypeOrmModule.forFeature([Users,Recovery]),
    JwtModule.register({
      secret: 'tu_clave_secreta', // Reemplaza con tu clave secreta real
      signOptions: { expiresIn: '1h' }, // Opciones de firma del token
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}