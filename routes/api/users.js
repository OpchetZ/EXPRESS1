const express = require('express');
const router = express.Router();
const users = require('../../Users');
const uuid = require('uuid');

router.get('/', (req, res) => res.json(users));

router.get('/:id', (req, res) => {
    let found = users.some(user => user.id === parseInt(req.params.id));
    if (found) {
        res.json(users.filter(user => user.id === parseInt(req.params.id)));
    } else{
        res.status(400).json({msg: `No ${req.params.id}`});
    }
})

router.post('/', (req,res) =>{
   const newUser={
    id: uuid.v4(),
    name: req.body.name,
    email: req.body.email
   }
   if (!newUser.name || !newUser.email) {
        return res.status(400).json({msg: 'please include name and email'})
   }
   users.push(newUser);
   res.redirect('/');
})
router.put('/:id', (req, res) =>{
        let found = users.some(user => user.id === parseInt(req.params.id));
        if (found) {
            const updUser = req.body;
            users.forEach(user => {
                if (user.id === parseInt(req.params.id)) {
                    user.name = updUser ? updUser.name : user.name;
                    user.email = updUser ? updUser.email : user.email;
                    res.json({ msg: 'User update',user});
                }
            })
        }else{
            res.status(400).json({ msg: `NO user with the id ${req.params.id}`})
        }
})

router.delete('/:id', (req, res) => {
            let found = users.some(user => user.id === parseInt(req.params.id));
    if (found) {
        res.json({
            msg: 'DELETED',
            users: users.filter(user => user.id !== parseInt(req.params.id))

        })
    }else{
        res.status(400).json({ msg: `No id ${req.params.id}`});
    }
})
module.exports = router;