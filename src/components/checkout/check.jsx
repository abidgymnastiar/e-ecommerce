import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import axios from "axios";

const Checkoutproduk = () => {
  const [selectedPackages, setSelectedPackages] = useState([]); // State untuk menyimpan data checkout

  // Fungsi untuk mengambil data checkout dari API
  const fetchCheckoutData = () => {
    axios
      .get("http://localhost:3004/checkout") // Ganti dengan URL yang sesuai
      .then((response) => {
        setSelectedPackages(response.data); // Update state dengan data yang diterima
      })
      .catch((error) => {
        console.error("Error fetching checkout data:", error);
      });
  };

  // Ambil data checkout saat komponen pertama kali dirender
  useEffect(() => {
    fetchCheckoutData();

    // Polling untuk memeriksa pembaruan setiap 3 detik
    const intervalId = setInterval(fetchCheckoutData, 3000);

    // Bersihkan interval ketika komponen dibongkar
    return () => clearInterval(intervalId);
  }, []); // Efek dijalankan hanya sekali setelah komponen pertama kali dirender

  // Fungsi untuk menghapus paket dari checkout
  const handleRemove = (pkgId) => {
    axios
      .delete(`http://localhost:3004/checkout/${uuid}`) // Hapus dari db.json
      .then(() => {
        // Update state setelah penghapusan
        setSelectedPackages((prevPackages) =>
          prevPackages.filter((pkg) => pkg.id !== pkgId)
        );
      })
      .catch((error) => {
        console.error("Error removing package:", error);
      });
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>Checkout Produk</h1>
      {selectedPackages.length > 0 ? (
        <ul style={styles.packageList}>
          {selectedPackages.map((pkg) => (
            <li key={pkg.id} style={styles.packageItem}>
              <div style={styles.packageDetail}>
                <strong>Nama Paket:</strong> <span>{pkg.name}</span>
              </div>
              <div style={styles.packageDetail}>
                <strong>Detail:</strong> <span>{pkg.details}</span>
              </div>
              <div style={styles.packageDetail}>
                <strong>Harga:</strong>{" "}
                <span style={styles.price}>
                  Rp.{pkg.price.toLocaleString("id-ID")}
                </span>
              </div>
              {/* Tombol Hapus */}
              <button
                style={styles.removeButton}
                onClick={() => handleRemove(pkg.id)} // Panggil handleRemove dengan ID paket
              >
                Hapus
              </button>
            </li>
          ))}
        </ul>
      ) : (
        <p style={styles.emptyMessage}>
          Detail paket yang dipilih akan muncul di sini.
        </p>
      )}
    </div>
  );
};

Checkoutproduk.propTypes = {
  selectedPackages: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired, // ID unik untuk setiap paket
      name: PropTypes.string,
      details: PropTypes.string,
      price: PropTypes.number,
    })
  ).isRequired,
};

// Inline styles
const styles = {
  container: {
    padding: "20px",
    backgroundColor: "#fafafa",
    borderRadius: "8px",
    boxShadow: "0 2px 10px rgba(0, 0, 0, 0.1)",
    width: "100%",
    maxWidth: "600px",
    margin: "0 auto",
  },
  title: {
    textAlign: "center",
    fontSize: "24px",
    fontWeight: "bold",
    marginBottom: "20px",
    color: "#333",
  },
  packageList: {
    listStyleType: "none",
    padding: "0",
  },
  packageItem: {
    backgroundColor: "#fff",
    padding: "15px",
    borderRadius: "8px",
    marginBottom: "10px",
    boxShadow: "0 2px 5px rgba(0, 0, 0, 0.1)",
  },
  packageDetail: {
    marginBottom: "8px",
    fontSize: "16px",
    color: "#555",
  },
  price: {
    color: "#ff5722",
    fontSize: "18px",
    fontWeight: "bold",
  },
  emptyMessage: {
    textAlign: "center",
    color: "#888",
    fontStyle: "italic",
  },
  removeButton: {
    backgroundColor: "#f44336", // Warna merah
    color: "white",
    border: "none",
    padding: "8px 16px",
    marginTop: "10px",
    cursor: "pointer",
    borderRadius: "5px",
    fontSize: "14px",
    transition: "background-color 0.3s",
  },
};

export default Checkoutproduk;
