import React from "react";
import styled from "styled-components";

const InputContainer = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 0.5rem;
`;

const Label = styled.label`
  font-weight: bold;
  margin-right: 1rem;
`;

const InputStyle = styled.input`
  width: 3rem;
  border-radius: 5px;
  border: 1px solid #ccc;
  font: inherit;
  padding-left: 0.5rem;
`;
const Input = React.forwardRef((props, ref) => {
  return (
    <InputContainer>
      <Label htmlFor={props.input.id}>{props.label}</Label>
      <InputStyle ref={ref} {...props.input} />
    </InputContainer>
  );
});

export default Input;
