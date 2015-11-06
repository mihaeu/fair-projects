app.controller('ProjectController', ['$http', 'subjectService', 'projectService', '$scope', '$route', '$routeParams', '$location',
    function ($http, subjectService, projectService, $scope, $route, $routeParams, $location) {
        $scope.$route = $route;
        $scope.$location = $location;
        $scope.$routeParams = $routeParams;
        $scope.name = 'ProjectController';
        var projectController = this;

        /**
         * List all projects of a subject.
         */
        projectController.list = function () {
            var requestParameterProjects = {
                'subject': projectController.subject._id
            };
            projectController.projects = projectService.getAll(requestParameterProjects);

        };

        /**
         * Shows a single project.
         */
        projectController.show = function() {
            var requestParameterProject = {
                'subject': projectController.subject._id,
                'id': $routeParams.projectId
            };
            projectController.project = projectService.get(requestParameterProject);
        };

        /**
         * Creates a new project.
         */
        projectController.create = function () {
            var data = {
                'subject': projectController.subject._id,
                'name': projectController.newProject.name,
                'description': projectController.newProject.description
            };
            projectService.create(data, function (data) {
                projectController.projects.push(data);
                projectController.newProject.name = '';
                projectController.newProject.description = '';
            });
        };

        /**
         * Deletes a project.
         *
         * @param {Object} project
         */
        projectController.delete = function (project) {
            var requestParameterProject = {
                'subject': projectController.subject._id,
                'id': project._id
            };
            projectService.delete(requestParameterProject)
                .$promise.then(function () {
                    projectController.projects = _.without(projectController.projects, project);
                });
        };

        /**
         * Constructor
         */
        projectController.init = function() {
            var requestParameterSubject = {
                '_id': $routeParams.subjectId
            };
            subjectService.get(requestParameterSubject).$promise.then(function(subject) {
                projectController.subject = subject;

                if (typeof $routeParams.projectId === 'undefined') {
                    projectController.list();
                }else {
                    projectController.show();
                }
            });
        };

        projectController.init();
    }]);
