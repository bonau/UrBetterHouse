import { Box } from "@mui/material";
import * as React from "react";

export default function ResidentialShowcase(props) {
  return (
    <Box
      sx={{
        border: "1px solid #CCC",
        width: "100%",
        marginBottom: "1em"
      }}
    >
      <img
        src={props.thumbUrl || "//via.placeholder.com/300x150"}
        style={{ width: "100%" }}
        alt="interiors of the house"
      ></img>
      <Box
        sx={{
          padding: "1em"
        }}
      >
        <Box>{props.price || Infinity} / month</Box>
        <Box>{props.title || "Title Here"}</Box>
        <Box>{props.address || "Address Here"}</Box>
        <Box>{props.rooms || "Rooms"}</Box>
        <Box>{props.mrtLine || "Lines"}</Box>
      </Box>
    </Box>
  );
}
