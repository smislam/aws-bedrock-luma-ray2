import { BedrockRuntimeClient, GetAsyncInvokeCommand, GetAsyncInvokeCommandInput, StartAsyncInvokeCommand, StartAsyncInvokeRequest } from "@aws-sdk/client-bedrock-runtime";
import { Handler } from "aws-lambda";

export const handler: Handler = async (event, context) => {

    const badResponse = {
        statusCode: 400,
        body: JSON.stringify('Invalid request.  Give me a scene!')
    }

    if (event.body && event.body !== "") {
        let body = JSON.parse(event.body);
        if (body.scene && body.scene !== "") {
            let scene = body.scene;         

            const rockerRuntimeClient = new BedrockRuntimeClient({region: process.env.REGION});
            const inputCommand: StartAsyncInvokeRequest = { 
                modelId: process.env.MODEL_ID,
                modelInput: {
                    taskType: 'TEXT_VIDEO',
                    //Bug?
                    prompt: `${scene}. 
                        Gentle movements, natural lighting, Cinematic, 4k, 
                        photorealistic, shallow depth of field, highest quality, dolly in.`,
                    textToVideoParams: {                        
                        text: `${scene}. 
                        Gentle movements, natural lighting, Cinematic, 4k, 
                        photorealistic, shallow depth of field, highest quality, dolly in.`
                    },
                    videoGenerationConfig: {
                        durationSeconds: 6,
                        fps: 24,
                        dimension: '1280x720'
                    }
                },
                outputDataConfig: {
                    s3OutputDataConfig: {
                      s3Uri: `s3://${process.env.BUCKET_NAME}`
                    }
                }
            }
           
            const command = new StartAsyncInvokeCommand(inputCommand);
            const response = await rockerRuntimeClient.send(command);

            const invokeInput: GetAsyncInvokeCommandInput = {
                invocationArn: response.invocationArn
            }

            const invoke = new GetAsyncInvokeCommand(invokeInput);
            const invokeResponse = await rockerRuntimeClient.send(invoke);
            
            return {
                statusCode: 200,
                body:  `${invokeResponse.outputDataConfig?.s3OutputDataConfig?.s3Uri}/output.mp4`
            }
        } else {
            return badResponse;
        }
    } else {
        return badResponse;
    }
}