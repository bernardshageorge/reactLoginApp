import React, { useState, useEffect } from "react";
import styled from "styled-components";

// import components
import WrapConatiner from "../../components/wrapContainer";
import Input from "../../components/inputComp";
import { auth } from "../../utils/firebase";
import cookieUtils from "../../utils/cookieUtils";

const Login = (props) => {
  const initialValue = {
    email: "",
    password: "",
    error: "",
  };

  const [values, setValue] = useState(initialValue);

  useEffect(() => {
    var login = cookieUtils.getCookie("auth");
    login = JSON.parse(login);
    if (login && login.auth) {
      props.history.push("/");
    }
  }, []);

  const handleFormValueChange = (e) => {
    const { name, value } = e.target;
    setValue({
      ...values,
      [name]: value,
      error: "",
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    signInWithEmailAndPasswordHandler(e, values.email, values.password);
  };

  const signInWithEmailAndPasswordHandler = async (event, email, password) => {
    event.preventDefault();
    await auth
      .signInWithEmailAndPassword(email, password)
      .then(() => {
        cookieUtils.setCookies(true);
        props.history.push("/");
      })
      .catch((error) => {
        setValue({
          ...values,
          error: "Invalid email or password.",
        });
      });
  };

  return (
    <>
      <LeftContainer>
        <ButtonHolder>
          <p>If you dont have an account please</p>
          <Link href="/signup">Create an Account</Link>
        </ButtonHolder>
      </LeftContainer>
      <Form>
        <FormContainer>
          <FormRow>
            <span>Sign In</span>
          </FormRow>
          <FormRow>{values.error}</FormRow>
          <FormRow>
            <Input
              name="email"
              inputType="text"
              value={values.email}
              handleChange={handleFormValueChange}
              placeholder="Email"
            />
          </FormRow>
          <FormRow>
            <Input
              name="password"
              inputType="password"
              value={values.password}
              handleChange={handleFormValueChange}
              placeholder="password"
            />
          </FormRow>
          <FormRow>
            <Button onClick={handleSubmit}>Sign In</Button>
          </FormRow>
        </FormContainer>
      </Form>
    </>
  );
};

const LeftContainer = styled.div`
  flex-basis: 50%;
  position: relative;
`;

const ButtonHolder = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  text-align: center;
  transform: translate(-50%, -50%);

  p {
    margin-bottom: 10px;
    color: #fff;
    font-size: 16px;
  }
`;

const Link = styled.a`
  padding: 10px;
  border-radius: 3px;
  display: inline-block;
  color: #fff;
  background: #008000;
  transition: 0.2s;
  &:hover {
    background: #fff;
    color: #008000;
  }
`;

const Form = styled.form`
  position: relative;
  flex-basis: 50%;
`;

const FormContainer = styled.ul`
  width: 50%;
  margin: 0 auto;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;

const FormRow = styled.li`
  width: 100%;
  text-align: center;
  &:first-child {
    span {
      color: #fff;
      font-size: 20px;
      font-weight: 700;
    }
  }
  &:not(:last-child) {
    margin-bottom: 20px;
  }
`;

const Button = styled.button`
  width: 50%;
  cursor: pointer;
  border: none;
  border-radius: 3px;
  height: 30px;
  background: #827e5e;
  color: #fff;
  transition: 0.2s;
  font-size: 16px;
  font-weight: 500;
  &:hover {
    background: #fff;
    color: #827e5e;
  }
`;

export default WrapConatiner(Login);
