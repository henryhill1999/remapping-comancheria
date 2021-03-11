import React from "react";
import { createUseStyles } from "react-jss";
import MdParser from "../utils/MdParser";
const useStyles = createUseStyles({
  contentCard: {
    // position: "absolute",

    position: "static",
    minWidth: "50%",
    maxWidth: "800px",

    display: "flex",
    justifyContent: "center",

    backgroundColor: "#FFF",
    borderRadius: "10px",
    padding: "15px",
    margin: "10px",
    boxShadow: "0 3px 14px rgba(0,0,0,0.4)",
    overflowY: "auto",

    "& p": {
      fontSize: "14px",
      lineHeight: 1.5,
    },
  },
  contentWrapper: {
    width: "80%",
    margin: "15px",
  },
});

const Modal = (props) => {
  const classes = useStyles();
  const { text } = props;

  if (!text) {
    return <></>;
  }

  return (
    <div className={classes.contentCard}>
      <div className={classes.contentWrapper}>
        <MdParser>{text}</MdParser>
      </div>
    </div>
  );
};

export default Modal;
