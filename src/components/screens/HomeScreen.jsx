import { Carousel, Col, Empty, notification, Row, Spin } from "antd";
import React, { useEffect, useState } from "react";
import MemoryCard from "../cards/MemoryCard";
import "./HomeScreen.css";
import axiosConfig from "../../services/axios/axiosConfig";
import TopicComponent from "../cards/TopicComponent";
import SplashScreen from "./SplashScreen";

const HomeScreen = () => {
  const token = localStorage.getItem("token");
  const [topics, setTopics] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [api, contextHolder] = notification.useNotification([]);
  // const [showSplash, setShowSplash] = useState(true);
  // const handleSplashScreen = () => {
  //   setShowSplash(false);
  // };

  const openNotification = (placement, message) => {
    api.info({
      message: `${message}`,
      placement,
    });
  };

  const getAllTopic = async () => {
    try {
      const res = await axiosConfig.get(
        "/topics?pageNo=0&pageSize=500&sortBy=updatedAt"
      );

      setTopics(res.data?.result?.content);
    } catch (error) {
      openNotification(
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

  // if (showSplash) {
  //   return <SplashScreen onFinish={handleSplashScreen} />;
  // }

  if (isLoading) {
    return (
      <Spin size="large" className=" w-full flex items-center justify-center" />
    );
  }

  return (
    <div>
      {contextHolder}
      <div className="m-4">
        <span className="text-2xl font-bold">Gần đây</span>
        <Row className="mt-3" gutter={[16, 16]}>
          {topics && topics?.length > 0
            ? topics.map((topic, idx) => (
                <Col key={idx} span={8}>
                  <TopicComponent topic={topic} />
                </Col>
              ))
            : ""}
        </Row>
      </div>
    </div>
  );
};

export default HomeScreen;
