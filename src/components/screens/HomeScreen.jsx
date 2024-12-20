import { Carousel, Col, Row } from "antd";
import React, { useEffect } from "react";
import MemoryCard from "../cards/MemoryCard";
import "./HomeScreen.css";
import axiosConfig from "../../services/axios/axiosConfig";
import axios from "axios";

const HomeScreen = () => {
  return (
    <div>
      <div className="m-4">
        <span className="text-2xl font-bold">Gần đây</span>
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

      <div className="m-4">
        <span className="text-2xl font-bold">Bộ thẻ ghi nhớ phổ biến</span>
        {/* <Row gutter={16}>
				<Col span={8}>
					<MemoryCard title='Testing' author='Admin' numVocabulary='20'/>
				</Col>
				<Col span={8}>
					<MemoryCard title='Testing' author='Admin' numVocabulary='20'/>
				</Col>
				<Col span={8}>
					<MemoryCard title='Testing' author='Admin' numVocabulary='20'/>
				</Col>
          	</Row> */}
        <Carousel draggable arrows infinite={false}>
          <div>
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

          <div>
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

          {/* <div className='flex justify-center'>
					<MemoryCard title='Testing' author='Admin' numVocabulary='20'/>
					<MemoryCard title='Testing' author='Admin' numVocabulary='20'/>
					<MemoryCard title='Testing' author='Admin' numVocabulary='20'/>
				</div> */}
        </Carousel>
      </div>
    </div>
  );
};

export default HomeScreen;
