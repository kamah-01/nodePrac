
const { Sequelize } = require('sequelize');

const connectionString = 'postgresql://kamah:wGs1AUywWMZSr_TLDnfLBQ@blogkamah-4995.j77.aws-ap-south-1.cockroachlabs.cloud:26257/nodePrac?sslmode=verify-full'


const sequelize = new Sequelize(connectionString, {
  dialect: 'postgres', 
  logging: console.log, 
  dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: false, 
    },
  },
});

module.exports = sequelize;
