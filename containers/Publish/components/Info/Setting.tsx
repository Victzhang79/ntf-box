import { Input } from 'antd'
import React from 'react'

import Content from './Content'
import Select from './Select'

const Setting: React.FunctionComponent = () => {
  return (
    <Content title="Sales method">
      <Select value="1" options={[{ value: '1', title: 'Other settings' }]}></Select>
      <Input
        style={{ width: '48%', marginTop: 16 }}
        prefix="Expired block number"
        placeholder="40400000"
      />
    </Content>
  )
}

export default Setting