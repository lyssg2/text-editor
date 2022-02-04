import { openDB } from 'idb';

const initdb = async() =>
    openDB('jate', 1, {
        upgrade(db) {
            if (db.objectStoreNames.contains('jate')) {
                console.log('jate database already exists');
                return;
            }
            db.createObjectStore('jate', { keyPath: 'id', autoIncrement: true });
            console.log('jate database created');
        },
    });


export const putDb = async(content) => {
    try {
        console.log(content);

        const jateDb = await openDB('jate', 1);
        const tx = jateDb.transaction('jate', 'readwrite');
        const store = tx.objectStore('jate');
        const request = store.put({ content: content, id: 1 })

        // Get confirmation of the request.
        const result = await request;
        console.log('🚀 - data saved to the database', result);

    } catch {
        console.log(err)
        console.error('put to DB failed')
    }
}


export const getDb = async() => {
    try {
        console.log('GET from the database');

        const jateDb = await openDB('jate', 1);
        const tx = jateDb.transaction('jate', 'readonly');
        const store = tx.objectStore('jate');
        const request = store.getAll();

        // Get confirmation of the request.
        const result = await request;
        console.log('result.value', result[0].content);

        return result[0].content;
    } catch {
        console.log(err)
        console.error('get from DB failed')
    }
}
initdb();