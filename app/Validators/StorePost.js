'use strict'

class StorePost {
  get rules() {
    return {
      header_image: 'file|file_ext:jpeg,png,jpg|file_size:2mb|file_types:image',
      comment_status: "in:open,closed",
      status: "in:publish,draft"
    }
  }
  async fails(errorMessages) {
    return this.ctx.response.badRequest(errorMessages)
  }
}

module.exports = StorePost
