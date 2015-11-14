/**
 * @module SubjectRepository
 */

/**
 * @returns {SubjectRepository}
 */
module.exports = (function() {

  'use strict';

  /**
   * @constructor
   */
  function SubjectRepository() {
    var mongoose = require('mongoose');
    var subjectSchema = require('./SubjectSchema');
    this.model = mongoose.model('Subject', subjectSchema);
  }

  /**
   * @param {Integer} id
   * @returns {Promise}
   */
  SubjectRepository.prototype.getById = function(id) {
    return this.model.findById(id).exec();
  };

  /**
   * @returns {Promise}
   */
  SubjectRepository.prototype.getAll = function() {
    return this.model.find().exec();
  };

  /**
   * @param {Object} subject
   * @returns {Subject}
   */
  SubjectRepository.prototype.create = function(subject) {
    return new this.model(subject);
  };

  /**
   * @param {Integer} id
   * @returns {Promise}
   */
  SubjectRepository.prototype.delete = function(id) {
    return this.model.remove({_id: id}).exec();
  };

  return new SubjectRepository();

})();
