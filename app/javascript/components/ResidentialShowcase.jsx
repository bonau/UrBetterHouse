import * as React from "react";
import { Box, styled, TextField } from "@mui/material";
import { FavoriteBorder, Favorite } from "@mui/icons-material";
export default function ResidentialShowcase(props) {
  const onValueChanged = props.onValueChanged; // TODO not to use closure
  const EditableAttribute = (props) => {
    const [value, setValue] = React.useState(props.value);
    const [isEdit, setIsEdit] = React.useState(false);
    const anchorEl = React.useRef(null);

    const handleOnClick = (e) => {
      anchorEl.current.focus();
      setIsEdit(!isEdit);
    };

    const fireValueChanged = (k, o, n) => {
      if (onValueChanged) {
        onValueChanged(k, o, n);
      }
    };

    const handleOnBlur = (e) => {
      if (!(e.target.value == props.value)) {
        fireValueChanged(props.attrKey, props.value, e.target.value);
      }
    };

    const handleOnChange = (e) => {
      setValue(e.target.value);
    }

    React.useEffect(() => {
      if (anchorEl.current) {
        anchorEl.current.focus();
      }
    })

    return (
      <Box sx={{ display: "inline-block" }} onClick={handleOnClick}>
        <Box
          sx={{
            display: isEdit ? "none" : "inline-block",
            marginRight: "1ch",
            marginLeft: "1ch",
            marginTop: "1ch",
            ":hover": { borderBottom: "1px dotted #000", cursor: "text" }
          }}
        >
          {props.valueText
            ? props.valueText(props.value)
            : props.value || props.default}
        </Box>
        <Box
          sx={{
            display: isEdit ? "inline-block" : "none",
            width: "auto"
          }}
        >
          <TextField
            ref={anchorEl}
            variant="standard"
            onBlur={handleOnBlur}
            onChange={handleOnChange}
            autoFocus
            value={value}
            sx={{ width: "10ch", lineHeight: "1em" }}
          ></TextField>
        </Box>
      </Box>
    );
  };

  const StyledFavorite = styled(Favorite)(({ theme }) => ({
    display: props.data.liked ? "block" : "none",
    color: theme.palette.primary.light,
    margin: "1ch"
  }));

  const StyledFavoriteBorder = styled(FavoriteBorder)(({ theme }) => ({
    display: props.data.liked ? "none" : "block",
    color: theme.palette.primary.light,
    margin: "1ch"
  }));

  const handleOnFavorite = (e, liked = true) => {
    if (props.onFavorite) {
      props.onFavorite(props.data.id, liked);
    }
  };
  const handleOnUnfavorite = (e) => {
    handleOnFavorite(e, false);
  };

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
        <Box>
          <EditableAttribute
            attrKey={"price_per_month"}
            value={props.data.price_per_month}
            default={"Infinity"}
          ></EditableAttribute>
          /month
        </Box>
        <Box>
          <EditableAttribute
            attrKey={"title"}
            value={props.data.title}
            default={"(No Title)"}
          ></EditableAttribute>
        </Box>
        <Box>
          <EditableAttribute
            attrKey={"address"}
            value={props.data.address}
            default={"No Address"}
          ></EditableAttribute>
        </Box>
        <Box>
          <EditableAttribute
            attrKey={"total_room"}
            value={props.data.total_room}
            default={0}
          ></EditableAttribute>
          Bedrooms
          <EditableAttribute
            attrKey={"livingroom"}
            value={props.data.livingroom}
            default={0}
          ></EditableAttribute>
          Livingrooms
        </Box>
        <Box>
          <EditableAttribute
            attrKey={"mrt_line"}
            value={props.data.mrt_line}
            default={"No Lines"}
          ></EditableAttribute>
        </Box>
      </Box>
    </Box>
  );
}
