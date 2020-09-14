'use strict'

/** @type {typeof import('../../Models/Post')} */
const Post = use('App/Models/Post')

/** @type {typeof import('../../Models/Comment')} */
const Comment = use('App/Models/Comment')

class CommentController {

    async index({ params, response }) {
        const { posts_id: postId } = params
        const post = await Post.findOrFail(postId)
        const comments = await post.comments().fetch()
        post.toJSON()
        post.comments = comments.toJSON()
        response.send(post)
    }

    async store({ params, request, response }) {
        const { posts_id: postId } = params
        const post = await Post.find(postId)
        const comment = new Comment()

        comment.fill(request.all())
        await comment.post().associate(post)
        await comment.save()

        post.toJSON()
        comment.toJSON()
        post.new_comment = comment
        response.created(post)
    }

    async storeReply({ params, request, response }) {
        const { comments_id: commentId, posts_id: postId } = params
        const comment = new Comment()
        comment.fill(request.all())
        comment.merge({ post_id: postId, parent_id: commentId })
        await comment.save()
        response.created(comment)
    }

    async show({ params, response }) {

        const { id: commentId } = params
        const comment = await Comment.findOrFail(commentId)
        // const post = await comment.post().fetch()
        const user = await comment.user().fetch()
        const replies = await comment.replies().fetch()
        const parent = await comment.parent().fetch()

        comment.toJSON()
        // comment.post = post
        comment.user = user
        comment.replies = replies
        comment.parent = parent

        response.send(comment)

    }

    async update({ params, request, response }) {

        const { id: commentId } = params

        const comment = await Comment.findOrFail(commentId)
        comment.merge(request.all())
        await comment.save()

        response.send({ message: "Comment updated", comment })

    }

    async destroy({ params, response }) {
        const { id: commentId } = params
        const comment = await Comment.find(commentId)
        await comment.delete()

        response.send(`Comment with an id ${commentId} is deleted`)
    }

}

module.exports = CommentController
