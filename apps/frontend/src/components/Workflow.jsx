import React from 'react'
import { Row, Col, Typography } from 'antd'
import { Flex, Steps } from 'antd';
import Runner from './Runner';
import Job from './Job';

const { Title } = Typography;

const data = {
  event: 'push',
  triggeredBy: 'Gdorogoy',
  runners: [
    {
      name: 'ubuntu-latest',
      jobs: [
        {
          name: 'Job a',
          steps: [
            { name: 'checkout', status: true, time: '2s' },
            { name: 'install deps', status: true, time: '45s' },
            { name: 'run tests', status: false, time: '12s' },
            { name: 'build', status: false, time: '0s' },
            { name: 'deploy', status: false, time: '0s' },
          ]
        },
        {
          name: 'Job b',
          steps: [
            { name: 'checkout', status: true, time: '2s' },
            { name: 'install deps', status: true, time: '45s' },
            { name: 'run tests', status: false, time: '12s' },
          ]
        }
      ]
    },
    {
      name: 'windows-latest',
      jobs: [
        {
          name: 'Job c',
          steps: [
            { name: 'checkout', status: true, time: '3s' },
            { name: 'install deps', status: true, time: '60s' },
            { name: 'run tests', status: true, time: '20s' },
          ]
        }
      ]
    }
  ]
}


const Workflow = () => {
  return (
    <div>
      <Row span={24}>
        <Col>
          <Title level={1}>
            event
          </Title>
        </Col>
      </Row>
      <Row>
        <Col>
          <Title level={2}>
            triggered by some one
          </Title>
        </Col>
      </Row>
      <Row gutter={[24, 24]} style={{ marginTop: 24 }}>
        <div style={{ flex: 1 }}>
          {data.runners.map((item, index) => (
          <Col key={index}>
            <Runner name={item.name} data={item.jobs}></Runner>
          </Col>
        ))}
        </div>
      </Row>
    </div>
  )
}

export default Workflow