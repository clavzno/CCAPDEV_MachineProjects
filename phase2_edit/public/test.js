const express = require('express');
const routes = require('../routes/routes.js');


const app = express();
const PORT = process.env.PORT || 3000;



// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});