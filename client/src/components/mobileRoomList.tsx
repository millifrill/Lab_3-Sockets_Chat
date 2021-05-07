import { styled, makeStyles } from "@material-ui/core";

export default function MobileRoomList() {
  const styled = useStyles();
  return <div className={styled.container}></div>;
}

const useStyles = makeStyles((theme) => ({
  container: {
    position: "absolute",
    top: "6rem",
    height: "100%",
    backgroundColor: "#ffff",
    maxWidth: "100%",
    width: "18rem",
    borderRight: "1px solid #F6F6F6",
    zIndex: 100,
  },
}));
