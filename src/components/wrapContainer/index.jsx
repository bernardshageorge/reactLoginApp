import React from "react";
import styled from "styled-components";
import BGImage from "../../assets/images/background.jpg";

const WrapContainer = (Main) => ({ children, ...props }) => (
  <ColoredWrapper>
    <WidthWrapper>
      <Main {...props} />
    </WidthWrapper>
  </ColoredWrapper>
);

export default WrapContainer;

const ColoredWrapper = styled.div`
  height: 100vh;
  position: relative;
  background: url(${BGImage}) no-repeat 100% / cover;
`;

const WidthWrapper = styled.div`
  width: 70%;
  max-width: 1024px;
  height: 650px;
  margin: 0 auto;
  border-radius: 3px;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: rgba(191, 176, 44, 0.38);
  display: flex;
  box-shadow: 0px 0 3px 8px rgba(191, 176, 44, 0.38);
`;
