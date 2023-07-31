

/**
 * @type {import('@types/aws-lambda').APIGatewayProxyHandler}
 */
exports.handler = async (event) => {
    const parsedBody = JSON.parse(event.body); // should wrap in try/catch
    const url = parsedBody.url;
    const data = parsedBody.data;

    const res = await fetch(url, {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      });

    return {
        statusCode: res.status,
        headers: {
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Headers": "*"
        },
        body: JSON.stringify({
            access_token: await res.json(),
        }),
    };
};
