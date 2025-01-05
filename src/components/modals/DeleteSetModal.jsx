import { Alert, Button, message, Modal } from "antd";
import React from "react";
import axiosConfig from "../../services/axios/axiosConfig";
import { useNavigate } from "react-router-dom";

const DeleteSetModal = ({
  openDeleteSetModal,
  handleCloseDeleteSetModal,
  topic,
  handleOpenNotifi,
  setTopics,
}) => {
  const set = topic;
  const navigate = useNavigate();

  const handleOpenNotify = (place, mess) => {
    handleOpenNotifi(place, mess);
  };
  const deleteSet = async (id) => {
    try {
      const res = await axiosConfig.delete(`/topics/${id}`);
      console.log("res", res.data);
      if (res.data.statusCode === 200) {
        handleOpenNotify("topRight", "Xóa học phần thành công");
        setTopics((prev) => prev.filter((topic) => topic.id !== set.id));
      }
    } catch (error) {
      handleOpenNotify(
        "topRight",
        "Có lỗi xảy ra trong quá trình xóa học phần!"
      );
      console.log("err: ", error);
    }
  };
  const handleOk = () => {
    deleteSet(set?.id);
    handleCloseDeleteSetModal();
  };
  return (
    <Modal
      open={openDeleteSetModal}
      title={`Xác nhận muốn xóa ${set?.title}`}
      onOk={handleOk}
      onCancel={handleCloseDeleteSetModal}
      footer={[
        <Button type="default" key="cancel" onClick={handleCloseDeleteSetModal}>
          Hủy
        </Button>,
        <Button key="submit" onClick={handleOk} color="danger" variant="solid">
          Vâng, hãy xóa học phần này!
        </Button>,
      ]}
    >
      <p>Bạn có chắc chắn muốn xóa học phần này?</p>
    </Modal>
  );
};

export default DeleteSetModal;
