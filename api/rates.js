export default async function handler(request, response) {
  const API_KEY = process.env.EXCHANGE_RATE_API_KEY;

  const res = await fetch(
    `https://v6.exchangerate-api.com/v6/${API_KEY}/latest/USD`
  );
  const data = await res.json();

  response.setHeader('Access-Control-Allow-Origin', '*');
  response.status(200).json(data);
}