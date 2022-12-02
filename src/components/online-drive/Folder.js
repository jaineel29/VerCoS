import React from "react";
import { Link } from "react-router-dom";
import { Button, DropdownButton } from "react-bootstrap";
import UpdateFolder from "./UpdateFolder";
import { database } from "../../firebase";
import "./Folder.css";

export default function Folder({ folder }) {
  async function removeFolder(e) {
    await database.folders
      .where("name", "==", e.name)
      .get()
      .then((querySnapshot) => {
        querySnapshot.docs[0].ref.delete();
      });
  }

  const duplicateFolder = (e) => {
    database.folders.add(e);
  };

  return (
    <>
      <Button
        style={{
          backgroundColor: "#fff"
        }}
        to={{
          pathname: `/folder/${folder.id}`,
          state: { folder: folder }
        }}
        variant="outline-dark"
        className="w-100 drop"
        as={Link}
      >
        <div className=" ">
          {/* <svg
            width="66"
            viewBox="0 0 96 76"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M0.5 4C0.5 2.067 2.067 0.5 4 0.5H28.3431C29.2714 0.5 30.1616 0.868749 30.818 1.52513L38.4749 9.18198C39.3188 10.0259 40.4634 10.5 41.6569 10.5H92C93.933 10.5 95.5 12.067 95.5 14V72C95.5 73.933 93.933 75.5 92 75.5H4C2.06701 75.5 0.5 73.933 0.5 72V4Z"
              fill="#DDF1F3"
              stroke="#189EAE"
            />
          </svg> */}
        </div>

        <svg
          width="6"
          height="1"
          viewBox="0 0 246 1"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M0.836731 1C0.836731 0.447715 1.28445 0 1.83673 0H244.163C244.716 0 245.163 0.447715 245.163 1H0.836731Z"
            fill="#DBDBDB"
          />
        </svg>
        {folder.name}
      </Button>

      {/* footer */}
      <div
        class="d-flex justify-content-centre align-item-centre"
        state={{
          position: "absolute",
          width: "226px",
          height: "24px ",
          left: "16px",
          bottom: "16px",

          color: "#2B2B2B"
        }}
      >
        <div>
          <DropdownButton>
            <UpdateFolder currentFolder={folder} />

            <Button variant="light" onClick={() => duplicateFolder(folder)}>
              <svg
                width="14"
                height="18"
                viewBox="0 0 14 18"
                fill="none"
                color="red"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fill-rule="evenodd"
                  clip-rule="evenodd"
                  d="M3.25 2.12502C2.21447 2.12502 1.375 2.96448 1.375 4.00002V14C1.375 15.0356 2.21447 15.875 3.25 15.875H10.75C11.7855 15.875 12.625 15.0356 12.625 14V6.7589L7.99112 2.12502H3.25ZM0.125 4.00002C0.125 2.27413 1.52411 0.875018 3.25 0.875018H8.25C8.41576 0.875018 8.57473 0.940866 8.69194 1.05808L13.6919 6.05808C13.8092 6.17529 13.875 6.33426 13.875 6.50002V14C13.875 15.7259 12.4759 17.125 10.75 17.125H3.25C1.52411 17.125 0.125 15.7259 0.125 14V4.00002Z"
                  fill="#717171"
                />
                <path
                  fill-rule="evenodd"
                  clip-rule="evenodd"
                  d="M8.01082 0.922594C8.24437 0.825855 8.51319 0.879328 8.69194 1.05808L13.6919 6.05808C13.8707 6.23683 13.9242 6.50565 13.8274 6.7392C13.7307 6.97274 13.5028 7.12502 13.25 7.12502H10.75C9.02411 7.12502 7.625 5.72591 7.625 4.00002V1.50002C7.625 1.24723 7.77728 1.01933 8.01082 0.922594ZM8.875 3.0089V4.00002C8.875 5.03555 9.71447 5.87502 10.75 5.87502H11.7411L8.875 3.0089Z"
                  fill="#717171"
                />
              </svg>
              <span> Duplicate Repository</span>{" "}
            </Button>

            <Button
              variant="light"
              bo="none"
              onClick={() => removeFolder(folder)}
            >
              <svg
                width="18"
                height="18"
                viewBox="0 0 18 18"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fill-rule="evenodd"
                  clip-rule="evenodd"
                  d="M6.5 0.25C5.46447 0.25 4.625 1.08947 4.625 2.125V2.75H2.125H1.4406H0.875C0.529822 2.75 0.25 3.02982 0.25 3.375C0.25 3.72018 0.529822 4 0.875 4H1.55424L2.54587 14.9079C2.6922 16.5175 4.04178 17.75 5.65804 17.75H12.342C13.9582 17.75 15.3078 16.5175 15.4541 14.9079L16.4458 4H17.125C17.4702 4 17.75 3.72018 17.75 3.375C17.75 3.02982 17.4702 2.75 17.125 2.75L16.5594 2.75H15.875H13.375V2.125C13.375 1.08947 12.5355 0.25 11.5 0.25H6.5ZM12.125 2.75V2.125C12.125 1.77982 11.8452 1.5 11.5 1.5H6.5C6.15482 1.5 5.875 1.77982 5.875 2.125V2.75H12.125ZM5.25 4H2.8094L3.79074 14.7948C3.87853 15.7605 4.68828 16.5 5.65804 16.5H12.342C13.3117 16.5 14.1215 15.7605 14.2093 14.7948L15.1906 4H12.75H5.25ZM7.75 6.5C7.75 6.15482 7.47018 5.875 7.125 5.875C6.77982 5.875 6.5 6.15482 6.5 6.5V12.75C6.5 13.0952 6.77982 13.375 7.125 13.375C7.47018 13.375 7.75 13.0952 7.75 12.75V6.5ZM10.875 5.875C11.2202 5.875 11.5 6.15482 11.5 6.5V12.75C11.5 13.0952 11.2202 13.375 10.875 13.375C10.5298 13.375 10.25 13.0952 10.25 12.75V6.5C10.25 6.15482 10.5298 5.875 10.875 5.875Z"
                  fill="#D33852"
                />
              </svg>

              <span> Delete Repository</span>
            </Button>
          </DropdownButton>
        </div>
      </div>
    </>
  );
}
