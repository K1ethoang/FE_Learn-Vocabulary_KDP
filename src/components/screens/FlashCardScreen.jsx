import React, { useRef, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import data from "./../../assets/example_data/fake_data_word.json";
import { Button, Carousel, Checkbox, Skeleton } from "antd";
import {
  ArrowLeftOutlined,
  ArrowRightOutlined,
  CloseSquareOutlined,
  SnippetsOutlined,
} from "@ant-design/icons";
import FlipCard from "./../cards/FlipCard";
import { FaVolumeUp } from "react-icons/fa";
import { readWord } from "../../utils/ReadWord";

const FlashCardScreen = () => {
  const { id } = useParams();
  const [count, setCount] = useState(1);
  const length = data.length;
  const navigate = useNavigate();
  const carouselRef = useRef(null);
  const handleNext = () => {
    // Call the next method of the Carousel
    if (carouselRef.current) {
      if (count < 50) {
        setCount(count + 1);
      }
      carouselRef.current.next();
    }
  };
  const handlePrev = () => {
    // Call the next method of the Carousel
    if (carouselRef.current) {
      carouselRef.current.prev();
    }
    if (count > 1) {
      setCount(count - 1);
    }
  };
  const goback = () => {
    navigate(-1);
  };

  const onChange = (e) => {
    console.log(`checked = ${e.target.checked}`);
  };

  return (
    <div className=" w-full min-h-screen bg-[#F0F8FF] flex flex-col">
      <div className=" w-full p-2 bg-[#3773eb] font-bold flex items-center justify-between ">
        <div className="text-[#fff] text-base p-2 rounded-md bg-[#1a4a8a] shadow-xl">
          Thẻ ghi nhớ
        </div>

        <div className="flex flex-col items-center">
          <span className="text-xl text-[#fff]">Title of Course id: {id}</span>
          <span className="text-xl text-center text-[#fff]">
            {count} / {length}
          </span>
        </div>

        <div
          className="w-10 h-10 flex items-center justify-center rounded-lg cursor-pointer hover:bg-[#3168d7] border text-[#fff]"
          onClick={goback}
        >
          X
        </div>
      </div>

      <div className="w-full flex-grow flex flex-col justify-center items-center ">
        <div className="w-full ">
          <Carousel dots={false} ref={carouselRef} infinite={false}>
            {data ? (
              data.map((item, idx) => {
                return (
                  <>
                    <div key={idx}>
                      <FlipCard item={item} />
                    </div>
                    <div className=" w-3/5  mt-3 mr-auto ml-auto flex justify-end">
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
                      <Checkbox
                        className="mr-20 text-orange  text-base"
                        c
                        onChange={onChange}
                      >
                        Đánh dấu chưa thuộc
                      </Checkbox>
                    </div>
                  </>
                );
              })
            ) : (
              <Skeleton />
            )}
          </Carousel>
        </div>

        <div className="flex w-3/5   justify-around ">
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
    </div>
  );
};

export default FlashCardScreen;
