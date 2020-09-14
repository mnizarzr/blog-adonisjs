'use strict'

/** @type {typeof import('@adonisjs/validator/src/Validator')} */
const { sanitizor } = use('Validator')

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Post extends Model {

    static boot() {
        super.boot()

        /**
         * A hook to add
         */
        this.addHook('beforeSave', async (postInstance) => {
            postInstance.slug = sanitizor.slug(postInstance.title)
        })
    }

    static get updatedAtColumn() {
        return 'modified_at'
    }

    user() {
        return this.belongsTo('App/Models/User')
    }

    comments() {
        return this.hasMany('App/Models/Comment')
    }

}

module.exports = Post
