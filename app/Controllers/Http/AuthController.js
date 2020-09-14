'use strict'

/** @type {typeof import('../../Models/User')} */
const User = use('App/Models/User')

class AuthController {

    async login({ auth, request, response }) {

        const { username, email, password } = request.all()

        let user = null;

        if (email === undefined && (typeof username) === 'string')
            user = await User.findBy("username", username)

        const jwt = await auth
            .withRefreshToken()
            .attempt(email || user.email, password)

        response.json(jwt)

    }

    async logout({ auth, response }) {

        /** @type {Number} number of affected rows */
        const revoked = await auth
            .authenticator('jwt')
            .revokeTokens()

        if (revoked > 0) response.send("Logged out")
        else response.badRequest('Not logged in or no token provided')
    }

}

module.exports = AuthController
