import { Controller, Get, Param } from '@nestjs/common';
import { GithubService } from './github.service';

@Controller('artifacts')
export class GithubController {
  constructor(private readonly githubService: GithubService) {}

  @Get(':owner/:repo/:num')
  getArtifact(@Param('owner') owner:string,@Param('repo') repo:string, @Param('num') num:string):Promise<any>{
    return this.githubService.fetchWorkflowByNum(owner,repo,+num);
  }

  @Get(':owner/:repo/')
  getAllArtifacts(@Param('owner') owner:string,@Param('repo') repo:string):Promise<any>{
    return this.githubService.fetchAllWorkFlows(owner,repo);
  }

}
