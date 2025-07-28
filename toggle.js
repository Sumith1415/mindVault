let dark_mode = localStorage.getItem('darkMode');
const toggleBtn = document.getElementById('toggleBtn');

const activateLightMode = () => {
    document.body.classList.remove("dark_mode");
    localStorage.setItem('darkMode', null);
}

const activateDarkMode = () => {
    document.body.classList.add("dark_mode");
    localStorage.setItem('darkMode', 'active');
}

toggleBtn.addEventListener('click', () => {
    dark_mode = localStorage.getItem('darkMode');
    dark_mode === 'active' ? activateLightMode() : activateDarkMode();
});


if (dark_mode === "active") activateDarkMode();