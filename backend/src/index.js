import app from './app.js';
import { connectDB } from './db/index.js'

const port = process.env.PORT || 4000

connectDB().then(() => {
    app.listen(port, () => {
        console.log(`Server is running on port ${port}`);
    })
}).catch((error) => {
    console.log(`ERROR ON ${error.message || "error to connected the database"}`)
    process.exit(1)
})

