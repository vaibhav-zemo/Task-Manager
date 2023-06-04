const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('../index.js');
const mongoose = require('mongoose');

const expect = chai.expect;

chai.use(chaiHttp);

before(async () => {
  await mongoose.connect('mongodb+srv://vapking:ozu1rPjDPKgKbXuS@cluster0.jyiobsw.mongodb.net/?retryWrites=true&w=majority', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
});

after(async () => {
  await mongoose.connection.close();
});

describe('Task Routes', () => {
  it('should create a new task', async () => {
    const taskData = {
      title: 'Task 1',
      description: 'Description 1',
      status: 'pending',
    };

    const response = await chai
      .request(app)
      .post('/api/tasks')
      .send(taskData);

    expect(response).to.have.status(201);
    expect(response.body.title).to.equal(taskData.title);
    expect(response.body.description).to.equal(taskData.description);
    expect(response.body.status).to.equal(taskData.status);
  });

  it('should fetch all tasks', async () => {
    const response = await chai.request(app).get('/api/tasks');

    expect(response).to.have.status(200);
    expect(response.body).to.be.an('array');
    expect(response.body.length).to.be.greaterThan(0);
  });

  it('should update a task', async () => {
    const createdTask = await chai
      .request(app)
      .post('/api/tasks')
      .send({
        title: 'Task 3',
        description: 'Description 3',
        status: 'pending',
      });

    const updatedTask = {
      title: 'Task 3',
      description: 'Description 3',
      status: 'completed',
    };

    const response = await chai
      .request(app)
      .put(`/api/tasks/${createdTask.body._id}`)
      .send(updatedTask);

    expect(response).to.have.status(200);
    expect(response.body.title).to.equal(updatedTask.title);
    expect(response.body.description).to.equal(updatedTask.description);
    expect(response.body.status).to.equal(updatedTask.status);
  });

  it('should delete a task', async () => {
    const createdTask = await chai
      .request(app)
      .post('/api/tasks')
      .send({
        title: 'Task 4',
        description: 'Description 4',
        status: 'pending',
      });

    await chai.request(app).delete(`/api/tasks/${createdTask.body._id}`);

    const fetchResponse = await chai.request(app).get('/api/tasks');

    const deletedTask = fetchResponse.body.find(
      (task) => task._id === createdTask.body._id
    );

    expect(deletedTask).to.be.undefined;
  });
});
