// Get elements
const logoutBtn = document.getElementById('logoutBtn');
const logoutModal = document.getElementById('logoutModal');
const cancelLogout = document.getElementById('cancelLogout');
const confirmLogout = document.getElementById('confirmLogout');

// Show modal
logoutBtn.addEventListener('click', () => {
  logoutModal.style.display = 'flex';
});

// Cancel logout
cancelLogout.addEventListener('click', () => {
  logoutModal.style.display = 'none';
});

// Confirm logout
confirmLogout.addEventListener('click', () => {
  // Clear stored user data
  localStorage.removeItem('financePlus_user');
  localStorage.removeItem('financePlus_token');

  // Optional: clear all storage
  // localStorage.clear();

  // Redirect to login page
  window.location.href = 'login.html';
});

// Close modal if clicking outside
window.addEventListener('click', (e) => {
  if (e.target === logoutModal) {
    logoutModal.style.display = 'none';
  }
  // Check if user is logged in
const user = localStorage.getItem('financePlus_user');

if (!user) {
  // Redirect if not logged in
  window.location.href = 'login.html';
}
localStorage.setItem('financePlus_user', JSON.stringify({ name: "Nathan" }));
localStorage.setItem('financePlus_token', "abc123");
});