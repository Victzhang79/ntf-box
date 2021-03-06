import { Affix, Descriptions, Space } from 'antd';
import { utils } from 'ethers';
import Link from 'next/link';
import React from 'react';

import EnableButton from '@/components/Button/EnableButton';
import Jdenticon from '@/components/Jdenticon';
import { shortenAddress } from '@/utils/string';

import { useData } from '../context';

const Info: React.FunctionComponent = () => {
  const { asset, loading, buy } = useData();

  return (
    <>
      <Affix offsetTop={20}>
        <Descriptions bordered title="Bundles">
          <Descriptions.Item label="User" span={24}>
            <Link href={`/user/${asset?.operator}`}>
              <a>
                <Space>
                  <Jdenticon size={24} value={asset?.operator} />
                  {shortenAddress(asset?.operator)}
                </Space>
              </a>
            </Link>
          </Descriptions.Item>
          <Descriptions.Item label="Price" span={24}>
            {utils.formatEther(asset?.dealPrice ?? '0')}
          </Descriptions.Item>
        </Descriptions>
        <EnableButton loading={loading} onClick={buy} style={{ marginTop: 20 }} type="primary">
          BUY
        </EnableButton>
      </Affix>
    </>
  );
};

export default Info;
