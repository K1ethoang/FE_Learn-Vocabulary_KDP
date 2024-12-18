import {
  ArrowLeftOutlined,
  ArrowRightOutlined,
  BlockOutlined,
  FormOutlined,
  ReadOutlined,
  SnippetsOutlined,
} from "@ant-design/icons";
import { Avatar, Button, Carousel, Skeleton } from "antd";
import React, { useRef, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import FlipCard from "../cards/FlipCard";
import ListWordComponent from "../words/ListWordComponent";
import data from "./../../assets/example_data/fake_data_word.json";
import { readWord } from "../../utils/ReadWord";
import { FaVolumeUp } from "react-icons/fa";
import AddWordModal from "../modals/AddWordModal";
import { MdOutlineDeleteOutline } from "react-icons/md";
import { IoBrushOutline } from "react-icons/io5";
import DeleteSetModal from "../modals/DeleteSetModal";

const StudyScreen = () => {
  const { id } = useParams();
  const carouselRef = useRef(null);
  const navigate = useNavigate();
  const [openAddWordModal, setOpenAddWordModal] = useState(false);
  const [idTopic, setIdTopic] = useState(0);
  const location = useLocation();
  const { author } = location.state;
  const [openDeleteSetModal, setOpenDeleteSetModal] = useState(false);

  const handleNext = () => {
    // Call the next method of the Carousel
    if (carouselRef.current) {
      carouselRef.current.next();
    }
  };
  const handlePrev = () => {
    // Call the next method of the Carousel
    if (carouselRef.current) {
      carouselRef.current.prev();
    }
  };

  const accessFlashcard = () => {
    navigate(`/flashcard/${id}`);
  };
  const accessLearn = () => {
    navigate(`/learn/${id}`);
  };

  const accessTest = () => {
    navigate(`/test/${id}`);
  };

  const handleAddWord = () => {
    setOpenAddWordModal(true);
    setIdTopic(id);
  };

  const handleCloseModal = () => {
    setOpenAddWordModal(false);
  };

  const handleEditSet = () => {
    navigate(`/edit-set/${id}`, { state: { id } });
  };

  const handleDeleteSet = () => {
    setOpenDeleteSetModal(true);
  };
  const handleCloseDeleteSetModal = () => {
    setOpenDeleteSetModal(false);
  };

  return (
    <div className="m-6">
      <div className="text-2xl font-bold ">Title of Course id: {id}</div>

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

      <div>
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
      </div>

      <div className="w-5/6 mx-auto my-6 flex items-center justify-between">
        <div className="flex items-center">
          <Avatar size="large" style={{ backgroundColor: "gray" }}>
            {author?.charAt(0).toUpperCase()}
          </Avatar>
          <div className="flex flex-col items-start ml-2">
            <span className="text-gray text-sm">Tạo bởi</span>
            <span className="text-lg text-purple uppercase font-semibold ">
              {author}
            </span>
          </div>
        </div>

        <div className="flex">
          <div
            className="w-9 h-9 flex items-center justify-center rounded-lg bg-bg-light hover:bg-gray-light cursor-pointer mr-4"
            style={{ border: "1px solid gray" }}
            onClick={handleEditSet}
          >
            <IoBrushOutline size={22} />
          </div>
          <div
            className="w-9 h-9 flex items-center justify-center rounded-lg bg-bg-light hover:bg-gray-light cursor-pointer "
            style={{ border: "1px solid gray" }}
            onClick={handleDeleteSet}
          >
            <MdOutlineDeleteOutline size={22} />
          </div>
        </div>
      </div>

      <div className="m-14">
        <div className="flex items-center justify-between">
          <span className="text-xl font-bold">
            Thuật ngữ trong học phần này
          </span>
        </div>
        <div className="mt-5 ">
          <ListWordComponent />
        </div>
      </div>
      <AddWordModal
        openAddWordModal={openAddWordModal}
        handleCloseModal={handleCloseModal}
        idTopic={idTopic}
      />
      <DeleteSetModal
        openDeleteSetModal={openDeleteSetModal}
        handleCloseDeleteSetModal={handleCloseDeleteSetModal}
        data={id}
      />
    </div>
  );
};

export default StudyScreen;
