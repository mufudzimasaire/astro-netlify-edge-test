import type { Context } from "https://edge.netlify.com";

export default async (_request: Request, context: Context) => {
  const bucketName = "new_feature";
  const bucket = context.cookies.get(bucketName);

  /** Return if already assigned a cookie */
  if (bucket) {
    return new Response(`Welcome back! You were assigned ${bucketName} **${bucket}** when you last visited the site!`);
  }

  /** 
   * Generate a random number between 0 and 1
   * and assign the user to a bucket - ie. 
   * either 'current' or 'new'.
   */
  const weighting = 0.5;
  const random = Math.random();
  const bucketValue = random <= weighting ? "current" : "new";

  /** set the new "test_feature" cookie */
  context.cookies.set({
    name: bucketName,
    value: bucketValue,
  });

  return new Response(
    `You have been assigned ${bucketName} **${bucketValue}**.`,
  );
};