'use strict'

/** @type {typeof import('../../Models/Post')} */
const Post = use('App/Models/Post')
const Helpers = use('Helpers')
const uuid = require('uuid')

class PostController {

    async index({ response }) {
        const posts = await Post.all()
        response.json(posts)
    }

    async store({ auth, request, response }) {
        const user = await auth.getUser()

        const post = new Post()
        post.fill(request.all())

        const headerImage = request.file('header_image')
        const headerImageName = `${uuid.v4()}.${headerImage.subtype}`

        await headerImage.move(Helpers.tmpPath('uploads'), {
            name: headerImageName
        })

        if (!headerImage.moved())
            response.badRequest(headerImage.error())

        post.merge({ user_id: user.id, header_image: headerImageName })

        await post.save()

        response.created(post)
    }

    async show({ params, response }) {
        const { id } = params
        const post = await Post.findOrFail(id)
        const user = await post.user().fetch()
        post.user = user
        response.send(post)
    }

    async update({ auth, params, request, response }) {

        const { id } = params
        const user = await auth.getUser()
        const post = await Post.findOrFail(id)

        if (post.user_id == user.id) {
            post.merge(request.all())
            await post.save()
            response.send({ message: "Post edited", post })
        } else response.unauthorized("UNAUTHORIZED")

    }

    async destroy({ auth, params, response }) {

        const { id } = params
        const user = await auth.getUser()
        const post = await Post.findOrFail(id)

        if (post.user_id == user.id) {
            await post.delete()
            response.send(`Post with an id ${id} is deleted`)
        } else response.unauthorized("UNAUTHORIZED")

    }
}

module.exports = PostController
