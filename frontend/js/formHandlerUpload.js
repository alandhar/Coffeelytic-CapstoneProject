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
    const name = formData.get("name");
    const price = parseFloat(formData.get("price"));
    const weight = parseFloat(formData.get("weight"));

    if (!name || price <= 0 || weight < 100) {
        alert("Pastikan semua field diisi. Harga harus > 0 dan berat minimal 100 gram.");
        return;
    }

    formData.append("seller_id", user.id);

    const res = await fetch("http://localhost:3000/product-upload", {
        method: "POST",
        body: formData
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
