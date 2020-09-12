'use strict'

class UserController {

    index(ctx) { 
        ctx.response.send('apanih')
    }

    async store({ request, response }) {
        const user = await User.create(request.all())
        response.json(user)
    }

    async show({ auth, request, response }) { }

    async update({ auth, request, response }) { }

    async destroy({ auth, request, response }) { }

}

module.exports = UserController
