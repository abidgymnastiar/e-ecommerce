import { useState, useEffect } from "react";
import { v4 as uuidv4 } from "uuid"; // Import uuid
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import axios from "axios";
import PackageCard from "./cardKategori";  // Pastikan path benar
import Checkoutproduk from "../checkout/check";

export default function ScrollableTabsButtonPrevent() {
  const [categories, setCategories] = useState([]); // Data kategori dari API
  const [packages, setPackages] = useState([]); // Data paket dari API
  const [value, setValue] = useState(0); // Tab aktif
  const [selectedPackages, setSelectedPackages] = useState([]); // Paket yang dipilih

  // Handle perubahan tab
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  // Ambil data kategori dan paket dari API
  useEffect(() => {
    // Ambil kategori
    axios
      .get("http://localhost:3004/categories")
      .then((response) => setCategories(response.data))
      .catch((error) => console.error("Error fetching categories:", error));

    // Ambil paket
    axios
      .get("http://localhost:3004/packages")
      .then((response) => setPackages(response.data))
      .catch((error) => console.error("Error fetching packages:", error));
  }, []);

  // Pastikan kategori terpilih ada
  const selectedCategory = categories[value];
  if (!selectedCategory) {
    return <div>Loading...</div>; // Jika kategori belum ada, tampilkan loading
  }

  // Filter paket berdasarkan kategori yang dipilih
  const filteredPackages = packages.filter(
    (pkg) => pkg.categoryId === selectedCategory.id
  );

  // Fungsi untuk menambahkan paket ke checkout dan menyimpannya di DB
  const handleAddToCheckout = (pkg) => {
    // Membuat UUID untuk paket yang ditambahkan
    const uniquePkg = {
      ...pkg,
      uuid: uuidv4(), // Tambahkan UUID baru
    };

    // Update state lokal untuk checkout
    setSelectedPackages((prev) => [...prev, uniquePkg]);

    // Kirim data ke API untuk menyimpan di checkout array
    axios
      .post("http://localhost:3004/checkout", uniquePkg)
      .then((response) => {
        console.log("Package added to checkout:", response.data);
      })
      .catch((error) => {
        console.error("Error adding package to checkout:", error);
      });
  };

  return (
    <Container maxWidth="xl">
      <Box
        sx={{
          maxWidth: { xs: 320, sm: 480, lg: 600 },
          bgcolor: "background.paper",
        }}
      >
        <Tabs
          value={value}
          onChange={handleChange}
          variant="scrollable"
          scrollButtons="auto"
          aria-label="scrollable prevent tabs example"
        >
          {categories.map((category) => (
            <Tab key={category.id} label={category.name} />
          ))}
        </Tabs>
      </Box>
      <Box sx={{ flexGrow: 1, marginTop: 2 }}>
        <Grid container spacing={2}>
          {/* Bagian kiri untuk PackageCard */}
          <Grid item xs={8}>
            <Box
              sx={{
                display: "flex",
                flexWrap: "wrap",
                gap: 2,
                bgcolor: "#f5f5f5",
                padding: 2,
                borderRadius: 2,
              }}
            >
              {filteredPackages.length > 0 ? (
                filteredPackages.map((packageData) => (
                  <PackageCard
                    key={packageData.id}
                    packageData={packageData}
                    onSelect={() => handleAddToCheckout(packageData)}
                  />
                ))
              ) : (
                <div>No packages available for this category.</div>
              )}
            </Box>
          </Grid>
          {/* Bagian kanan untuk Checkout */}
          <Grid item xs={4}>
            <Checkoutproduk selectedPackages={selectedPackages} />
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
}
