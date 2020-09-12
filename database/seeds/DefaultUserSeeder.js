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

// Used only for testing

Factory.blueprint('users', (faker) => {
  return {
    username: "mnizarzr",
    email: "contact@mnizarzr.tech",
    password: 'semuasama', //Hashed in User Model hook
    display_name: "Muhammad Nizar"
  }
})

class DefaultUserSeeder {
  async run() {
    await Factory.get('users').create()
  }
}

module.exports = DefaultUserSeeder
