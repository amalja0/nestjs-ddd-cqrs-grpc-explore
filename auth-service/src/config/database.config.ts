import { TypeOrmModuleOptions, TypeOrmOptionsFactory } from "@nestjs/typeorm";

export class DatabaseConfiguration implements TypeOrmOptionsFactory {
  createTypeOrmOptions(): Promise<TypeOrmModuleOptions> | TypeOrmModuleOptions {
    return {
      type: 'postgres',
      logging: true,
      replication: {
        master: {
          host: process.env.POSTGRES_HOST,
          port: parseInt(process.env.POSTGRES_PORT, 10) || 5432,
          username: process.env.POSTGRES_USERNAME,
          password: process.env.POSTGRES_PASSWORD,
          database: process.env.POSTGRES_DATABASE,
        },
        slaves: [
          {
            host: process.env.POSTGRES_REPLICA_HOST,
            port: parseInt(process.env.POSTGRES_REPLICA_PORT, 10) || 5432,
            username: process.env.POSTGRES_REPLICA_USERNAME,
            password: process.env.POSTGRES_REPLICA_PASSWORD,
            database: process.env.POSTGRES_REPLICA_DATABASE,
          }
        ]
      },
      synchronize: false,
      entities: [__dirname + '/../../dist/modules/auth/infrastructure/entity/*.entity.js'],
    }
  }
}