export default {
  async fetch(request, env, ctx) {
  	const url = new URL(request.url);
  	const resultURL = new URL(env.URL + url.search);

  	// Using `fetch` with `cf` doesn’t working for some reason so we won’t get Tiered Caching.
  	// Tiered Caching — ability to sync cache between network of workers which increases cache hits. Cloudflare’s large network of workers allows to accept requests on the closest worker to the end user.
  	// In our case, the cache is tied to one worker, which is still good, but the cache won't hit for users in different locations.
  	const cache = caches.default; 

  	let response = await cache.match(resultURL);

  	if (!response) { 
  		response = await fetch(resultURL, {
	  		method: 'GET',
				headers: { 
					'Content-Type': 'application/json',
					'Authorization': `Bearer ${env.API_TOKEN}`,
				}
	  	});
	  	response = new Response(response.body, response); // Must use Response constructor to inherit all of response's fields

	  	const oneHourInSeconds = 3600;
      response.headers.append("Cache-Control", `s-maxage=${oneHourInSeconds}`); // TTL of response

      // Seems like `put` doesn’t cache anything with bad codes (4XX, 5XX, etc.) and thats good! We only want ok responses to be cached.
      ctx.waitUntil(cache.put(resultURL, response.clone()));
  	} 

    return response;
  },
};