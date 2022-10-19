export default async () => {
  return new Response("Hello, World!", {
    headers: { "content-type": "text/html" },
  });
};