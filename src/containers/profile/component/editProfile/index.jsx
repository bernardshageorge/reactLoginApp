import React, { useState, useEffect } from "react";
import styled from "styled-components";

// import components here
import Input from "../../../../components/inputComp";
import TextArea from "../../../../components/textArea";
import ProfileImage from "../../../../components/profileImage";

// import util funtion
import validationUtils from "../../../../utils/validationUtil";
import { updateUserDocument, firestorage } from "../../../../utils/firebase";

const EditProfile = (props) => {
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
    },
  };

  const [values, setValue] = useState(initialValue);

  useEffect(() => {
    let { form } = values;
    Object.keys(form).forEach((key) => {
      form[key].value = props?.user[key];
    });

    setValue({
      ...values,
      form,
    });
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
    updateUserData(e, form);
  };

  // update props. data
  const updateUserData = async (event, form) => {
    event.preventDefault();

    let { profileImage } = form;

    // image upload
    let imageUrl = null;
    let regEx = /^(http:\/\/www\.|https:\/\/www\.|http:\/\/|https:\/\/)?[a-z0-9]+([-.]{1}[a-z0-9]+)*\.[a-z]{2,5}(:[0-9]{1,5})?(\/.*)?$/;
    if (profileImage && profileImage.value && !regEx.test(profileImage.value)) {
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
      postObj[key] = form[key].value;
      if (key === "profileImage" && imageUrl) postObj[key] = imageUrl;
    });
    try {
      await updateUserDocument(props.user, postObj);
      props.fetchUser();

      Object.keys(form).forEach((key, index) => {
        form[key].value = "";
        form[key].error = "";
        if (key === "profileImage") form[key].name = "";
      });

      setValue({
        ...values,
        form,
      });

      props.handleEditState(false);
    } catch (error) {
      // setError("Error Signing up with email and password");
    }
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
  } = values.form;

  return (
    <>
      <Form>
        <FormContainer>
          <FormRow>
            <span>Edit Profile</span>
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
            <Button onClick={handleSubmit}>Save Changes</Button>
          </FormRow>
        </FormContainer>
      </Form>
    </>
  );
};

const Form = styled.form`
  position: relative;
  flex-basis: 50%;
`;

const FormContainer = styled.ul`
  width: 60%;
  margin: 0 auto;
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
  padding: 0 10px;
  cursor: pointer;
  border: none;
  border-radius: 3px;
  height: 30px;
  background: blue;
  color: white;
  transition: 0.2s;
  font-size: 16px;
  font-weight: 500;
  &:hover {
    background: white;
    color: blue;
  }
`;

export default EditProfile;
