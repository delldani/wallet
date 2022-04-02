import React from "react";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Radio from "@mui/material/Radio";


const renderOptions = (options,labels) => {
  return options.map((option,index) => (
    <FormControlLabel
      key={option}
      value={option}
      control={<Radio />}
      label={labels[index]}
    />
  ));
};

export const RadioButtons = ({
  field,
  form: { touched, errors },
  options,
  labels,
  children,
  ...props
}) => {

  return (
    <React.Fragment>
      <RadioGroup {...field} {...props} name={field.name} sx={style}>
        {renderOptions(options,labels)}
      </RadioGroup>
    </React.Fragment>
  );
};

const style = {
    display:'flex',
    flexDirection:'row',
}