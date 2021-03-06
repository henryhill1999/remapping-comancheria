import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { FETCH_LESSON, SET_INDEX } from "../../modules/actions";
import { SUCCESS } from "../../utils/constants";

import { createUseStyles } from "react-jss";
import { useRouteMatch } from "react-router";
import { Link } from "react-router-dom";

const useStyles = createUseStyles({
  mainSeq: {
    padding: "10px",
    "& a": { textDecoration: "none" },
    "& >": {
      "&:not(:first-child)::before": {
        content: '""',
        display: "block",
        margin: "3px 17px",
        width: "0px",
        height: "2px",
        border: "1px solid #666",
      },
    },
  },
  numLabel: {
    cursor: "pointer",
    color: "#adadad",
    textDecoration: "none",

    "&:hover": {
      color: "#eee",
    },

    "& > div": {
      display: "inline-flex",
      borderRadius: "50%",
      width: "8px",
      height: "8px",
      padding: "10px",

      border: "2px solid #666",
      alignItems: "center",
      justifyContent: "center",
    },
  },
  selectedLabel: {
    color: "#fff",
    "& > div": {
      background: "#3047C8",
      border: "2px solid #3047C8",
      color: "#fff",
    },
  },
  circle: {
    display: "block",
    width: 6,
    height: 6,
    margin: "0 13px",
    borderRadius: "50%",
    border: "2px solid #666",
    background: "#666",
    cursor: "pointer",
    "&:hover": {
      boxShadow: "0px 0px 5px white",
      border: "2px solid #fff",
      background: "#fff",
    },
  },
  completedCircleWrapper: {
    "& > a > div": {
      border: "2px solid #fff",
      background: "#fff",
    },
    "&::before": {
      border: "1px solid #fff !important",
    },
  },
});

const ConfiguredSidebar = (props) => {
  const classes = useStyles();

  const { currentLesson, availableLessons } = useSelector((state) => ({
    currentLesson: state.currentLesson,
    availableLessons: state.availableLessons,
  }));

  const dispatch = useDispatch();
  const setIndex = (index) => dispatch({ type: SET_INDEX, value: index });
  const setLesson = (id) => dispatch({ type: FETCH_LESSON, value: id });

  const currentLessonValue = currentLesson.src;

  const handleSubmit = (id) => {
    setLesson(id);
    props.handleClose();
  };

  // if url is different, update lesson and index to match the url
  const matchIndex = useRouteMatch("/lesson/:lessonID/index/:index");
  const matchNoIndex = useRouteMatch("/lesson/:lessonID/");
  useEffect(() => {
    if (!!matchIndex) {
      const { params } = matchIndex;
      const { lessonID, index } = params ? params : {};

      if (
        !!lessonID &&
        !!currentLessonValue &&
        lessonID.toString() !== currentLessonValue.toString()
      ) {
        setLesson(lessonID);
      } else if (
        Number.isInteger(parseInt(index)) &&
        Number.isInteger(currentLesson.currentIndex) &&
        parseInt(index) - 1 !== currentLesson.currentIndex
      ) {
        setIndex(parseInt(index) - 1);
      }
    } else if (!!matchNoIndex) {
      const { params } = matchNoIndex;
      const { lessonID } = params ? params : {};

      if (
        !!lessonID &&
        !!currentLessonValue &&
        lessonID.toString() !== currentLessonValue.toString()
      ) {
        setLesson(lessonID);
      }
    }
  });

  return (
    <div style={{ minWidth: "200px", padding: "10px" }}>
      <h2>Remapping Comanchería:</h2>
      <div className={classes.mainSeq}>
        {availableLessons.loadingStatus === SUCCESS && [
          ...availableLessons.lessons.map((l, i) =>
            `${currentLessonValue}` === l.src ? (
              <>
                <h2
                  className={`${classes.numLabel} ${classes.selectedLabel}`}
                  value={l.src}
                  key={i}
                >
                  <div>{i + 1}</div> {l.name}
                </h2>
                {Object.keys(currentLesson.content).map((n, j) => (
                  <div
                    className={`${
                      currentLesson.currentIndex >= j
                        ? classes.completedCircleWrapper
                        : ""
                    }`}
                    key={`li ${j}`}
                  >
                    <Link to={`/lesson/${l.src}/index/${j + 1}`}>
                      <div className={classes.circle}></div>
                    </Link>
                  </div>
                ))}
              </>
            ) : (
              <Link to={`/lesson/${l.src}`}>
                <h2
                  className={classes.numLabel}
                  value={l.src}
                  onClick={() => handleSubmit(l.src)}
                  key={i}
                >
                  <div>{i + 1}</div> {l.name}
                </h2>
              </Link>
            ),
          ),
        ]}
      </div>
    </div>
  );
};

export default ConfiguredSidebar;
