import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import { Menu, Dropdown, message, Avatar } from "antd";
import {
  DownOutlined,
  LogoutOutlined,
  SettingOutlined,
} from "@ant-design/icons";
import styled from "styled-components";
import routes from "../../../routes";
import axios from "axios";
import { baseURL } from "../../../api";
const StyledHeaderComponent = styled.div`
  position: fixed;
  z-index: 1;
  width: 100%;
  height: 64px;
  line-height: 64px;
`;
const StyledPersonalCenterComponent = styled.div`
  position: absolute;
  right: 0;
  top: 0;
  height: 46px;
  line-height: 46px;
  & > span {
    cursor: pointer;
    margin-right: 16px;
    span {
      margin-right: 8px;
    }
  }
`;
function Header({ history, userInfo }) {
  const [selectMenuKey, setSelectMenuKey] = useState();
  useEffect(() => {
    setSelectMenuKey(window.location.pathname);
  }, [selectMenuKey]);

  const menuList = [];
  const parseRoute = (list) => {
    list.forEach((routeItem, routeIdx) => {
      if (!routeItem.children && routeItem.isNeedLayout) {
        menuList.push(
          <Menu.Item key={routeItem.path}>
            <NavLink to={routeItem.path}>{routeItem.title}</NavLink>
          </Menu.Item>
        );
      }
    });
    return menuList;
  };
  const clearLocalStorage = () => {
    let key = "exit";
    localStorage.removeItem("account");
    message
      .loading({
        content: "退出中...",
        key,
        duration: 1.5,
      })
      .then(() => {
        history.push("/login");
        message.success({ content: "已退出", key, duration: 1 });
      });
  };
  const pc_menu = (
    <Menu style={{ top: 8 }}>
      <Menu.Item
        icon={<LogoutOutlined />}
        onClick={clearLocalStorage}
        key="quit"
      >
        退出登录
      </Menu.Item>
      <Menu.Item icon={<SettingOutlined />} key="setting">
        设置
      </Menu.Item>
    </Menu>
  );
  return (
    <StyledHeaderComponent>
      <Menu mode="horizontal" selectedKeys={[selectMenuKey]}>
        {parseRoute(routes)}
      </Menu>
      <StyledPersonalCenterComponent>
        <Dropdown
          overlay={pc_menu}
          placement="bottomCenter"
          trigger={["click"]}
        >
          <span>
            <Avatar size="default" src={userInfo?.avatar} />
            <span>{userInfo?.userName}</span>
            <DownOutlined />
          </span>
        </Dropdown>
      </StyledPersonalCenterComponent>
    </StyledHeaderComponent>
  );
}

export default Header;
