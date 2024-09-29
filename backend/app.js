const express = require('express');
const app = express();
const dotenv = require('dotenv');
const cors = require('cors');

const adminRoutes = require('./routes/admin');
const matakuliahRoutes = require('./routes/matakuliah');
const catatanRoutes = require('./routes/catatan');

dotenv.config();
app.use(express.json());

app.get('/', (req, res) => {
  res.send('The API is running');
});

app.use(cors({
  origin: '*',
  methods: ['GET', 'POST', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true
}));

app.use('/admin', adminRoutes);
app.use('/matakuliah', matakuliahRoutes);
app.use('/catatan', catatanRoutes);

const PORT = process.env.PORT || 3000;
if (process.env.NODE_ENV !== 'production') {
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
}

module.exports = app;