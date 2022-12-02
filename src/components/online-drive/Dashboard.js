import React, { useState } from "react";
import { Nav, Navbar } from "react-bootstrap";
import { useFolder } from "../../hooks/useFolder";
import AddFolderButton from "./AddFolderButton";
import AddFileButton from "./AddFileButton";
import Folder from "./Folder";
import File from "./File";
import { AppBar, makeStyles, Container } from "@material-ui/core";

import "./Dashboard.css";
import FolderBreadcrumbs from "./FolderBreadcrumbs";
import { useParams, useLocation, Link } from "react-router-dom";
import { ReactComponent as SearchLogo } from "../../assets/SearchO.svg";

const useStyles = makeStyles({
  grid: {
    marginTop: 20
  },
  card: {
    maxWidth: 210,
    height: 300
  },
  media: {
    height: 200
  }
});

export default function Dashboard(props) {
  const { folderId } = useParams();
  const { state = {} } = useLocation();
  const { folder, childFolders, childFiles } = useFolder(
    folderId,
    state.folder
  );

  const BarStyling = {
    width: "20rem",
    background: "#FFFFFF",
    border: "none",
    padding: "0.5rem",
    outline: "none"
  };
  //for search bar
  const [search, setSearch] = useState("");
  const classes = useStyles();

  return (
    <div>
      <AppBar
        bg="white"
        className="p-1 mb-5  justify-content-centre align-items-centre"
      >
        <Navbar expanded="lg" bg="white" className="">
          <Navbar.Brand as={Link} to="/">
            {/* Logo  */}
            <span style={{ color: "white" }}> mi </span>
            {/* <svg
              class="HamburgerMenu-logo___32jle"
              xmlns="http://www.w3.org/2000/svg"
              width="50"
              height=""
              viewBox="0 0 164 56"
            >
              <g fill="none" fill-rule="nonzero">
                <path
                  fill="#FF5869"
                  d="M8.597 1.314C-2.867 7.933-2.865 47.647 8.6 54.266c11.462 6.617 45.848-13.236 45.849-26.471 0-13.237-34.388-33.099-45.852-26.48zm18.02 33.43c.199-.01.398-.033.594-.07a2.44 2.44 0 0 1 .437-.035 1.374 1.374 0 0 1 1.432 1.433 1.586 1.586 0 0 1-.908 1.398 4.057 4.057 0 0 1-1.835.42c-3.966 0-4.84-2.464-4.84-5.382v-7.094h-1.223c-1.433 0-1.677-1.014-1.677-1.52 0-.507.244-1.52 1.677-1.52h1.223v-2.621c0-1.748 1.223-2.062 1.835-2.062.629 0 1.834.314 1.834 2.062v2.62h2.342c1.433 0 1.677 1.014 1.677 1.52 0 .507-.244 1.52-1.677 1.52h-2.342v7.06c.018 1.485.525 2.271 1.45 2.271z"
                ></path>
                <path
                  fill="#797979"
                  d="M75.748 37.955c-4.034 0-4.924-2.477-4.924-5.4V25.44h-1.238c-1.461 0-1.716-1.016-1.716-1.524 0-.509.255-1.525 1.716-1.525h1.238v-2.637c0-1.746 1.24-2.064 1.874-2.064.636 0 1.875.318 1.875 2.064v2.637h2.382c1.461 0 1.715 1.016 1.715 1.525 0 .508-.254 1.524-1.715 1.524h-2.382v7.084c0 1.493.508 2.287 1.46 2.287.203-.01.405-.03.604-.064.147-.022.296-.033.445-.032a1.391 1.391 0 0 1 1.461 1.43 1.554 1.554 0 0 1-.921 1.397 4.287 4.287 0 0 1-1.874.413zm12.801.127c-4.606 0-8.29-3.335-8.29-8.131 0-4.797 3.684-8.005 8.29-8.005 4.606 0 8.29 3.208 8.29 8.005 0 4.796-3.684 8.131-8.29 8.131zm0-13.023c-3.018 0-4.415 2.51-4.415 4.892 0 2.382 1.397 4.955 4.415 4.955s4.415-2.573 4.415-4.955c0-2.383-1.397-4.892-4.415-4.892zm25.666 12.865c-.572 0-1.81-.286-1.81-2.002v-.571h-.064c-1.049 1.747-3.113 2.731-5.241 2.731-4.638 0-7.497-3.684-7.497-8.131 0-4.51 3.05-8.005 7.401-8.005 2.795 0 4.32 1.398 5.114 2.383h.095v-8.863c0-1.81 1.271-2.128 1.906-2.128.636 0 1.906.318 1.906 2.128v20.456c0 1.716-1.239 2.002-1.81 2.002zm-6.353-3.018c2.795 0 4.479-2.51 4.479-4.892 0-2.382-1.684-4.955-4.48-4.955-2.953 0-4.383 2.51-4.383 4.892 0 2.382 1.43 4.955 4.384 4.955zm26.491 3.018c-.571 0-1.81-.286-1.81-2.002v-.571h-.064c-1.048 1.747-3.113 2.731-5.24 2.731-4.638 0-7.497-3.684-7.497-8.131 0-4.51 3.05-8.005 7.4-8.005 2.796 0 4.32 1.398 5.115 2.383h.095v-8.863c0-1.81 1.27-2.128 1.906-2.128.635 0 1.906.318 1.906 2.128v20.456c0 1.716-1.239 2.002-1.81 2.002zM128 34.906c2.796 0 4.48-2.51 4.48-4.892 0-2.382-1.684-4.955-4.48-4.955-2.954 0-4.383 2.51-4.383 4.892 0 2.382 1.43 4.955 4.383 4.955zm12.865-19.44c0-1.81 1.27-2.128 1.906-2.128.635 0 1.906.318 1.906 2.128v20.33c0 1.81-1.27 2.128-1.906 2.128-.635 0-1.906-.318-1.906-2.129V15.466zm11.372 15.755c.158 2.16 2.128 3.748 4.351 3.748 1.589 0 2.541-.508 3.494-1.302.54-.445.89-.54 1.303-.54a1.468 1.468 0 0 1 1.524 1.525 1.938 1.938 0 0 1-.635 1.366c-1.493 1.43-3.208 2.064-5.654 2.064-4.701 0-8.195-3.017-8.195-7.972 0-4.924 3.462-8.164 8.068-8.164 3.685 0 6.67 2.097 7.274 6.575.035.264.056.529.064.794 0 1.334-.731 1.906-2.002 1.906h-9.592zm7.814-2.731c0-1.97-1.112-3.685-3.59-3.685-2.255 0-4.066 1.556-4.224 3.685h7.814z"
                ></path>
              </g>
            </svg> */}
          </Navbar.Brand>
          <Nav>
            <FolderBreadcrumbs currentFolder={folder} />
          </Nav>

          <Navbar.Collapse className="justify-content-end">
            <Navbar.Text>
              <Link to="/user">Your Profile</Link>
            </Navbar.Text>
            <span style={{ color: "white" }}>mi</span>
          </Navbar.Collapse>
        </Navbar>
      </AppBar>

      <div className="Middle h-100 m-5 p-3">
        <Navbar>
          <Container>
            <Navbar.Brand>
              {" "}
              {childFolders.length} Repostories
              {/* {childFiles.length} Files */}
            </Navbar.Brand>
            <Navbar.Toggle />
            <Navbar.Collapse className="justify-content-end align-items-centre">
              <div className="">
                {/* {folder.name !== "Root" && ( */}
                <AddFileButton currentFolder={folder} />
                {/* )} */}
                <span> </span>
                {/* {folder.name === "Root" && ( */}
                <AddFolderButton currentFolder={folder} />
                {/* )}  */}
              </div>
            </Navbar.Collapse>
          </Container>
        </Navbar>

        <hr />

        {/* searchbar */}
        <div
          className="d-flex align-items-center "
          style={{
            borderRadius: "5px"
          }}
        >
          <SearchLogo style={{ marginLeft: "10px" }} />
          <input
            style={BarStyling}
            key="random1"
            value={search}
            placeholder={"Search"}
            onChange={(e) => setSearch(e.target.value)}
          />
          <button
            style={{ marginRight: "10px" }}
            onClick={() => setSearch("")}
            style={{ border: "none", background: "#FFFFFF" }}
          >
            <svg
              width="15"
              height="15"
              viewBox="0 0 16 16"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M14.4331 0.683058C14.6771 0.438981 15.0729 0.438981 15.3169 0.683058C15.561 0.927136 15.561 1.32286 15.3169 1.56694L8.88388 8L15.3169 14.4331C15.561 14.6771 15.561 15.0729 15.3169 15.3169C15.0729 15.561 14.6771 15.561 14.4331 15.3169L8 8.88388L1.56694 15.3169C1.32286 15.561 0.927137 15.561 0.683059 15.3169C0.43898 15.0729 0.43898 14.6771 0.683059 14.4331L7.11612 8L0.683059 1.56694C0.438981 1.32286 0.438981 0.927136 0.683059 0.683058C0.927137 0.438981 1.32286 0.438981 1.56694 0.683058L8 7.11612L14.4331 0.683058Z"
                fill="#222222"
              />
            </svg>
          </button>
        </div>
        <hr />
        {childFolders.length > 0 && (
          <>
            {childFolders.length} Repos
            <br />
            <div className="">
              {childFolders
                .filter((val) => {
                  if (search == "") {
                    return val;
                  } else if (
                    val.name.toLowerCase().includes(search.toLowerCase())
                  ) {
                    return val;
                  }
                })
                .map((childFolder) => (
                  <div className="">
                    <div key={childFolder.id} style={{}} className="m-2">
                      <Folder folder={childFolder} />
                    </div>
                    <hr />
                  </div>
                ))}
            </div>
          </>
        )}
        {childFolders.length > 0 && childFiles.length > 0 && <hr />}
        {childFiles.length > 0 && (
          <>
            {childFiles.length} Files
            <hr />
            <div className="d-flex flex-wrap">
              {childFiles
                .filter((val) => {
                  if (search == "") {
                    return val;
                  } else if (
                    val.name.toLowerCase().includes(search.toLowerCase())
                  ) {
                    return val;
                  }
                })
                .map((childFile) => (
                  <div
                    key={childFile.id}
                    style={{ maxWidth: "250px" }}
                    className="p-2"
                  >
                    <File file={childFile} />
                  </div>
                ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
