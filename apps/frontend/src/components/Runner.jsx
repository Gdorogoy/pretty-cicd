import { Card, Col, Row, Tag } from 'antd'
import Job from './Job';

const Runner = ({ name, data }) => {
  return (
    <Card
      title={name}
      extra={<Tag color="blue">{data.length} st</Tag>}
      style={{ marginTop: 12 }}
    >
      <Row gutter={[16, 16]}>
        {data.map((item, index) => (
          <Col key={index} xs={24} md={12}>
            <Job name={item.name} data={item.steps} />
          </Col>
        ))}
      </Row>
    </Card>
  )
}

export default Runner