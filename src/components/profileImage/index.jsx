import React, { useState, useEffect, useRef, useCallback } from "react";
import styled from "styled-components";

// import components here
import Input from "../inputComp";
import UserImage from "../../assets/images/user.jpg";

// import util funtion
import base64Convertor from "../../utils/base64Convertor";

const ProfileImage = ({ imageData, handleFileChange, title, name }) => {
  const [image, setImage] = useState("");
  const inputRef = useRef();
  const fileTrigger = (e) => {
    e.preventDefault();
    return inputRef?.current?.click();
  };

  const imageSrc = useCallback(async () => {
    let regEx = /^(http:\/\/www\.|https:\/\/www\.|http:\/\/|https:\/\/)?[a-z0-9]+([-.]{1}[a-z0-9]+)*\.[a-z]{2,5}(:[0-9]{1,5})?(\/.*)?$/;
    const src =
      imageData?.value && regEx.test(imageData?.value)
        ? imageData?.value
        : imageData?.value
        ? await base64Convertor(imageData.value)
        : UserImage;

    setImage(src);
  }, [imageData?.value]);

  useEffect(() => {
    imageSrc();
  }, [imageSrc]);

  return (
    <ProfileConatiner>
      <Label>{title}</Label>
      <UploadButton onClick={fileTrigger}>Upload Image</UploadButton>
      {imageData?.error && <ErrorMessage>{imageData.error}</ErrorMessage>}
      <FileInput
        inputType="file"
        handleChange={handleFileChange}
        inputRef={inputRef}
        name={name}
      />
      <Figure>
        <img src={image} alt={imageData?.name || "user"} />
      </Figure>
    </ProfileConatiner>
  );
};

const ProfileConatiner = styled.div`
  width: 100%;
  text-align: left;
  position: relative;
`;

const Label = styled.label`
  width: 100%;
  margin-bottom: 5px;
  display: block;
  color: #fff;
  text-align: left;
  font-size: 14px;
`;

const Figure = styled.figure`
  width: 70px;
  display: inline-block;
  vertical-align: top;
  border-radius: 100%;
  img {
    width: 100%;
    border-radius: 3px;
  }
`;

const UploadButton = styled.button`
  margin-right: 10%;
  display: inline-block;
  vertical-align: top;
`;

const FileInput = styled(Input)`
  display: none;
`;
const ErrorMessage = styled.span`
  position: absolute;
  left: 0;
  top: 45px;
  text-align: left;
  font-size: 12px;
  color: #ff0000;
`;

export default ProfileImage;
