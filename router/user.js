const express = require('express')

const router = express.Router()
const db = require('../db')
const bcryptjs = require('bcryptjs')

router.post('/reguser', (req, res) => {
    if (!req.body.username || !req.body.password) return res.send({
        status: 1,
        message: '用户名或密码不能为空'
    })

    db.query('select * from user where username=?', req.body.username, (err, results) => {
        if (err) {
            return res.send({
                status: 1,
                message: err.message
            })
        }
        if (results.length > 0) {
            return res.send({
                status: 1,
                message: '用户名被占用，请更换其他用户名'
            })
        }

        req.body.password = bcryptjs.hashSync(req.body.password, 10)
        db.query('insert into user set username=?,password=?', [req.body.username, req.body.password], (err, results) => {
            if (err) {
                return res.send({ status: 1, message: err.message })
            }
            if (results.affectedRows == 0) return res.send({ status: 1, message: '注册失败，请稍后再试' })
            res.send({
                status: 0,
                message: '注册成功'
            })
        })
    })
})

module.exports = router