const db = require('../../config/db')

module.exports = {
    create(filename, path, product_id) {
        const query = `
            INSERT INTO files (
                name,
                path,
            ) VALUES ($1, $2)
            RETURNING id
        `
        const values = [
            filename,
            path || 1,
        ]
        
        return db.query(query, values)
    },
}
