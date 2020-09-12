'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class UserSchema extends Schema {
  up () {
    this.create('users', (table) => {
      table.bigIncrements()
      table.string('username', 80).notNullable().unique()
      table.string('email').notNullable().unique()
      table.string('password', 60).notNullable()
      table.string('display_name', 100).notNullable()
      table.timestamp('registered_at').defaultTo(this.fn.now())
      table.timestamp('updated_at')
    })
  }

  down () {
    this.drop('users')
  }
}

module.exports = UserSchema
