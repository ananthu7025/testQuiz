import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Pagination, PaginationItem } from "@material-ui/lab";
import { Link } from "react-router-dom";
import useStyles from "./Styles.js";
import { getQuestions } from "../../redux/actions/questions";

const Paginate = ({ page, pageSize }) => {
  const dispatch = useDispatch();
  const classes = useStyles();
  const { numberOfPages } = useSelector((state) => state.questions);
  useEffect(() => {
    dispatch(getQuestions(page));
  }, [page]);
  return (
    <Pagination
      classes={{ ul: classes.ul }}
      count={numberOfPages}
      page={Number(page)}
      variant="outlined"
      color="primary"
      renderItem={(item) => (
        <PaginationItem
          {...item}
          component={Link}
          to={`/question-list?page=${item.page}`}
        />
      )}
    />
  );
};

export default Paginate;
