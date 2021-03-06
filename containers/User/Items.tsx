import { useRouter } from 'next/router';
import React from 'react';

import { AssetContent } from '@/components/Asset';
import useContainer from '@/shared/hooks/useContainer';
import { AssetProvider } from '@/shared/providers/AssetProvider';
import { ProjectProvider } from '@/shared/providers/ProjectProvider';

import Filter from './components/AssetFilter';
import UserTop from './Top';

const Items: React.FunctionComponent = () => {
  const { containerWidth } = useContainer();

  let {
    query: { address }
  } = useRouter();

  address = address as string;

  return (
    <>
      <UserTop />
      {address && (
        <ProjectProvider address={address}>
          <AssetProvider address={address}>
            <div className="container">
              <div className="left">
                <Filter />
              </div>
              <div className="right">
                <AssetContent showHead={false} />
              </div>
            </div>
          </AssetProvider>
        </ProjectProvider>
      )}
      <style jsx>{`
        .container {
          display: flex;
          justify-content: space-between;
          width: ${containerWidth}px;
          margin: 32px auto;
        }
        .left {
          flex: 0 0 auto;
        }
        .right {
          flex: 1 1 auto;
          margin-left: 16px;
        }
      `}</style>
    </>
  );
};

export default Items;
