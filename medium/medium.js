const fs = require('fs');

// Read the contents of the text file asynchronously
fs.readFile('planets.txt', 'utf8', (err, data) => {
    if (err) {
        console.error('Error reading the file:', err);
        return;
    }

    // Split the file contents by commas to get the planets
    const planets = data.split(',').map(planet => planet.trim());

    // Print the planets to the console using forEach
    console.log('Planets in the solar system:');
    planets.forEach(planet => console.log(planet));
});
