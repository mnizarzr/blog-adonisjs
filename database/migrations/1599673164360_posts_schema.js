'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class PostsSchema extends Schema {
  up() {
    this.create('posts', (table) => {
      table.bigIncrements()
      table.string('title').notNullable()
      table.text('content').notNullable()
      table.string('header_image', 100).unique()
      table.enu('comment_status', ['open', 'closed']).defaultTo('open')
      table.integer('comment_count').defaultTo(0)
      table.enu('status', ['published', 'draft']).notNullable()

      table.bigInteger('user_id').unsigned()
      table.foreign('user_id').references('users.id')

      table.string('slug').notNullable().unique()
      table.timestamp('created_at').defaultTo(this.fn.now())
      table.timestamp('modified_at')
    })
  }

  down() {
    this.drop('posts')
  }
}

module.exports = PostsSchema
