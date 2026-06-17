export class ShortUrlAlreadyExists extends Error {
  constructor() {
    super('Short URL already exists')
    this.name = 'ShortUrlAlreadyExists'
  }
}
