import React from "react";
import styled from "styled-components";

const TextArea = (props) => {
  return (
    <TextAreaWrap className={`form-group  ${props.className}`}>
      {props.title && <Label htmlFor={props.name}>{props.title}</Label>}
      <TextAreaELem
        id={props.name}
        name={props.name}
        row={props.row}
        value={props.value}
        onChange={props.handleChange}
        placeholder={props.placeholder}
        onBlur={props.handleValidation}
      />
      {props.errorMsg ? (
        <ErrorMessage className="error-message">{props.errorMsg}</ErrorMessage>
      ) : null}
    </TextAreaWrap>
  );
};

const TextAreaWrap = styled.div`
  width: 100%;
  position: relative;
  &.half-width {
    width: 100%;
  }
`;

const TextAreaELem = styled.textarea`
  padding: 5px;
  width: 100%;
  border: none;
  border-radius: 3px;
  resize: none;
`;

const Label = styled.label`
  width: 100%;
  margin-bottom: 5px;
  display: inline-block;
  color: #fff;
  text-align: left;
  font-size: 14px;
`;

const ErrorMessage = styled.span`
  display: block;
  text-align: left;
  font-size: 12px;
  color: #ff0000;
  position: absolute;
  bottom: -16px;
`;

export default TextArea;
