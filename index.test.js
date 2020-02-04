const request = require('supertest');
const app = require('./');
const { sequelize } = require('./models');

beforeAll(done => {
  done();
});

afterAll(done => {
  sequelize.close();
  done();
});

describe('Inventory routes', () => {

  it('should create a new inventory entry', async () => {
    const item = await request(app)
      .post('/inventory')
      .send({
        "name": "John's Bears",
        "description": "Gummies that vaguely resemble bears",
        "price": 19.99,
        "quantity": 10
      });
    expect(item.statusCode).toBe(201);
    expect(item.body).toHaveProperty('item');
  });

  it('should read all inventory entries', async () => {
    [1,2,3].forEach(async (item) => {
      await request(app)
      .post('/inventory')
      .send({
        "name": `Product ${item}`,
        "description": `This is product ${item}`,
        "price": 19.99 * item,
        "quantity": 10 * item
      })
    });
    const items = await request(app)
      .get('/inventory');

    expect(items.statusCode).toBe(200);
    expect(items.body).toHaveProperty('items');
    expect(items.body.items.length).toBe(3);
  });

  it('should read one inventory entry', async () => {
    const item = await request(app)
      .get('/inventory/1');

    expect(item.statusCode).toBe(200);
    expect(item.body).toHaveProperty('item');
    expect(item.body.item.id).toBe(1);
  });

  it('should update one inventory entry', async () => {
    const update = await request(app)
      .put('/inventory/1')
      .send({
          "price": 44.99,
          "quantity": 100
      });

    const item = await request(app)
      .get('/inventory/1');

    expect(update.statusCode).toBe(200);
    expect(update.body).toHaveProperty('item');
    expect(update.body.item[0]).toBe(1);

    expect(item.body.item.price).toBe('44.99');
    expect(item.body.item.units_available).toBe(100);
  });

  it('should delete one inventory entry', async () => {
    const deletion = await request(app)
      .delete('/inventory/1');

    const item = await request(app)
      .get('/inventory/1')

    expect(deletion.statusCode).toBe(200);

    expect(item.statusCode).toBe(400);
    expect(item.body[0]).toBe('Could not find item.');
  });

});

describe('Order routes', () => {
  beforeEach(() => {

  })

  it('should create a new order', async () => {
    await sequelize.sync({ force: true });
    const item = await request(app)
      .post('/inventory')
      .send({
        "id": 1,
        "name": "John's Bears",
        "description": "Gummies that vaguely resemble bears",
        "price": 19.99,
        "quantity": 10
      });

    const order = await request(app)
      .post('/orders')
      .send({
        "email": "me@aol.com",
        "order_date": "2020-01-31T19:21:38.587Z",
        "status": "pending",
        "items": [
          {
            "inventoryId": 1,
            "quantity": 5
          },
          {
            "inventoryId": 1,
            "quantity": 5
          }
        ]
      });

    const totalOrderQuantity = order.body.details[0].quantity + order.body.details[1].quantity;

    expect(order.statusCode).toBe(201);
    expect(order.body).toHaveProperty('order');
    expect(order.body.order.status).toBe('pending');
    expect(order.body).toHaveProperty('details');
    expect(order.body.details.length).toBe(2);
    expect(totalOrderQuantity).toBe(10);
  });

  it('should read all orders', async () => {

    [1,2,3].forEach(async (quantity) => {
      await request(app)
      .post('/orders')
      .send({
        "email": "me@aol.com",
        "order_date": "2020-01-31T19:21:38.587Z",
        "status": "pending",
        "items": [
          {
            "inventoryId": quantity + 1,
            "quantity": quantity + 5,
          },
          {
            "inventoryId": quantity + 1,
            "quantity": quantity + 5,
          }
        ],
      });
    });

    const orders = await request(app)
      .get('/orders');

    expect(orders.statusCode).toBe(200);
    // expect(orders.body).toHaveProperty('orders');
    // expect(orders.body.orders.length).toBe(3);
  });

  it('should read one order', async () => {
    const order = await request(app)
      .get('/orders/1');

    // expect(order.statusCode).toBe(200);
    // expect(order.body).toHaveProperty('orders');
    // expect(order.body.order.id).toBe(1);
  });
});