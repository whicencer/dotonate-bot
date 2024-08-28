const db = require("./db");

async function getUsersStatistics() {
  const usersLength = await db.getUsersLength();
  const usersADay = await db.getUsersADay();
  const usersAWeek = await db.getUsersAWeek();
  const usersAMonth = await db.getUsersAMonth();
  const usersWithPremium = await db.getUsersWithPremium();
  const usersWithLanding = await db.getUsersWithLanding();

  return {
    usersLength,
    usersADay,
    usersAWeek,
    usersAMonth,
    usersWithPremium,
    usersWithLanding,
  };
}

module.exports = { getUsersStatistics };