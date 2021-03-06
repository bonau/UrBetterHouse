import { Box, Container, MenuItem, Select, Slider } from "@mui/material";
import * as React from "react";

export default function FilterBox(props) {
  const [city, setCity] = React.useState("");
  const [dist, setDist] = React.useState("");
  const [netSize, setNetSize] = React.useState([10, 50]);
  const [pricePerMonth, setPricePerMonth] = React.useState([10000, 40000]);

  const dataChanged = (argFilters) => {
    if (props.onDataChanged) {
      let newFilter = {...props.filters, ...argFilters};
      props.onDataChanged(newFilter);
    }
  };

  const handleNetSizeChanged = (e, v) => {
    setNetSize(v);
    dataChanged({netSize: v});
  };

  const handleRentPerMonthChanged = (e, v) => {
    setPricePerMonth(v);
    dataChanged({pricePerMonth: v});
  };

  const handleCitySelected = (e) => {
    setCity(e.target.value);
    setDist("");
    dataChanged({city: e.target.value, dist: ""}); // TODO model level control
  };

  const handleDistSelected = (e) => {
    setDist(e.target.value);
    dataChanged({dist: e.target.value});
  };

  return (
    <Container>
      <Box
        sx={{
          display: (props.open ? "flex" : "none"),
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
            <MenuItem key={""} value={""}></MenuItem>
            {
              props.availableFilters.city.map((e) =>
                <MenuItem key={`city-${e}`} value={e}>{e}</MenuItem>
              )
            }
          </Select>
        </Box>
        <Box>
          Dist
          <Select value={dist} onChange={handleDistSelected}>
            <MenuItem key={""} value={""}></MenuItem>
            {
              props.availableFilters.dist.map((e) =>
                <MenuItem key={`dist-${e}`} value={e}>{e}</MenuItem>
              )
            }
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
            value={pricePerMonth}
            min={0}
            max={100000}
            onChange={handleRentPerMonthChanged}
          ></Slider>
          <Box sx={{ textAlign: "right", fontSize: "small" }}>
            ${pricePerMonth[0].toLocaleString()} ~ $
            {pricePerMonth[1].toLocaleString()}
          </Box>
        </Box>
      </Box>
    </Container>
  );
}
