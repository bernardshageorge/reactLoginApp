import React, { useState, useEffect, useContext, useCallback } from "react";
import styled, { css } from "styled-components";

// import components
import WrapConatiner from "../../components/wrapContainer";
import { auth, firestore } from "../../utils/firebase";
import { UserContext } from "../../providers/userProvider";
import ProfileDetail from "./component/profileDetail";
import EditProfile from "./component/editProfile";
import Loader from "../../components/loder";
import cookieUtils from "../../utils/cookieUtils";

const Profile = (props) => {
  const user = useContext(UserContext);
  const [isLoading, setIsLoading] = React.useState(false);
  const [currentUser, setUser] = React.useState(user);

  const [editFlag, setEditFlag] = useState(false);

  const handleEditState = (flag) => {
    setEditFlag(flag);
  };

  const fetchUser = async () => {
    setIsLoading(true);
    const userDocument = await firestore.doc(`users/${user?.uid}`).get();
    console.log(userDocument.data());
    setUser({
      uid: user?.uid,
      ...userDocument.data(),
    });
    setIsLoading(false);
  };

  //   signout handler
  const handleLogout = () => {
    auth.signOut();
    cookieUtils.setCookies(false);
    props.history.push("/signin");
  };

  useEffect(() => {
    fetchUser();
  }, [user]);

  return (
    <ProfileContainer>
      {isLoading && <Loader />}
      <TopBar>
        {!editFlag && currentUser?.firstName && (
          <NameConatiner>Welcome {currentUser?.firstName}!</NameConatiner>
        )}

        {!editFlag && (
          <Edit onClick={() => handleEditState(true)}>Edit Profile</Edit>
        )}
        <Signout onClick={handleLogout}>Sign out</Signout>
      </TopBar>
      {!editFlag && <ProfileDetail user={currentUser} />}
      {editFlag && (
        <EditProfile
          handleEditState={handleEditState}
          user={currentUser}
          fetchUser={fetchUser}
        />
      )}
    </ProfileContainer>
  );
};
const ProfileContainer = styled.div`
  width: 100%;
  overflow: hidden;
`;

const CommonStyle = css`
  margin: 20px 20px 0 0;
  order: none;
  padding: 0 10px;
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

const Signout = styled.button`
  ${CommonStyle};
`;

const TopBar = styled.div`
  text-align: right;
  flex-basis: 100%;
  position: relative;
`;

const Edit = styled.button`
  ${CommonStyle};
`;
const NameConatiner = styled.span`
  position: absolute;
  top: 28px;
  left: 78px;
  color: #fff;
  font-size: 20px;
  font-weight: 700;
`;

export default WrapConatiner(Profile);
