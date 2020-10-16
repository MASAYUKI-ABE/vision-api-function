import * as functions from 'firebase-functions';
import * as vision from '@google-cloud/vision'

export const detectLogo = functions.region('asia-northeast1').storage.object().onFinalize(async (object) => {
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