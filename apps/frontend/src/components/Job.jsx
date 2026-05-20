import { Card, Steps, Tag, theme } from 'antd';

const conclusionToStatus = (conclusion) => {
  if (conclusion === 'success') return 'finish';
  if (conclusion === 'failure') return 'error';
  if (conclusion === 'skipped') return 'wait';
  return 'process';
};

const Job = ({ name, runner, steps = [] }) => {
  const { token } = theme.useToken();

  const items = steps.map((step) => ({
    title: step.name,
    content: step.conclusion ?? 'in progress',
    status: conclusionToStatus(step.conclusion),
  }));

  return (
    <Card
      size="small"
      title={name}
      extra={runner ? <Tag color="blue">{runner}</Tag> : null}
      style={{
        marginTop: 16,
        borderColor: token.colorBorderSecondary,
      }}
    >
      <Steps
        orientation="vertical"
        current={items.length}
        size="small"
        items={items}
      />
    </Card>
  );
};

export default Job;
