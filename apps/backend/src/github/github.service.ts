import { SocketGateway } from '../socket/socket.gateway';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Octokit } from 'octokit';
import { mapAllWorkflows, mapToResponse } from './github.response.dto';
import axios from 'axios';
import { Cron } from '@nestjs/schedule';

@Injectable()
export class GithubService {

  private octokit: Octokit;
  private repoData;
  private latestKnownRunId;



  constructor(
    private readonly socketGateway: SocketGateway,
    private readonly configService: ConfigService,
  ) {
    this.octokit = new Octokit({
      auth: this.configService.getOrThrow('github_key'),
    });
    this.repoData = {};
    this.latestKnownRunId = null;
  }

  async fetchWorkflowByNum(owner: string, repo: string, num: number) {

    try {

      //fetching the worklfows

      const res = await this.octokit.rest.actions.listWorkflowRunsForRepo({
        owner,
        repo,
      });

      this.repoData = {
        owner: owner,
        repo: repo
      }

      this.latestKnownRunId = res.data.workflow_runs[0].id;

      const latestRun = res.data.workflow_runs[num];
      if (!latestRun?.jobs_url) {
        throw new Error('No workflow runs found');
      }

      try {

        //fetching the jobs

        const job = await axios.get(latestRun.jobs_url, {
          headers: {
            Authorization: `Bearer ${this.configService.getOrThrow('github_key')}`,
            Accept: 'application/vnd.github+json',
          },
        });

        return mapToResponse(latestRun, job.data.jobs);

      } catch (err) {
        throw new Error(err);

      }

    } catch (err) {
      throw new Error(err);
    }

  }

  async fetchAllWorkFlows(owner: string, repo: string) {

    try {
      const res = await this.octokit.rest.actions.listWorkflowRunsForRepo({
        owner,
        repo,
      });

      const runs = res.data.workflow_runs;

      return mapAllWorkflows(runs);

    } catch (err) {
      throw new Error(err);
    }

  }


  @Cron("*/10 * * * * *")
  async schedule() {
    if (!this.repoData.owner || !this.repoData.repo) {
      return;
    }

    try {
      const res = await this.octokit.rest.actions.listWorkflowRunsForRepo({
        owner: this.repoData.owner,
        repo: this.repoData.repo,
      });


      const latestRun = res.data.workflow_runs[0];

      if (latestRun && latestRun.id !== this.latestKnownRunId) {

        this.latestKnownRunId = latestRun.id;

        this.socketGateway.sendUpadte(res.data);
      }

    }
    catch (err) {
      throw err;
    }

  }

}
