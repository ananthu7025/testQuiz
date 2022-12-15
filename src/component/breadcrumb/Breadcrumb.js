import React from "react";
import {
  Breadcrumbs as MUIBreadcrumbs,
  Link,
  Typography,
} from "@material-ui/core";
import { useNavigate, useLocation } from "react-router-dom";
const Breadcrumbs = () => {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const pathnames = pathname.split("/").filter(Boolean);
  return (
    <MUIBreadcrumbs aria-label="breadcrumb">
      {pathnames.length ? (
        <Link onClick={() => navigate("/")}>Dashboard</Link>
      ) : (
        <Typography> Dashboard </Typography>
      )}
      {pathnames.map((name, index) => {
        const routeTo = `/${pathnames.slice(0, index + 1).join("/")}`;
        const isLast = index === pathnames.length - 1;
        return isLast ? (
          <Typography key={name}>{name}</Typography>
        ) : (
          <Link key={name} onClick={() => navigate(routeTo)}>
            {name}
          </Link>
        );
      })}
    </MUIBreadcrumbs>
  );
};

export default Breadcrumbs;
