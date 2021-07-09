import React, { useState, useEffect } from "react";
import { Upload, message, Button, Image } from "antd";
import { LoadingOutlined, PlusOutlined } from "@ant-design/icons";
import { baseURL } from "../../api";
import axios from "axios";

const B = () => {
  const [loading, setLoading] = useState(false);
  const [imageUrl, setImageUrl] = useState();
  const [backUrl, setBackUrl] = useState();
  const getBase64 = (img, callback) => {
    const reader = new FileReader();
    reader.addEventListener("load", () => callback(reader.result));
    reader.readAsDataURL(img);
  };

  const beforeUpload = (file) => {
    const isJpgOrPng = file.type === "image/jpeg" || file.type === "image/png";
    if (!isJpgOrPng) {
      message.error("You can only upload JPG/PNG file!");
    }
    const isLt2M = file.size / 1024 / 1024 < 2;
    if (!isLt2M) {
      message.error("Image must smaller than 2MB!");
    }
    return isJpgOrPng && isLt2M;
  };

  const uploadButton = (
    <div>
      {loading ? <LoadingOutlined /> : <PlusOutlined />}
      <div style={{ marginTop: 8 }}>Upload</div>
    </div>
  );

  const handleChange = (info) => {
    if (info.file.status === "uploading") {
      setLoading(true);
      return;
    }
    if (info.file.status === "done") {
      // Get this url from response in real world.
      console.log(info.file.originFileObj);
      getBase64(info.file.originFileObj, (imageUrl) => {
        setLoading(false);
        setImageUrl(imageUrl);
      });
    }
  };
  const fetchImage = () => {
    axios({
      baseURL,
      url: "/getImage",
      method: "get",
    })
      .then((res) => {
        if (res.data.code !== 200) {
          message.error({ content: res.data.msg, duration: 1.5 });
        } else {
          setBackUrl(res.data.url);
        }
      })
      .catch((err) => console.error(err));
  };
  useEffect(() => {
    fetchImage();
  }, []);
  return (
    <div>
      <Upload
        name="avatar"
        listType="picture-card"
        className="avatar-uploader"
        showUploadList={false}
        action={`${baseURL}/testUpdate`}
        beforeUpload={beforeUpload}
        onChange={handleChange}
        data={{ imageUrl }}
      >
        {imageUrl ? (
          <img src={imageUrl} alt="avatar" style={{ width: "100%" }} />
        ) : (
          uploadButton
        )}
      </Upload>
      <Image src={backUrl} placeholder width={100} />
    </div>
  );
};

export default B;
