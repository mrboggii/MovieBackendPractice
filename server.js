const Sequelize = require('sequelize');

const sequelize = new Sequelize({
    dialect: 'sqlite',
    storage: './db.sqlite'
});

sequelize.authenticate()
  .then(() => {
    console.log('La conexion mu ok');
  })
  .catch(err => {
    console.error('no se ha conectau bro:', err);
  });

const Model = Sequelize.Model;

class User extends Model {}
User.init(
{ // attributes
    nombre: {
    type: Sequelize.STRING,
    allowNull: false
  },
    apellido: {
    type: Sequelize.STRING
    // allowNull defaults to true
  },
  edad:{
      type: Sequelize.INTEGER
  }
},

{  sequelize,
  modelName: 'user'
// options
}
);
// Note: using `force: true` will drop the table if it already exists
User.sync({ force: true }).then(() => {
// Now the `users` table in the database corresponds to the model definition
    return User.create({
      nombre: 'John',
      apellido: 'Hancock',
      edad: 25,
    });
  });