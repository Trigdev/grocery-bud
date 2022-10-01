/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from "react";
import { AlertComponentProps } from "./App.types";

const Alert = ({ msg, type, removeAlert, list }: AlertComponentProps) => {
  useEffect(() => {
    const timeout = setTimeout(() => {
      removeAlert(false, "", "");
    }, 3000);

    return () => clearTimeout(timeout);
  }, [list]);

  return <p className={`alert alert-${type}`}>{msg}</p>;
};

export default Alert;
