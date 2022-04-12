import React from "react";
import { useField, useFormikContext } from "formik";
import IconButton from "@mui/material/IconButton";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import InputAdornment from "@mui/material/InputAdornment";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import FormControl from "@mui/material/FormControl";
import FormHelperText from "@mui/material/FormHelperText";
import InfoIcon from "@mui/icons-material/Info";
import Tooltip from "@mui/material/Tooltip";


export const PasswordInput = ({ label, tooltipInfo, hasTooltip = true, ...props }) => {
    const [field, meta] = useField(props);
  
    const [showPassword, setShowPassword] = React.useState(false);
  
    const { touched } = useFormikContext();
  
    const handleClickShowPassword = () => {
      setShowPassword(!showPassword);
    };
    const handleMouseDownPassword = (event) => {
      event.preventDefault();
    };
  
    return (
      <div className="password-input">
        <FormControl className="input-field">
          <InputLabel htmlFor="outlined-adornment-password">{label}</InputLabel>
          <OutlinedInput
            error={!!(meta.touched && meta.error)}
            disabled={field.name === "password2" && !touched.password1}
            label={label}
            variant="outlined"
            inputProps={{
              ...field,
              ...props,
              type: showPassword ? "text" : "password",
            }}
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={handleClickShowPassword}
                  onMouseDown={handleMouseDownPassword}
                  edge="end"
                >
                  {showPassword ? <VisibilityOffIcon /> : <VisibilityIcon />}
                </IconButton>
              </InputAdornment>
            }
          />
          {!!(meta.touched && meta.error) && (
            <FormHelperText error id="accountId-error">
              {meta.error}
            </FormHelperText>
          )}
        </FormControl>
        {hasTooltip && (
          <Tooltip title={tooltipInfo} className="info">
            <IconButton>
              <InfoIcon />
            </IconButton>
          </Tooltip>
        )}
      </div>
    );
  };
  