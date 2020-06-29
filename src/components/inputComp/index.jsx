import React from "react";
import styled from "styled-components";

const Input = (props) => {
  return (
    <InputWrap
      className={`form-group  ${props.className} `}
      category={props.category}
    >
      {props.title && <Label htmlFor={props.name}>{props.title}</Label>}
      <InputElem
        id={props.name}
        name={props.name}
        type={props.inputType}
        value={props.value}
        onChange={props.handleChange}
        placeholder={props.placeholder}
        onBlur={props.handleValidation}
        ref={props.inputRef}
      />
      {props.errorMsg ? (
        <ErrorMessage className="error-message">{props.errorMsg}</ErrorMessage>
      ) : null}
    </InputWrap>
  );
};

const InputWrap = styled.div`
  position: relative;
  width: 100%;
  &.half-width {
    display: inline-block;
    vertical-align: top;
    width: 48.5%;
  }
`;

const InputElem = styled.input`
  padding: 5px;
  width: 100%;
  height: 25px;
  border: none;
  border-radius: 3px;
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

export default Input;
