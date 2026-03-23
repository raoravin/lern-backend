// server.js
// This code demonstrates the Express.js req and res objects in action
const express = require('express');

// Create our Express app
const app = express();

// Middleware to parse incoming JSON data (req.body)
app.use(express.json());


// ---------------------------------------------------------
// ROUTE 1: Demonstrating req.query and req.headers
// Try navigating to: http://localhost:3000/search?term=shoes&sort=price
// ---------------------------------------------------------
app.get('/search', (req, res) => {
    console.log('[SERVER] Received a request on /search');
    
    // Extract data from the request object
    const searchTerm = req.query.term; // "shoes"
    const sortOrder = req.query.sort;  // "price"
    const browserAgent = req.headers['user-agent'];

    // Send a response object back
    res.status(200).json({
        message: 'Search completed successfully!',
        youSearchedFor: searchTerm,
        sortedBy: sortOrder,
        yourBrowserIs: browserAgent
    });
});


// ---------------------------------------------------------
// ROUTE 2: Demonstrating req.params
// Try navigating to: http://localhost:3000/users/999
// ---------------------------------------------------------
app.get('/users/:userID', (req, res) => {
    console.log(`[SERVER] Received request for user ID: ${req.params.userID}`);
    
    // :userID in the route becomes req.params.userID
    const requestedId = req.params.userID;

    if (requestedId === '999') {
        res.status(200).json({ user: 'Ravin', role: 'Admin' });
    } else {
        res.status(404).json({ error: 'User not found in our database.' });
    }
});


// ---------------------------------------------------------
// START THE SERVER
// ---------------------------------------------------------
app.listen(3000, () => {
    console.log('🚀 Express Server running on http://localhost:3000');
    console.log('Open your browser and test these two URLs:');
    console.log('1. http://localhost:3000/search?term=laptop&sort=desc');
    console.log('2. http://localhost:3000/users/999');
});
