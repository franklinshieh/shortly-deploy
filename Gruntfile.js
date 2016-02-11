module.exports = function(grunt) {

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    clean: ['public/dist/main.js'],
    concat: {
      options: {
           separator: ';',
         },
         dist: {
           src: ['public/**/client/*.js'],
           dest: 'public/dist/main.js',
         },
    },

    mochaTest: {
      test: {
        options: {
          reporter: 'spec'
        },
        src: ['test/**/*.js']
      }
    },

    nodemon: {
      dev: {
        script: 'server.js'
      }
    },

    uglify: {
      my_target: {
        files: {
          'public/dist/main.min.js' :  ['public/dist/main.js']
        }
      }
    },

    eslint: {
      target: [
        'public/dist/main.min.js'
      ]
    },

    cssmin: {
      input: 'public/style.css'
    },

    watch: {
      scripts: {
        files: [
          'public/client/**/*.js',
          'public/lib/**/*.js',
        ],
        tasks: [
          'concat',
          'uglify',
        ]
      },
      css: {
        files: 'public/*.css',
        tasks: ['cssmin']
      }
    },

    shell: {
      prodServer: {
        command: 'git push live master'
      }
    },
  });

  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-cssmin');
  grunt.loadNpmTasks('grunt-eslint');
  grunt.loadNpmTasks('grunt-mocha-test');
  grunt.loadNpmTasks('grunt-shell');
  grunt.loadNpmTasks('grunt-nodemon');
  grunt.loadNpmTasks('grunt-contrib-clean');


  grunt.registerTask('server-dev', function (target) {
    // Running nodejs in a different process and displaying output on the main console
    grunt.task.run([ 'clean' ]);
    
    var nodemon = grunt.util.spawn({
      cmd: 'grunt',
      grunt: true,
      args: 'nodemon'
    });
    nodemon.stdout.pipe(process.stdout);
    nodemon.stderr.pipe(process.stderr);
    
    grunt.task.run([ 'watch' ]);
  });

  grunt.registerTask('npm-live', function (target) {
    // Running nodejs in a different process and displaying output on the main console
    var npm = grunt.util.spawn({
      cmd: 'npm',
      args: 'install'
    });
    npm.stdout.pipe(process.stdout);
    npm.stderr.pipe(process.stderr);
  });


  grunt.registerTask('upload', function(n) {
    if (grunt.option('prod')) {
      // add your production server task here
    }
    grunt.task.run([ 'server-dev' ]);
  });

  ////////////////////////////////////////////////////
  // Main grunt tasks
  ////////////////////////////////////////////////////


  grunt.registerTask('test', [
    'eslint', 'mochaTest'
  ]);

  grunt.registerTask('build', [
    'concat', 'uglify', 'cssmin','clean'
  ]);

  grunt.registerTask('upload', function(n) {
    if (grunt.option('prod')) {
      grunt.task.run(['deploy', 'shell']);
      
    } else {
      grunt.task.run([ 'server-dev' ]);
    }
  });

  grunt.registerTask('deploy', [
    'build', 'test'
  ]);


};
