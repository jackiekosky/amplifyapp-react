

/**
 * @type {import('@types/aws-lambda').APIGatewayProxyHandler}
*/
exports.handler = async (event) => {
    const parsedBody = JSON.parse(event.body); // should wrap in try/catch
    const url = parsedBody.url;
    var data = parsedBody.data;
    try {  
        data = JSON.parse(data);
    } catch (e) {
        // not passed json
    }
    const header = parsedBody.header;

    const res = await fetch(url, {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      });

    return {
        statusCode: 400,
        headers: {
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Headers": "*"
        },
        body: header,
    };
};
