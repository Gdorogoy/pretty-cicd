import { SocketGateway } from '../socket/socket.gateway';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Octokit } from 'octokit';
import { mapAllWorkflows, mapToResponse } from './github.response.dto';
import axios from 'axios';
import { run } from 'node:test';

@Injectable()
export class GithubService {
  private octokit: Octokit;

  constructor(
    private readonly socketGateway: SocketGateway,
    private readonly configService: ConfigService,
  ) {
    this.octokit = new Octokit({
      auth: this.configService.getOrThrow('github_key'),
    });
  }

  async fetchWorkflowByNum(owner: string, repo: string,num:number) {
    const res = await this.octokit.rest.actions.listWorkflowRunsForRepo({
      owner,
      repo,
    });

    const latestRun = res.data.workflow_runs[num];
    if (!latestRun?.jobs_url) {
      throw new Error('No workflow runs found');
    }

    const job = await axios.get(latestRun.jobs_url, {
      headers: {
        Authorization: `Bearer ${this.configService.getOrThrow('github_key')}`,
        Accept: 'application/vnd.github+json',
      },
    });

    return mapToResponse(latestRun, job.data.jobs);
  }

  async fetchAllWorkFlows(owner: string, repo: string) {
    const res = await this.octokit.rest.actions.listWorkflowRunsForRepo({
      owner,
      repo,
    });

    const runs = res.data.workflow_runs;
    // if (!latestRun?.jobs_url) {
    //   throw new Error('No workflow runs found');
    // }

    // const job = await axios.get(latestRun.jobs_url, {
    //   headers: {
    //     Authorization: `Bearer ${this.configService.getOrThrow('github_key')}`,
    //     Accept: 'application/vnd.github+json',
    //   },
    // });

    // return mapToResponse(latestRun, job.data.jobs);

    return mapAllWorkflows(runs);
  }
}
