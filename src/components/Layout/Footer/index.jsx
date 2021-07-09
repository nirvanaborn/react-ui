import React from "react";
import styled from "styled-components";
const StyledFooterComponent = styled.div`
  text-align: center;
`;
function Footer() {
  return (
    <StyledFooterComponent className="ant-layout-footer">
      Little Website ©2021 Created by NirvanaBorn (Gjl)
    </StyledFooterComponent>
  );
}

export default Footer;
