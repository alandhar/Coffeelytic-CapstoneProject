// ========== FILE: js/productList.js (Live Search support) ==========
let allProducts = [];
let currentPage = 1;

function loadProducts(page = 1) {
  fetch(`http://localhost:3000/product?page=${page}&limit=1000`)
    .then(res => res.json())
    .then(products => {
      allProducts = products;
      renderProducts(products);
      renderPagination(1); // untuk batas halaman jika dibutuhkan
    });
}

function renderProducts(products) {
  const container = document.getElementById('product-list');
  if (products.length === 0) {
    container.innerHTML = "<p class='text-gray-600'>Produk tidak ditemukan.</p>";
    return;
  }

  container.innerHTML = products.map(p => `
    <div class="border p-4 rounded shadow">
      <img src="${p.image_url || 'https://via.placeholder.com/150'}" 
           class="w-full h-32 object-cover mb-2 rounded">
      <h2 class="font-bold">${p.name}</h2>
      <p class="text-sm text-gray-600">${p.origin}</p>
      <p class="text-green-700 font-semibold">Rp${p.price.toLocaleString()}</p>
    </div>
  `).join('');
}

function renderPagination(page) {
  const container = document.getElementById('pagination');
  container.innerHTML = ''; // tidak digunakan dalam mode search
}

document.getElementById('searchInput').addEventListener('input', function (e) {
  const keyword = e.target.value.toLowerCase();
  const filtered = allProducts.filter(p => 
    p.name.toLowerCase().includes(keyword) || 
    p.origin.toLowerCase().includes(keyword)
  );
  renderProducts(filtered);
});

document.addEventListener("DOMContentLoaded", () => {
  loadProducts();
});
// ========== END FILE: js/productList.js ==========
// ========== FILE: js/productList.js (lanjutan dengan filter dropdown) ==========
function applyFilters() {
  const keyword = document.getElementById('searchInput').value.toLowerCase();
  const origin = document.getElementById('originFilter').value.toLowerCase();
  const min = parseInt(document.getElementById('minPrice').value) || 0;
  const max = parseInt(document.getElementById('maxPrice').value) || Infinity;

  const filtered = allProducts.filter(p => {
    const matchKeyword = p.name.toLowerCase().includes(keyword) || p.origin.toLowerCase().includes(keyword);
    const matchOrigin = origin ? p.origin.toLowerCase() === origin : true;
    const matchPrice = p.price >= min && p.price <= max;
    return matchKeyword && matchOrigin && matchPrice;
  });

  renderProducts(filtered);
}

['searchInput', 'originFilter', 'minPrice', 'maxPrice'].forEach(id => {
  document.getElementById(id).addEventListener('input', applyFilters);
});
