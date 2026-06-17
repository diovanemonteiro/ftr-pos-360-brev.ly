export class InvalidShortUrl extends Error {
  constructor() {
    super('Invalid short URL format')
    this.name = 'InvalidShortUrl'
  }
}
