import React, { useState } from "react";
import { Button, Modal, Form } from "react-bootstrap";
import { database } from "../../firebase";

export default function UpdateFile({ currentFile }) {
  const [open, setOpen] = useState(false);
  const [name, setName] = useState(currentFile.name);
  const [id, setId] = useState(currentFile.id);
  function openModal() {
    setOpen(true);
  }

  function closeModal() {
    setOpen(false);
  }
  const onUpdate = () => {
    const db = database;
    db.files.doc(id).update({ ...currentFile, name: name });
    closeModal();
  };

  return (
    <div>
      <Button variant="light" onClick={openModal}>
        <svg
          width="15"
          height="16"
          viewBox="0 0 15 16"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fill-rule="evenodd"
            clip-rule="evenodd"
            d="M1.39894 9.70329C1.42812 9.60116 1.48285 9.50816 1.55795 9.43305L9.37045 1.62055C10.4775 0.513528 12.2723 0.513528 13.3793 1.62055C14.4864 2.72757 14.4864 4.52241 13.3793 5.62943L5.56683 13.4419C5.49173 13.517 5.39872 13.5718 5.29659 13.6009L0.921594 14.8509C0.703347 14.9133 0.46845 14.8524 0.307951 14.6919C0.147453 14.5314 0.0865845 14.2965 0.148941 14.0783L1.39894 9.70329ZM2.55635 10.2024L1.65991 13.34L4.79747 12.4435L10.8036 6.43744L8.56244 4.19633L2.55635 10.2024ZM9.44632 3.31244L11.6874 5.55356L12.4955 4.74555C13.1143 4.12668 13.1143 3.1233 12.4955 2.50443C11.8766 1.88557 10.8732 1.88557 10.2543 2.50443L9.44632 3.31244Z"
            fill="#717171"
          />
          <path
            d="M6.37495 14.875C6.37495 14.5298 6.65477 14.25 6.99995 14.25H13.25C13.5951 14.25 13.875 14.5298 13.875 14.875C13.875 15.2202 13.5951 15.5 13.25 15.5H6.99995C6.65477 15.5 6.37495 15.2202 6.37495 14.875Z"
            fill="#717171"
          />
        </svg>
        <span> Rename File</span>
      </Button>

      <Modal
        show={open}
        onHide={closeModal}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <div className="p-2 " style={{ fontWeight: "500" }}>
          Rename this file
        </div>
        <Form>
          <Modal.Body>
            <Form.Group>
              <Form.Label>Name of the Folder</Form.Label>
              <Form.Control
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </Form.Group>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="light" onClick={closeModal}>
              cancel
            </Button>
            <Button
              style={{
                background: "#008392"
              }}
              onClick={onUpdate}
            >
              Rename
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>
    </div>
  );
}
