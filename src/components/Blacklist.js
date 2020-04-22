import React, { useState } from "react";
import { connect } from "react-redux";
import { createUseStyles } from "react-jss";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import { Close } from "@material-ui/icons";
import { ADD_TO_BLACKLIST, DELETE_FROM_BLACKLIST } from "../modules/actions";

const useStyles = createUseStyles({
  dataViewContainer: {
    padding: "10px",
  },
  titleContainer: {
    display: "flex",
    flexWrap: "noWrap",
    justifyContent: "space-between",
    alignItems: "center",
  },
  documentTable: {
    margin: "10px 15px",
    borderTop: "solid 1px #F5F5F5",
    borderBottom: "solid 1px #F5F5F5",
    maxHeight: "70px",
    overflowY: "scroll",
  },
  deleteButton: {
    position: "relative",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
    width: "16px",
    height: "16px",
    padding: "0",
    outline: "none",
    marginRight: "16px",

    "&:hover": {
      backgroundColor: "#3047C8",
      color: "#FFF",
      "& > .hide": {
        visibility: "visible",
      },
    },
  },
  option: {
    display: "flex",
    justifyContent: "space-between",
    marginBottom: "10px",
  },
  documentRow: {
    position: "relative",
    display: "flex",
    flexWrap: "noWrap",
    justifyContent: "space-between",
    alignItems: "center",
    height: "20px",
    "&:hover": {
      border: "solid 1px #CCC",
      backgroundColor: "#EEE",

      "& button": {
        border: "solid 1px #666",
        boxShadow: "inset 0 0 2px #00000088",
      },
    },
    "& .hide": {
      backgroundColor: "#333",
      color: "#FFF",
      visibility: "hidden",
      position: "absolute",
      top: "-5px",
      right: "20px",
      width: "80px",
      height: "20px",
      paddingTop: "2px",
      zIndex: "10",
      borderRadius: "5px",
      textAlign: "center",
    },

    "& p": {
      margin: "5px 0",
    },
  },
});

const DataView = (props) => {
  const { documents } = props;
  const classes = useStyles();
  const [literal, setLiteral] = useState("");

  return (
    <div className={classes.dataViewContainer}>
      <div className={classes.titleContainer}>
        <h2>Blacklist</h2>
      </div>
      <div className={classes.documentTable}>
        <div>
          <div className={classes.documentRow}>
            <input
              id="filled-number"
              size="small"
              placeholder="+add phrase"
              value={literal}
              onChange={(e) => setLiteral(e.target.value)}
              style={{ width: "180px" }}
            />
            <button
              style={{ marginRight: "20px" }}
              disabled={!literal}
              onClick={() => {
                props.addToBlacklist(literal.toLowerCase().trim());
                setLiteral("");
              }}
            >
              add
            </button>
          </div>
        </div>
        {Object.keys(props.blacklist).map((key, i) => (
          <div key={i}>
            <div className={classes.documentRow}>
              <span>{key}</span>
              <button
                className={classes.deleteButton}
                onClick={() => props.deleteFromBlacklist(key)}
              >
                <Close style={{ fontSize: "14px" }} />
                <span className={"hide"}>remove</span>
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  blacklist: state.blacklist,
});

const mapDispatchToProps = (dispatch) => ({
  addToBlacklist: (literal) =>
    dispatch({ type: ADD_TO_BLACKLIST, payload: { literal: literal } }),
  deleteFromBlacklist: (literal) =>
    dispatch({ type: DELETE_FROM_BLACKLIST, payload: { literal: literal } }),
});

export default connect(mapStateToProps, mapDispatchToProps)(DataView);
