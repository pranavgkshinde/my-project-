// login.js
function handleCredentialResponse(response) {
    // Decoding the credential response
    const responsePayload = decodeJwtResponse(response.credential);

    console.log("ID: " + responsePayload.sub);
    console.log('Full Name: ' + responsePayload.name);
    console.log('Given Name: ' + responsePayload.given_name);
    console.log('Family Name: ' + responsePayload.family_name);
    console.log("Image URL: " + responsePayload.picture);
    console.log("Email: " + responsePayload.email);

    // Here, you would typically send this information to your server
    // to create a session or JWT for the user
    // For example:
    // sendToServer(responsePayload);
}

function decodeJwtResponse(token) {
    var base64Url = token.split('.')[1];
    var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    var jsonPayload = decodeURIComponent(atob(base64).split('').map(function(c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));

    return JSON.parse(jsonPayload);
}

// Function to send user data to your server (implement this based on your backend)
function sendToServer(userData) {
    // Example using fetch API
    fetch('/auth/google', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
    })
    .then(response => response.json())
    .then(data => {
        console.log('Success:', data);
        // Handle successful login (e.g., redirect to dashboard)
    })
    .catch((error) => {
        console.error('Error:', error);
        // Handle errors
    });
}