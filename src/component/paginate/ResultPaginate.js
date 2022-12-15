import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Pagination, PaginationItem } from "@material-ui/lab";
import { Link } from "react-router-dom";
import useStyles from "./Styles.js";
import { getResults } from "../../redux/actions/results";

const Paginate = ({ page}) => {
  const dispatch = useDispatch();
  const classes = useStyles();
  const { numberOfPages } = useSelector((state) => state.results);

  useEffect(() => {
    dispatch(getResults(page));
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
          to={`/result?page=${item.page}`}
        />
      )}
    />
  );
};

export default Paginate;
