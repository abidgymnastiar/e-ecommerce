import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import PropTypes from 'prop-types';

const PackageCard = ({ packageData, onSelect }) => {
  return (
    <Box sx={{ marginBottom: 2 }}>
      <Card variant="outlined" sx={{ borderRadius: 3, padding: 2, width: 400 }}>
        <CardContent>
          <Typography gutterBottom sx={{ color: "text.secondary", fontSize: 14 }}>
            {packageData.name}
          </Typography>
          <Typography variant="h5" component="div">
            {packageData.name}
          </Typography>
          <Typography sx={{ color: "text.secondary" }}>
            {packageData.details}
          </Typography>
          <Typography sx={{ marginTop: 1 }}>
            Rp.{packageData.price.toLocaleString("id-ID")}
          </Typography>
        </CardContent>
        <CardActions>
          <Button
            size="large"
            sx={{
              backgroundColor: "#52166d",
              color: "white",
              "&:hover": { backgroundColor: "#3b104c" },
            }}
            onClick={onSelect} // Panggil fungsi onSelect
          >
            Beli
          </Button>
        </CardActions>
      </Card>
    </Box>
  );
};

PackageCard.propTypes = {
  packageData: PropTypes.shape({
    name: PropTypes.string.isRequired,
    details: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
  }).isRequired,
  onSelect: PropTypes.func.isRequired, // Tambahkan prop ini
};

export default PackageCard;