export default {
  async fetch(request, env, ctx) {
  	const url = new URL(request.url);
  	const resultURL = new URL(env.URL + url.search);

  	const response = await fetch(resultURL, {
  		method: 'GET',
			headers: { 
				'Content-Type': 'application/json',
				'Authorization': `Bearer ${env.API_TOKEN}`,
			}
  	});

		return new Response(JSON.stringify(await response.json()));
  },
};