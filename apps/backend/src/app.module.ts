import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { GithubModule } from './github/github.module';
import { SocketModule } from './socket/socket.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [GithubModule, SocketModule,ConfigModule.forRoot({isGlobal:true})],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
