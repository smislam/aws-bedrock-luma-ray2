# Amazon Bedrock with Luma Ray 2
In this example, we demonstrate [Amazon Bedrock](https://aws.amazon.com/bedrock/) to generate videos for Luma Ray 2.  We then expose the model response location of S3 Bucket using AWS API Gateway endpoint.

This application is developed using AWS CDK in TypeScript.

## What does it build?
* Creates and deploys Amazon BedRock with Luma Ray 2 Video Generation Model
* Creates a Lambda that will interact with the Model
* Creates a S3 bucket where the video files will be stored
* Creates an AWS API Gateway endpoint to expose that Lambda which returns the video location on S3 Bucket

## Steps to run and test
* Verify that you are in `us-west-2` region.  Luma Ray 2 Foundation Model is only available in us-west-2.
* Enable Luma Ray 2 model access.
* Deploy the CDK code. Wait for the deployment to finish.  It will print out the API endpoint for you to use.
  * ![image](model-response.PNG "Example of Amazon Bedrock With Luma Ray 2 in action")
* Wait a few minutes since video generation can take a while.
* Check your S3 bucket for the MP3 file created by Amazon Bedrock
  * ![image](video-file.PNG "Example of Luma Ray 2 generated Video file")
* Download the MP4 file and play the video.

### Resulting Model Response Video
https://github.com/user-attachments/assets/a551df21-d9f8-48e1-bbd1-53caa03225e4
* If that video link doesn't play, download the original Luma Ray 2 video file in [MP4](output.mp4) format under files.

## References
* [Amazon Bedrock](https://aws.amazon.com/bedrock/)
* [Luma Ray 2](https://lumalabs.ai/ray)
