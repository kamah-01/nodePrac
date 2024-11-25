const sequelize = require('./db');
const { User } = require('./models'); // Import the User model

(async () => {
  try {
    console.log('Connecting to CockroachDB...');
    await sequelize.authenticate();
    console.log('Connection established.');

    console.log('Starting database sync...');
    await sequelize.sync({ force: true }); 
    console.log('Database synced successfully and User table created.');
  } catch (error) {
    console.error('Error syncing database:', error);
  } finally {
    await sequelize.close(); 
    console.log('Database connection closed.');
  }
})();
