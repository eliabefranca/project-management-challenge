import React from 'react';
import styled from 'styled-components';

export const StyledContainer = styled.div`
  max-width: 100%;
  margin: 0 auto;
  padding: 0 1rem;
  position: relative;

  @media (min-width: 576px) {
    max-width: 576px;
  }

  @media (min-width: 768px) {
    max-width: 768px;
  }

  @media (min-width: 992px) {
    max-width: 992px;
  }

  @media (min-width: 1200px) {
    max-width: 1200px;
  }
`;

interface ContainerProps {
  children?: React.ReactNode;
  style?: React.CSSProperties;
  className?: string;
}
const Container: React.FC<ContainerProps> = (props) => (
  <StyledContainer {...props}>{props.children}</StyledContainer>
);
export default Container;
