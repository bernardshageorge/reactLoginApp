import React, { useState, useEffect } from "react";
import styled from "styled-components";

// import components here
import WrapConatiner from "../../components/wrapContainer";
import Input from "../../components/inputComp";
import TextArea from "../../components/textArea";
import ProfileImage from "../../components/profileImage";

// import util funtion
import validationUtils from "../../utils/validationUtil";
import { auth, generateUserDocument, firestorage } from "../../utils/firebase";
import cookieUtils from "../../utils/cookieUtils";

const SignUp = (props) => {
  const initialValue = {
    form: {
      firstName: {
        value: "",
        error: "",
      },
      lastName: {
        value: "",
        error: "",
      },
      age: {
        value: "",
        error: "",
      },
      phoneNumber: {
        value: "",
        error: "",
      },
      address: {
        value: "",
        error: "",
      },
      profileImage: {
        value: "",
        error: "",
        name: "",
      },
      email: {
        value: "",
        error: "",
      },

      password: {
        value: "",
        error: "",
      },
      confirmPassword: {
        value: "",
        error: "",
      },
    },
  };

  const [values, setValue] = useState(initialValue);

  useEffect(() => {
    var login = cookieUtils.getCookie("auth");
    login = JSON.parse(login);
    if (login && login.auth) {
      props.history.push("/");
    }
  }, []);

  // change handlrer
  const handleFormValueChange = (e) => {
    const { name, value } = e.target;
    const { form } = values;
    form[name].error = "";
    form[name].value = value;
    setValue({
      ...values,
      form,
    });
  };

  // validation handler
  const handleValidation = ({ e, title }) => {
    let temp = { ...values.form };
    const { name } = e.target;
    if (temp[name].value === "") {
      temp[name].error = title ? `Please enter ${title} ` : "";
    } else if (temp[name].value !== "") {
      if (["firstName", "lastName"].indexOf(name) > -1) {
        temp[name].error = validationUtils.characterValidation(temp[name].value)
          ? ""
          : "Invalid name";
      } else if (name === "email") {
        temp[name].error = validationUtils.emailValidation(temp[name].value)
          ? ""
          : "Invalid email address";
      } else if (name === "phoneNumber") {
        temp[name].error = validationUtils.phoneNumberValidation(
          temp[name].value
        )
          ? ""
          : "Invalid phone number";
      } else if (name === "age") {
        temp[name].error = !validationUtils.numberValidation(temp[name].value)
          ? ""
          : "Invalid age";
      } else if (name === "password") {
        temp[name].error =
          validationUtils.passwordValidation(temp[name].value) ===
          "regNoSmallAlpha"
            ? "Please enter atleast one lowercase character"
            : validationUtils.passwordValidation(temp[name].value) ===
              "regNoCapAlpha"
            ? "Please enter atleast one uppercase character"
            : validationUtils.passwordValidation(temp[name].value) ===
              "regNoNum"
            ? "Please enter atleast one digit"
            : validationUtils.passwordValidation(temp[name].value) ===
              "regNoSpecChara"
            ? "Please enter atleast one special character"
            : validationUtils.passwordValidation(temp[name].value) ===
              "regAngBrack"
            ? "<> not allowed"
            : validationUtils.passwordValidation(temp[name].value) ===
              "regSpace"
            ? "Space not allowed"
            : validationUtils.passwordValidation(temp[name].value) ===
              "regNoMinLength"
            ? "Should contain min 8 characters"
            : "";
      } else if (name === "confirmPassword") {
        temp[name].error =
          temp[name].value === temp.password.value
            ? ""
            : "Password should match";
      }
    }
    setValue({ ...values, form: temp });
  };

  // form submit handler
  const handleSubmit = (e) => {
    e.preventDefault();

    const { form } = values;
    let flag = true;
    // to check if any field has empty value or error
    Object.keys(form).forEach((key, index) => {
      if (form[key].error || form[key].value === "") {
        flag = false;
      }
    });

    // terminates submition if there is error or empty value
    if (!flag) return;
    createUserWithEmailAndPasswordHandler(e, form);
  };

  const createUserWithEmailAndPasswordHandler = async (event, form) => {
    event.preventDefault();

    let { email, password, profileImage } = form;

    // image upload
    let imageUrl = null;
    if (profileImage && profileImage.value) {
      const uploadTask = await firestorage
        .ref(`/images/${profileImage.name}`)
        .put(profileImage.value);

      imageUrl = await firestorage
        .ref("images")
        .child(uploadTask.metadata.name)
        .getDownloadURL();
    }

    // payload bject creation
    const postObj = {};
    Object.keys(form).forEach((key, index) => {
      if (["email", "password", "confirmPassword"].indexOf(key) === -1) {
        if (key === "profileImage") {
          postObj[key] = imageUrl;
        } else {
          postObj[key] = form[key].value;
        }
      }
    });
    try {
      const { user } = await auth.createUserWithEmailAndPassword(
        email.value,
        password.value
      );

      generateUserDocument(user, postObj);

      cookieUtils.setCookies(true);
      props.history.push("/");
      Object.keys(form).forEach((key, index) => {
        form[key].value = "";
        form[key].error = "";
        if (key === "profileImage") form[key].name = "";
      });
      setValue({
        ...values,
        form,
      });
    } catch (error) {}
  };

  const handleFileChange = async (e) => {
    e.preventDefault();
    const image = e.target.files[0];
    let { form } = values;
    if (image) {
      if (validationUtils.validateImageFile(image)) {
        form.profileImage = {
          value: image,
          error: "",
          name: image.name,
        };
        setValue({ ...values, form });
      } else {
        form.profileImage = {
          value: "",
          error: "Invalid file type ",
          name: image.name,
        };
        setValue({ ...values, form });
      }
    }
  };

  const {
    firstName,
    lastName,
    age,
    phoneNumber,
    address,
    profileImage,
    email,
    password,
    confirmPassword,
  } = values.form;

  return (
    <>
      <LeftContainer>
        <ButtonHolder>
          <p>If you already have an account please</p>
          <Link href="/signin">Sign In</Link>
        </ButtonHolder>
      </LeftContainer>
      <Form>
        <FormContainer>
          <FormRow>
            <span>Sign Up</span>
          </FormRow>
          <FormRow>
            <Input
              name="firstName"
              inputType="text"
              handleChange={handleFormValueChange}
              placeholder="First Name"
              value={firstName.value}
              title="First Name"
              className="half-width"
              handleValidation={(e) =>
                handleValidation({ e, title: "first name" })
              }
              errorMsg={firstName.error}
            />
            <Input
              name="lastName"
              inputType="text"
              handleChange={handleFormValueChange}
              placeholder="Last Name"
              title="Last Name"
              value={lastName.value}
              className="half-width"
              handleValidation={(e) =>
                handleValidation({ e, title: "last name" })
              }
              errorMsg={lastName.error}
            />
          </FormRow>
          <FormRow>
            <Input
              name="email"
              inputType="text"
              handleChange={handleFormValueChange}
              placeholder="Email"
              title="Email"
              value={email.value}
              handleValidation={(e) => handleValidation({ e, title: "email" })}
              errorMsg={email.error}
            />
          </FormRow>
          <FormRow>
            <Input
              name="age"
              inputType="text"
              handleChange={handleFormValueChange}
              placeholder="Age"
              title="Age"
              className="half-width"
              value={age.value}
              handleValidation={(e) => handleValidation({ e, title: "age" })}
              errorMsg={age.error}
            />
            <Input
              name="phoneNumber"
              inputType="number"
              handleChange={handleFormValueChange}
              placeholder="Phone Number"
              title="Phone Number"
              className="half-width"
              value={phoneNumber.value}
              handleValidation={(e) =>
                handleValidation({ e, title: "phone number" })
              }
              errorMsg={phoneNumber.error}
            />
          </FormRow>
          <FormRow>
            <TextArea
              name="address"
              handleChange={handleFormValueChange}
              placeholder="Address"
              title="Address"
              row={4}
              value={address.value}
              handleValidation={(e) =>
                handleValidation({ e, title: "address" })
              }
              errorMsg={address.error}
            />
          </FormRow>
          <FormRow>
            <ProfileImage
              name="profileImage"
              handleFileChange={handleFileChange}
              title="Profile Picture"
              imageData={profileImage}
            />
          </FormRow>
          <FormRow>
            <Input
              name="password"
              inputType="password"
              handleChange={handleFormValueChange}
              placeholder="Password"
              title="Password"
              className="half-width"
              value={password.value}
              handleValidation={(e) =>
                handleValidation({ e, title: "password" })
              }
              errorMsg={password.error}
            />
            <Input
              name="confirmPassword"
              inputType="password"
              handleChange={handleFormValueChange}
              placeholder="Confirm Password"
              title="Confirm Password"
              className="half-width"
              value={confirmPassword.value}
              handleValidation={(e) =>
                handleValidation({ e, title: "confirm password" })
              }
              errorMsg={confirmPassword.error}
            />
          </FormRow>
          <FormRow>
            <Button onClick={handleSubmit}>Sign Up</Button>
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
  width: 80%;
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

  .half-width {
    &:first-child {
      margin-right: 3%;
    }
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

export default WrapConatiner(SignUp);
