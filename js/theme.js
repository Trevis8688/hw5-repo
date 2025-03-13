function setTheme(theme) {
    const root = document.documentElement;

    if (theme === 'evil'){
        root.style.setProperty('--background-color', '#000000');
        root.style.setProperty('--nav-color', '#ffbbbb');
        root.style.setProperty('--accent-color', '#df2525');
    }
    else{
        root.style.setProperty('--background-color', '#ffffff');
        root.style.setProperty('--nav-color', '#95c7ff');
        root.style.setProperty('--accent-color', '#007bff');
    }
}
function toggleTheme()
{
    const currTheme = localStorage.getItem('theme') || 'good';
    const newTheme = currTheme === 'good'? 'evil': 'good';
    localStorage.setItem('theme', newTheme);
    setTheme(newTheme);
}

function setSavedTheme() {
    const savedTheme = localStorage.getItem('theme');
    if(savedTheme) {
        setTheme(savedTheme);
        document.getElementById('themeToggle').checked = (savedTheme === 'evil');
    }
}

// document.addEventListener('DOMContentLoaded', setSavedTheme);

document.addEventListener('DOMContentLoaded', function () {
    // Show the theme toggle button (it is hidden by default)
    document.getElementById('theme-toggle-container').style.display = 'block';

    setSavedTheme();
});