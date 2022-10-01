import type { NextApiRequest, NextApiResponse } from 'next'

type Data = {
  message: string;
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const { TOKEN, BOT_ID } = process.env
  const response = await fetch(`https://api.switch-bot.com/v1.0/devices/${BOT_ID}/commands`, {
    body: '{ "command": "turnOff" }',
    headers: {
      "Authorization": TOKEN,
      "Content-Type": "application/json"
    },
    method: "POST"
  })
  const json = await response.json()
  const data: Data = { message: json.message }
  res.status(200).json(data)
}
