import type { NextApiRequest, NextApiResponse } from 'next'
import crypto from 'crypto'

export default async function handler(req, res) {
  const { TOKEN, SECRET, HUB_ID } = process.env
  const t = Date.now()
  const nonce = "sb6l1dzp" // random
  const data = TOKEN + t + nonce
  const sign = crypto.createHmac('sha256', SECRET)
    .update(Buffer.from(data, 'utf-8'))
    .digest()
    .toString("base64")

  const body = {
    "command": req.query.command,
    "parameter": "default",
    "commandType": "customize"
  }

  const options = {
    hostname: 'api.switch-bot.com',
    port: 443,
    path: `/v1.1/devices/${HUB_ID}/commands`,
    method: 'POST',
    headers: {
      "Authorization": TOKEN,
      sign,
      nonce,
      t,
      'Content-Type': 'application/json',
      'Content-Length': body.length,
    },
    body: JSON.stringify(body)
  }

  try {
    const response = await fetch(`https://api.switch-bot.com/v1.1/devices/${HUB_ID}/commands`, options)
    const json = await response.json()
    res.status(200).json({ message: json.message })
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: 'Error' })
  }
}
