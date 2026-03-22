exports.handler = async function(event, context) {
  const API_KEY = process.env.EXCHANGE_RATE_API_KEY;

  const res = await fetch(
    `https://v6.exchangerate-api.com/v6/${API_KEY}/latest/USD`
  );
  const data = await res.json();

  return {
    statusCode: 200,
    headers: {
      'Access-Control-Allow-Origin': '*'
    },
    body: JSON.stringify(data)
  };
};