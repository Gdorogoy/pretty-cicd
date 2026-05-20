export function mapToResponse(run, jobs) {
    return {
      id: run.id,
      name: run.name,
      event: run.event,
      triggeredBy: run.triggering_actor?.login ?? 'unknown',
      jobs: jobs.map(job => ({
        id: job.id,
        name: job.name,
        status: job.status,
        conclusion: job.conclusion,
        runner: job.labels?.[0] ?? 'unknown',
        started_at: job.started_at,
        completed_at: job.completed_at,
        steps: job.steps.map(step => ({
          name: step.name,
          conclusion: step.conclusion,
          number: step.number
        }))
      }))
    }
  }

/** Summary for workflow run list — no jobs, no nested repo/urls */
export function mapWorkflowRunSummary(run) {
  return {
    id: run.id,
    name: run.name,
    event: run.event,
    status: run.status,
    conclusion: run.conclusion,
    triggeredBy: run.triggering_actor?.login ?? 'unknown',
    runNumber: run.run_number,
    createdAt: run.created_at,
    updatedAt: run.updated_at,
    htmlUrl: run.html_url,
  };
}

export function mapAllWorkflows(runs) {
  return {
    data: runs.map(mapWorkflowRunSummary),
  };
}