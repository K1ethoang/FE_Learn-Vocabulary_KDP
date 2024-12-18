// import React, { useEffect, useState } from 'react';
// import { Avatar, Divider, List, Skeleton } from 'antd';
// import InfiniteScroll from 'react-infinite-scroll-component';
import { List } from "antd";
import data from "./../../assets/example_data/fake_data_word.json";
import { DeleteOutlined } from "@ant-design/icons";
import { readWord } from "../../utils/ReadWord";
import { FaVolumeUp } from "react-icons/fa";
import DeleteModal from "../modals/DeleteModal";
import { useState } from "react";
import { MdOutlineEdit } from "react-icons/md";
import EditWordModal from "../modals/word/EditWordModal";
const ListWordComponent = () => {
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [word, setWord] = useState("");
  const [item, setItem] = useState("");
  const [isOpenEditModal, setIsOpenEditSetModal] = useState(false);
  const handleCloseDeleteModal = () => {
    setOpenDeleteModal(false);
  };

  const handleDeleteWord = (word) => {
    setOpenDeleteModal(true);
    setWord(word);
  };

  const handleEditWord = (item) => {
    setIsOpenEditSetModal(true);
    setItem(item);
    console.log("item", item);
  };

  const handleCloseModal = () => {
    setIsOpenEditSetModal(false);
  };

  //   const [loading, setLoading] = useState(false);
  //   const [data, setData] = useState({});

  //   const loadMoreData = () => {
  //     if (loading) {
  //       return;
  //     }
  //     setLoading(true);
  //     fetch('https://randomuser.me/api/?results=10&inc=name,gender,email,nat,picture&noinfo')
  //       .then((res) => res.json())
  //       .then((body) => {
  //         setData([...data, ...body.results]);
  //         setLoading(false);
  //       })
  //       .catch(() => {
  //         setLoading(false);
  //       });
  //   };
  //   useEffect(() => {
  //     loadMoreData();
  //   }, []);
  return (
    // <div
    //   id="scrollableDiv"
    //   style={{
    //     height: 800,
    //     overflow: 'auto',
    //     padding: '0 16px',
    //     // border: '1px solid rgba(140, 140, 140, 0.35)',
    //   }}
    // >
    //   {/* <InfiniteScroll
    //     dataLength={data.length}
    //     next={loadMoreData}
    //     hasMore={data.length < 50}
    //     loader={
    //       <Skeleton
    //         avatar
    //         paragraph={{
    //           rows: 1,
    //         }}
    //         active
    //       />
    //     }
    //     endMessage={<Divider plain>It is all, nothing more 🤐</Divider>}
    //     scrollableTarget="scrollableDiv"
    //   > */}
    <>
      <List
        size="small"
        bordered
        dataSource={data}
        renderItem={(item) => (
          <List.Item key={item.word}>
            <div className="w-full max-h-fit  flex items-center justify-between ">
              <div className="flex flex-col items-start ">
                <span className="font-bold text-base">{item.word}</span>
                <span className="text-gray">{item.phonetic}</span>
                <span className="">Ví dụ: He is handsome!!!</span>
              </div>

              <div>
                <span>{item.meaning}</span>
              </div>

              <div className="flex w-30 items-center justify-around">
                <FaVolumeUp
                  style={{
                    fontSize: "22px",
                    cursor: "pointer",
                    color: "gray",
                    marginRight: 10,
                  }}
                  onClick={() => readWord(item.word)}
                />
                <MdOutlineEdit
                  style={{
                    fontSize: "22px",
                    cursor: "pointer",
                    marginRight: 10,
                    color: "blue",
                  }}
                  onClick={() => handleEditWord(item)}
                />
                <DeleteOutlined
                  style={{
                    fontSize: "22px",
                    cursor: "pointer",
                    color: "#f35757",
                  }}
                  onClick={() => handleDeleteWord(item.word)}
                />
              </div>
            </div>
          </List.Item>
        )}
      />

      <DeleteModal
        openDeleteModal={openDeleteModal}
        handleCloseDeleteModal={handleCloseDeleteModal}
        word={word}
      />

      <EditWordModal
        openEditWordModal={isOpenEditModal}
        handleCloseModal={handleCloseModal}
        data={item}
      />
    </>
    //   {/* </InfiniteScroll> */}
    // </div>
  );
};

export default ListWordComponent;
