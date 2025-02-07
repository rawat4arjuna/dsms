import React, { useMemo } from "react";
import FormikTextField from "./FormikTextField";

// Define allowed control types


// Define props type
interface ControllerProps {
  type?: any;
  [key: string]: any; // Allow additional props
}

// Control function to return the appropriate component
const Control = (type: any) =>
  ({
    textfield: FormikTextField,
  }[type ?? ""] || null);

const Controller: React.FC<ControllerProps> = ({ type, ...rest }) => {
  const Component = useMemo(() => Control(type), [type]);

  if (!type) return null;
  if (!Component) return <div>{type} is not a valid control type.</div>;

  return <Component {...rest} />;
};

export default React.memo(Controller);
