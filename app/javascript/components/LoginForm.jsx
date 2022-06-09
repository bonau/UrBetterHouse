import {
  Button,
  Dialog,
  DialogTitle,
  DialogActions,
  DialogContent,
  TextField
} from "@mui/material";
import * as React from "react";

export default function LoginForm(props) {
  const [username, setUsername] = React.useState("");
  const [password, setPassword] = React.useState("");

  const handleLogin = (_) => {
    props.onSubmit(username, password);
  };

  const handleChange = (setter) => {
    return function (e) {
      setter(e.target.value);
    };
  };

  return (
    <Dialog open={props.open} onClose={props.onClose}>
      <DialogTitle>Login</DialogTitle>
      <DialogContent>
        <TextField
          label="Email"
          autoFocus
          fullWidth
          variant="standard"
          margin="dense"
          onChange={handleChange(setUsername)}
        />
        <TextField
          label="Password"
          type="password"
          variant="standard"
          fullWidth
          onChange={handleChange(setPassword)}
        />
      </DialogContent>
      <DialogActions>
        <Button variant="contained" onClick={handleLogin}>
          Login
        </Button>
      </DialogActions>
    </Dialog>
  );
}