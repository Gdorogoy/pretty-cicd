import { Avatar, Card, Col, Flex, Steps } from 'antd'
import { AntDesignOutlined, ExclamationCircleTwoTone } from '@ant-design/icons';

import React from 'react'
import Job from './Job';

const Runner = ({data}) => {
  return (
    <Card title="runner">
      <p>
        {}
      </p>
        <div style={{ flex: 1 }}>
          {data.map((item, index) => (
            <Job key={index} name={item.name} data={item.steps} />
          ))}
        </div>
        <ExclamationCircleTwoTone />
    </Card>
  )
}

export default Runner