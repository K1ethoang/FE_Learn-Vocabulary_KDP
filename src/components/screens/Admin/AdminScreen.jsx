import { Pagination } from "antd";
import React, { useState } from "react";
import { FaRegEye } from "react-icons/fa";
import { MdDeleteOutline } from "react-icons/md";

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
  const [user, setUser] = useState(null);
  const handleViewUser = () => {
    setOpenViewModal(true);
  };
  const handleCloseViewModal = () => {
    setOpenViewModal(false);
  };

  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const handleDeleteModal = (user) => {
    console.log("check");
    setOpenDeleteModal(true);
    setUser(user);
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
                onClick={() => handleDeleteModal(user)}
                className="cursor-pointer"
                style={{ width: "26px", height: "26px", color: "orange" }}
              />
            </div>
          </div>
        ))}
      </div>
      <div className="flex justify-center items-center mt-4 space-x-2">
        <Pagination
          defaultCurrent={1}
          total={50}
          onChange={(e) => console.log(e)}
        />
      </div>
      <ProfileModal
        openViewModal={openViewModal}
        handleCloseViewModal={handleCloseViewModal}
      />
      <DeleteModal
        openDeleteModal={openDeleteModal}
        handleCloseDeleteModal={handleCloseDeleteModal}
        word={user}
      />
    </div>
  );
};

export default AdminScreen;
