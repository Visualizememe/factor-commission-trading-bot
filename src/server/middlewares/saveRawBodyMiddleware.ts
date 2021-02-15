import express from "express";


export default function saveRawBodyMiddleware (request: express.Request, response: express.Response, next: express.NextFunction) {
    let bodyStream = "";

    request
        .on("data", data => {
            bodyStream += data;
        })
        .on("end", () => {
            response.locals.rawBody = bodyStream;

            if (request.headers["content-type"]?.includes("application/json")) {
                let jsonParsedBody: undefined | any;

                try {
                    jsonParsedBody = JSON.parse(response.locals.rawBody);
                } catch {
                    jsonParsedBody = undefined;
                }

                if (jsonParsedBody) {
                    request.body = jsonParsedBody;
                }
            }
            next();
        });
}
