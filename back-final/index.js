import express from 'express';
import cors from 'cors';
import { createServer } from 'http';
import pg from 'pg';
const { Pool } = pg;
const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'shopping_cart',
  password: 'mysecretpassword',
  port: 5432,
});

pool.on('error', (err, client) => {
  console.error('Unexpected error on idle client', err);
  process.exit(-1);
});


const app = express();
const httpServer = createServer(app);

app.use(cors());

app.use(express.json());

app.get('/', (req, res) => {
    res.send('Hello, world!');
});
app.get('/products', async (req, res) => {
    try {
      const response = await pool.query('SELECT * FROM products');
      res.json(response.rows);
    } catch (error) {
      console.error('Error fetching products:', error);
      res.status(500).json({ error: 'Error fetching products' });
    }
})

app.post('/products', async (req, res) => {
    try {
      const { name, price, coverImageUrl } = req.body;
      const response = await pool.query(
        'INSERT INTO products (name, price, coverimageurl) VALUES ($1, $2, $3) RETURNING *',
        [name, price, coverImageUrl]
      );
      res.json(response.rows[0]);
    } catch (error) {
      console.error('Error creating product:', error);
      res.status(500).json({ error: 'Error creating product' });
    }
})
httpServer.listen(8080, () => {
    console.log('Server is running on port 8080');
});