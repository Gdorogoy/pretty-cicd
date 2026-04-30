import { Module } from '@nestjs/common';
import { GithubService } from './github.service';
import { GithubController } from './github.controller';
import { Octokit } from 'octokit';
import { SocketModule } from '../socket/socket.module';

@Module({
  controllers: [GithubController],
  providers: [GithubService],
  imports:[Octokit,SocketModule]
})
export class GithubModule {}
