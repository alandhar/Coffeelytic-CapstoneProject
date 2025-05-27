function showPopup(message, isSuccess = true) {
  const popup = document.getElementById("popup");
  popup.classList.remove("hidden");
  popup.className = isSuccess ? "mt-4 p-4 rounded bg-green-100 text-green-700" : "mt-4 p-4 rounded bg-red-100 text-red-700";
  popup.innerText = message;
}
