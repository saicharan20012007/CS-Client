import PropTypes from "prop-types";
import { styled, css } from "@mui/system";
import { Modal as BaseModal } from "@mui/base/Modal";
import Fade from "@mui/material/Fade";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import { Box, Divider, IconButton } from "@mui/material";
import { useEffect, useState, forwardRef } from "react";
import ClearIcon from "@mui/icons-material/Clear";

const labelStyles = {
  marginTop: "-0px",
};

export default function ViewTaskModal({ task }) {
  console.log(task);
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [timeDifference, setTimeDifference] = useState("");

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

  useEffect(() => {
    const startDate = new Date(task.startDate);
    const endDate = new Date(task.endDate);
    calculateTimeDifference(startDate, endDate);
  }, [task]);

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
              <h2 style={{ marginBottom: "5px" }}>Task Details</h2>

              <div style={{ marginBottom: "-15px" }}>
                <span>Task Name*</span>
                <h4 id="transition-modal-title" style={labelStyles}>
                  {task.taskName}
                </h4>
              </div>
              <div style={{ marginBottom: "-15px" }}>
                <span>Description*</span>
                <h4 id="transition-modal-title" style={labelStyles}>
                  {task.description}
                </h4>
              </div>
              <div style={{ marginBottom: "-15px" }}>
                <span>Unit of Work*</span>
                <h4 id="transition-modal-title" style={labelStyles}>
                  {task.unitOfWork}
                </h4>
              </div>
              <div>
                <div style={{ marginBottom: "-15px" }}>
                  <span>start Date*</span>
                  <h4 id="transition-modal-title" style={labelStyles}>
                    {task.startDate}
                  </h4>
                </div>
                <div style={{ marginBottom: "-15px" }}>
                  <span>end Date*</span>
                  <h4 id="transition-modal-title" style={labelStyles}>
                    {task.endDate} <br />
                    <span style={{ color: "red", fontSize: "14px" }}>
                      {timeDifference}
                    </span>
                  </h4>
                </div>
                <div style={{ marginBottom: "-15px" }}>
                  <span>Total Work Assigned*</span>
                  <h4 id="transition-modal-title" style={labelStyles}>
                    {task.totalWorkAssigned}
                  </h4>
                </div>
                <div style={{ marginBottom: "-15px" }}>
                  <span>Total Work Executed*</span>
                  <h4 id="transition-modal-title" style={labelStyles}>
                    {task.totalWorkExecuted}
                  </h4>
                </div>
              </div>
            </Box>

            <Divider />
          </ModalContent>
        </Fade>
      </Modal>
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
