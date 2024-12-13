import { Alert, Button, Modal, Space } from "antd";
import React, { useState } from "react";
import { FaRegEye } from "react-icons/fa";
import { MdDeleteOutline } from "react-icons/md";
import { Link, useLocation, useNavigate } from "react-router-dom";
import ProfileModal from "../../modals/ProfileModal";
import DeleteModal from "../../modals/DeleteModal";

const users = [
  {
    initials: "GS",
    name: "Grant Siders (you)",
    email: "gsiders@heliacare.com",
    role: "Super Admin",
    status: "",
  },
  {
    initials: "SS",
    name: "Scott Stewart",
    email: "scott@heliacare.com",
    role: "Client Account Manager",
    status: "",
  },
  {
    initials: "JD",
    name: "Jane Doe",
    email: "jane@heliacare.com",
    role: "Client Account Manager (Admin)",
    status: "",
  },
  {
    initials: "DM",
    name: "Dillon Morris",
    email: "dillon@heliacare.com",
    role: "",
    status: "INVITATION PENDING",
  },
  {
    initials: "JH",
    name: "Jamie Hollis",
    email: "jamie@heliacare.com",
    role: "",
    status: "INVITATION PENDING",
  },
  {
    initials: "KS",
    name: "Kingston Stewart",
    email: "king@heliacare.com",
    role: "",
    status: "INVITATION PENDING",
  },
  {
    initials: "JT",
    name: "Jeff Thomas",
    email: "jeff@heliacare.com",
    role: "",
    status: "INVITATION PENDING",
  },
  {
    initials: "JH",
    name: "Jamie Hollis",
    email: "jamie@heliacare.com",
    role: "",
    status: "INVITATION PENDING",
  },
];

const AdminScreen = () => {
  const [openViewModal, setOpenViewModal] = useState(false);
  const handleViewUser = () => {
    setOpenViewModal(true);
  };
  const handleCloseViewModal = () => {
    setOpenViewModal(false);
  };

  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const handleDeleteModal = () => {
    console.log("check");
    setOpenDeleteModal(true);
  };
  const handleCloseDeleteModal = () => {
    setOpenDeleteModal(false);
  };
  // const navigate = useNavigate();
  // const showModal = () => {
  //   setOpen(true);
  // };
  // const handleOk = () => {
  //   setOpen(false);
  // };

  // const handleCancel = () => {
  //   setOpen(false);
  // };

  return (
    <div className="p-8">
      <div className="flex justify-between items-center mb-4 ">
        <h1 className="text-2xl font-semibold">Quản lí người dùng</h1>
        <button className="bg-blue text-bg-light hover:bg-[#5cc3ff] px-4 py-2 rounded flex items-center">
          <i className="fas fa-user-plus mr-2"></i> Thêm người dùng
        </button>
      </div>
      <p className="text-gray mb-4">Tổng người dùng: 50</p>
      <div className="bg-[#fff] shadow rounded-lg">
        <div className="grid grid-cols-12 gap-4 p-4 border-b">
          <div className="col-span-3 font-semibold text-gray-600">
            Tên người dùng
          </div>
          <div className="col-span-5 font-semibold text-gray-600">Email</div>
          <div className="col-span-3 font-semibold text-gray-600">
            Loại vai trò
          </div>
          <div className="col-span-1 font-semibold text-gray-600">
            Chức năng
          </div>
        </div>
        {users.map((user, index) => (
          <div
            key={index}
            className="grid grid-cols-12 gap-4 p-4 border-b items-center"
          >
            <div className="col-span-3 flex items-center space-x-4">
              <div
                className={`h-10 w-10 rounded-full flex items-center justify-center text-white ${
                  user.status ? "bg-orange" : "bg-blue"
                }`}
              >
                {user.initials}
              </div>
              <span>{user.name}</span>
            </div>
            <div className="col-span-5 text-gray-600">{user.email}</div>
            <div
              className={`col-span-3 ${
                user.status ? "text-orange" : "text-gray"
              }`}
            >
              {user.status || user.role}
            </div>
            <div className="col-span-1 text-gray text-right flex items-center justify-between ">
              <FaRegEye
                onClick={handleViewUser}
                className="cursor-pointer"
                style={{ width: "26px", height: "26px", color: "blue" }}
              />
              <MdDeleteOutline
                onClick={handleDeleteModal}
                className="cursor-pointer"
                style={{ width: "26px", height: "26px", color: "orange" }}
              />
            </div>
          </div>
        ))}
      </div>
      <div className="flex justify-center items-center mt-4 space-x-2">
        <button className="text-gray-600 hover:underline mr-2">Quay lại</button>
        <button className="bg-gray text-bg-black px-3 py-1 rounded">1</button>
        <button className="text-gray-600 hover:underline">2</button>
        <button className="text-gray-600 hover:underline">3</button>
        <button className="text-gray-600 hover:underline">4</button>
        <button className="text-gray-600 hover:underline">5</button>
        <button className="text-gray-600 hover:underline ml-2">
          Trang tiếp
        </button>
      </div>
      <ProfileModal
        openViewModal={openViewModal}
        handleCloseViewModal={handleCloseViewModal}
      />
      <DeleteModal
        openDeleteModal={openDeleteModal}
        handleCloseDeleteModal={handleCloseDeleteModal}
      />
    </div>
  );
};

export default AdminScreen;
