const _ = require('lodash');
const siteConfig = require('./data/config/site.js');
const dataConfig = require('./data/config/data.js');
const privateConfig = require('./data/config/private.js');

privateConfig.environment = process.env.NODE_ENV;

// whatsnew handlebars data
let whatsnew = _.filter(dataConfig, function(el) {
  return siteConfig.whatsnew.indexOf(el.metric) !== -1;
});

module.exports = {
  files: {
    javascripts: {
      joinTo: {
        'vendor.js': /^(?!app)/,
        'app.js': ['app/js/main.js', 'app/js/Dashboard.vue', 'app/js/vuex-store/index.js', /^app\/js\/modules/, /^app\/js\/components\/(?!report)/],
        'report.js': ['app/js/report.js', 'app/js/components/trend-chart.vue', /^app\/js\/modules/, /^app\/js\/components\/report/],
        'embed.js': ['app/js/embed.js', 'app/js/Embed.vue', 'app/js/components/dashboard-map.vue', 'app/js/components/dashboard-legend.vue','app/js/vuex-store/index.js', /^app\/js\/modules/],
      },
    },
    stylesheets: {
      joinTo: {
        'vendor.css': /^(?!app)/,
        'map.css': /mapbox-gl.css/,
        'app.css': /^app\/css/,
        'report.css': /^app\/css\/report/,
      },
    },
  },
  npm: {
    styles: {
      'material-design-lite': ['dist/material.min.css'],
      'mapbox-gl': ['dist/mapbox-gl.css'],
      '@mapbox/mapbox-gl-geocoder': ['dist/mapbox-gl-geocoder.css'],
      'chartist': ['dist/chartist.css'],
    }
  },
  plugins: {

    babel: {
      presets: [
        [
          'env',
          {
            targets: {
              browsers: ['last 2 versions', 'safari >= 8']
            },
            include: [ 'es7.object.values', ],
          }
        ]
      ],
      ignore: [/node_modules/]
    },
    postcss: {
      processors: [require('postcss-cssnext')({browsers: ['last 2 versions']})]
    },
    handlebars: {
      locals: {
        siteConfig: siteConfig,
        dataConfig: dataConfig,
        privateConfig: privateConfig,
        selectgroups: require('./data/config/selectgroups.js'),
        whatsnew: whatsnew,
      },
      include: { enabled: false },
    },
    swPrecache: {
      options: {
        staticFileGlobs: [
          'public/**/*.{js,css,png,jpg,gif,svg,eot,ttf,woff,woff2}',
          'public/index.html',
          'public/manifest.json',
          'public/data/blockgroup.geojson.json',
          'public/data/tract.geojson.json',
          'public/style/osm-liberty.json',
        ],
        stripPrefix: 'public/',
      }
    },
    uglify: {
      mangle: false,
      compress: {
        global_defs: {
          DEBUG: false
        },
      },
    },
    cssnano: {
      autoprefixer: {
        add: true
      }
    }
  }
};
