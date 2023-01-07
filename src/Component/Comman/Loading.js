import React from "react";
import Skeleton from "@mui/material/Skeleton";
import { styled } from "@mui/material/styles";
import CircularProgress from "@mui/material/CircularProgress";
const PREFIX = "Skeleton";
const classesx = {
  Loading_Card: `${PREFIX}-Loading_Card`,
};
const SkeletonRoot = styled(Skeleton)(({ theme }) => ({
  [`&.${classesx.Loading_Card}`]: {
    height: 345,
    width: "100%",
    maxWidth: "100%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: "25px",
    margin: "0 0 20px 0",
    [theme.breakpoints.down("xs")]: {
      height: 325,
      margin: "0 0 15px 0",
      borderRadius: "15px",
    },
  },
}));

const LoadingCard = () => {
  return (
    <>
      <SkeletonRoot
        className={classesx.Loading_Card}
        animation="wave"
        variant="rounded"
      >
        <CircularProgress
          sx={{ visibility: "visible!important" }}
          color="success"
        />
      </SkeletonRoot>
    </>
  );
};

export { LoadingCard };
