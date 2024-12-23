import { Alert, Button, message, Modal } from "antd";
import React from "react";
import axiosConfig from "../../../services/axios/axiosConfig";

const DeleteWordModal = ({
  openDeleteWordModal,
  handleCloseDeleteWordModal,
  item,
  idTopic,
  openNotification,
  setData,
}) => {
  const handleOpenNotify = (place, mess) => {
    openNotification(place, mess);
  };
  const handleDeleteWord = async (idTopic, idWord) => {
    try {
      const res = await axiosConfig.delete(
        `/topics/${idTopic}/words/${idWord}`
      );
      console.log("res: ", res.data);
      if (res?.data.statusCode === 200) {
        setData((prev) => prev.filter((word) => word?.id !== idWord));
        handleOpenNotify("topRight", "Đã xóa thành công từ khỏi học phần!");
      }
    } catch (error) {
      console.log("error", error);
      handleOpenNotify("topRight", "Có lỗi xảy ra khi xóa từ vựng!");
    }
  };
  const handleOk = () => {
    handleDeleteWord(idTopic, item?.id);
    handleCloseDeleteWordModal();
  };
  return (
    <Modal
      open={openDeleteWordModal}
      title={`Xác nhận muốn xóa từ vừng ${item?.name}`}
      onOk={handleOk}
      onCancel={handleCloseDeleteWordModal}
      footer={[
        <Button
          key="cancel"
          type="default"
          onClick={handleCloseDeleteWordModal}
        >
          Hủy
        </Button>,
        <Button key="submit" onClick={handleOk} color="danger" variant="solid">
          Vâng, tôi muốn xóa từ này!
        </Button>,
      ]}
    >
      <p>Bạn có chắc chắn muốn xóa từ này?</p>
    </Modal>
  );
};

export default DeleteWordModal;
