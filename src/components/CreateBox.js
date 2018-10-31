import React, { useState } from "react";
import styled from "react-emotion";

const CreateBox = ({ onSubmit }) => {
  const [value, setValue] = useState("");

  const handleValueChange = e => {
    setValue(e.target.value);
  };

  const handleEnter = e => {
    if (e.keyCode === 13 && value !== "") {
      onSubmit(value);
      setValue("");
    }
  };

  return (
    <Wrapper>
      <Input
        value={value}
        onChange={handleValueChange}
        onKeyDown={handleEnter}
        placeholder="Write a todo and press [Enter]"
      />
    </Wrapper>
  );
};

const Wrapper = styled("div")({
  display: "flex",
  width: "100%",
  justifyContent: "center",
  marginTop: 30,
  marginBottom: 30
});

const Input = styled("input")({
  width: 390,
  height: 60,
  borderRadius: 6,
  padding: 10,
  fontSize: 20,
  border: "3px solid rgb(218, 218, 218)",
  "&:focus": {
    outline: "none",
    borderColor: "rgb(27, 148, 247)"
  }
});

export default CreateBox;
