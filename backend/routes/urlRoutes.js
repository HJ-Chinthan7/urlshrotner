const express=require('express');
const router=express.Router();
const { shortenUrl, redirectUrl, getAllUrls}=require('../controllers/urlController');
router.post('/shortner',shortenUrl);
router.post('/all',getAllUrls);

module.exports=router;
