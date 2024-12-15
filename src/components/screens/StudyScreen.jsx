import {
  ArrowLeftOutlined,
  ArrowRightOutlined,
  BlockOutlined,
  FormOutlined,
  ReadOutlined,
  SnippetsOutlined,
} from "@ant-design/icons";
import { Button, Carousel, Skeleton } from "antd";
import React, { useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import FlipCard from "../cards/FlipCard";
import ListWordComponent from "../words/ListWordComponent";
import data from "./../../assets/example_data/fake_data_word.json";
import { readWord } from "../../utils/ReadWord";
import { FaVolumeUp } from "react-icons/fa";
import AddWordModal from "../modals/AddWordModal";

const StudyScreen = () => {
  const { id } = useParams();
  const carouselRef = useRef(null);
  const navigate = useNavigate();
  const [openAddWordModal, setOpenAddWordModal] = useState(false);
  const [idTopic, setIdTopic] = useState(0);

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
                <>
                  <div key={idx}>
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
                </>
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

      <div className="m-14">
        <div className="flex items-center justify-between">
          <span className="text-xl font-bold">
            Thuật ngữ trong học phần này
          </span>
          <Button onClick={handleAddWord}>Thêm từ vựng</Button>
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
    </div>
  );
};

export default StudyScreen;
