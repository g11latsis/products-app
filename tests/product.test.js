const mongoose = require('mongoose');
const request = require('supertest');

const app = require('../app');
const helper = require('../helpers/product.helper')

require('dotenv').config();

beforeEach(async () => {
    await mongoose.connect(process.env.MONGODB_URI)
      .then(
        () => { console.log("Connection to MOngoDB established")},
        err => { console.log("Failed to connect to MongoDB", err)}
      )
  });
  
  afterEach(async ()=>{
    await mongoose.connection.close();
  })

  describe("Request GET /api/products", () => {
    it("Returns all products", async () => {
        const res = await request(app).get('/api/products');
        expect(res.statusCode).toBe(200);
        expect(res.body.data.length).toBeGreaterThan(0)
    }, 1000)
  })

  describe('Request GET /api/products/:id', () =>{
    it('Returns a product', async ()=>{
      
      const result = await helper.findLastInsertedProduct();
      // console.log(result);
      
      const res = await request(app).get('/api/products/' + result._id);
      expect(res.statusCode).toBe(200);
      expect(res.body.data.product).toBe(result.product);
      expect(res.body.data.description).toBe(result.description);
    }, 10000)
  })

  describe('Request POST /api/products', () => {
    it('Creates a product', async () => {
      const res = await request(app)
      .post('/api/products')
      .send({
        product: "Bike",
        cost: 10000,
        description: "Yamaha R1",
        quantity: 10
      })
      expect(res.statusCode).toBe(200);
      expect(res.body.data).toBeTruthy();
    }, 10000);

    it('Create a product testing required fields', async () => {
        const res = await request (app)
        .post('/api/products')
        .send({
            product: "",
            cost: 10000,
            description: "",
            quantity: 10
        })
        expect(res.statusCode).toBe(400);
        expect(res.body.data).toBeTruthy();
    },1000)
})

describe("DELETE /api/products/:id", () => {
    it("Delete last inserted product", async () =>{
      const result = await helper.findLastInsertedProduct();
      const res = await request(app)
        .delete('/api/products/' + result._id);
      
      expect(res.statusCode).toBe(200)
    },10000)
  })