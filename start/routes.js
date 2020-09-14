'use strict'

/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| Http routes are entry points to your web application. You can create
| routes for different URL's and bind Controller actions to them.
|
| A complete guide on routing is available here.
| http://adonisjs.com/docs/4.1/routing
|
*/

/** @type {typeof import('@adonisjs/framework/src/Route/Manager')} */
const Route = use('Route')

Route.on('/').render('welcome')

Route.group(() => {

    Route.post('signin', 'AuthController.login').validator('LoginWithUsername')
    Route.get('signout', 'AuthController.logout').middleware(['auth'])

    Route.resource('users', 'UserController')
        .validator(new Map([
            [['users.store'], ['StoreUser']],
        ])).middleware(new Map([
            [['update'], ['auth']]
        ])).apiOnly()

    Route.resource('posts', 'PostController')
        .validator(new Map([
            [['posts.store'], ['StorePost']],
        ]))
        .middleware(new Map([
            [['store', 'update', 'destroy'], ['auth']]
        ])).apiOnly()

    Route.resource('posts.comments', 'CommentController')
        .apiOnly()

    Route.post('posts/:posts_id/comments/:comments_id/replies', 'CommentController.storeReply')
        .as('posts.comments.replies')

    // Route.resource('posts.comments.replies', 'CommentReplyController')
    //     .only(['index', 'store', 'show'])

}).prefix('api')