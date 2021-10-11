import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AppService } from './app.service';
import { CategoryModule } from './category/category.module';
import { DeviceModule } from './device/device.module';

@Module({
  imports: [
    // ServeStaticModule.forRoot({
    //   rootPath: join(__dirname, './', 'frontend-angular'),
    // }),
    ConfigModule.forRoot(),
    TypeOrmModule.forRootAsync({
      useFactory: () => ({
        type: 'mysql',
        url: process.env.DATABASE_URL || null,
        host: process.env.LOCALHOST || 'localhost',
        port: parseInt(process.env.PORT) || 3306,
        username: process.env.USER || 'root',
        password: process.env.PASSWORD || '',
        database: process.env.DATABASE || 'db_device',
        entities: [__dirname + '/**/*.entity{.ts,.js}'],
        synchronize: true,
      }),
    }),
    CategoryModule,
    DeviceModule,
  ],
  controllers: [AppController],
  providers: [AppService],
  exports: [AppModule],
})
export class AppModule {}
