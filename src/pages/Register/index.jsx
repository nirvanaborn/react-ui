import React, { useState, useEffect } from "react";
import { Form, Input, Button, message } from "antd";
import axios from "axios";
import { baseURL } from "../../api";
import basicAvatar from "../../assets/images/avatars/4521.png";
import {getImgToBase64} from '../../utils/imgToBase64'
const Register = ({ history }) => {
  const [defaultAvatar, setDefaultAvatar] = useState();
  useEffect(() => {
    if (localStorage.getItem("account")) {
      history.push("/");
    }
    handleChangeBlob(basicAvatar);
  }, []);
  const onFinish = (values) => {
    message.loading({ content: "注册中...", key: "register", duration: 0 });
    axios({
      baseURL,
      url: "/register",
      method: "post",
      data: {
        ...values,
        avatar: defaultAvatar,
      },
    })
      .then((res) => {
        message.destroy("register");
        if (res.data.code !== 200) {
          message.error(res.data.msg);
        } else {
          setTimeout(() => {
            message.success(res.data.msg);
            window.location.href = "/login";
          }, 1500);
        }
      })
      .catch((err) => console.error(err));
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };
  const handleChangeBlob = (image) => {
    getImgToBase64(image, (imageUrl) => {
      setDefaultAvatar(imageUrl);
    });
  };
  return (
    <Form
      name="basic"
      labelCol={{ span: 8 }}
      wrapperCol={{ span: 16 }}
      initialValues={{ remember: true }}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
    >
      <Form.Item
        label="账号"
        name="account"
        rules={[{ required: true, message: "请输入账号" }]}
      >
        <Input />
      </Form.Item>
      <Form.Item label="用户名" name="userName">
        <Input />
      </Form.Item>
      <Form.Item
        label="密码"
        name="password"
        rules={[{ required: true, message: "请输入密码" }]}
        hasFeedback
      >
        <Input.Password />
      </Form.Item>
      <Form.Item
        label="确认密码"
        name="confirm"
        dependencies={["password"]}
        rules={[
          { required: true, message: "请再次输入密码" },
          ({ getFieldValue }) => ({
            validator(_, value) {
              if (!value || getFieldValue("password") === value) {
                return Promise.resolve();
              }
              return Promise.reject(new Error("两次输入密码不一致"));
            },
          }),
        ]}
        hasFeedback
      >
        <Input.Password />
      </Form.Item>
      <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
        <Button type="primary" htmlType="submit">
          注册
        </Button>
      </Form.Item>
    </Form>
  );
};

export default Register;
