module.exports = function(grunt) {
    grunt.initConfig({
        connect : {
            server: {
                options: {
                    port: 8000,
                    base: '.'
                }
            }
        },

        less : {
            production: {
                options: {
                    cleancss: true,
                    compress: true,
                    relativeUrls: true,
                    plugins: [
                        new (require('less-plugin-autoprefix'))({browsers: ["last 2 versions"]}),
                        new (require('less-plugin-clean-css'))({advanced: true})
                    ]
                },
                files: {
                    'dist/jQuery.bigNav.min.css': 'src/jQuery.bigNav.less'
                }
            },

            development: {
                options: {
                    compress: false
                },
                files: [{
                    'src/jQuery.bigNav.css'         : 'src/jQuery.bigNav.less',
                    'src/jQuery.bigNav.example.css' : 'src/jQuery.bigNav.example.less'
                }]
            }
        },

        uglify: {
            production: {
                files: {
                    'dist/jQuery.bigNav.min.js': ['src/jQuery.bigNav.js']
                }
            }
        },

        watch : {
            files : ['example/**/*', 'src/**/*'],
            options : {
                livereload : true
            },

            less: {
                files: ['src/**/*.less'],
                tasks: ['less:development']
            }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-connect');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-less');
    
    grunt.registerTask('default', ['less:development', 'connect:server', 'watch']);
    grunt.registerTask('build', ['less', 'uglify:production'])
    
};