//Construct the Clarifai stub, which contains all the methods available in the Clarifai API, and the Metadata object that's used to authenticate:
import { ClarifaiStub, grpc } from "clarifai-nodejs-grpc";

const stub = ClarifaiStub.grpc();

const metadata = new grpc.Metadata();
//Set your own Clarifai API Key number in the second parameter!
metadata.set("authorization", `Key ${process.env.API_CLARIFAI_KEY}`);

export default (logger) => ({
  handleApiCall: (req, res) => {
    logger.info("entered handleAPICall");
    //Predicts concepts in an image.
    stub.PostModelOutputs(
      {
        // This is the model ID of a publicly available Face Detection Model. You may use any other public or custom model ID.
        model_id: "face-detection",
        inputs: [{ data: { image: { url: req.body.input } } }],
      },
      metadata,
      (err, response) => {
        if (err) {
          logger.error(err);
          return;
        }

        if (response.status.code !== 10000) {
          logger.error(
            "Received failed status: " +
              response.status.description +
              "\n" +
              response.status.details
          );
          return;
        }

        console.log("Predicted concepts, with confidence values:");
        for (const c of response.outputs[0].data.concepts) {
          console.log(c.name + ": " + c.value);
        }
        res.json(response);
      }
    );
  },
});
