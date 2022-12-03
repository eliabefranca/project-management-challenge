import { Button, Col, Input, InputRef, Row } from 'antd';
import React, { useEffect, useRef, useState } from 'react';
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

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Escape') {
      setIsAddingNewProject(false);
    }
  };

  const inputRef = useRef<InputRef>(null);

  useEffect(() => {
    setTimeout(() => {
      if (inputRef.current) inputRef.current.focus();
    }, 100);
  }, []);

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
              ref={inputRef}
              onKeyDown={handleKeyDown}
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
