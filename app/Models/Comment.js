'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Comment extends Model {

    static get updatedAtColumn() {
        return 'modified_at'
    }

    post() {
        return this.belongsTo('App/Models/Post')
    }

    parent() {
        return this.belongsTo('App/Models/Comment', 'parent_id', 'id')
    }

    // comments inside another comments are replies
    replies() {
        return this.hasMany('App/Models/Comment', 'id', 'parent_id')
    }

    user() {
        return this.belongsTo('App/Models/User')
    }

}

module.exports = Comment
