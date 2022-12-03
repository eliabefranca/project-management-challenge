import { Button, Col, Input, Row } from 'antd';
import React, { useState } from 'react';
import { useProjects } from '../hooks/useProjects';

const AddProject: React.FC = () => {
  const { setIsAddingNewProject, addProject } = useProjects();
  const [name, setName] = useState('');

  const handleSubmit = (e: React.FormEvent | React.MouseEventHandler) => {
    (e as React.FormEvent)?.preventDefault();

    if (name) {
      addProject(name);
      setIsAddingNewProject(false);
    }
  };

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
  };

  return (
    <Col span={24} className="p-1 b-y b-y-2 bg-white">
      <form className="flex items-center" onSubmit={handleSubmit}>
        <Col className="flex gap-1_5" span={12}>
          <img
            src="png/defaultProjectIcon_2x.png"
            alt="project icon"
            style={{ height: 40 }}
          />
          <div className="flex w-full">
            <Input
              placeholder="Project name"
              value={name}
              onChange={handleNameChange}
            />
          </div>
        </Col>

        <Col span={12} className="flex justify-end gap-2">
          <Button onClick={() => setIsAddingNewProject(false)}>Cancel</Button>
          <Button type="primary" onClick={handleSubmit}>
            Create
          </Button>
        </Col>
      </form>
    </Col>
  );
};

export default AddProject;
