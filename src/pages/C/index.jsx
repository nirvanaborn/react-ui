import React, { useEffect, useState } from "react";
import { Image, Row, Col, Form, Input, Button, message } from "antd";
import { defaultAvatarList } from "../../assets/images/avatars";
import styled from "styled-components";
import axios from "axios";
import { baseURL } from "../../api";
import { getImgToBase64 } from "../../utils/imgToBase64";
import { useSelector } from "react-redux";
const StyledAvatarListComponent = styled.div`
  display: flex;
  & img {
    position: relative;
  }
  .choose {
    position: absolute;
    top: 0;
    width: 128px;
    height: 128px;
    background: #000;
    opacity: 0.5;
    display: flex;
    justify-content: center;
    align-items: center;
    span {
      font-size: 20px;
      font-weight: bolder;
      color: #fff;
    }
  }
`;
const C = ({ userInfo, refresh, setRefresh }) => {
  const [form] = Form.useForm();
  const [chooseAvatar, setChooseAvatar] = useState(userInfo?.avatar);
  const avatarList = [];
  useEffect(() => {
    form.setFieldsValue({ ...userInfo });
  }, []);
  const showAvatarList = (list) => {
    list.forEach((avatarItem, avatarIdx) => {
      avatarList.push(
        <Col key={avatarIdx} span={8}>
          <Image
            src={avatarItem.src}
            width={128}
            preview={false}
            onClick={() => handleChoose(avatarItem.src)}
            style={{ cursor: "pointer" }}
          />
          {chooseAvatar === avatarItem.src && (
            <div className="choose">
              <span>已选择</span>
            </div>
          )}
        </Col>
      );
    });
    return avatarList;
  };
  const handleChoose = (src) => {
    setChooseAvatar(src);
  };
  const onFinish = (values) => {
    getImgToBase64(chooseAvatar, (avatarUrl) => {
      axios({
        baseURL,
        url: "/users/updateUserInfo",
        method: "post",
        data: {
          ...values,
          account: localStorage.getItem("account"),
          avatar: avatarUrl || userInfo?.avatar,
        },
      })
        .then((res) => {
          setRefresh(!refresh);
          if (res.data.code !== 200) {
            message.error(res.data.msg);
          } else {
            message.success(res.data.msg);
          }
        })
        .catch((err) => console.error(err));
    });
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };
  const resetFormValue = () => {
    form.resetFields();
    form.setFieldsValue({ ...userInfo });
  };
  return (
    <div>
      <div>
        <h1>修改头像，后续增加修改个人信息功能</h1>
      </div>
      <StyledAvatarListComponent>
        <div style={{ width: "30%" }}>
          <h3>默认头像列表：</h3>
          <Row gutter={[16, 16]}>{showAvatarList(defaultAvatarList)}</Row>
        </div>
        <div style={{ width: "30%" }}>
          <Form
            name="basic"
            labelCol={{ span: 8 }}
            wrapperCol={{ span: 16 }}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            form={form}
          >
            <Form.Item
              label="用户名"
              name="userName"
              rules={[{ required: true, message: "请输入修改后的用户名" }]}
            >
              <Input />
            </Form.Item>
            <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
              <Button type="primary" htmlType="submit">
                更新
              </Button>
              <Button
                type="primary"
                style={{ marginLeft: 32 }}
                onClick={resetFormValue}
              >
                重置
              </Button>
            </Form.Item>
          </Form>
        </div>
      </StyledAvatarListComponent>
    </div>
  );
};

export default C;
