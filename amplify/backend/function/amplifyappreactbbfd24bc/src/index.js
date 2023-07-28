

/**
 * @type {import('@types/aws-lambda').APIGatewayProxyHandler}
 */
exports.handler = async (event) => {
    console.log(`EVENT: ${JSON.stringify(event)}`);
    const url = "https://manageordersapi.com/v1/manageorders/signin";

    const data = {
        username: "josh@inktrax.com",
        password: "1NKT3E$9m#",
    }

    const res = await fetch(url, {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data);
      });

    return {
        statusCode: res.status,
        headers: {
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Headers": "*"
        },
        body: JSON.stringify({
            message: await res.text(),
        }),
    };
    /*return {
        statusCode: 200,
    //  Uncomment below to enable CORS requests
        headers: {
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Headers": "*"
        },
        body: JSON.stringify('Hello from Lambda!'),
    };*/
};
