import type { NextApiRequest, NextApiResponse } from 'next'
import crypto from 'crypto'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { TOKEN, SECRET, DEVICE_ID } = process.env
  if (TOKEN == undefined || SECRET == undefined || DEVICE_ID == undefined ) return;
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

  const bodyString = JSON.stringify(body)
  const contentLength = Buffer.byteLength(bodyString, 'utf-8')

  const options = {
    hostname: 'api.switch-bot.com',
    port: 443,
    path: `/v1.1/devices/${DEVICE_ID}/commands`,
    method: 'POST',
    headers: {
      "Authorization": TOKEN,
      sign,
      nonce,
      t,
      'Content-Type': 'application/json',
      'Content-Length': contentLength,
    },
    body: bodyString
  }

  try {
    // const response = await fetch(`https://api.switch-bot.com/v1.1/devices/${DEVICE_ID}/commands`, options)
    // const json = await response.json()
    const json = { message: "mock" }
    res.status(200).json({ message: json.message })
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: 'Error' })
  }
}
