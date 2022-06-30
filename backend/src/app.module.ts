import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from './users/users.module';
import { GroupsModule } from './groups/groups.module';
import { HistoriesModule } from './histories/histories.module';
import { PresetsModule } from './presets/presets.module';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
const config = require('../ormconfig')[process.env.NODE_ENV || 'development'];

@Module({
  imports: [
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'public'),
    }),
    TypeOrmModule.forRoot(config['db']),
    UsersModule,
    GroupsModule,
    HistoriesModule,
    PresetsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
