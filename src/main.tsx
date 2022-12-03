import ReactDOM from 'react-dom/client';
import App from './App';
import { ConfigProvider } from 'antd';
import { ThemeConfig } from 'antd/es/config-provider/context';

import './index.css';
import { ProjectsProvider } from './hooks/useProjects';

const theme: ThemeConfig = {
  token: {
    colorPrimary: '#4A475F',
    colorBgLayout: '#F7F9FD',
  },
};

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <ProjectsProvider>
    <ConfigProvider theme={theme}>
      <App />
    </ConfigProvider>
  </ProjectsProvider>
);
