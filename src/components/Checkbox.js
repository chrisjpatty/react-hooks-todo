import React from "react";
import styled from "react-emotion";

const Checkbox = ({ checked, onChange }) => (
  <Box
    checked={checked}
    onClick={() => {
      onChange(!checked);
    }}
  />
);

const Box = styled("div")({
  flex: "0 0 auto",
  width: 30,
  height: 30,
  padding: 3,
  borderRadius: 3,
  background: "#ffffff",
  marginRight: 15,
  position: 'relative'
}, ({checked}) => (
  checked === true ? {
    '&::before': {
      position: 'absolute',
      left: 4,
      top: 4,
      content: '" "',
      width: 22,
      height: 22,
      borderRadius: 2,
      background: 'rgb(27, 148, 247)'
    }
  } : undefined
));

export default Checkbox;
