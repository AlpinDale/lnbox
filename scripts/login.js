async function handleLogin(event) {
    event.preventDefault();

    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    const message = document.getElementById('loginMessage');

    const token = btoa(`${username}:${password}`);
    
    try {
        const response = await fetch('/library', {
            method: 'HEAD',
            headers: {
                'Authorization': `Basic ${token}`
            }
        });

        if (response.ok) {
            sessionStorage.setItem('calibreAuth', token);
            window.location.href = '/library';
        } else {
            message.textContent = 'Invalid username or password';
        }
    } catch (error) {
        message.textContent = 'Connection error. Please try again.';
        console.error('Login error:', error);
    }
}

document.addEventListener('DOMContentLoaded', () => {
    const token = sessionStorage.getItem('calibreAuth');
    if (token) {
        fetch('/library', {
            method: 'HEAD',
            headers: {
                'Authorization': `Basic ${token}`
            }
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