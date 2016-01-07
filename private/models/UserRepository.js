/**
 * @module UserRepository
 */

/**
 * @returns {UserRepository}
 */
module.exports = (function() {

  'use strict';

  /**
   * @constructor
   */
  function UserRepository() {
    var mongoose = require('mongoose');
    var userSchema = require('./UserSchema');
    this.model = mongoose.model('User', userSchema);
  }

  /**
   * @param {Integer} id
   * @returns {Promise}
   */
  UserRepository.prototype.getById = function(id) {
    return this.model.findById(id).exec();
  };

  /**
   * @returns {Promise}
   */
  UserRepository.prototype.getAll = function() {
    return this.model.find().exec();
  };

  /**
   * @param {String} username
   * @returns {Promise}
   */
  UserRepository.prototype.getByUsername = function(username) {
    return this.model.findOne({username: username}).exec();
  };

  /**
   * @param {Object} user
   * @returns {User}
   */
  UserRepository.prototype.create = function(user) {
    return new this.model(user);
  };

  /**
   * @param {Integer} id
   * @returns {Promise}
   */
  UserRepository.prototype.delete = function(id) {
    return this.model.remove({_id: id}).exec();
  };

  return new UserRepository();

})();
