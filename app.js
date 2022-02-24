const express = require('express')
const cors = require('cors')
const app = express()

app.use(cors())
app.use(express.urlencoded({ extended: false }))
// 导入路由
const userRouter = require('./router/user')
app.use('/api', userRouter)

app.listen(3007, () => console.log('api创建成功'))