import React, { useState } from "react";
import { Button, Modal, Form } from "react-bootstrap";
import { database } from "../../firebase";
import { useAuth } from "../../contexts/AuthContext";
import { ROOT_FOLDER } from "../../hooks/useFolder";

export default function AddFolderButton({ currentFolder }) {
  const [open, setOpen] = useState(false);
  const [name, setName] = useState("");
  const { currentUser } = useAuth();

  function openModal() {
    setOpen(true);
  }

  function closeModal() {
    setOpen(false);
  }

  function handleSubmit(e) {
    e.preventDefault();

    if (currentFolder == null) return;

    const path = [...currentFolder.path];
    if (currentFolder !== ROOT_FOLDER) {
      path.push({ name: currentFolder.name, id: currentFolder.id });
    }

    database.folders.add({
      name: name,
      parentId: currentFolder.id,
      userId: currentUser.uid,
      path: path,
      createdAt: database.getCurrentTimestamp()
    });
    setName("");
    closeModal();
  }

  return (
    <>
      <Button onClick={openModal} variant="outline-dark" size="sm">
        New Repo
      </Button>
      <Modal
        show={open}
        onHide={closeModal}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <div className="ml-2 mt-3 " style={{ fontWeight: "500" }}>
          <span style={{ color: "white" }}>o</span> Create a new Repo
        </div>
        <Form onSubmit={handleSubmit}>
          <Modal.Body>
            <Form.Group>
              <Form.Label>Name of the Repo</Form.Label>
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
              type="submit"
            >
              Create
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>
    </>
  );
}
