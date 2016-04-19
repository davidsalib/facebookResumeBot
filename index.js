'use strict'
const http = require('http')
const Bot = require('messenger-bot')

let bot = new Bot({
  token: 'EAAYQyuiljoABAHdfxzLs4pxZAHhZBbli3MDMekUJq8Sd5btCAfMxUxvh6EuCnj85RPgfYkBkKYu3ZBJn0PUd6yeaZCGsZCZC7Qewx8ZCSyJL3HDUtfgPQGNc35VXoqREkExyFheDTvYmupCr0KRMiYKNNjmlhqNR7NK1kXcnaZCGjQZDZD',
  verify: 'davdSalib1996A19'
})

bot.on('error', (err) => {
  console.log(err.message)
})

bot.on('message', (payload, reply) => {
  let text = payload.message.text

  bot.getProfile(payload.sender.id, (err, profile) => {
    if (err) throw err

    reply({ text }, (err) => {
      if (err) throw err

      console.log(`Echoed back to ${profile.first_name} ${profile.last_name}: ${text}`)
    })
  })
})

http.createServer(bot.middleware()).listen(3000)
