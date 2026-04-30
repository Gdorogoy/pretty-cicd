import React from 'react'
import { Row, Col, Typography } from 'antd'
import { Flex, Steps } from 'antd';
import Runner from './Runner';
import Job from './Job';

const { Title } = Typography;

const data = [
  {
    title: 'Job a',
  },
  {
    title: 'Job b',
  },
];


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
        {data.map((item, index) => (
          <Col key={index} xs={24} sm={12} md={8} lg={6}>
            <Job name={item.title} />
          </Col>
        ))}
      </Row>
    </div>
  )
}

export default Workflow