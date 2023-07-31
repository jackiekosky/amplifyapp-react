

/**
 * @type {import('@types/aws-lambda').APIGatewayProxyHandler}
*/
exports.handler = async (event) => {
    const parsedBody = [];
    try {  
        parsedBody = JSON.parse(event.body); // should wrap in try/catch 
    } catch (e) {
        return {
            statusCode: 400,
            headers: {
                "Access-Control-Allow-Origin": "*",
                "Access-Control-Allow-Headers": "*"
            },
            body: JSON.stringify("No Body Provided"),
        };
    }
    
    /* GET URL FROM BODY */
    var url = "";
    try {  
        url = parsedBody.url;
    } catch (e) {
        return {
            statusCode: 400,
            headers: {
                "Access-Control-Allow-Origin": "*",
                "Access-Control-Allow-Headers": "*"
            },
            body: JSON.stringify("No Proxy URL provided"),
        };
    }

    /* GET DATA FROM BODY */
    var data = [];
    try {  
        data = parsedBody.data;
    } catch (e) {
        // no data passed, but continue
    }
    try {  
        data = JSON.parse(data);
    } catch (e) {
        // not passed json,  but continue
    }

    /* GET TOKEN FROM BODY */
    var token = "";
    try {  
        token = parsedBody.token;
    } catch (e) {
        // no token passed, but continue
    }

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
        statusCode: 200,
        headers: {
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Headers": "*"
        },
        body: JSON.stringify(parsedBody),
    };
};
