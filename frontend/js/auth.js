// Fungsi untuk register
async function registerUser(data) {
  const res = await fetch("http://localhost:3000/register", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data)
  });
  const result = await res.json();
  alert(result.message);
}

// Fungsi untuk login
async function loginUser(data) {
  const res = await fetch("http://localhost:3000/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data)
  });
  const result = await res.json();
  alert(result.message);
}
function getCurrentUser() {
  return JSON.parse(localStorage.getItem("user"));
}

function renderAuthUI() {
  const authArea = document.getElementById("authArea");
  const user = getCurrentUser();

  if (user) {
    authArea.innerHTML = `
      <a href="#" title="Pesan" class="text-xl">💬</a>
      <a href="#" title="Favorit" class="text-xl">❤️</a>
      <a href="#" title="Keranjang" class="text-xl">🛒</a>
      <div class="bg-gray-800 text-white rounded-full w-8 h-8 flex items-center justify-center uppercase text-sm font-bold">
        ${user.email.charAt(0)}
      </div>
      <button onclick="logout()" class="text-sm text-red-600 hover:underline">Logout</button>
    `;
  } else {
    authArea.innerHTML = `
      <a href="login.html" class="border border-black px-3 py-1 rounded">Login</a>
      <a href="register.html" class="bg-black text-white px-3 py-1 rounded">Sign Up</a>
    `;
  }
}

function logout() {
  localStorage.removeItem("user");
  renderAuthUI();
}

window.addEventListener("DOMContentLoaded", renderAuthUI);
