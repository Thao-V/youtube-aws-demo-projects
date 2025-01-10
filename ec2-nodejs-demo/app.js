const express = require('express');
const os = require('os');

const app = express();
const PORT = 8080;

// Function to get the IPv4 address of the server
function getIPv4Address() {
    const networkInterfaces = os.networkInterfaces();
    for (const interfaceName in networkInterfaces) {
        const interfaces = networkInterfaces[interfaceName];
        for (const iface of interfaces) {
            if (iface.family === 'IPv4' && !iface.internal) {
                return iface.address; // Return the first non-internal IPv4 address
            }
        }
    }
    return 'IPv4 address not found';
}

// Define a route to return the server's IPv4 address and hostname
app.get('/', (req, res) => {
    const ipv4Address = getIPv4Address();
    const hostname = os.hostname();
    res.send(`Server IPv4: ${ipv4Address}<br>Hostname: ${hostname}`);
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
