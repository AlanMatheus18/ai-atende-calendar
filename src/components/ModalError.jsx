import React from "react";
import PropTypes from "prop-types";
import Modal from "@mui/material/Modal";
import Backdrop from "@mui/material/Backdrop";
import Fade from "@mui/material/Fade";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Alert from "@mui/material/Alert";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  borderRadius: "8px",
  boxShadow: 24,
  p: 4,
};

export default function ModalError({ error, open, setOpen, setLoading }) {
  const handleClose = () => {
    setOpen();
    setLoading(true);
  };

  return (
    <Modal
      open={open}
      onClose={handleClose}
      closeAfterTransition
    >
      <Fade in={open}>
        <Box sx={style}>
          <Stack spacing={2}>
            <Alert variant="filled" severity="error">
              {error || "Ocorreu um erro desconhecido"}
            </Alert>
          </Stack>
        </Box>
      </Fade>
    </Modal>
  );
}

ModalError.propTypes = {
  error: PropTypes.string,
  open: PropTypes.bool.isRequired,
  setOpen: PropTypes.func.isRequired,
};
