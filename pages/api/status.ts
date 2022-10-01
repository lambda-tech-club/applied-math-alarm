import type { NextApiRequest, NextApiResponse } from 'next'

type Data = {
  moveDetected: boolean;
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const { TOKEN, SENSOR_ID } = process.env
  const response = await fetch(`https://api.switch-bot.com/v1.0/devices/${SENSOR_ID}/status`, {
    headers: {
      "Authorization": TOKEN,
      "Content-Type": "application/json"
    },
    method: "GET"
  })
  const json = await response.json()
  const data: Data = { moveDetected: json.body.moveDetected }
  res.status(200).json(data)
}
