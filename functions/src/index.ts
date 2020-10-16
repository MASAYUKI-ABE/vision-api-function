import * as functions from 'firebase-functions';
import * as vision from '@google-cloud/vision'

export const detectLogo = functions.region('asia-northeast1').storage.bucket(`${functions.config().bucket.logo}`).object()
  .onFinalize(async (object) => {
    const client = new vision.ImageAnnotatorClient()
    const filePath = `gs://${object.bucket}/${object.name}`
    const contentType = object.contentType

    if (!filePath || !contentType) return
    if (!contentType.startsWith("image/")) {
      console.log("画像以外")
      return
    }

    const [result] = await client.logoDetection(filePath)
    const logos = result.logoAnnotations
    console.log(`detected logos: ${JSON.stringify(logos)}`)
  })

export const detectWebEntities = functions.region('asia-northeast1').storage.bucket(`${functions.config().bucket.web}`).object()
  .onFinalize(async (object) => {
    const client = new vision.ImageAnnotatorClient()
    const filePath = `gs://${object.bucket}/${object.name}`
    const contentType = object.contentType

    if (!filePath || !contentType) return
    if (!contentType.startsWith("image/")) {
      console.log("画像以外")
      return
    }

    const [result] = await client.webDetection(filePath)
    const webDetection = result.webDetection;
    console.log(`detected web: ${JSON.stringify(webDetection)}`)
  })
