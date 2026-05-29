import { CheckCircleOutlined, ExclamationCircleOutlined } from '@ant-design/icons'
import { Card } from 'antd'
import React from 'react'

const Artifact = ({ artifact, onClick }) => {
  return (
    <Card
      hoverable={!!onClick}
      onClick={onClick}
      title={artifact.name}
      extra={
        artifact.conclusion === 'failure' ? (
          <ExclamationCircleOutlined style={{ color: '#ff4d4f', fontSize: 20 }} />
        ) : (
          <CheckCircleOutlined style={{ color: '#52c41a', fontSize: 20 }} />
        )
      }
    >
        <p>
            Triggered By:{artifact.triggeredBy}
        </p>
        <p>
            Event:{artifact.event}
        </p>
        <p>
            Triggered on:{artifact.updatedAt}
        </p>
    </Card>
  )
}

export default Artifact