'use strict'

const { test, trait } = use('Test/Suite')('Auth')
const ace = require('@adonisjs/ace')

/**@type {import('../../app/Models/User')} */
const User = use('App/Models/User')

trait('Test/ApiClient')
trait('Auth/Client')

test('Get All Users', async ({ client, assert }) => {

  await ace.call("seed", { "files": 'UserSeeder.js' }, { silent: true })

  const response = await client.get('api/users').end()

  response.assertStatus(200)
  assert.isArray(response.body)
  assert.doesNotHaveAnyKeys(response.body[0], ['password'])

})

test("Show single user by id", async ({ client }) => {

  const response = await client.get('api/users/1').end()

  response.assertStatus(200)

})

test("Update a user", async ({ client, assert }) => {

  const authUser = {
    id: 1,
    email: 'contact@mnizarzr.tech',
    password: 'semuasama'
  }

  const updated = {
    display_name: "nizar tok"
  }

  const response = await client.put(`api/users/1`).loginVia(authUser, 'jwt').send(updated).end()

  const user = await User.find(1)

  response.assertStatus(200)
  response.assertJSONSubset({ message: "User updated" })

  assert.equal(user.display_name, updated.display_name)

})

/* test("Delete a user", async ({ client }) => {

  const response = await client.delete(`api/users/1`).end()

  response.assertStatus(200)

}) */