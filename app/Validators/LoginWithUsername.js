'use strict'

class LoginWithUsername {
  get rules() {
    return {
      username: 'required_without_any:email'
    }
  }
  async fails (errorMessages) {
    return this.ctx.response.badRequest(errorMessages)
  }
}

module.exports = LoginWithUsername
