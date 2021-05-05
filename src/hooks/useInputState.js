/* eslint-disable import/no-anonymous-default-export */
import { useState } from "react";

//Boilerplate do React para formularios

export default (initialVal) => {
  const [value, setValue] = useState(initialVal);
  const handleChange = (e) => {
    setValue(e.target.value);
  };
  const reset = () => {
    setValue("");
  };
  return [value, handleChange, reset];
};
