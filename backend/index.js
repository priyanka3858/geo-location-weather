// cloudflare worker

async function handleRequest(request) {
  const country = request.cf.country;
  const city = request.cf.city;

  const init = {
    headers: {
      "content-type": "application/json;charset=UTF-8",
    },
  };
  const response = await fetch(
    "https://api.openweathermap.org/data/2.5/weather?q=" +
      city +
      "," +
      country +
      "&appid=9d17477b10402125e197ab0d22687d31"
  );
  const results = JSON.stringify(await response.json());
  const responseHeaders = new Headers(response.headers);
  responseHeaders.set("Access-Control-Allow-Origin", "*");

  return new Response(results, {
    headers: responseHeaders,
  });
}

addEventListener("fetch", (event) => {
  event.respondWith(handleRequest(event.request));
});
