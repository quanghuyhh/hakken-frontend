export class TransformHelper {
  static transformHashIdToId (item) {
    if (item?.hash_id) {
      item.id = item.hash_id
    }
    return item
  }
}
