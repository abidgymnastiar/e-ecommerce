import { useState, useEffect } from "react";
import axios from "axios";
import Card from "@mui/material/Card";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Bayar from "./list";

const Checkoutproduk = () => {
  const [selectedPackages, setSelectedPackages] = useState([]);

  const fetchCheckoutData = () => {
    axios
      .get("http://localhost:3004/checkout")
      .then((response) => {
        setSelectedPackages(response.data);
      })
      .catch((error) => {
        console.error("Error fetching checkout data:", error);
      });
  };

  useEffect(() => {
    fetchCheckoutData();

    const intervalId = setInterval(fetchCheckoutData, 3000);
    return () => clearInterval(intervalId);
  }, []);

  const handleRemove = (pkgId) => {
    axios
      .delete(`http://localhost:3004/checkout/${pkgId}`)
      .then(() => {
        setSelectedPackages((prevPackages) =>
          prevPackages.filter((pkg) => pkg.id !== pkgId)
        );
      })
      .catch((error) => {
        console.error("Error removing package:", error);
      });
  };

  return (
    <Box sx={{ maxWidth: 600, mx: "auto", mt: 4 }}>
      <Typography
        variant="h4"
        component="h1"
        sx={{ textAlign: "center", mb: 3, color: "#333" }}
      >
        Checkout Produk
      </Typography>
      {selectedPackages.length > 0 ? (
        <Stack spacing={2}>
          {selectedPackages.map((pkg) => (
            <Card key={pkg.id} variant="outlined" sx={{ p: 2 }}>
              <Box>
                <Stack
                  direction="row"
                  sx={{
                    justifyContent: "space-between",
                    alignItems: "center",
                    mb: 1,
                  }}
                >
                  <Typography variant="h5" component="div">
                    {pkg.name}
                  </Typography>
                  <Typography variant="h6" component="div">
                    Rp.{pkg.price.toLocaleString("id-ID")}
                  </Typography>
                </Stack>
                <Typography variant="body2" sx={{ color: "text.secondary" }}>
                  {pkg.details}
                </Typography>
              </Box>
              <Button
                size="small"
                sx={{
                  backgroundColor: "#f44336",
                  color: "white",
                  mt: 2,
                  "&:hover": { backgroundColor: "#d32f2f" },
                }}
                onClick={() => handleRemove(pkg.id)}
              >
                Hapus
              </Button>
            </Card>
          ))}
        </Stack>
      ) : (
        <Typography
          variant="body1"
          sx={{
            textAlign: "center",
            color: "text.secondary",
            fontStyle: "italic",
          }}
        >
          Detail paket yang dipilih akan muncul di sini.
        </Typography>
      )}
      <Bayar />
    </Box>
  );
};

export default Checkoutproduk;
