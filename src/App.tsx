import { Col, Layout, Row, Space } from 'antd';
import { Content } from 'antd/es/layout/layout';
import { DragDropContext, Droppable, DropResult } from 'react-beautiful-dnd';

import AddProject from './components/AddProject';
import Container from './components/Container';
import HeaderComponent from './components/Header';
import ProjectComponent from './components/Project';

import { useProjects } from './hooks/useProjects';

function App() {
  const { isAddingNewProject, projects, swapProjects } = useProjects();

  const onDragEnd = (result: DropResult) => {
    if (!result.destination) {
      return;
    }

    swapProjects(result.source.index, result.destination.index);
  };

  return (
    <Layout className="bg">
      <HeaderComponent />
      <Content className="pt-4">
        <Container className="mt-1">
          <Space direction="vertical" size="middle" style={{ display: 'flex' }}>
            {isAddingNewProject && <AddProject />}
            <DragDropContext onDragEnd={onDragEnd}>
              <Droppable droppableId={'tasks'}>
                {(provided) => (
                  <Row
                    className="project-list"
                    {...provided.droppableProps}
                    ref={provided.innerRef}
                  >
                    {projects.map((project, index) => (
                      <ProjectComponent
                        key={project.id}
                        project={project}
                        index={index}
                      />
                    ))}
                    {/* empty list message */}
                    {!isAddingNewProject && projects.length === 0 && (
                      <Col span={24} className="text-center">
                        <h3 className="mb-1 text-lg">
                          You don't have any projects yet.
                        </h3>
                        <p>Click the + button to create a new project.</p>
                      </Col>
                    )}
                  </Row>
                )}
              </Droppable>
            </DragDropContext>
          </Space>
        </Container>
      </Content>
    </Layout>
  );
}

export default App;
