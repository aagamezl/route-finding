// Perlin noise function
function perlinNoise(x, y) {
  // Your implementation of Perlin noise goes here
  // This function should return a value between 0 and 1 based on the given (x, y) coordinates
  // Perlin noise is a complex algorithm, and its implementation is beyond the scope of this response
  // You can find various implementations online, or you can use a library that provides Perlin noise functions.
  // For simplicity, you can also use a random value generator between 0 and 1 as a placeholder.
  return Math.random();
}

// Function to generate the 2D map using procedural generation
function generateMap({ width, height, solidThreshold, noise }) {
  const map = [];

  // Loop through each row and column to generate the map
  for (let y = 0; y < height; y++) {
    const row = [];
    for (let x = 0; x < width; x++) {
      // Calculate the noise value for the current (x, y) coordinates
      const noiseValue = perlinNoise(x * noise, y * noise);

      // Determine whether the block should be solid or non-solid based on the noise value
      const block = noiseValue > solidThreshold ? 0 : 1;

      row.push(block);
    }
    map.push(row);
  }

  return map;
}

const objectTypes = [
  { code: 0, color: '#332b31', name: 'GROUND1' },
  { code: 1, color: '#70686e', name: 'GROUND2' },
  { code: 2, color: '#898e63', name: 'BUILDING1' },
  { code: 3, color: '#4c4f38', name: 'BUILDING2' },
  { code: 4, color: '#383f0a', name: 'BUILDING3' },
  { code: 5, color: '#3588f4', name: 'LAKES1' },
  { code: 6, color: '#0a499b', name: 'LAKES2' },
  { code: 7, color: '#93f2a8', name: 'GRASS1' },
  { code: 8, color: '#18bc3c', name: 'GRASS2' },
  { code: 9, color: '#77411f', name: 'TREES1' },
  { code: 10, color: '#c45c1b', name: 'TREES2' },
  { code: 11, color: '#d9f4f4', name: 'BRIDGES' },
];

function getRandomNumber(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function generateRandomMap(config) {
  const { width, height, tileSize } = config;
  const map = [];

  // Helper function to create an empty map
  function createEmptyMap(width, height) {
    const map = [];
    for (let i = 0; i < height; i++) {
      // const row = new Array(width).fill('grass'); // Fill the map with grass by default
      const row = new Array(width).fill(objectTypes[7].code); // Fill the map with grass by default
      map.push(row);
    }
    return map;
  }

  // Helper function to randomly select an object type
  function getRandomObjectType() {
    // const objectTypes = [
    //   'building',
    //   'building',
    //   'building',
    //   'lakes',
    //   'lakes',
    //   'grass',
    //   'grass',
    //   'ground',
    //   'ground',
    //   'trees',
    //   'trees',
    //   'bridges',
    // ];

    // const randomIndex = Math.floor(Math.random() * objectTypes.length);
    const randomIndex = getRandomNumber(0, objectTypes.length);

    return objectTypes[randomIndex].code;
  }

  // Function to add an object type to the map at given coordinates
  function addObjectToMap(x, y, objectType) {
    const objectSize = Math.floor(Math.random() * 3) + 1; // Random object size between 1 and 3 tiles
    for (let i = y; i < y + objectSize && i < height; i++) {
      for (let j = x; j < x + objectSize && j < width; j++) {
        map[i][j] = objectType;
      }
    }
  }

  // Generate an empty map
  map.push(...createEmptyMap(width, height));

  // Randomly add objects to the map
  for (let y = 0; y < height; y += tileSize) {
    for (let x = 0; x < width; x += tileSize) {
      const objectType = getRandomObjectType();
      addObjectToMap(x, y, objectType);
    }
  }

  return map;
}

// // Example usage:
// const config = {
//   width: 40,      // Width of the map in tiles
//   height: 20,     // Height of the map in tiles
//   tileSize: 32,    // Size of each tile in pixels (assuming tiles are square)
// };

// const generatedRandomMap = generateRandomMap(config);
// console.log(generatedRandomMap);
