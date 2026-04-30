import { Card, Steps, Typography, theme } from 'antd'
import React from 'react'

const { Title, Text } = Typography

const data = [
  { name: 'checkout', status: true, time: '2s' },
  { name: 'install deps', status: true, time: '45s' },
  { name: 'run tests', status: false, time: '12s' },
  { name: 'build', status: false, time: '0s' },
  { name: 'deploy', status: false, time: '0s' },
]

const Job = ({ name }) => {
  const { token } = theme.useToken()

  const steps = data.map(item => ({
    title: <Text strong style={{ fontSize: 16 }}>{item.name}</Text>,
    content: (
      <div style={{
        marginTop: 12,
        marginBottom: 16,
        padding: 16,
        background: token.colorFillAlter,
        borderRadius: token.borderRadiusLG,
        border: `1px solid ${token.colorBorderSecondary}`,
      }}>
        <Text type="secondary">Execution time: {item.time}</Text>
      </div>
    ),
    status: item.status ? 'finish' : 'error'
  }))

  return (
    <Card
      style={{
        width: '100%',
        boxShadow: token.boxShadowTertiary,
        borderRadius: token.borderRadiusLG
      }}
    >
      <Title level={3} style={{ marginTop: 0, marginBottom: 32 }}>{name}</Title>
      <Steps orientation="vertical" current={-1} items={steps} />
    </Card>
  )
}

export default Job