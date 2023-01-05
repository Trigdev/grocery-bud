/* eslint-disable react-hooks/exhaustive-deps */
import React, { FC, ReactElement, useEffect } from "react";
import { AlertComponentProps } from "./App.types";

const Alert: FC<AlertComponentProps> = ({
  msg,
  type,
  removeAlert,
  list,
}: AlertComponentProps): ReactElement => {
  useEffect(() => {
    const timeout = setTimeout(() => {
      removeAlert(false, "", "");
    }, 3000);

    return () => clearTimeout(timeout);
  }, [list]);

  return <p className={`alert alert-${type}`}>{msg}</p>;
};

export default Alert;
