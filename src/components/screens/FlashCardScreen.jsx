import React, { useEffect, useRef, useState } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
// import data from "./../../assets/example_data/fake_data_word.json";
import {
  Button,
  Carousel,
  Checkbox,
  Dropdown,
  Select,
  Skeleton,
  Space,
  Spin,
} from "antd";
import {
  ArrowLeftOutlined,
  ArrowRightOutlined,
  DownOutlined,
} from "@ant-design/icons";
import FlipCard from "./../cards/FlipCard";
import { FaVolumeUp } from "react-icons/fa";
import { readWord } from "../../utils/ReadWord";
import EmtySets from "../exceptions/EmtySets";
import axiosConfig from "../../services/axios/axiosConfig";

const FlashCardScreen = () => {
  const { id } = useParams();
  const location = useLocation();
  const { title } = location.state;
  const [count, setCount] = useState(1);
  const [data, setData] = useState([]);
  const length = data.length;
  const navigate = useNavigate();
  const carouselRef = useRef(null);
  const [isLoading, setIsLoading] = useState(true);
  const [mode, setMode] = useState("all");
  const [wordsNoRemember, setWordsNoRemember] = useState([]);

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
    getAllWordOfTopic();
  }, []);

  console.log("data", data);
  const handleNext = () => {
    // Call the next method of the Carousel
    if (carouselRef.current) {
      if (count < filteredData.length) {
        setCount(count + 1);
      } else {
        alert("next: ", count);
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

  const handleChange = (value) => {
    getAllWordOfTopic();
    if (value === "some") {
      setWordsNoRemember(data.filter((d) => !d?.hasRemembered));
      setMode("some");
      setCount(1);
    } else {
      setMode("all");
      setCount(1);
    }
    console.log(`selected ${value}`);
  };

  useEffect(() => {
    if (mode === "some") {
      setWordsNoRemember(data.filter((d) => !d?.hasRemembered));
      setCount(1);
    } else {
      setCount(1);
    }
  }, [data, mode]);

  const updateWord = async (remembered, item) => {
    try {
      const newWord = {
        name: item?.name,
        pronounce: item?.pronounce,
        meaning: item?.meaning,
        example: item?.example,
        hasRemembered: remembered,
      };
      const res = await axiosConfig.put(
        `topics/${id}/words/${item?.id}`,
        newWord
      );
      console.log("res:", res?.data);
    } catch (error) {
      console.log("error:", error);
    }
  };
  const handleCheckboxChange = (e, item) => {
    console.log("checked:", e.target.checked, "item:", item);
    if (item?.hasRemembered !== e.target.checked) {
      updateWord(e.target.checked, item);
    }
  };

  if (isLoading) {
    return <Spin className="w-full flex justify-between" />;
  }

  const filteredData = mode === "all" ? data : wordsNoRemember;

  console.log("no rem", wordsNoRemember);

  return (
    <div className="w-full min-h-screen bg-[#F0F8FF] flex flex-col">
      <div className="w-full p-2 bg-[#3773eb] font-bold flex items-center justify-between">
        <div className="text-[#fff] text-base p-2 rounded-md bg-[#2a57af] shadow-xl mr-3">
          <Select
            style={{
              width: 170,
              fontFamily: "Arial, sans-serif",
              fontSize: 16,
              fontWeight: "bold",
              color: "#444",
            }}
            className="text-base font-semibold"
            defaultValue="Tất cả từ vựng"
            onChange={handleChange}
            options={[
              {
                value: "all",
                label: "Tất cả từ vựng",
              },
              {
                value: "some",
                label: "Từ vựng chưa thuộc",
              },
            ]}
          />
        </div>

        <div className="flex flex-col items-center">
          <span className="text-xl text-[#fff]">Học phần {title}</span>
          <span className="text-xl text-center text-[#fff]">
            {count} / {filteredData.length}
          </span>
        </div>

        <div
          className="w-10 h-10 flex items-center justify-center rounded-lg cursor-pointer hover:bg-[#3168d7] border text-[#fff]"
          onClick={goback}
        >
          X
        </div>
      </div>

      {filteredData.length === 0 ? (
        <div className="w-full mt-3">
          <EmtySets
            message={
              mode === "all"
                ? "Bạn chưa có từ vựng nào trong học phần này!"
                : "Bạn chưa có từ vựng chưa thuộc"
            }
          />
        </div>
      ) : (
        <div className="w-full flex-grow flex flex-col justify-center items-center">
          <div className="w-full">
            <Carousel dots={false} ref={carouselRef} infinite={false}>
              {filteredData.map((item, idx) => (
                <div key={idx}>
                  <FlipCard item={item} />
                  <div className="w-3/5 mt-3 mr-auto ml-auto flex justify-end">
                    <FaVolumeUp
                      style={{
                        fontSize: "25px",
                        cursor: "pointer",
                        color: "#b1b1b1",
                        marginRight: 20,
                        zIndex: 100,
                      }}
                      onClick={() => readWord(item.name)}
                    />
                    {mode === "some" ? (
                      <Checkbox
                        className="mr-20 text-orange text-base"
                        onChange={(e) => handleCheckboxChange(e, item)}
                      >
                        Đánh dấu đã thuộc
                      </Checkbox>
                    ) : null}
                  </div>
                </div>
              ))}
            </Carousel>
          </div>

          <div className="flex w-3/5 justify-around">
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
      )}
    </div>
  );
};

export default FlashCardScreen;
