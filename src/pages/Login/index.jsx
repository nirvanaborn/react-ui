import React, { useState, useEffect } from "react";
import { Form, Input, Button, Checkbox, message } from "antd";
import axios from "axios";
import { baseURL } from "../../api";
const Login = ({ history }) => {
  useEffect(() => {
    if (localStorage.getItem("account")) {
      history.push("/");
    }
  }, []);
  const onFinish = (values) => {
    let key = "login";
    message.loading({ content: "登录中...", key, duration: 0 });
    axios({
      baseURL,
      url: "/login",
      method: "post",
      data: {
        ...values,
      },
    })
      .then((res) => {
        if (res.data.code !== 200) {
          message.error({ content: res.data.msg, key, duration: 1.5 });
        } else {
          // TODO 设置缓存过期时间
          localStorage.setItem("account", values.account);
          history.push("/");
          message.success({ content: res.data.msg, key, duration: 1.5 });
        }
      })
      .catch((err) => console.error(err));
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  const jumpToRegisterPage = () => {
    history.push("/register");
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

      <Form.Item
        label="密码"
        name="password"
        rules={[{ required: true, message: "请输入密码" }]}
      >
        <Input.Password />
      </Form.Item>

      {/* <Form.Item
        name="remember"
        valuePropName="checked"
        wrapperCol={{ offset: 8, span: 16 }}
      >
        <Checkbox>Remember me</Checkbox>
      </Form.Item> */}

      <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
        <Button type="primary" htmlType="submit">
          登录
        </Button>
        <Button type="primary" onClick={jumpToRegisterPage}>
          注册
        </Button>
      </Form.Item>
    </Form>
  );
};

export default Login;
