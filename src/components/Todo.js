import React, { useContext, useState, useRef, useEffect } from "react";
import styled from "react-emotion";
import Checkbox from "./Checkbox";
import { TodosContext } from "../App";
import { ReactComponent as TrashIcon } from '../img/bin.svg'

const Todo = ({ done, text, index }) => {
  const { dispatch } = useContext(TodosContext);
  const [editing, setEditing] = useState(false);

  const handleDoneChange = checked => {
    dispatch({
      type: "SET_DONE",
      done: checked,
      index
    });
  };

  const handleEditorBlur = text => {
    setEditing(false);
    dispatch({
      type: "SET_TEXT",
      text,
      index
    });
  };

  const deleteTodo = () => {
    dispatch({
      type: 'DELETE_TODO',
      index
    })
  }

  return (
    <Wrapper>
      <InnerWrapper done={done}>
        <Checkbox checked={done} onChange={handleDoneChange} />
        {editing ? (
          <Editor text={text} onBlur={handleEditorBlur} />
        ) : (
          <Text
            done={done}
            onClick={() => {
              setEditing(true);
            }}
          >
            {text}
          </Text>
        )}
        <DeleteButtonWrapper>
          <DeleteButton className="delete-button" onClick={deleteTodo}>
            <TrashIcon/>
          </DeleteButton>
        </DeleteButtonWrapper>
      </InnerWrapper>
    </Wrapper>
  );
};

const Editor = ({ text, onBlur }) => {
  const [value, setValue] = useState(text);
  const input = useRef(null);
  useEffect(() => {
    input.current.focus();
    input.current.select();
  }, []);

  const handleBlur = () => {
    onBlur(value);
  };

  const handleChange = e => {
    setValue(e.target.value);
  };

  const handleKeyDown = e => {
    if(e.keyCode === 13){
      onBlur(value)
    }
  }

  return (
    <Input
      innerRef={input}
      value={value}
      onChange={handleChange}
      onBlur={handleBlur}
      onKeyDown={handleKeyDown}
    />
  );
};

const Wrapper = styled("div")({
  width: 400,
  padding: 5
});

const InnerWrapper = styled("div")(
  {
    background: "rgb(226, 226, 226)",
    padding: 20,
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    fontSize: 20,
    fontWeight: 600,
    borderRadius: 4,
    position: 'relative',
    '&:hover .delete-button': {
      opacity: 1
    }
  },
  ({ done }) => ({
    opacity: done ? 0.6 : 1
  })
);

const Text = styled("span")(({ done }) => ({
  textDecoration: done ? "line-through" : "none"
}));

const Input = styled("input")({
  background: "rgba(255,255,255,.3)",
  padding: 5,
  width: "100%",
  border: "none",
  fontWeight: 600,
  borderRadius: 4,
  margin: "-2px 0px -2px -5px",
  outline: "none"
});

const DeleteButtonWrapper = styled('div')({
  position: 'absolute',
  left: -40,
  top: 0,
  height: '100%',
  width: 41,
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center'
})

const DeleteButton = styled('button')({
  width: 30,
  height: 30,
  padding: 3,
  background: 'none',
  border: 'none',
  outline: 'none',
  opacity: 0,
  transition: 'opacity 100ms',
  cursor: 'pointer',
  '& svg': {
    maxWidth: '100%',
    maxHeight: '100%',
    fill: 'rgba(0, 0, 0, 0.15)'
  },
  '&:hover': {
    opacity: 1,
    '& svg': {
      fill: 'rgb(222, 90, 90)'
    }
  },
  '&:active': {
    '& svg': {
      fill: 'rgb(198, 76, 76)'
    }
  }
})

export default Todo;
