async function handleLogin(event) {
    event.preventDefault();

    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    const message = document.getElementById('loginMessage');

    const token = btoa(`${username}:${password}`);

    try {
        const optionsResponse = await fetch('/library', {
            method: 'OPTIONS',
            headers: {
                'Authorization': `Basic ${token}`
            }
        });

        const response = await fetch('/library', {
            method: 'GET',
            headers: {
                'Authorization': `Basic ${token}`,
                'Accept': 'text/html'
            },
            credentials: 'include'
        });

        if (response.ok) {
            sessionStorage.setItem('calibreAuth', token);
            window.location.href = '/library';
        } else {
            console.error('Login failed:', response.status, response.statusText);
            message.textContent = `Login failed: ${response.status} ${response.statusText}`;
        }
    } catch (error) {
        console.error('Login error:', error);
        message.textContent = 'Connection error. Please try again.';
    }
}

document.addEventListener('DOMContentLoaded', () => {
    const token = sessionStorage.getItem('calibreAuth');
    if (token) {
        fetch('/library', {
            method: 'GET',
            headers: {
                'Authorization': `Basic ${token}`,
                'Accept': 'text/html'
            },
            credentials: 'include'
        }).then(response => {
            if (response.ok) {
                window.location.href = '/library';
            } else {
                sessionStorage.removeItem('calibreAuth');
            }
        }).catch(() => {
            sessionStorage.removeItem('calibreAuth');
        });
    }
});