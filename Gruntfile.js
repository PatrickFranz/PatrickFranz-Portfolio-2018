module.exports = function(grunt){
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        sass: {
            dist: {
                options: {
                    style : 'expanded'
                },
                files: {
                    'css/portfolio.css' : `css/portfolio.scss`
                }
            }
        },
        jshint: {
            files: ['Gruntfile.js', 'js/**/*.js']
        },
        watch: {
            options: {
                reload: true
            },
            sass: {
                files: 'css/**/*.scss',
                tasks: ['sass']
            },
            jshint: {
                files: '<%= jshint.files %>'
            },
            watch: {
                files: 'Gruntfile.js',
                tasks: ['watch']
            }
          }
          
    });

    grunt.loadNpmTasks('grunt-contrib-sass');
    // grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-watch');

    grunt.registerTask('default', ['watch']);
};