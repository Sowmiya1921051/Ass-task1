const express = require('express');
const app = express();
const path = require('path');
const fs = require('fs'); 
app.use(express.static('public', { 'extensions': ['html', 'css'] }));


app.listen(8080, () => {
    console.log("Server is listening on port 8080");
});

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

app.get('/data', (req, res) => {
    // Read the content of data.json
    fs.readFile(path.join(__dirname, 'data.json'), 'utf8', (err, data) => {
        if (err) {
            console.error('Error reading data.json:', err);
            res.status(500).send('Internal Server Error');
            return;
        }

        // Parse JSON data
        const jsonData = JSON.parse(data);

        // Send the JSON data as the response
        res.json(jsonData);
    });
});
