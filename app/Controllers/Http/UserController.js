'use strict'

/** @type {typeof import('../../Models/User')} */
const User = use('App/Models/User')
class UserController {

    async index({ response }) {
        response.json(await User.all())
    }

    async store({ request, response }) {
        const user = await User.create(request.all())
        response.json(user)
    }

    async show({ params, response }) {

        const { id } = params
        const user = await User.findOrFail(id)

        response.send(user)

    }

    async update({ auth, params, request, response }) {
        // If USER ID in query param is the same
        // as ID in JWT payload
        const { id } = params
        const authenticatedUser = await auth.getUser()

        if (id == authenticatedUser.id) {
            const user = await User.find(id)
            user.merge(request.all())
            await user.save()
            response.send({ message: "User updated", user })
        }
        else response.unauthorized("UNAUTHORIZED")
    }

    async destroy({ params, response }) {

        const { id } = params
        const user = await User.findOrFail(id)

        await user.delete()

        response.send(`User with an id ${id} is deleted`)

    }

}

module.exports = UserController
