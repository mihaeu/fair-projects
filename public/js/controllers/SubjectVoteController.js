app.controller('SubjectVoteController', ['subjectService', 'projectService', '$routeParams',
  function(subjectService, projectService, $routeParams) {

    'use strict';

    var _this = this;
    /**
     * Initializes the controller
     */
    _this.init = function() {
      var requestParameterSubjects = {
        _id: $routeParams.subjectId,
      };
      _this.subject = subjectService.get(requestParameterSubjects);

      var requestParameterProjects = {
        subject: $routeParams.subjectId,
      };
      _this.projects = projectService.getAll(requestParameterProjects);
    };

    _this.init();

    _this.data = [{
        id: 1,
        title: 'node1',
        nodes: [
          {
            id: 11,
            title: 'node1.1',
            nodes: [
              {
                id: 111,
                title: 'node1.1.1',
                nodes: [],
              },
            ],
          },
          {
            id: 12,
            title: 'node1.2',
            nodes: [],
          },
        ],
      }, {
        id: 2,
        title: 'node2',
        nodrop: true, // An arbitrary property to check in custom template for nodrop-enabled
        nodes: [
          {
            id: 21,
            title: 'node2.1',
            nodes: [],
          },
          {
            id: 22,
            title: 'node2.2',
            nodes: [],
          },
        ],
      }, {
        id: 3,
        title: 'node3',
        nodes: [
          {
            id: 31,
            title: 'node3.1',
            nodes: [],
          },
        ],
      },
    ];

  },
]);
