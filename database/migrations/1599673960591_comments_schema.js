'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class CommentsSchema extends Schema {
  up () {
    this.create('comments', (table) => {
      table.bigIncrements()
      table.bigInteger('post_id').notNullable()
      table.foreign('post_id').references("posts.id")
      table.string('author_name', 100).notNullable()
      table.string('author_email').notNullable()
      table.text('content').notNullable()
      table.bigInteger('user_id')
      table.foreign('user_id').references("users.id")
      table.bigInteger('parent_id')
      table.foreign('parent_id').references("comments.id")
      table.timestamp('created_at').defaultTo(this.fn.now())
      table.timestamp('modified_at')
    })
  }

  down () {
    this.drop('comments')
  }
}

module.exports = CommentsSchema
