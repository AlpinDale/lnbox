const prefersDark = window.matchMedia('(prefers-color-scheme: dark)');

let isDark = localStorage.getItem('theme') === 'dark' ||
    (localStorage.getItem('theme') === null && prefersDark.matches);

updateThemeIcon(isDark);

prefersDark.addEventListener('change', (e) => {
    if (localStorage.getItem('theme') === null) {
        isDark = e.matches;
        updateThemeIcon(isDark);
    }
});

function toggleTheme() {
    isDark = !isDark;
    updateThemeIcon(isDark);
    localStorage.setItem('theme', isDark ? 'dark' : 'light');

    if (isDark) {
        document.documentElement.style.setProperty('--bg-color', '#1a1a1f');
        document.documentElement.style.setProperty('--container-bg', '#2d2d2d');
        document.documentElement.style.setProperty('--text-color', '#e0e0e0');
        document.documentElement.style.setProperty('--email-bg', '#3d3d3d');
        document.documentElement.style.setProperty('--button-color', '#9c27b0');
        document.documentElement.style.setProperty('--button-hover', '#7b1fa2');
        document.documentElement.style.setProperty('--bg-box-1', '#1d1d28');
        document.documentElement.style.setProperty('--bg-box-2', '#281d28');
    } else {
        document.documentElement.style.setProperty('--bg-color', '#f5f5fa');
        document.documentElement.style.setProperty('--container-bg', 'white');
        document.documentElement.style.setProperty('--text-color', '#333');
        document.documentElement.style.setProperty('--email-bg', '#f0f0f0');
        document.documentElement.style.setProperty('--button-color', 'purple');
        document.documentElement.style.setProperty('--button-hover', '#800080');
        document.documentElement.style.setProperty('--bg-box-1', '#E2E2F2');
        document.documentElement.style.setProperty('--bg-box-2', '#F2E2F2');
    }
}

function updateThemeIcon(isDark) {
    const icon = document.querySelector('.theme-toggle svg path');
    if (isDark) {
        icon.setAttribute('d', 'M12 3c.132 0 .263 0 .393 0a7.5 7.5 0 0 0 7.92 12.446A9 9 0 1 1 12 3z');
    } else {
        icon.setAttribute('d', 'M12 18c-3.309 0-6-2.691-6-6s2.691-6 6-6 6 2.691 6 6-2.691 6-6 6zm0-10c-2.206 0-4 1.794-4 4s1.794 4 4 4 4-1.794 4-4-1.794-4-4-4zm0-4a1 1 0 0 1-1-1V1a1 1 0 0 1 2 0v2a1 1 0 0 1-1 1zm0 20a1 1 0 0 1-1-1v-2a1 1 0 1 1 2 0v2a1 1 0 0 1-1 1zM5.64 6.64a.997.997 0 0 1-.707-.293L3.52 4.93a1 1 0 0 1 1.414-1.414l1.414 1.414a1 1 0 0 1-.707 1.707zm12.72 12.72a.997.997 0 0 1-.707-.293l-1.414-1.414a1 1 0 1 1 1.414-1.414l1.414 1.414a1 1 0 0 1-.707 1.707zM3 13H1a1 1 0 1 1 0-2h2a1 1 0 0 1 0 2zm20 0h-2a1 1 0 1 1 0-2h2a1 1 0 1 1 0 2zM4.93 20.48a1 1 0 0 1-.707-1.707l1.414-1.414a1 1 0 0 1 1.414 1.414l-1.414 1.414a.997.997 0 0 1-.707.293zm14.14-14.14a1 1 0 0 1-.707-1.707l1.414-1.414a1 1 0 1 1 1.414 1.414l-1.414 1.414a.997.997 0 0 1-.707.293z');
    }
}

toggleTheme();
toggleTheme();  // needed to set correct initial state