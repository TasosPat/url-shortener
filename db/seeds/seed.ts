import db from '../db'
import format from 'pg-format';
import { UrlEntry } from '../../types';

const seed = async (urls: UrlEntry[]) : Promise<void> => {
    try {
        await db.query('DROP TABLE IF EXISTS urls;')
        await db.query(`
        CREATE TABLE urls (
          url_id SERIAL PRIMARY KEY,
          original_url VARCHAR(2048) NOT NULL,
          short_url VARCHAR(20) UNIQUE NOT NULL,
          created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        );
      `)
      if (urls.length) {
        const insertQuery = format(
          `INSERT INTO urls (original_url, short_url, created_at) VALUES %L RETURNING *;`,
          urls.map(({ original_url, short_url, created_at }) => [
            original_url,
            short_url,
            created_at,
          ])
        );
      await db.query(insertQuery)
        console.log('✅ Database seeded successfully!');
    }
}
    catch(err) {
        console.error('❌ Error seeding database:', err);
    }
}

export default seed;
