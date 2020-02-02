const request = require('supertest');
const app = require('./');

afterAll(done => {
  done();
});

describe('Inventory routes', () => {

  it('should create a new inventory entry', async () => {
    const res = await request(app)
      .post('/inventory')
      .send({
        "name": "John's Bears",
        "description": "Gummies that vaguely resemble bears",
        "price": 19.99,
        "quantity": 10
      });
    expect(res.statusCode).toBe(201);
    expect(res.body).toHaveProperty('item');
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
    const res = await request(app)
      .get('/inventory');

    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty('items');
    expect(res.body.items.length).toBe(3);
  });

  it('should read one inventory entry', async () => {
    const res = await request(app)
      .get('/inventory/1');

    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty('item');
    expect(res.body.item.id).toBe(1);
  });

  it('should update one inventory entry', async () => {
    const res = await request(app)
      .put('/inventory/1')
      .send({
          "price": 44.99,
          "quantity": 100
      });

    const get = await request(app)
      .get('/inventory/1');

    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty('item');
    expect(res.body.item[0]).toBe(1);

    expect(get.body.item.price).toBe('44.99');
    expect(get.body.item.units_available).toBe(100);
  });

  it('should delete one inventory entry', async () => {
    const res = await request(app)
      .delete('/inventory/1');

    const get = await request(app)
      .get('/inventory/1')

    expect(res.statusCode).toBe(200);

    expect(get.statusCode).toBe(400);
    expect(get.body[0]).toBe('Could not find item.');
  });

});

describe('Order routes', () => {
  it('should create a new order', async () => {
    const res = await request(app)
      .post('/inventory')
      .send({
        "name": "John's Bears",
        "description": "Gummies that vaguely resemble bears",
        "price": 19.99,
        "quantity": 10
      });

    const res = await request(app)
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

    expect(res.statusCode).toBe(201);
    expect(res.body).toHaveProperty('order');
    expect(res.body.order.status).toBe('pending');
    expect(res.body).toHaveProperty('details');
    expect(res.body.details.length).toBe(2);
  });
});