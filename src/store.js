const notes = new Map();
let nextId = 1;

export function getAll() {
  return Array.from(notes.entries()).map(([id, note]) => ({ id, ...note }));
}

export function getById(id) {
  const note = notes.get(id);
  return note ? { id, ...note } : null;
}

export function create(title, content) {
  const id = String(nextId++);
  notes.set(id, { title, content });
  return { id, title, content };
}

export function update(id, title, content) {
  if (!notes.has(id)) return null;
  notes.set(id, { title, content });
  return { id, title, content };
}

export function remove(id) {
  return notes.delete(id);
}

export function clear() {
  notes.clear();
  nextId = 1;
}
