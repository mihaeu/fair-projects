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

  SubjectRepository.prototype.updateProjectVotes = function(projects, user) {
    for (var voteIndex = 0; voteIndex < projects.length; ++voteIndex) {
      var project = projects[voteIndex];
      var voted = false;
      for (var participantIndex in project.participants) {
        var participant = project.participants[participantIndex];

        // if the user has already voted just update
        if (participant.userId === user._id) {
          projects[voteIndex].participants[participantIndex].vote = voteIndex + 1;
          voted = true;
        }
      }

      // user has never voted before, add new participant
      if (voted === false) {
        projects[voteIndex].participants.push({
          userId: user._id,
          username: user.username,
          vote: voteIndex + 1,
        });
      }
    }

    return projects;
  };

  return new SubjectRepository();

})();
