import { Box, Container, MenuItem, Select, Slider } from "@mui/material";
import * as React from "react";

export default function FilterBox(props) {
  const [city, setCity] = React.useState(1);
  const [dist, setDist] = React.useState(1);
  const [netSize, setNetSize] = React.useState([10, 20]);
  const [rentPerMonth, setRentPerMonth] = React.useState([30000, 40000]);

  const dataChanged = () => {
    if (props.onDataChanged) {
      props.onDataChanged({
        city: city,
        dist: dist,
        netSize: netSize,
        rentPerMonth: rentPerMonth
      });
    }
  };

  const handleNetSizeChanged = (e, v) => {
    setNetSize(v);
    dataChanged();
  };

  const handleRentPerMonthChanged = (e, v) => {
    setRentPerMonth(v);
    dataChanged();
  };

  const handleCitySelected = (e) => {
    setCity(e.target.value);
    dataChanged();
  };

  const handleDistSelected = (e) => {
    setDist(e.target.value);
    dataChanged();
  };

  return (
    <Container>
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          flexWrap: "wrap",
          padding: "2ch",
          width: "100%",
          gap: "1em",
          justifyContent: "space-evenly",
          alignItems: "start",
          "> *": {
            flex: { xs: "1 1 100%", md: "1 1 20%" },
            display: "flex",
            flexDirection: "column"
          }
        }}
      >
        <Box>
          City
          <Select value={city} onChange={handleCitySelected}>
            <MenuItem value={1}>Taipei</MenuItem>
            <MenuItem value={2}>New Taipei</MenuItem>
          </Select>
        </Box>
        <Box>
          Dist
          <Select value={dist} onChange={handleDistSelected}>
            <MenuItem value={1}>ZhungZheng</MenuItem>
            <MenuItem value={2}>Ximen</MenuItem>
          </Select>
        </Box>
        <Box>
          Net Size
          <Slider
            value={netSize}
            min={0}
            max={100}
            onChange={handleNetSizeChanged}
          ></Slider>
          <Box sx={{ textAlign: "right", fontSize: "small" }}>
            {netSize[0]} ~ {netSize[1]}sq
          </Box>
        </Box>
        <Box>
          Rent/month
          <Slider
            value={rentPerMonth}
            min={0}
            max={100000}
            onChange={handleRentPerMonthChanged}
          ></Slider>
          <Box sx={{ textAlign: "right", fontSize: "small" }}>
            ${rentPerMonth[0].toLocaleString()} ~ $
            {rentPerMonth[1].toLocaleString()}
          </Box>
        </Box>
      </Box>
    </Container>
  );
}
