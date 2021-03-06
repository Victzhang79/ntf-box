import { Button } from 'antd';
import { useRouter } from 'next/router';
import React from 'react';

import { ProjectFilter } from '@/components/Asset';
import ProjectData from '@/components/Project/ProjectData';
import GoSvg from '@/icons/icon_go.svg';
import useTheme from '@/shared/hooks/useTheme';
import { useActivity } from '@/shared/providers/ActivityProvider';
import { useLanguage } from '@/shared/providers/LanguageProvider';
import { useProject } from '@/shared/providers/ProjectProvider';

const ActivityFilter: React.FunctionComponent = () => {
  const theme = useTheme();
  const router = useRouter();
  const { t } = useLanguage();
  const { projects, project } = useProject();
  const { filter, toogleFilter } = useActivity();

  return (
    <>
      <ProjectFilter
        onSelectProject={(project) => {
          if (project) {
            toogleFilter({ ...filter, id: project.id, name: project.name });
          } else {
            toogleFilter({ ...filter, id: undefined, name: undefined });
          }
        }}
        project={project}
        projects={projects}
        renderDetail={() => (
          <>
            <div className="content">
              <div className="item">
                <Button
                  onClick={() => {
                    router.push(`/market?id=${filter.id}`);
                  }}
                >
                  {t('activity.goToMarket')}
                  <GoSvg style={{ marginLeft: 15 }} />
                </Button>
              </div>
              <ProjectData project={project} />
            </div>
            <style jsx>{`
              .content {
                padding: 0 16px;
              }
              .item {
                padding: 16px 0;
                border-bottom: 1px solid ${theme['@border-color-base']};
              }
              .item > :global(button) {
                width: 100%;
              }
            `}</style>
          </>
        )}
        showItemExtra={false}
      />
    </>
  );
};

export default ActivityFilter;
