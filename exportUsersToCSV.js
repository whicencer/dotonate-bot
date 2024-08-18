const fs = require('fs');
const { parse } = require('json2csv');
const db = require("./db");

async function exportUsersToCSV() {
  try {
    const users = await db.getAllUsers();
    const csv = parse(users, {
      fields: ["id", "username", "userId", "isPremium", "viaLanding", "createdAt"],
    });

    fs.writeFileSync('users.csv', csv);
    console.log('File has been successfully saved as "users.csv".');
  } catch (error) {
    console.error('Error exporting users to CSV:', error);
    throw error;
  }
}

module.exports = { exportUsersToCSV };