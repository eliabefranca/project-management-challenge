import { Button, Col, Space, theme } from 'antd';
import { Header } from 'antd/es/layout/layout';
import { useProjects } from '../hooks/useProjects';

import Container from './Container';

const addButtonStyle: React.CSSProperties = {
  position: 'absolute',
  right: 0,
  bottom: -20,
  transform: 'scale(1.5)',
  fontSize: '2rem',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  fontWeight: '300',
};

function HeaderComponent() {
  const { setIsAddingNewProject } = useProjects();

  return (
    <Header className="h-auto bg-white">
      <Container>
        <Space direction="vertical" size="middle" style={{ display: 'flex' }}>
          <img
            src="png/ThunkableBeaver.png"
            alt="logo"
            style={{ height: 40, marginTop: '1rem' }}
          />

          <Col span={12}>
            <h1>MY PROJECTS</h1>
          </Col>
        </Space>

        <Button
          type="primary"
          shape="circle"
          size="large"
          style={addButtonStyle}
          onClick={() => setIsAddingNewProject(true)}
        >
          +
        </Button>
      </Container>
    </Header>
  );
}

export default HeaderComponent;
