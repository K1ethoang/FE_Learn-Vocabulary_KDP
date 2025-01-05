import { Col, Row } from "antd";
import React from "react";
import { useLocation } from "react-router-dom";
import MemoryCard from "../cards/MemoryCard";

const SearchScreen = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const query = queryParams.get("query");
  return (
    <div className="m-4">
      <span className="text-2xl font-bold">Kết quả tìm kiếm: {query}</span>
      <Row gutter={16}>
        <Col span={8}>
          <MemoryCard title="Testing" author="Admin" numVocabulary="20" />
        </Col>
        <Col span={8}>
          <MemoryCard title="Testing" author="Admin" numVocabulary="20" />
        </Col>
        <Col span={8}>
          <MemoryCard title="Testing" author="Admin" numVocabulary="20" />
        </Col>
      </Row>
      <Row gutter={16}>
        <Col span={8}>
          <MemoryCard title="Testing" author="Admin" numVocabulary="20" />
        </Col>
        <Col span={8}>
          <MemoryCard title="Testing" author="Admin" numVocabulary="20" />
        </Col>
        <Col span={8}>
          <MemoryCard title="Testing" author="Admin" numVocabulary="20" />
        </Col>
      </Row>
    </div>
  );
};

export default SearchScreen;
