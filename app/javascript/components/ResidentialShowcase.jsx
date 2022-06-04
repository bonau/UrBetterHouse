import * as React from "react";
import { Box, styled } from "@mui/material";
import { FavoriteBorder, Favorite } from "@mui/icons-material";
export default function ResidentialShowcase(props) {
  const [favo, setFavo] = React.useState(false);

  const StyledFavorite = styled(Favorite)(({ theme }) => ({
    display: favo ? "block" : "none",
    color: theme.palette.primary.light,
    margin: "1ch"
  }));

  const StyledFavoriteBorder = styled(FavoriteBorder)(({ theme }) => ({
    display: favo ? "none" : "block",
    color: theme.palette.primary.light,
    margin: "1ch"
  }));

  const handleOnFavorite = () => {
    props.onFavorite(props.data.id).then((val) => {
      // FIXME should update view when props update
      props.data.liked = val;
      setFavo(val);
    });
  }
  const handleOnUnfavorite = () => {
    props.onUnfavorite(props.data.id).then((val) => {
      props.data.liked = val;
      setFavo(val);
    });
  }

  React.useEffect(() => {
    setFavo(props.data.liked);
  })

  return (
    <Box
      sx={{
        position: "relative",
        border: "1px solid #CCC",
        width: "100%",
        marginBottom: "1em"
      }}
    >
      <Box
        sx={{
          position: "absolute",
          right: "0"
        }}
      >
        <StyledFavorite onClick={handleOnUnfavorite} />
        <StyledFavoriteBorder onClick={handleOnFavorite} />
      </Box>
      <img
        src={props.data.thumb_pic || "//via.placeholder.com/300x150"}
        style={{ width: "100%" }}
        alt="interiors of the house"
      ></img>
      <Box
        sx={{
          padding: "1em"
        }}
      >
        <Box>{props.data.price_per_month || Infinity} / month</Box>
        <Box>{props.data.title || "(No Title)"}</Box>
        <Box>{props.data.address || "No Address"}</Box>
        <Box>
          {props.data.total_room || 0} Bed {props.data.livingroom || 0} Liv
        </Box>
        <Box>{props.data.mrt_line || "No Lines"}</Box>
      </Box>
    </Box>
  );
}
