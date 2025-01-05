import React, { useState } from "react";
import { Upload, Button, message } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import axios from "axios";

const UploadFile = () => {
  const [fileList, setFileList] = useState([]);

  const props = {
    beforeUpload: (file) => {
      if (file.type !== "application/pdf") {
        message.error("Chỉ hỗ trợ file PDF.");
        return Upload.LIST_IGNORE;
      }
      return true;
    },
    onChange: ({ file, fileList }) => {
      if (file.status !== "uploading") {
        console.log(file, fileList);
      }
      setFileList(fileList);
    },
    onRemove: (file) => {
      setFileList((prev) => prev.filter((item) => item.uid !== file.uid));
    },
    fileList,
  };

  const handleUpload = async () => {
    if (fileList.length === 0) {
      message.warning("Vui lòng chọn ít nhất một file PDF để upload.");
      return;
    }

    const formData = new FormData();
    fileList.forEach((file) => {
      formData.append("file", file.originFileObj);
    });

    try {
      const response = await axios.post(
        "http://127.0.0.1:8000/api/v1/documents/upload/",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      message.success("Tải lên thành công!");
      console.log("Response:", response.data);
      setFileList([]); // Reset danh sách file sau khi upload thành công
    } catch (error) {
      message.error("Có lỗi xảy ra khi tải lên.");
      console.error("Error:", error);
    }
  };

  return (
    <div className="w-fit  flex items-center justify-center">
      <Upload {...props}>
        <Button icon={<UploadOutlined />}>Chọn File PDF</Button>
      </Upload>
      <Button
        type="primary"
        onClick={handleUpload}
        className="ml-3"
        disabled={fileList.length === 0}
      >
        Upload
      </Button>
    </div>
  );
};

export default UploadFile;
