import request from 'supertest';
import app from '../src/app.js';
import * as store from '../src/store.js';

beforeEach(() => store.clear());

describe('Notes API', () => {
  describe('GET /notes', () => {
    it('returns empty array when no notes', async () => {
      const res = await request(app).get('/notes');
      expect(res.status).toBe(200);
      expect(res.body).toEqual([]);
    });

    it('returns all notes', async () => {
      await request(app).post('/notes').send({ title: 'A', content: 'B' });
      const res = await request(app).get('/notes');
      expect(res.status).toBe(200);
      expect(res.body).toHaveLength(1);
      expect(res.body[0]).toMatchObject({ title: 'A', content: 'B' });
    });
  });

  describe('GET /notes/:id', () => {
    it('returns 404 for missing note', async () => {
      const res = await request(app).get('/notes/999');
      expect(res.status).toBe(404);
      expect(res.body).toEqual({ error: 'Not found' });
    });

    it('returns note by id', async () => {
      const created = await request(app)
        .post('/notes')
        .send({ title: 'Test', content: 'Body' });
      const res = await request(app).get(`/notes/${created.body.id}`);
      expect(res.status).toBe(200);
      expect(res.body).toMatchObject({ title: 'Test', content: 'Body' });
    });
  });

  describe('POST /notes', () => {
    it('creates a note', async () => {
      const res = await request(app)
        .post('/notes')
        .send({ title: 'Hello', content: 'World' });
      expect(res.status).toBe(201);
      expect(res.body).toMatchObject({ title: 'Hello', content: 'World' });
      expect(res.body.id).toBeDefined();
    });

    it('returns 400 when title missing', async () => {
      const res = await request(app)
        .post('/notes')
        .send({ content: 'Only content' });
      expect(res.status).toBe(400);
      expect(res.body).toEqual({ error: 'title required' });
    });

    it('returns 400 when content missing', async () => {
      const res = await request(app)
        .post('/notes')
        .send({ title: 'Only title' });
      expect(res.status).toBe(400);
      expect(res.body).toEqual({ error: 'content required' });
    });

    it('returns 400 when title is empty string', async () => {
      const res = await request(app)
        .post('/notes')
        .send({ title: '', content: 'Valid' });
      expect(res.status).toBe(400);
      expect(res.body).toEqual({ error: 'title required' });
    });

    it('returns 400 when title is whitespace only', async () => {
      const res = await request(app)
        .post('/notes')
        .send({ title: '   ', content: 'Valid' });
      expect(res.status).toBe(400);
      expect(res.body).toEqual({ error: 'title required' });
    });
  });

  describe('PUT /notes/:id', () => {
    it('updates a note', async () => {
      const created = await request(app)
        .post('/notes')
        .send({ title: 'Old', content: 'Content' });
      const res = await request(app)
        .put(`/notes/${created.body.id}`)
        .send({ title: 'New', content: 'Updated' });
      expect(res.status).toBe(200);
      expect(res.body).toMatchObject({ title: 'New', content: 'Updated' });
    });

    it('returns 404 for missing note', async () => {
      const res = await request(app)
        .put('/notes/999')
        .send({ title: 'X', content: 'Y' });
      expect(res.status).toBe(404);
    });
  });

  describe('DELETE /notes/:id', () => {
    it('deletes a note', async () => {
      const created = await request(app)
        .post('/notes')
        .send({ title: 'To Delete', content: 'Content' });
      const res = await request(app).delete(`/notes/${created.body.id}`);
      expect(res.status).toBe(204);
      const getRes = await request(app).get(`/notes/${created.body.id}`);
      expect(getRes.status).toBe(404);
    });

    it('returns 404 for missing note', async () => {
      const res = await request(app).delete('/notes/999');
      expect(res.status).toBe(404);
    });
  });
});
