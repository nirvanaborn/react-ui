import React, { useState, useEffect } from "react";
import { Layout, message } from "antd";
import Header from "./Header";
import Footer from "./Footer";
import styled from "styled-components";
import { Scrollbars } from "react-custom-scrollbars";
const { Content } = Layout;
const StyledLayoutComponent = styled.div`
  height: 100vh;
  display: flex;
  flex: auto;
  flex-direction: column;
  min-height: 0;
  background: #f0f2f5;
`;
const LayoutComponent = ({ children, history, userInfo }) => {
  return (
    <StyledLayoutComponent>
      <Scrollbars style={{ height: "100vh" }} autoHide>
        <Header history={history} userInfo={userInfo} />
        <Content
          className="site-layout"
          style={{
            padding: "0 50px",
            marginTop: 64,
            minHeight: "calc(100vh - 134px)",
          }}
        >
          {children}
        </Content>
        <Footer style={{ textAlign: "center" }}></Footer>
      </Scrollbars>
    </StyledLayoutComponent>
  );
};

export default LayoutComponent;
