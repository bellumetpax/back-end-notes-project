import { Router } from 'express';
import * as store from '../store.js';

const router = Router();

function validateNote(body) {
  if (!body || typeof body !== 'object') {
    return { error: 'Invalid body' };
  }
  const title = body.title;
  const content = body.content;
  if (typeof title !== 'string' || !title.trim()) {
    return { error: 'title required' };
  }
  if (typeof content !== 'string' || !content.trim()) {
    return { error: 'content required' };
  }
  return { title: title.trim(), content: content.trim() };
}

router.get('/', (req, res) => {
  res.json(store.getAll());
});

router.get('/:id', (req, res) => {
  const note = store.getById(req.params.id);
  if (!note) return res.status(404).json({ error: 'Not found' });
  res.json(note);
});

router.post('/', (req, res) => {
  const validated = validateNote(req.body);
  if (validated.error) {
    return res.status(400).json({ error: validated.error });
  }
  const note = store.create(validated.title, validated.content);
  res.status(201).json(note);
});

router.put('/:id', (req, res) => {
  const validated = validateNote(req.body);
  if (validated.error) {
    return res.status(400).json({ error: validated.error });
  }
  const note = store.update(req.params.id, validated.title, validated.content);
  if (!note) return res.status(404).json({ error: 'Not found' });
  res.json(note);
});

router.delete('/:id', (req, res) => {
  const deleted = store.remove(req.params.id);
  if (!deleted) return res.status(404).json({ error: 'Not found' });
  res.status(204).send();
});

export default router;
