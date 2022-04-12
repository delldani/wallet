import TextField from "@mui/material/TextField";
import { useField } from "formik";
import InfoIcon from "@mui/icons-material/Info";
import Tooltip from "@mui/material/Tooltip";
import IconButton from "@mui/material/IconButton";

export const TextInput = ({ label, tooltipInfo, ...props }) => {
    const [field, meta] = useField(props);
    return (
      <div className="username-input">
        <TextField
          className="input-field"
          label={label}
          variant="outlined"
          inputProps={{ ...field, ...props }}
          helperText={meta.touched && meta.error}
          error={!!(meta.touched && meta.error)}
        />
      {tooltipInfo && <Tooltip title={tooltipInfo} className="info">
          <IconButton>
            <InfoIcon />
          </IconButton>
        </Tooltip>}
      </div>
    );
  };