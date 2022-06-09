import * as React from "react";
import { Box, Divider, styled, TextField } from "@mui/material";
import { FavoriteBorder, Favorite } from "@mui/icons-material";
export default function ResidentialShowcase(props) {
  const onValueChanged = props.onValueChanged; // TODO not to use closure
  const editDisable = !(props.role == "admin")
  const EditableAttribute = (props) => {
    const [value, setValue] = React.useState(props.value);
    const [isEdit, setIsEdit] = React.useState(false);
    const inputRef = React.useRef(null);

    const handleClick = (e) => {
      if (!editDisable) {
        setIsEdit(true);
      }
    };

    const fireValueChanged = (k, o, n) => {
      if (onValueChanged) {
        onValueChanged(k, o, n);
      }
    };

    const handleBlur = (e) => {
      if (!(e.target.value == props.value)) {
        fireValueChanged(props.attrKey, props.value, e.target.value);
      }
      setIsEdit(false);
    };

    const handleChange = (e) => {
      setValue(e.target.value);
    }

    React.useEffect(() => {
      if (isEdit) {
        inputRef.current.focus();
      }
    }, [isEdit])

    return (
      <Box sx={{ display: "inline-block" }} onClick={handleClick}>
        <Box
          sx={{
            display: isEdit ? "none" : "inline-block",
            marginRight: "1ch",
            marginLeft: "1ch",
            marginTop: "1ch",
            ":hover": (editDisable ? {} : { borderBottom: "1px dotted #000", cursor: "text" })
          }}
        >
          {props.valueText
            ? props.valueText(props.value)
            : props.value || props.default}
        </Box>
        <Box>
          <TextField
            inputRef={inputRef} /* use inputRef instead of due to Material UI document */
            variant="standard"
            onBlur={handleBlur}
            onChange={handleChange}
            autoFocus
            value={value}
            sx={{
              marginRight: "1ch",
              marginLeft: "1ch",
              marginTop: "1ch",
              display: isEdit ? "inline-block" : "none",
              width: "auto"
            }}
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

  const handleFavorite = (e, liked = true) => {
    if (props.onFavorite) {
      props.onFavorite(props.data.id, liked);
    }
  };
  const handleUnfavorite = (e) => {
    handleFavorite(e, false);
  };

  const renderFavoriteIcon = (
    <Box
      display={props.showLike ? 'block' : 'none'}
      sx={{
        position: "absolute",
        right: "0"
      }}
    >
      <StyledFavorite onClick={handleUnfavorite} />
      <StyledFavoriteBorder onClick={handleFavorite} />
    </Box>
  );

  return (
    <Box
      sx={{
        position: "relative",
        border: "1px solid #CCC",
        width: "100%",
        marginBottom: "1em"
      }}
    >
      {renderFavoriteIcon}
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
        <Box sx={{ fontWeight: "bold", textAlign: "right" }}>
          <EditableAttribute
            attrKey={"price_per_month"}
            value={props.data.price_per_month}
            valueText={(v) => "$" + v.toLocaleString()}
            default={"Infinity"}
          ></EditableAttribute>
          <small>/month</small>
        </Box>
        <Divider />
        <Box sx={{ fontWeight: "bold" }}>
          <EditableAttribute
            attrKey={"title"}
            value={props.data.title}
            default={"(No Title)"}
          ></EditableAttribute>
        </Box>
        <Box sx={{ fontSize: "small" }}>
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
    </Box>
  );
}
