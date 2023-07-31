

/**
 * @type {import('@types/aws-lambda').APIGatewayProxyHandler}
 */
exports.handler = async (event) => {
    const parsedBody = JSON.parse(event.body); // should wrap in try/catch
    const url = parsedBody.url; 
    const data = parsedBody.data; 
    return {
        statusCode: res.status,
        headers: {
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Headers": "*"
        },
        url,
    };
};
