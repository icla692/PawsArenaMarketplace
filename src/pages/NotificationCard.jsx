import React, { useState } from "react";

const NotificationCard = ({ showModal, modalMessage, modalType }) => {
  const [showModal, setShowModal] = useState(false);
  const [modalMessage, setModalMessage] = useState("");
  const [modalType, setModalType] = useState(""); // "success" or "error"

  const handleCloseModal = () => {
    setShowModal(false);
  };

  return (
    <>
      {showModal && (
        <div className={`fixed inset-0 z-50 flex items-center justify-center`}>
          <div
            className={`flex items-center flex-col text-white border p-2 rounded-lg ${
              modalType == "success" ? "bg-green-800" : "bg-red-500"
            }`}
          >
            <p>{modalMessage}</p>
            <button
              className="mt-2 w-[50px] bg-gray-200 text-gray-800 rounded px-1 py-1"
              onClick={handleCloseModal}
            >
              ok
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default NotificationCard;
