const { Pool } = require('pg');
require("dotenv").config();

const pool = new Pool({
  connectionString: process.env.DOTONATE_URL_DB
});

const getDonationsCount = async () => {
  try {
    const res = await pool.query('SELECT COUNT(*) FROM donations');
    return res.rows[0].count;
  } catch (err) {
    console.error(err);
  }
};

const getDonationsCountADay = async () => {
  try {
    const res = await pool.query('SELECT COUNT(*) FROM donations WHERE created_at > NOW() - INTERVAL \'1 day\'');
    return res.rows[0].count;
  } catch (err) {
    console.error(err);
  }
};

module.exports = { getDonationsCount, getDonationsCountADay }