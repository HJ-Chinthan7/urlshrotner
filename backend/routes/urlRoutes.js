const express=require('express');
const router=express.Router();
const { shortenUrl, redirectUrl, getAllUrls}=require('../controllers/urlController');
console.log("here in route")
router.post('/shortner',shortenUrl);
router.post('/all',getAllUrls);

module.exports=router;
