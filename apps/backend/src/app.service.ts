import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Octokit } from 'octokit';

@Injectable()
export class AppService {


  private octokit:Octokit;
  
  constructor(private readonly configService:ConfigService){
    this.octokit=new Octokit({
      auth:this.configService.getOrThrow("github_key")
    });

    

  }

  getHello(): string {
    return 'Hello World!';
  }


  

  getArtifacts(owner:string,repo:string):Promise<any>{
    try{
      

      return this.octokit.rest.actions.listWorkflowRunsForRepo({
          owner:owner,
          repo:repo
        });

    }catch(err){
      throw err;
    }
  }

}
