import React, { useEffect, useState } from "react";
import ModuleTab from "../tabcontents/ModuleTab";
import { Button, message, notification, Spin } from "antd";
import CreateSetsModal from "../modals/set/CreateSetsModal";
import axiosConfig from "../../services/axios/axiosConfig";
import EmtySets from "../exceptions/EmtySets";
import DeleteSetModal from "../modals/DeleteSetModal";
import EditSetModal from "../modals/set/EditSetModal";

const SetsScreen = () => {
  const token = localStorage.getItem("token");
  const [topics, setTopics] = React.useState();
  const [isloading, setIsLoading] = useState(true);
  const getAllTopic = async () => {
    try {
      const res = await axiosConfig.get(
        "/topics?pageNo=0&pageSize=500&sortBy=updatedAt"
      );

      setTopics(res.data?.result?.content);
    } catch (error) {
      handleOpenNotifi(
        "topRight",
        "Có lỗi xảy ra trong quá trình tải các học phần!"
      );
      console.log("err:", error);
    } finally {
      setIsLoading(false);
    }
  };
  useEffect(() => {
    if (!token) {
      window.location.href = "/login";
    }
    getAllTopic();
  }, [token]);

  const [openCreateSet, setOpenCreateSet] = useState(false);
  const [api, contextHolder] = notification.useNotification([]);
  const [isOpenEditSetModal, setIsOpenEditSetModal] = useState(false);
  const [isOpenDeleteSetModal, setIsOpenDeleteSetModal] = useState(false);

  const [topic, setTopic] = useState();

  const openEditSetModal = () => {
    setIsOpenEditSetModal(true);
  };
  const handleCloseEditModal = () => {
    setIsOpenEditSetModal(false);
  };

  const openDeleteSetModal = () => {
    setIsOpenDeleteSetModal(true);
  };

  const handleCloseDeleteSetModal = () => {
    setIsOpenDeleteSetModal(false);
  };

  const openNotification = (placement, message) => {
    api.info({
      message: `${message}`,
      placement,
    });
  };
  const handleCreateSet = () => {
    setOpenCreateSet(true);
  };

  const handleCreateSetModalClose = () => {
    setOpenCreateSet(false);
  };
  const handleOpenNotifi = (place, mess) => {
    openNotification(place, mess);
  };

  if (isloading) {
    return (
      <Spin className=" w-full flex items-center justify-center" size="large" />
    );
  }

  return (
    <div className="p-3 w-full ">
      {contextHolder}
      <div className="text-3xl font-semibold flex items-center justify-between mb-8">
        <span>Học phần của bạn</span>
        <Button type="primary" onClick={handleCreateSet}>
          Tạo học phần mới
        </Button>
      </div>

      {topics && topics?.length > 0 ? (
        <ModuleTab
          topics={topics}
          openEditSetModal={openEditSetModal}
          openDeleteSetModal={openDeleteSetModal}
          setTopic={setTopic}
        />
      ) : (
        <EmtySets />
      )}

      <CreateSetsModal
        openCreateSet={openCreateSet}
        handleCreateSetModalClose={handleCreateSetModalClose}
        setTopics={setTopics}
        openNotification={openNotification}
      />

      <DeleteSetModal
        openDeleteSetModal={isOpenDeleteSetModal}
        handleCloseDeleteSetModal={handleCloseDeleteSetModal}
        topic={topic}
        handleOpenNotifi={handleOpenNotifi}
        setTopics={setTopics}
      />
      <EditSetModal
        openEditSetModal={isOpenEditSetModal}
        handleCloseEditModal={handleCloseEditModal}
        topic={topic}
        setTopics={setTopics}
        handleOpenNotifi={handleOpenNotifi}
      />
    </div>
  );
};

export default SetsScreen;
