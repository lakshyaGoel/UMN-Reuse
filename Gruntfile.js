module.exports = function(grunt){
    grunt.initConfig({
        sass: {                              // Task
            dist: {                            // Target
                files: [{
                    expand: true,
                    cwd: 'public/stylesheets',
                    src: ['*.scss'],
                    dest: "public/stylesheets",
                    ext: '.css'
                }]
            }
        },
        watch: {
            scss: {
                files: ["public/stylesheets/*.scss"],
                tasks: ["sass"]
            },
        }
    });

    var pkg = grunt.file.readJSON("package.json");
    var taskName;
    for(taskName in pkg.devDependencies){
        if(taskName.substring(0, 6) == "grunt-"){
            grunt.loadNpmTasks(taskName);
        }
    }

    grunt.registerTask("default", ["watch"]);
};