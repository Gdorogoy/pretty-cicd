import { Card, Steps, theme } from "antd";

const Job = ({ name, data }) => {
  const { token } = theme.useToken()

  const steps = data.map(item => ({
    title: item.name,
    content: `Execution time: ${item.time}`,
    status: item.status ? 'finish' : 'error'
  }))

  return (
    <Card style={{ marginBottom: 16 }} title={name}>
      <Steps orientation="vertical" current={-1} items={steps} />
    </Card>
  )
}

export default Job;