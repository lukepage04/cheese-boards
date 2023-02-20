const assert = require('assert');
const { Sequelize } = require('sequelize');
const sequelize = new Sequelize('sqlite::memory:');

// Import the models
const User = require('./user');
const Board = require('./board');
const Cheese = require('./cheese');

// Define the tests
describe('Associations', () => {
  before(async () => {
    // Sync the database and add some initial data
    await sequelize.sync({ force: true });

    const user = await User.create({
      name: 'John Doe',
      email: 'john@example.com'
    });

    await Board.create({
      type: 'General',
      description: 'General Discussion',
      rating: 4,
      UserId: user.id
    });

    await Board.create({
      type: 'Announcement',
      description: 'Announcements and News',
      rating: 5,
      UserId: user.id
    });

    const cheese = await Cheese.create({
      title: 'Cheddar',
      description: 'A delicious cheese'
    });

    const board = await Board.findOne();
    await board.addCheese(cheese);
  });

  it('should associate User with Board in a One-to-Many relationship', async () => {
    const user = await User.findOne({
      where: {
        name: 'John Doe'
      },
      include: [Board]
    });

    assert.equal(user.Boards.length, 2);
    assert.equal(user.Boards[0].type, 'General');
    assert.equal(user.Boards[1].type, 'Announcement');
  });

  it('should associate Board with Cheese in a Many-to-Many relationship', async () => {
    const board = await Board.findOne({
      include: [Cheese]
    });

    assert.equal(board.Cheeses.length, 1);
    assert.equal(board.Cheeses[0].title, 'Cheddar');
  });
});
