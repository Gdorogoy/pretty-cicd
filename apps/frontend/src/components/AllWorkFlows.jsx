import { useEffect, useMemo, useState } from 'react';
import { Alert, Spin, Timeline } from 'antd';
import { fetchAllWorkflows } from '../api/workflow';
import Artifact from './Artifact';
import './Workflow.css';

const conclusionToTimelineColor = (conclusion) => {
  if (conclusion === 'failure') return 'red';
  if (conclusion === 'success') return 'green';
  return 'gray';
};

const AllWorkFlows = ({ onRunSelect }) => {
  const [artifacts, setArtifacts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const load = async () => {
      try {
        setLoading(true);
        setError(null);
        const res = await fetchAllWorkflows();
        setArtifacts(res.data ?? []);
      } catch (err) {
        setError(err?.message ?? 'Failed to load workflows');
      } finally {
        setLoading(false);
      }
    };

    load();
  }, []);

  const timelineItems = useMemo(
    () =>
      artifacts.map((workflow, index) => ({
        color: conclusionToTimelineColor(workflow.conclusion),
        content: (
          <Artifact
            artifact={workflow}
            onClick={()=>onRunSelect(index)}
          />
        ),
      })),
    [artifacts],
  );

  if (loading) {
    return (
      <div className="workflow-page">
        <Spin size="large" description="Loading workflows…" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="workflow-page">
        <Alert type="error" showIcon title="Could not load workflows" description={error} />
      </div>
    );
  }

  if (!artifacts.length) {
    return (
      <div className="workflow-page">
        <Alert type="info" showIcon title="No workflow runs found" />
      </div>
    );
  }

  return (
    <div className="workflow-page all-workflows-timeline">
        <Timeline items={timelineItems} />
    </div>
  );
};

export default AllWorkFlows;
