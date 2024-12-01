import { Grid, TextField, FormControlLabel, Checkbox } from "@mui/material";
import PropTypes from 'prop-types';

const InputField = ({ phoneNumber, setPhoneNumber, password, setPassword }) => {
  return (
    <Grid>
      <TextField
        label="Nomer HP"
        placeholder="Enter Nomer"
        fullWidth
        required
        margin="normal"
        value={phoneNumber}
        onChange={(e) => setPhoneNumber(e.target.value)}
      />
      <TextField
        label="Password"
        placeholder="Enter password"
        type="password"
        fullWidth
        required
        margin="normal"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <FormControlLabel
        control={<Checkbox name="rememberMe" color="primary" />}
        label="Remember me"
      />
    </Grid>
  );
};
InputField.propTypes = {
  phoneNumber: PropTypes.string.isRequired,
  setPhoneNumber: PropTypes.func.isRequired,
  password: PropTypes.string.isRequired,
  setPassword: PropTypes.func.isRequired,
};

export default InputField;
