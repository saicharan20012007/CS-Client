import PropTypes from "prop-types";
import { styled, css } from "@mui/system";
import { Modal as BaseModal } from "@mui/base/Modal";
import Fade from "@mui/material/Fade";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import { Box, Divider, IconButton } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { useEffect, useState, forwardRef, Fragment } from "react";
import { editIndent } from "../../redux/indent/action";
import { useDispatch, useSelector } from "react-redux";
import { ToastContainer, toast } from "react-toastify";
import ClearIcon from "@mui/icons-material/Clear";
import ListSubheader from "@mui/material/ListSubheader";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import Collapse from "@mui/material/Collapse";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";

const labelStyles = {
  marginTop: "-0px",
};

export default function ViewModal({ indent }) {
  const dispatch = useDispatch();
  const { accessToken } = useSelector((store) => store.AuthReducer);
  const [open, setOpen] = useState(false);
  const [openList, setOpenList] = useState([]);
  const [timeDifference, setTimeDifference] = useState("");
  const [associatedTasks, setAssociatedTasks] = useState(
    indent.associatedTasks
  );

  function calculateTimeDifference(startDate, endDate) {
    if (!(startDate instanceof Date) || !(endDate instanceof Date)) {
      console.log(startDate, endDate);
      console.error("Invalid date objects");
      return;
    }
    const timeDifference = endDate.getTime() - startDate.getTime();

    const days = Math.floor(timeDifference / (1000 * 60 * 60 * 24));
    const hours = Math.floor(
      (timeDifference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
    );
    const minutes = Math.floor(
      (timeDifference % (1000 * 60 * 60)) / (1000 * 60)
    );
    const seconds = Math.floor((timeDifference % (1000 * 60)) / 1000);

    setTimeDifference(
      `${days} days,${hours} hours,${minutes} minutes,${seconds} seconds`
    );
  }

  const handleOpen = () => setOpen(true);

  const handleClose = () => setOpen(false);

  const handleClick = (index) => {
    let tempArr = [...openList];
    tempArr[index] = !tempArr[index];
    setOpenList(tempArr);
  };

  const deleteTask = (idx, taskIdx) => {
    if (associatedTasks.length == 1 && associatedTasks[idx].tasks.length == 1) {
      toast.error("Atleast one task should be associated with a material", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
    } else {
      let tempTaskArr = [...associatedTasks];
      if (tempTaskArr[idx].tasks.length == 1) {
        tempTaskArr.splice(idx, 1);
      } else {
        tempTaskArr[idx].tasks.splice(taskIdx, 1);
      }
      dispatch(
        editIndent(indent._id, { associatedTasks: tempTaskArr }, accessToken)
      ).then((res) => {
        if (res.type === "EDIT_INDENT_SUCCESS") {
          setAssociatedTasks(tempTaskArr);
        } else {
          toast.error("Unable to delete the task. Try later", {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "dark",
          });
        }
      });
    }
  };

  useEffect(() => {
    if (indent.hasOwnProperty("date")) {
      const startDate = new Date();
      const endDate = new Date(indent.date);
      calculateTimeDifference(startDate, endDate);
    }
    setOpenList(
      Array.from({ length: indent.associatedTasks.length }, () => false)
    );
  }, [indent]);
  useEffect(() => {}, [openList]);
  return (
    <div>
      <IconButton onClick={handleOpen}>
        <RemoveRedEyeIcon />
      </IconButton>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={open}
        onClose={handleClose}
        closeAfterTransition
        slots={{ backdrop: StyledBackdrop }}
      >
        <Fade in={open}>
          <ModalContent sx={style}>
            <IconButton
              sx={{ position: "absolute", right: 8, top: 8 }}
              onClick={handleClose}
            >
              <ClearIcon />
            </IconButton>

            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
              }}
            >
              <h2 style={{ marginBottom: "5px" }}>Material Details</h2>

              <div style={{ marginBottom: "-15px" }}>
                <span>Material Name*</span>
                <h4 id="transition-modal-title" style={labelStyles}>
                  {indent?.materialName}
                </h4>
              </div>
              <div style={{ marginBottom: "-15px" }}>
                <span>Unit of Material*</span>
                <h4 id="transition-modal-title" style={labelStyles}>
                  {indent?.unitOfMaterial}
                </h4>
              </div>
              <div>
                {indent.hasOwnProperty("date") && indent.date && (
                  <div style={{ marginBottom: "-15px" }}>
                    <span>Expected date of Delivery*</span>
                    <h4 id="transition-modal-title" style={labelStyles}>
                      {indent?.date} <br />
                      <span style={{ color: "red", fontSize: "14px" }}>
                        {timeDifference}
                      </span>
                    </h4>
                  </div>
                )}
                <div style={{ marginBottom: "-15px" }}>
                  <span>Associated Projects and Tasks*</span>
                  <List
                    sx={{
                      width: "100%",
                      maxWidth: 360,
                      bgcolor: "background.paper",
                    }}
                    component="nav"
                  >
                    {indent?.projects?.map((project, index) => {
                      return (
                        <Fragment key={index}>
                          <ListItemButton
                            key={index}
                            onClick={() => handleClick(index)}
                          >
                            <ListItemText
                              primary={`${project?.projectName} (${
                                associatedTasks?.find((taskObj) => {
                                  return (
                                    taskObj?.project?.projectName ===
                                    project?.projectName
                                  );
                                })
                                  ? associatedTasks?.find((taskObj) => {
                                      return (
                                        taskObj?.project?.projectName ===
                                        project?.projectName
                                      );
                                    }).tasks.length
                                  : 0
                              } tasks)`}
                            />
                            {openList[index] ? <ExpandLess /> : <ExpandMore />}
                          </ListItemButton>
                          <Collapse
                            in={openList[index]}
                            timeout="auto"
                            unmountOnExit
                          >
                            {associatedTasks
                              ?.find((obj) => {
                                return (
                                  obj?.project?.projectName ===
                                  project?.projectName
                                );
                              })
                              ?.tasks?.map((task, taskIdx) => {
                                return (
                                  <List
                                    component="div"
                                    key={taskIdx}
                                    disablePadding
                                  >
                                    <ListItem
                                      key={taskIdx}
                                      secondaryAction={
                                        <IconButton
                                          edge="end"
                                          aria-label="comments"
                                          onClick={() =>
                                            deleteTask(
                                              associatedTasks?.findIndex(
                                                (obj) => {
                                                  return (
                                                    obj?.project
                                                      ?.projectName ===
                                                    project?.projectName
                                                  );
                                                }
                                              ),
                                              taskIdx
                                            )
                                          }
                                        >
                                          <DeleteIcon />
                                        </IconButton>
                                      }
                                      disablePadding
                                    >
                                      <ListItemButton sx={{ pl: 4 }}>
                                        <ListItemText
                                          primary={task?.taskName}
                                        />
                                      </ListItemButton>
                                    </ListItem>
                                  </List>
                                );
                              })}
                          </Collapse>
                        </Fragment>
                      );
                    })}
                  </List>
                  {/* <h4 id="transition-modal-title" style={labelStyles}>
                    {project.projectAddress}
                  </h4> */}
                </div>
                <div style={{ marginTop: "20px" }}>
                  <span style={{ marginBottom: "5px" }}>
                    Supervisor Details*
                  </span>
                  <br />
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                    }}
                  >
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "column",
                      }}
                    >
                      <span>Full Name*</span>
                      <h5 id="transition-modal-title" style={labelStyles}>
                        {indent.supervisorName.fullname}
                      </h5>
                    </div>
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "column",
                      }}
                    >
                      <span>Email*</span>
                      <h5 id="transition-modal-title" style={labelStyles}>
                        {indent.supervisorName.email}
                      </h5>
                    </div>
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "column",
                      }}
                    >
                      <span>Contact Number*</span>
                      <h5 id="transition-modal-title" style={labelStyles}>
                        {indent.supervisorName.contactNumber}
                      </h5>
                    </div>
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "column",
                      }}
                    >
                      <span>Role*</span>
                      <h5 id="transition-modal-title" style={labelStyles}>
                        {indent.supervisorName.role}
                      </h5>
                    </div>
                  </div>
                </div>
              </div>
            </Box>

            <Divider />
          </ModalContent>
        </Fade>
      </Modal>
      <ToastContainer />
    </div>
  );
}

const Backdrop = forwardRef((props, ref) => {
  const { open, ...other } = props;
  return (
    <Fade in={open}>
      <div ref={ref} {...other} />
    </Fade>
  );
});

Backdrop.propTypes = {
  open: PropTypes.bool,
};

const blue = {
  200: "#99CCFF",
  300: "#66B2FF",
  400: "#3399FF",
  500: "#007FFF",
  600: "#0072E5",
  700: "#0066CC",
};

const grey = {
  50: "#F3F6F9",
  100: "#E5EAF2",
  200: "#DAE2ED",
  300: "#C7D0DD",
  400: "#B0B8C4",
  500: "#9DA8B7",
  600: "#6B7A90",
  700: "#434D5B",
  800: "#303740",
  900: "#1C2025",
};

const Modal = styled(BaseModal)`
  position: fixed;
  z-index: 1300;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const StyledBackdrop = styled(Backdrop)`
  z-index: -1;
  position: fixed;
  inset: 0;
  background-color: rgb(0 0 0 / 0.5);
  -webkit-tap-highlight-color: transparent;
`;

const style = {
  width: "95%",
  height: "95%",
  overFlow: "scroll",
};

const ModalContent = styled("div")(
  ({ theme }) => css`
    font-family: "IBM Plex Sans", sans-serif;
    font-weight: 500;
    text-align: start;
    position: relative;
    display: flex;
    flex-direction: column;
    gap: 8px;
    overflow-x: hidden;
    overflow-y: scroll;
    background-color: ${theme.palette.mode === "dark" ? grey[900] : "#fff"};
    border-radius: 8px;
    border: 1px solid ${theme.palette.mode === "dark" ? grey[700] : grey[200]};
    box-shadow: 0 4px 12px
      ${theme.palette.mode === "dark" ? "rgb(0 0 0 / 0.5)" : "rgb(0 0 0 / 0.2)"};
    padding: 24px;
    color: ${theme.palette.mode === "dark" ? grey[50] : grey[900]};

    & .modal-title {
      margin: 0;
      line-height: 1.5rem;
      margin-bottom: 8px;
    }

    & .modal-description {
      margin: 0;
      line-height: 1.5rem;
      font-weight: 400;
      color: ${theme.palette.mode === "dark" ? grey[400] : grey[800]};
      margin-bottom: 4px;
    }
  `
);
