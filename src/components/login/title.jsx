import {
    Grid,
    Avatar,
    Typography,
  } from "@mui/material";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
  
  const Title= () => {
    
    const avatarStyle = { backgroundColor: "#1bbd7e", marginBottom: 8 };
    return (
        <Grid container direction="column" alignItems="center">
        <Avatar style={avatarStyle}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography variant="h5" component="h2" gutterBottom>
          Login
        </Typography>
      </Grid>
    );
  };
  
  export default Title;
  