import { useState, useEffect } from "react";
import axios from "axios";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import Button from "@mui/material/Button";

export default function FolderList() {
  const [selectedPackages, setSelectedPackages] = useState([]); // Data checkout
  const [totalPrice, setTotalPrice] = useState(0); // Total harga

  // Fungsi untuk mengambil data checkout
  const fetchCheckoutData = () => {
    axios
      .get("http://localhost:3004/checkout") // Ganti URL sesuai server JSON
      .then((response) => {
        const packages = response.data;
        setSelectedPackages(packages);

        // Hitung total harga
        const total = packages.reduce((sum, pkg) => sum + (pkg.price || 0), 0);
        setTotalPrice(total);
      })
      .catch((error) => {
        console.error("Error fetching checkout data:", error);
      });
  };

  // Fungsi untuk menyimpan pembayaran ke db.json
  const handlePayment = () => {
    const paymentData = {
      total: totalPrice,
      timestamp: new Date().toISOString(), // Menyimpan waktu pembayaran
    };

    // Mengirim data pembayaran ke server (db.json) dengan POST
    axios
      .post("http://localhost:3004/bayar", paymentData) // Endpoint untuk menyimpan pembayaran
      .then(() => {
        alert("Pembayaran berhasil dilakukan!");
        // Bersihkan data setelah pembayaran
        setSelectedPackages([]);
        setTotalPrice(0);
      })
      .catch((error) => {
        console.error("Error saving payment data:", error);
      });
  };

  // Ambil data checkout saat komponen pertama kali dirender
  useEffect(() => {
    fetchCheckoutData();

    // Polling untuk pembaruan setiap 3 detik
    const intervalId = setInterval(fetchCheckoutData, 3000);

    // Bersihkan interval saat komponen dibongkar
    return () => clearInterval(intervalId);
  }, []);

  return (
    <List sx={{ width: "100%", bgcolor: "background.paper" }}>
      <ListItem>
        <ListItemText
          primary="Bayar"
          secondary={`Rp. ${totalPrice.toLocaleString("id-ID")}`} // Format ke Rupiah
          sx={{
            "& .MuiListItemText-primary": {
              fontSize: "20px", // Ubah ukuran font primary
              fontWeight: "bold", // Tambahkan gaya tebal
            },
            "& .MuiListItemText-secondary": {
              fontSize: "18px", // Ubah ukuran font secondary
              color: "green", // (Opsional) Ubah warna
            },
          }}
        />
      </ListItem>
      <Button
        sx={{
          backgroundColor: "#52166d",
          color: "white",
          width: "100%",
          padding: 1.5,
          "&:hover": { backgroundColor: "#3b104c" },
        }}
        variant="contained"
        onClick={handlePayment} // Panggil fungsi untuk menyimpan pembayaran
      >
        Lanjutkan Pembayaran
      </Button>
    </List>
  );
}
