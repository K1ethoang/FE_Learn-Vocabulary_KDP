import { List, Spin } from "antd";
import { readWord } from "../../utils/ReadWord";
import { FaVolumeUp } from "react-icons/fa";
import { useEffect, useState } from "react";
import { MdOutlineDeleteOutline } from "react-icons/md";
import EditWordModal from "../modals/word/EditWordModal";
import { LuPencilLine } from "react-icons/lu";
import DeleteWordModal from "../modals/word/DeleteWordModal";
const ListWordComponent = ({
  idTopic,
  data,
  isLoading,
  openNotification,
  setData,
}) => {
  const [openDeleteWordModal, setOpenDeleteWordModal] = useState(false);
  console.log("data", data);
  const [item, setItem] = useState("");

  const [isOpenEditModal, setIsOpenEditSetModal] = useState(false);
  const handleCloseDeleteWordModal = () => {
    setOpenDeleteWordModal(false);
  };

  const handleDeleteWord = (item) => {
    setOpenDeleteWordModal(true);
    setItem(item);
  };

  const handleEditWord = (item) => {
    setIsOpenEditSetModal(true);
    setItem(item);
  };

  const handleCloseModal = () => {
    setIsOpenEditSetModal(false);
  };

  useEffect(() => {}, []);

  if (isLoading && data?.length === 0) {
    return <Spin className="w-full flex items-center justify-center" />;
  }

  return (
    <>
      <List
        size="small"
        bordered
        dataSource={data}
        renderItem={(item) => (
          <List.Item key={item.name}>
            <div className="w-full max-h-fit p-1 flex items-center justify-between ">
              <div className="flex flex-col items-start ">
                <div className="flex items-center mb-2">
                  <span className="font-bold text-base">{item.name}</span>
                  <span className="text-gray ml-2">{item.pronounce}</span>
                  <div className="ml-1">
                    ({" "}
                    {item?.types?.map((type, idx) => (
                      <>
                        {idx !== 0 ? ", " : null}
                        <span key={idx} className="mr-1">
                          {type?.symbol}
                        </span>
                      </>
                    ))}
                    )
                  </div>
                  <div className="w-7 h-7 flex items-center justify-center rounded-lg ml-3 bg-[#88beff]">
                    <FaVolumeUp
                      style={{
                        fontSize: "16px",
                        cursor: "pointer",
                        color: "blue",
                      }}
                      onClick={() => readWord(item.name)}
                    />
                  </div>
                </div>

                <div className="flex flex-col items-start">
                  <span className="font-semibold">Định nghĩa:</span>
                  <span>{item.meaning}</span>
                </div>
                <span className="">
                  {item.example ? `Ví dụ: ${item.example}` : ""}
                </span>
              </div>

              <div className="flex w-30 items-center justify-around">
                <div className="w-8 h-8 rounded-lg flex items-center justify-center bg-[#9cffb9]">
                  <LuPencilLine
                    style={{
                      fontSize: "18px",
                      cursor: "pointer",
                      marginRight: 10,
                      color: "green",
                    }}
                    onClick={() => handleEditWord(item)}
                  />
                </div>

                <div className="w-8 h-8 rounded-lg flex items-center justify-center bg-[#ffb58b] ml-2">
                  <MdOutlineDeleteOutline
                    style={{
                      fontSize: "22px",
                      cursor: "pointer",
                      color: "red",
                    }}
                    onClick={() => handleDeleteWord(item)}
                  />
                </div>
              </div>
            </div>
          </List.Item>
        )}
      />

      <DeleteWordModal
        openDeleteWordModal={openDeleteWordModal}
        handleCloseDeleteWordModal={handleCloseDeleteWordModal}
        item={item}
        idTopic={idTopic}
        openNotification={openNotification}
        setData={setData}
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
