module.exports = function (grunt) {
    grunt.initConfig({
        watch: {
            sass: {
                files: ['sass/**/*.{scss, sass}', 'sass/_partials/**/*.{scss, sass}'],
                asks: ['sass:dist']
            },
            livereload: {
                files: ['*.html', 'js/**/*.{js, json}', 'css/*.css', 'img/**/*.{png, jpg, jpeg, gif, webp, svg}'],
                options: {
                    livereload: true
                }
            }
        },
        sass: {
            options: {
                sourceMap: true,
                outputStyle: 'compressed'
            },
            dist: {
                files: {
                    'css/sassfunction.css': 'sass/sassfunction.scss'
                }
            }
        }
    });

    grunt.registerTask('default', ['sass:dist', 'watch']);
    grunt.loadNpmTasks('grunt-contrib-sass');
    grunt.loadNpmTasks('grunt-contrib-watch');
};
