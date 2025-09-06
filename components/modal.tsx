"use client";

import React from "react";
import Modal from "react-modal";

type DeleteModalProps = {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  message?: string;
};

Modal.setAppElement("body");

const DeleteModal: React.FC<DeleteModalProps> = ({
  isOpen,
  onClose,
  onConfirm,
  message = "Are you sure you want to delete this?",
}) => {
  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onClose}
      style={{
        content: {
          top: "50%",
          left: "50%",
          right: "auto",
          bottom: "auto",
          transform: "translate(-50%, -50%)",
          padding: "20px",
          borderRadius: "10px",
          maxWidth: "400px",
          width: "90%",
        },
        overlay: {
          backgroundColor: "rgba(0, 0, 0, 0.08)",
          zIndex: 1000,

        },
      }}
    >
      <h2 className="text-lg font-semibold">Confirm Delete</h2>
      <p className="my-4">{message}</p>
      <div className="flex justify-end gap-3">
        <button
          onClick={onClose}
          className="px-4 py-2 rounded bg-gray-300 hover:bg-gray-400"
        >
          Cancel
        </button>
        <button
          onClick={onConfirm}
          className="px-4 py-2 rounded bg-red-600 text-white hover:bg-red-700"
        >
          Delete
        </button>
      </div>
    </Modal>
  );
};

export default DeleteModal;
