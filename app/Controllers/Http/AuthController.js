'use strict'

/** @type {typeof import('../../Models/User')} */
const User = use('App/Models/User')

class AuthController {

    async login({ auth, request, response }) {

        const { username, email, password } = request.all()

        let user = null;

        if (email === undefined && (typeof username) === 'string')
            user = await User.findBy("username", username)

        const authenticated = await auth
            .withRefreshToken()
            .attempt(email || user.email, password)

        response.json(authenticated)

    }

    async logout({ auth, request, response }) {

        await auth
            .authenticator('jwt')
            .revokeTokens()

        response.send("Logged out")
    }

}

module.exports = AuthController
