'use strict'

const Response = require('@adonisjs/vow/src/Response')

/**
 * @type {import('@adonisjs/vow/src/Suite')}
 */
const { test, trait } = use('Test/Suite')('Auth')

/** @type {import('../../app/Models/User')} */
const User = use('App/Models/User')

trait('Test/ApiClient')
trait('Auth/Client')

test('Register User', async ({ client }) => {

  const user = {
    username: 'mnizarzr',
    email: 'contact@mnizarzr.tech',
    display_name: 'Muhammad Nizar'
  }

  const response = await client.post("api/signup").send({ password: 'semuasama', ...user }).end()
  response.assertStatus(200)
  response.assertJSONSubset(user)

})

test('User Sign In', async ({ client, assert }) => {

  const user = {
    username: 'mnizarzr',
    password: 'semuasama'
  }

  const response = await client.post("api/signin").send(user).end()

  response.assertStatus(200)
  assert.hasAllKeys(response.body, ['type', 'token', 'refreshToken'])

})

test('User Sign Out', async ({ client, assert }) => {

  const user = {
    username: 'contact@mnizarzr.tech',
    password: 'semuasama'
  }

  const response = await client.get("api/signout").loginVia(user, 'jwt').end()

  console.log(response)


})