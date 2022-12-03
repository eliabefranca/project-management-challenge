import { useEffect, useRef, useState } from 'react';
import { Button, Col, Input, message, Popconfirm, Row } from 'antd';

import DeleteIcon from '../svg/DeleteIcon.svg';
import DeleteIconHover from '../svg/DeleteIcon_Hover.svg';
import EditIcon from '../svg/EditIcon.svg';
import EditIconHover from '../svg/EditIcon_Hover.svg';
import { Project, useProjects } from '../hooks/useProjects';
import { Draggable } from 'react-beautiful-dnd';

interface ButtonWithHoverProps {
  onClick?: () => void;
  defaultIcon: string;
  hoverIcon: string;
}

const ButtonWithHover: React.FC<ButtonWithHoverProps> = ({
  onClick,
  defaultIcon,
  hoverIcon,
}) => {
  const [hover, setHover] = useState(false);

  return (
    <span
      className="cursor-pointer relative top-3"
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      onClick={onClick}
    >
      <img src={hover ? hoverIcon : defaultIcon} />
    </span>
  );
};

interface ProjectProps {
  project: Project;
  index: number;
}

const ProjectComponent: React.FC<ProjectProps> = ({ project, index }) => {
  const [edit, setEdit] = useState(false);
  const [name, setName] = useState(project.name);

  const { updateProject, deleteProject } = useProjects();

  const editInput = useRef(null);

  const toggleEdit = () => {
    const willEdit = !edit;
    setEdit(willEdit);

    setTimeout(() => {
      if (willEdit && editInput.current) {
        (editInput.current as HTMLInputElement).focus();
      }
    }, 100);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      toggleEdit();
      updateProject(project.id, name);
      return;
    }

    if (e.key === 'Escape') {
      toggleEdit();
    }
  };

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
  };

  const onConfirmDelet = () => {
    deleteProject(project.id);
    message.success('Deleted');
  };

  useEffect(() => {}, [editInput]);

  return (
    <Draggable draggableId={project.id} index={index}>
      {(provided) => (
        <Col
          span={24}
          className="p-1 b-y b-y-2 bg-white"
          {...provided.dragHandleProps}
          {...provided.draggableProps}
          ref={provided.innerRef}
        >
          <Row className="flex items-center">
            <Col className="flex gap-1_5" span={12}>
              <img
                src="png/defaultProjectIcon_2x.png"
                alt="project icon"
                style={{ height: 40 }}
              />

              {edit ? (
                <div className="flex">
                  <Input
                    placeholder="Project name"
                    onBlur={toggleEdit}
                    ref={editInput}
                    onKeyDown={handleKeyDown}
                    value={name}
                    onChange={handleNameChange}
                  />
                </div>
              ) : (
                <>
                  <p className="project-name">{project.name}</p>
                  <ButtonWithHover
                    onClick={toggleEdit}
                    defaultIcon={EditIcon}
                    hoverIcon={EditIconHover}
                  />
                </>
              )}
            </Col>
            <Col className="flex items-center justify-between" span={12}>
              <p className="project-date">
                {new Date(project.id).toLocaleString('en-US', {
                  month: 'short',
                  day: 'numeric',
                  year: 'numeric',
                  hour: 'numeric',
                  minute: 'numeric',
                })}
              </p>

              <Popconfirm
                placement="top"
                title="Are you sure you want to delete this project? This action can't be undone."
                onConfirm={onConfirmDelet}
                okText="Yes"
                cancelText="No"
              >
                <ButtonWithHover
                  defaultIcon={DeleteIcon}
                  hoverIcon={DeleteIconHover}
                />
              </Popconfirm>
            </Col>
          </Row>
        </Col>
      )}
    </Draggable>
  );
};

export default ProjectComponent;
