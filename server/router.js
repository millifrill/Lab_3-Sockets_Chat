const express = require('express');
const router = express.Router();

router.get('/', (res, req) => {
    req.send("Server is up and running")
})

module.exports = router;