import ReactLogo from '../../assets/images/header.webp'; // Mengimpor gambar dari folder src/assets

function Image() {
  return (
    <div>
      <img
        src={ReactLogo} // Menggunakan gambar yang sudah diimpor
        alt="React logo"
      />
    </div>
  );
}

export default Image;
