document.addEventListener("DOMContentLoaded", () => {
  const user = JSON.parse(localStorage.getItem("user"));

  if (!user || user.role !== "seller") {
    alert("Anda tidak memiliki akses.");
    window.location.href = "login.html";
    return;
  }

  const form = document.getElementById("productForm");

  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const formData = new FormData(form);
    const data = {};
    formData.forEach((value, key) => {
      data[key] = value;
    });

    // Tambahkan seller_id dari user yang login
    data.seller_id = user.id;

    const res = await fetch("http://localhost:3000/product", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data)
    });

    const result = await res.json();
    if (res.ok) {
      alert("Produk berhasil ditambahkan!");
      window.location.href = "index.html";
    } else {
      alert("Gagal menambahkan produk.");
    }
  });
});
