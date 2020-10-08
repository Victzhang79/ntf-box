import { Col, Row, Select, Spin } from 'antd'
import React from 'react'
import PerfectScrollbar from 'react-perfect-scrollbar'

import { AssetCell, AssetContainer } from '@/components/Asset'
import useTheme from '@/shared/hooks/useTheme'
import { useAsset } from '@/shared/providers/AssetProvider'

const { Option } = Select

const Content: React.FunctionComponent = () => {
  const theme = useTheme()
  const { assets, page, fetching, filter, toogleFilter, onScrollBottom } = useAsset()

  return (
    <>
      <div className="container">
        <div className="head">
          <h4>All items</h4>
          <p>On the shelf {page.total}</p>
        </div>
        <div className="select">
          <Row>
            <Col xs={{ span: 12 }} lg={{ span: 8 }} style={{ paddingRight: 16 }}>
              <Select
                value={filter.orderType}
                placeholder="Select type"
                onChange={(value) => {
                  toogleFilter({
                    ...filter,
                    orderType: value
                  })
                }}>
                <Option value="0">All items</Option>
                <Option value="1">Single items</Option>
                <Option value="2">Bundles</Option>
              </Select>
            </Col>
            <Col xs={{ span: 12 }} lg={{ span: 8 }}>
              <Select
                value={filter.itemOrder}
                placeholder="Sort by"
                onChange={(value) =>
                  toogleFilter({
                    ...filter,
                    itemOrder: value
                  })
                }>
                <Option value="0">Recently Created</Option>
                <Option value="1">Expiring Soon</Option>
                <Option value="2">Lowest Price</Option>
                <Option value="3">Highest Price</Option>
              </Select>
            </Col>
          </Row>
        </div>
        <Spin spinning={fetching && page.page === 1}>
          <div className="list">
            <PerfectScrollbar
              style={{ height: '100%' }}
              onScrollDown={(e) => {
                if (e.scrollHeight === e.scrollTop + e.clientHeight) {
                  onScrollBottom()
                }
              }}>
              <AssetContainer>
                {assets.map((asset, index) => (
                  <AssetCell key={index} asset={asset} />
                ))}
              </AssetContainer>
            </PerfectScrollbar>
          </div>
        </Spin>
      </div>
      <style jsx>{`
        .container {
          width: 100%;
          height: 605px;
          border: 1px solid ${theme['@border-color-base']};
          background-color: #fff;
          border-radius: 4px;
        }
        .head {
          height: 55px;
          padding: 6px 15px;

          box-shadow: 0px 2px 8px 0px rgba(60, 77, 111, 0.1);
        }
        .head > h4 {
          margin: 0;
          font-size: 20px;
          font-weight: 500;
          color: ${theme['@text-color']};
          line-height: 25px;
        }
        .head > p {
          margin: 4px 0 0 0;
          font-size: 12px;
          color: ${theme['@text-color-tertiary']};
          line-height: 14px;
        }

        .select {
          padding: 18px 15px 0 15px;
        }
        .select :global(.ant-select) {
          width: 100%;
          height: 32px;
        }

        .list {
          height: 500px;
          padding: 16px;
        }
      `}</style>
    </>
  )
}

export default Content
