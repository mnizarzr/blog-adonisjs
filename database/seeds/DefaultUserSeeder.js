'use strict'

/*
|--------------------------------------------------------------------------
| DefaultUserSeeder
|--------------------------------------------------------------------------
|
| Make use of the Factory instance to seed database with dummy data or
| make use of Lucid models directly.
|
*/

/** @type {import('@adonisjs/lucid/src/Factory')} */
const Factory = use('Factory')

/**@type {import('@adonisjs/framework/src/Hash')} */
const Hash = use('Hash')
// Used only for testing

Factory.blueprint('users', async (faker) => {
  return {
    username: "mnizarzr",
    email: "contact@mnizarzr.tech",
    password: await Hash.make('semuasama'), //Hashed in User Model hook
    display_name: "Muhammad Nizar"
  }
})

class DefaultUserSeeder {
  async run() {
    await Factory.get('users').create()
  }
}

module.exports = DefaultUserSeeder
