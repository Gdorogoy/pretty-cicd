import { useEffect, useMemo, useState } from 'react';
import {
  Alert,
  Card,
  Col,
  Descriptions,
  Row,
  Spin,
  Steps,
  Typography,
} from 'antd';
import { fetchWorkflow } from '../api/workflow';
import Job from './Job';
import './Workflow.css';

const { Title, Text } = Typography;

const jobToStepStatus = (conclusion) => {
  if (conclusion === 'failure') return 'error';
  if (conclusion === 'success') return 'finish';
  if (conclusion === 'cancelled' || conclusion === 'skipped') return 'wait';
  return 'process';
};

const Workflow = () => {
  const [workflow, setWorkflow] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentJob, setCurrentJob] = useState(0);

  useEffect(() => {
    const load = async () => {
      try {
        setLoading(true);
        setError(null);
        const data = await fetchWorkflow();
        setWorkflow(data);
        setCurrentJob(0);
      } catch (err) {
        setError(err?.message ?? 'Failed to load workflow');
      } finally {
        setLoading(false);
      }
    };

    load();
  }, []);

  const jobSteps = useMemo(() => {
    if (!workflow?.jobs?.length) return [];
    return workflow.jobs.map((job) => ({
      title: job.name,
      content: job.runner,
      status: jobToStepStatus(job.conclusion),
    }));
  }, [workflow]);

  const selectedJob = workflow?.jobs?.[currentJob];

  if (loading) {
    return (
      <div className="workflow-page">
        <Spin size="large" description="Loading workflow…" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="workflow-page">
        <Alert type="error" showIcon title="Could not load workflow" description={error} />
      </div>
    );
  }

  if (!workflow) {
    return (
      <div className="workflow-page">
        <Alert type="info" showIcon title="No workflow data" />
      </div>
    );
  }

  return (
    <div className="workflow-page">
      <header className="workflow-header">
        <Title level={2} className="workflow-title">
          {workflow.name}
        </Title>
        <Text type="secondary">Latest workflow run</Text>
      </header>

      <Card className="workflow-card">
        <Descriptions column={{ xs: 1, sm: 2, md: 3 }} size="small">
          <Descriptions.Item label="Event">{workflow.event}</Descriptions.Item>
          <Descriptions.Item label="Triggered by">{workflow.triggeredBy}</Descriptions.Item>
          <Descriptions.Item label="Jobs">{workflow.jobs?.length ?? 0}</Descriptions.Item>
        </Descriptions>
      </Card>

      <Row gutter={[24, 24]} className="workflow-content">
        <Col span={24}>
          <Card title="Jobs" className="workflow-card">
            {jobSteps.length > 0 ? (
              <Steps
                items={jobSteps}
                current={currentJob}
                onChange={setCurrentJob}
                responsive
              />
            ) : (
              <Text type="secondary">No jobs in this run.</Text>
            )}
          </Card>
        </Col>

        <Col span={24}>
          {selectedJob ? (
            <>
              <Text type="secondary" className="section-label">
                Job details
              </Text>
              <Job
                name={selectedJob.name}
                runner={selectedJob.runner}
                steps={selectedJob.steps}
              />
            </>
          ) : (
            <Text type="secondary">Select a job to see its steps.</Text>
          )}
        </Col>
      </Row>
    </div>
  );
};

export default Workflow;
