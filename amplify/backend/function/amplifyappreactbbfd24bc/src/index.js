

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
    var token = parsedBody.token;

    /*const fetchOptions = {
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        method: 'POST',
        body: JSON.stringify(data)
    };
    

    const res = await fetch(url, fetchOptions);*/

    return {
        statusCode: 400,
        headers: {
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Headers": "*"
        },
        body: JSON.stringify(parsedBody),
    };
};
