import React from "react";
import styled from "styled-components";

const ProfileDetail = (props) => {
  const {
    firstName,
    lastName,
    age,
    phoneNumber,
    address,
    profileImage,
    email,
  } = props.user || {};

  return (
    <ProfileContainer>
      <Figure>{profileImage && <img src={profileImage} alt="user" />}</Figure>
      <DetailHolder>
        {firstName && (
          <>
            <NameConatiner>
              <span>Name</span>{" "}
              <span>
                {firstName} {lastName}
              </span>
            </NameConatiner>
            <NameConatiner>
              <span>Email</span> <span>{email}</span>
            </NameConatiner>
            <NameConatiner>
              <span>Age</span> <span>{age}</span>
            </NameConatiner>
            <NameConatiner>
              <span>Phone Number</span> <span>{phoneNumber}</span>
            </NameConatiner>
            <NameConatiner>
              <span>Address</span> <span>{address}</span>
            </NameConatiner>
          </>
        )}
      </DetailHolder>
    </ProfileContainer>
  );
};

const ProfileContainer = styled.div`
  width: 80%;
  margin: 0 auto;
  display: flex;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  border: 1px solid rgba(232, 215, 65, 0.58);
`;

const DetailHolder = styled.ul`
  flex-basis: 70%;
  display: table;
`;

const NameConatiner = styled.li`
  padding-left: 40px;
  margin-bottom: 10px;
  display: table-row;
  span {
    color: #fff;
    padding: 5px;
    display: table-cell;
    border: 1px solid rgba(232, 215, 65, 0.58);
    &:first-child {
      font-weight: 700;
      padding-left: 10px;
    }
  }
`;

const Figure = styled.figure`
  flex-basis: 30%;
  max-width: 400px;
  border-right: 1px solid rgba(232, 215, 65, 0.58);
  img {
    width: 100%;
    border-radius: 100%;
  }
`;

export default ProfileDetail;
