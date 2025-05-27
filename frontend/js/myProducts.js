document.addEventListener("DOMContentLoaded", () => {
  const user = JSON.parse(localStorage.getItem("user"));
  if (!user || user.role !== "seller") {
    alert("Halaman ini hanya untuk seller.");
    window.location.href = "login.html";
    return;
  }

  fetch(`http://localhost:3000/product?seller_id=${user.id}`)
    .then(res => res.json())
    .then(products => {
      const container = document.getElementById('product-list');
      if (products.length === 0) {
        container.innerHTML = "<p class='text-gray-600'>Belum ada produk.</p>";
        return;
      }

      container.innerHTML = products.map(p => `
        <div class="border p-4 rounded shadow">
          <img src="${p.image_url || 'https://via.placeholder.com/150'}" class="w-full h-32 object-cover mb-2 rounded">
          <h2 class="font-bold">${p.name}</h2>
          <p class="text-sm">${p.origin}</p>
          <p class="text-green-700 font-semibold mt-1">Rp${p.price.toLocaleString()}</p>
        </div>
      `).join('');
    });
});
