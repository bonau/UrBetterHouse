import * as React from "react";
import { Box } from "@mui/material";

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
        <Box>{props.data.total_room || 0} Bed {props.data.livingroom || 0} Liv</Box>
        <Box>{props.data.mrt_line || "No Lines"}</Box>
      </Box>
    </Box>
  );
}
