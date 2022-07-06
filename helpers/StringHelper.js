export class StringHelper {
  static escapeString (input) {
    const specialCharacters = {
      '"': '\\"',
      '\n': '\\n',
      '\t': '\\t',
      '\r': '\\r'
    }
    let message = input.trim()
    Object.keys(specialCharacters).forEach((key) => {
      message = message.replaceAll(key, specialCharacters[key])
    })

    return message
  }
}
