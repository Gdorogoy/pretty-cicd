import { Avatar, Card, Flex, Steps } from 'antd'
import { AntDesignOutlined, ExclamationCircleTwoTone } from '@ant-design/icons';

import React from 'react'


const items = [
  {
    title: 'Finished',
    content:'some info',
  },
  {
    title: 'In Progress',
    content:'some other info',
  },
  {
    title: 'Waiting',
    content:' you could never guees',
  },
];

const Runner = () => {


  return (
    <Card title="runner">
      <p>
        Some info
      </p>
      <Flex>
        <div style={{ flex: 1 }}>
            <Steps orientation="horizontal" current={1} items={items} />
        </div>
        <ExclamationCircleTwoTone />
      </Flex>
    </Card>
  )
}

export default Runner