import { openDB } from 'idb';

// Open (or create) IndexedDB database
const dbPromise = openDB('videoDB', 1, {
  upgrade(db) {
    if (!db.objectStoreNames.contains('videos')) {
      db.createObjectStore('videos', { keyPath: 'id' });
    }
  },
});

// Save video to IndexedDB
export async function saveVideo(id, blob) {
  const db = await dbPromise;
  await db.put('videos', { id, blob });
}

// Get video from IndexedDB
export async function getVideo(id) {
  const db = await dbPromise;
  return (await db.get('videos', id))?.blob;
}

// Delete video from IndexedDB
export async function deleteVideo(id) {
  const db = await dbPromise;
  await db.delete('videos', id);
}
