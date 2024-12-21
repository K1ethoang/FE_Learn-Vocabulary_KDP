import { Avatar, Pagination, Spin } from "antd";
import React, { useEffect, useState } from "react";
import { FaRegEye } from "react-icons/fa";
import { MdDeleteOutline } from "react-icons/md";

import ProfileModal from "../../modals/user/ProfileModal";
import axiosConfig from "../../../services/axios/axiosConfig";
import { FiUser } from "react-icons/fi";
import DeleteUserModal from "../../modals/user/DeleteUserModal";

// const users = [
//   {
//     initials: "GS",
//     name: "Grant Siders (you)",
//     email: "gsiders@heliacare.com",
//     role: "Super Admin",
//     status: "",
//   },
//   {
//     initials: "SS",
//     name: "Scott Stewart",
//     email: "scott@heliacare.com",
//     role: "Client Account Manager",
//     status: "",
//   },
//   {
//     initials: "JD",
//     name: "Jane Doe",
//     email: "jane@heliacare.com",
//     role: "Client Account Manager (Admin)",
//     status: "",
//   },
//   {
//     initials: "DM",
//     name: "Dillon Morris",
//     email: "dillon@heliacare.com",
//     role: "",
//     status: "INVITATION PENDING",
//   },
//   {
//     initials: "JH",
//     name: "Jamie Hollis",
//     email: "jamie@heliacare.com",
//     role: "",
//     status: "INVITATION PENDING",
//   },
//   {
//     initials: "KS",
//     name: "Kingston Stewart",
//     email: "king@heliacare.com",
//     role: "",
//     status: "INVITATION PENDING",
//   },
//   {
//     initials: "JT",
//     name: "Jeff Thomas",
//     email: "jeff@heliacare.com",
//     role: "",
//     status: "INVITATION PENDING",
//   },
//   {
//     initials: "JH",
//     name: "Jamie Hollis",
//     email: "jamie@heliacare.com",
//     role: "",
//     status: "INVITATION PENDING",
//   },
// ];

const AdminScreen = () => {
  const [users, setUsers] = useState([]);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const getUsers = async () => {
    setLoading(true);
    try {
      const res = await axiosConfig.get("/users");
      console.log(res.data);
      if (res.data?.statusCode === 200) {
        setUsers(res.data?.result);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    getUsers();
  }, []);

  const [openViewModal, setOpenViewModal] = useState(false);
  const handleViewUser = (user) => {
    setUser(user);
    setOpenViewModal(true);
  };
  const handleCloseViewModal = () => {
    setOpenViewModal(false);
  };

  const [openDeleteUserModal, setOpenDeleteUserModal] = useState(false);
  const handleDeleteModal = (user) => {
    setOpenDeleteUserModal(true);
    setUser(user);
  };
  const handleCloseDeleteUserModal = () => {
    setOpenDeleteUserModal(false);
  };

  return (
    <div className="p-8">
      <div className="flex justify-between items-center mb-4 ">
        <h1 className="text-2xl font-semibold">Quản lí người dùng</h1>
      </div>
      <p className="text-gray mb-4">Tổng người dùng: {users.length}</p>
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

        {loading ? (
          <Spin />
        ) : (
          users?.map((user, index) => (
            <div
              key={index}
              className={`grid grid-cols-12 gap-4 p-4 border-b items-center`}
            >
              <div className="col-span-3 flex items-center space-x-4">
                <Avatar
                  className={`${
                    user.role === "ADMIN" ? "bg-[#ff1b1b]" : "bg-[#7223f9]"
                  }`}
                  src={user?.avatar}
                  shape="circle"
                >
                  {user?.avatar ? "" : user?.fullName?.charAt(0).toUpperCase()}
                </Avatar>
                <span
                  className={`${
                    user.role === "ADMIN" ? "text-[#ff1b1b]" : "text-[#7223f9]"
                  }`}
                >
                  {user.fullName}
                </span>
              </div>
              <div
                className={`col-span-5 ${
                  user.role === "ADMIN" ? "text-[#ff1b1b]" : "text-[#7223f9]"
                }`}
              >
                {user.email}
              </div>
              <div
                className={`col-span-3 ${
                  user.role === "ADMIN" ? "text-[#ff1b1b]" : "text-[#7223f9]"
                }`}
              >
                {user.role}
              </div>
              <div className="col-span-1 text-gray text-right flex items-center justify-between ">
                <div className="w-8 h-8 cursor-pointer bg-[#cde9ff] flex items-center justify-center rounded-lg">
                  <FiUser
                    onClick={() => handleViewUser(user)}
                    style={{ width: "24px", height: "24px", color: "#2580c5" }}
                  />
                </div>

                <div className="w-8 h-8 cursor-pointer bg-[#ffd9bc] flex items-center justify-center rounded-lg">
                  <MdDeleteOutline
                    onClick={() => handleDeleteModal(user)}
                    className="cursor-pointer"
                    style={{ width: "26px", height: "26px", color: "#ff8b31" }}
                  />
                </div>
              </div>
            </div>
          ))
        )}
      </div>
      <div className="flex justify-center items-center mt-4 space-x-2">
        <Pagination
          defaultCurrent={1}
          total={users.length}
          onChange={(e) => console.log(e)}
        />
      </div>
      <ProfileModal
        openViewModal={openViewModal}
        handleCloseViewModal={handleCloseViewModal}
        user={user}
      />
      <DeleteUserModal
        openDeleteUserModal={openDeleteUserModal}
        handleCloseDeleteUserModal={handleCloseDeleteUserModal}
        user={user}
        setUsers={setUsers}
      />
    </div>
  );
};

export default AdminScreen;
