'use strict';
const supertest=require('supertest');
const {app}=require('../src/server');
const base64=require('base-64')
require('dotenv').config();
const req=supertest(app);
const {sequelize}=require("../src/auth/models/index");
beforeAll(async()=>{
    await sequelize.sync();
});
afterAll(async()=>{
   await sequelize.drop();
})
describe('server Testing', () => { 
  it('testing signup',async()=>{
    const res=await req.post('/signup').send({username:'mohamad',password:"123123"})
    expect(res.status).toBe(200);
  });
  const user = base64.encode('mohamad:123123') 
  it('signin test' , async () =>{
       const res = await req.post('/signin').set('Authorization', `Basic ${user}`)
       expect(res.statusCode).toBe(200)

  })

  it('testing not found ',async()=>{
    const res=await req.get('/fsdfsfas');
    expect(res.status).toBe(404);
  })
})