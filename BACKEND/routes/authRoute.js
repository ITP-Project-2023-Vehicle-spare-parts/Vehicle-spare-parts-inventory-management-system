const express = require("express");
const {
    createUser, 
    loginUserCtrl, 
    getallUser, 
    getaUser, 
    deleteaUser, 
    updateaUser,
} = require("../controller/UserController");

const{authMiddleware}= require("../middlewares/authMiddleware");
const router= express.Router();


router.post('/register', createUser);
router.post('/login', loginUserCtrl);
router.get('/all-users', getallUser);
router.get('/:id',authMiddleware, getaUser);
router.delete('/:id',deleteaUser);
router.put('/:id',updateaUser);



module.exports = router;