import React, { useEffect, useState, useRef } from "react";
import { Input, Card, Form, Button, message, Spin } from "antd";
import { LoadingOutlined, EnterOutlined } from "@ant-design/icons";
import axios from "axios";
import { baseURL } from "../../api";
import { Scrollbars } from "react-custom-scrollbars";
import styled from "styled-components";
const { TextArea } = Input;
const loadingIcon = <LoadingOutlined style={{ fontSize: 44 }} spin />;
const StyledFormComponent = styled(Form)`
  margin: 32px 0 0;
  display: flex;
  align-items: flex-start;
  position: relative;
  .ant-form-item {
    margin-right: 0;
  }
`;
const MessageBoard = () => {
  const ACCOUNT = localStorage.getItem("account");
  const [form] = Form.useForm();
  const scrollBar = useRef();
  const [messageList, setMessageList] = useState([]);
  const [loading, setLoading] = useState(false);
  const fetchMessagesList = (params) => {
    setLoading(true);
    axios({
      baseURL,
      url: "/messages/getList",
      method: "get",
      params: {
        ...params,
      },
    })
      .then((res) => {
        if (res.data.code !== 200) {
          message.error(res.data.msg);
        } else {
          setMessageList(res.data.list);
        }
        setLoading(false);
      })
      .catch((err) => console.error(err));
  };

  useEffect(() => {
    fetchMessagesList();
  }, []);
  useEffect(() => {
    console.log("scrollbar change detected");
    if (scrollBar) scrollBar.current.scrollToBottom();
  }, [scrollBar, messageList]);
  const onFinish = (values) => {
    let key = "submit";
    message.loading({ content: "提交中...", key, duration: 1.5 });
    axios({
      baseURL,
      url: "/messages/submitMessage",
      method: "post",
      data: {
        ...values,
        account: ACCOUNT,
      },
    })
      .then((res) => {
        if (res.data.code !== 200) {
          message.error({ content: res.data.msg, key });
        } else {
          message.success({ content: res.data.msg, key });
          setTimeout(() => {
            fetchMessagesList();
            form.resetFields();
          }, 1500);
        }
      })
      .catch((err) => console.error(err));
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <div>
      <h1>MessageBoard</h1>
      <Spin indicator={loadingIcon} delay={500} spinning={loading} size="large">
        <Scrollbars style={{ height: "50vh" }} autoHide ref={scrollBar}>
          {messageList.map((messageItem) => (
            <Card
              key={messageItem.id}
              title={messageItem.account}
              style={{ width: 300 }}
            >
              {messageItem.message}-{messageItem.submitDate}
            </Card>
          ))}
        </Scrollbars>
      </Spin>
      <StyledFormComponent
        name="basic"
        initialValues={{ remember: true }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        form={form}
        layout="inline"
      >
        <Form.Item
          label=""
          name="message"
          rules={[{ required: true, message: "请写下你的留言" }]}
          style={{ width: "95%" }}
        >
          <TextArea maxLength={32} showCount placeholder="请输入留言..." />
        </Form.Item>
        <Form.Item wrapperCol={{ offset: 8, span: 16 }} style={{ width: "5%" }}>
          <Button
            type="primary"
            htmlType="submit"
            icon={<EnterOutlined />}
            size="large"
          >
            提交
          </Button>
        </Form.Item>
      </StyledFormComponent>
    </div>
  );
};

export default MessageBoard;
