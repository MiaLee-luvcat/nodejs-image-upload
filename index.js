//* external
const express = require('express')
const fileUpload = require('express-fileupload')
const cors = require('cors')
const morgan = require('morgan')
const _ = require('lodash')

//* 세팅 시작
const app = express()

//* 파일 업로드 허용
app.use(fileUpload({
  createParentPath: true
}))

//* 미들 웨어 추가
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(morgan('dev'))
app.use(express.static('uploads'))

//* 포트 설정
const port = 8085

//* get 응답
app.get('/', (req, res) => {
  res.status(200).send('hello get 응답')
})

//* 파일 업로드 post 응답 - 하나의 파일
app.post('/upload', async (req, res) => {
  try {
    if (!req.files) {
      console.log('/upload 파일 업로드 실패')
      return res.status(400).send({
        status : false,
        message: '파일 업로드 실패'
      })
    } else {
      //* 만약 특정 폴더에 들어갈 경우 folder 받아서 그 폴더 내부로 위치시킬 수 있음
      let root = './uploads/'
      if(!!req.body.folder) root = `./uploads/${ req.body.folder }/`

      let f = req.files.file
      f.mv(root + f.name)
      return res.status(200).send({
        status : true,
        message: '파일이 업로드 되었습니다.',
        data: {
          name    : f.name,
          size    : f.size,
          minetype: f.minetype,
        }
      })
    }
  } catch (err) {
    return res.status(500).json({ message: 'Server Error' })
  }
})

//* 파일 업로드 post 응답 - 여러 개의 파일
app.post('/upload-multi', async (req, res) => {
  try {
    if (!req.files) {
      console.log('/uupload-multi 파일 업로드 실패')
      return res.status(400).send({
        status : false,
        message: '파일 업로드 실패'
      })
    } else if (!req.files.files) {
      console.log('/upload-multi 파일 업로드 실패 Body의 Key를 확인해 주세요.')
      return res.send({
        status : false,
        message: '파일을 업로드 하지 못했습니다. Body의 Key를 확인해 주세요.'
      })
    } else {
      let data = []

      //* 만약 특정 폴더에 들어갈 경우 folder 받아서 그 폴더 내부로 위치시킬 수 있음
      let root = './uploads/'
      if(!!req.body.folder) root = `./uploads/${ req.body.folder }/`

      _.forEach(_.keysIn(req.files.files), (key) => {
        let photo = req.files.files[key]

        photo.mv(root + photo.name)

        data.push({
          name    : photo.name,
          size    : photo.size,
          minetype: photo.minetype
        })
      })

      //* return response
      return res.send({
        data,
        status: true,
        message: '파일들이 업로드 되었습니다.',
      })
    }
  }
  catch (err) {
    res.status(500).json({ message: 'Server Error' })
  }
})

//* Server 작동
app.listen(port, () => {
  console.log(`Server is on port ${ port }. >> http://localhost:${ port } 로 실행`)
})