document.getElementById("productForm").addEventListener("submit", async (e) => {
  e.preventDefault();
  const formData = new FormData(e.target);
  const jsonData = {};
  formData.forEach((value, key) => { jsonData[key] = value });

  try {
    const response = await fetch("http://localhost:3000/product", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(jsonData)
    });

    const result = await response.json();
    showPopup("Produk berhasil ditambahkan!", true);
  } catch (error) {
    showPopup("Gagal menambahkan produk.", false);
  }
});

document.addEventListener("DOMContentLoaded", () => {
  const dummyProduct = {
    name: "Gayo Arabica",
    brand: "Kopi Gunung",
    taste_note: "Chocolate, Fruity",
    origin: "Aceh Gayo",
    weight: 200,
    price: 85000
  };

  fetch("http://localhost:3000/product", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(dummyProduct)
  })
  .then(res => res.json())
  .then(data => {
    showPopup("Produk dummy berhasil dikirim!");
  })
  .catch(err => {
    showPopup("Gagal mengirim produk dummy", false);
  });
});
