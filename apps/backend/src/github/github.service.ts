import { SocketGateway } from './../socket/socket.gateway';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Octokit } from 'octokit';

@Injectable()
export class GithubService {

    private octokit:Octokit;

    constructor(private readonly socketGateway:SocketGateway,private readonly configService:ConfigService){
        this.octokit=new Octokit({
            auth:configService.getOrThrow("github_key")
        });
    }

    async fetchAllWorkflows() : Promise<any> {
        try{
            const res=await this.octokit.rest.actions.listWorkflowRunsForRepo({
                repo:"api-gateway",
                owner:"gdorogoy"
            });
            
            this.socketGateway.sendUpadte(res);

            return res;

        }catch(err){
            throw err;
        }

    }

}
