import {
  ArrowLeftOutlined,
  ArrowRightOutlined,
  BlockOutlined,
  FormOutlined,
  ReadOutlined,
  SnippetsOutlined,
} from "@ant-design/icons";
import { Button, message, notification } from "antd";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import ListWordComponent from "../words/ListWordComponent";
import AddWordModal from "../modals/AddWordModal";
import DeleteSetModal from "../modals/DeleteSetModal";
import EditSetModal from "../modals/set/EditSetModal";
import axiosConfig from "../../services/axios/axiosConfig";
import { CiExport } from "react-icons/ci";
import { v4 as uuidv4 } from "uuid";

const StudyScreen = () => {
  const location = useLocation();
  const { id, title, description } = location.state || {};
  const navigate = useNavigate();
  const [openAddWordModal, setOpenAddWordModal] = useState(false);
  const [isOpenEditSetModal, setIsOpenEditSetModal] = useState(false);
  const [idTopic, setIdTopic] = useState(0);
  const [api, contextHolder] = notification.useNotification([]);
  const [data, setData] = useState();
  const [isLoading, setIsLoading] = useState();

  const getAllWordOfTopic = async () => {
    try {
      const res = await axiosConfig.get(`topics/${id}/words`);
      if (res?.data?.statusCode === 200) {
        setData(res?.data?.result);
      }
    } catch (error) {
      console.log("error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    setIsLoading(true);
    getAllWordOfTopic();
  }, [id]);

  const openNotification = (placement, message) => {
    api.info({
      message: `${message}`,
      placement,
      duration: 2,
    });
  };
  const [openDeleteSetModal, setOpenDeleteSetModal] = useState(false);

  const accessFlashcard = () => {
    navigate(`/flashcard/${id}`, { state: { title } });
  };
  const accessLearn = () => {
    navigate(`/learn/${id}`, { state: { title, data } });
  };

  const accessTest = () => {
    navigate(`/test/${id}/exam?uuid=${uuidv4()}`, { state: { title } });
  };

  const handleAddWord = () => {
    setOpenAddWordModal(true);
    setIdTopic(id);
  };

  const handleCloseModal = () => {
    setOpenAddWordModal(false);
  };

  const handleCloseDeleteSetModal = () => {
    setOpenDeleteSetModal(false);
  };

  const handleCloseEditModal = () => {
    setIsOpenEditSetModal(false);
  };

  const exportExcel = async (idTopic) => {
    try {
      const res = await axiosConfig.get(`/topics/excel/${idTopic}`, {
        responseType: "blob",
      });

      const blob = res.data;
      const url = window.URL.createObjectURL(blob);

      const link = document.createElement("a");
      link.href = url;
      link.download = `topic-${title}.xlsx`;
      link.click();

      window.URL.revokeObjectURL(url);
      message.success("Tải thành công!");
    } catch (error) {
      console.log("error:", error?.response?.data);
    }
  };

  const handleExportExcel = () => {
    console.log("id: ", id);
    exportExcel(id);
  };

  return (
    <div className="m-6">
      {contextHolder}
      <div className="w-full mx-auto my-6 flex items-center justify-between">
        <div className="flex items-center">
          <div className="flex flex-col items-start ml-2">
            <span className="text-2xl text-purple uppercase font-semibold ">
              Tên Học phần:{title}
            </span>
            <span className="text-gray text-sm">
              Mô tả học phần :{description}
            </span>
          </div>
        </div>
        <div
          onClick={handleExportExcel}
          className="flex  items-center justify-center bg-[#61ff53] p-2 font-medium cursor-pointer hover:bg-[#69f057] rounded-lg border border-[#fff] shadow-lg"
        >
          <CiExport size={28} className="mr-1" />
          Xuất excel
        </div>
      </div>
      <div className="m-5  flex items-center justify-between">
        <Button
          onClick={accessFlashcard}
          icon={<SnippetsOutlined style={{ color: "#0b1de0" }} />}
          style={{
            width: 200,
            height: 100,
            backgroundColor: "#f0f0f894",
            fontSize: 18,
            fontWeight: 600,
          }}
        >
          Thẻ ghi nhớ
        </Button>
        <Button
          onClick={accessLearn}
          icon={<FormOutlined style={{ color: "#0b1de0" }} />}
          style={{
            width: 200,
            height: 100,
            backgroundColor: "#f0f0f894",
            fontSize: 18,
            fontWeight: 600,
          }}
        >
          Học
        </Button>
        <Button
          onClick={accessTest}
          icon={<ReadOutlined style={{ color: "#0b1de0" }} />}
          style={{
            width: 200,
            height: 100,
            backgroundColor: "#f0f0f894",
            fontSize: 18,
            fontWeight: 600,
          }}
        >
          Kiểm tra
        </Button>
        <Button
          icon={<BlockOutlined style={{ color: "#0b1de0" }} />}
          style={{
            width: 200,
            height: 100,
            backgroundColor: "#f0f0f894",
            fontSize: 18,
            fontWeight: 600,
          }}
        >
          Ghép thẻ
        </Button>
      </div>
      {/* <div>
        <Carousel dots={false} ref={carouselRef} infinite={false}>
          {data ? (
            data.map((item, idx) => {
              return (
                <div key={idx}>
                  <div>
                    <FlipCard item={item} />
                  </div>
                  <div className=" w-3/5 mt-3 mr-auto ml-auto flex justify-end">
                    <FaVolumeUp
                      style={{
                        fontSize: "25px",
                        cursor: "pointer",
                        color: "#b1b1b1",
                        marginRight: 20,
                        zIndex: 100,
                      }}
                      onClick={() => readWord(item.word)}
                    />
                  </div>
                </div>
              );
            })
          ) : (
            <Skeleton />
          )}
        </Carousel>

        <div className="flex  justify-around ml-10">
          <Button
            icon={<ArrowLeftOutlined />}
            type="primary"
            onClick={handlePrev}
            style={{ marginTop: "20px", width: "100px", height: "50px" }}
          />
          <Button
            icon={<ArrowRightOutlined />}
            type="primary"
            onClick={handleNext}
            style={{ marginTop: "20px", width: "100px", height: "50px" }}
          />
        </div>
      </div> */}
      <div className="m-14">
        <div className="flex items-center justify-between">
          <span className="text-xl font-bold">
            Thuật ngữ trong học phần này
          </span>
          <div>
            <Button onClick={handleAddWord}>Thêm từ mới</Button>
          </div>
        </div>
        <div className="mt-5 w-4/5 mx-auto">
          <ListWordComponent
            idTopic={id}
            data={data}
            isLoading={isLoading}
            openNotification={openNotification}
            setData={setData}
          />
        </div>
      </div>
      <AddWordModal
        openAddWordModal={openAddWordModal}
        handleCloseModal={handleCloseModal}
        idTopic={idTopic}
        openNotification={openNotification}
        setData={setData}
      />
      <DeleteSetModal
        openDeleteSetModal={openDeleteSetModal}
        handleCloseDeleteSetModal={handleCloseDeleteSetModal}
        id={id}
        title={title}
      />
      <EditSetModal
        openEditSetModal={isOpenEditSetModal}
        handleCloseEditModal={handleCloseEditModal}
        idTopic={idTopic}
      />
    </div>
  );
};

export default StudyScreen;
