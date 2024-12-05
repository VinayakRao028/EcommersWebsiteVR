const express = require('express');
const path = require('path');
const swaggerUi = require('swagger-ui-express');
const swaggerJsdoc = require('swagger-jsdoc');

const app = express();
const port = process.env.PORT || 3000;

// Serve static files
app.use(express.static(path.join(__dirname, 'static')));

// Set up Swagger
const swaggerOptions = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Ecommerce Website API',
      version: '1.0.0',
      description: 'API documentation for the Ecommerce Website',
    },
  },
  apis: ['./app.js'], // Path to the API docs
};

const swaggerDocs = swaggerJsdoc(swaggerOptions);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

// Set view engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'templates'));

/**
 * @swagger
 * /:
 *   get:
 *     summary: Render the main page
 *     responses:
 *       200:
 *         description: Successfully rendered the main page
 */
app.get('/', (req, res) => {
  res.render('index');
});

/**
 * @swagger
 * /toggle_navbar:
 *   post:
 *     summary: Toggle navbar
 *     responses:
 *       200:
 *         description: Successfully toggled navbar
 */
app.post('/toggle_navbar', (req, res) => {
  // Implement navbar toggling logic here
  res.sendStatus(200);
});

// Start the server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});