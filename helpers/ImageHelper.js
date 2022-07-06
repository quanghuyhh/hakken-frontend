export class ImageHelper {
  static getAWSImage (path) {
    return path ? `${process.env.AWS_S3_URL}/${path}` : path
  }
}
