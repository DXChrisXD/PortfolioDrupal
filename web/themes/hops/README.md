# HOPS

## INTRODUCTION

A Drupal 8 starter theme focused on fast coding.

It provides the proper structure to follow Drupal guidelines on
[css architecture](https://www.drupal.org/node/1887918) using the
[SMACSS system](https://smacss.com/).

It encourages [BEM](https://en.bem.info/methodology/quick-start/) methodology
for a reusable component-based approach.

Hops is coupled with Fractal to provide themers an interface for styleguide driven development.
It provides a default configuration file and an example of component for the [UI Patterns](https://www.drupal.org/project/ui_patterns) module.

It uses [Bourbon](http://bourbon.io/), [mappy-breakpoints](https://github.com/zellwk/mappy-breakpoints) and SASS
settings are included for fonts, colors, layout, etc. to be quickly effective.

As for 🍻, Hops delivers the vital ingredient you need to brew your product
according to your taste.

## FEATURES

- [Drush] Generate a new base theme with drush.
- [Gulp] Generate a living styleguide using Fractal.
- [Gulp] Livereload sass, js, twig and styleguide files.
- [Gulp] Images compression.
- [Gulp] Compile es6 with babel.
- Provides the necessary favicons only.
- Provides a default theme.breakpoints.yml file.
- Provides a default theme.ui_patterns.yml file.
- Continuous Integration: build files located under `dist` can be ignored by git and compiled by your CI tool with the `npm run build` task.

## REQUIREMENTS

- [npm](https://www.npmjs.com/get-npm)
- [gulp](https://gulpjs.com/)

## RECOMMENDED MODULES

### DRUPAL STYLEGUIDE

It's recommended using
[Drupal Styleguide](https://www.drupal.org/project/styleguide) for Drupal core
markup styling and eventually html elements.

### COMPONENT LIBRARIES & UI PATTERNS

[Component Libraries](https://www.drupal.org/project/components) &
[UI Patterns](https://www.drupal.org/project/ui_patterns) combined integrates
very well with Fractal to use custom components as Drupal plugins. Unfortunately
[Fractal's Twig](https://github.com/frctl/fractal/issues/126) adapter does not
support `.html.twig` extension (only `.twig`). As a result, it is recommended
to include styleguide components from `styleguide-src/components` directory
with `{% include %}` statement in templates stored in `templates/`. Examples
can be found  in basic setting file `hops.ui_patterns.yml` and example
component.

## INSTALLATION

### WITH DRUSH

Hops gives you a clean starting point for your theme and it's meant to be fully
duplicated.
The provided drush install (based on
[Basic](https://www.drupal.org/project/basic)) will automated this task for
you and prepare a clean new theme. Just follow theses steps:

1. Donwload or clone this repository in the `theme/custom` directory.
2. `$ drush en hops -y` : install hops.
3. Be sure the temporary files directory has the correct permissions to be
writable.
4. `$ drush hops-install` : then follow the process to define your theme
options.
5. `$ drush pmu hops -y` to uninstall hops, then delete it.
6. `$ npm install` : install node dependencies from your theme directory.
7. Enable your theme.

## CONFIGURATION

- Define `theme-color` meta tag under
`admin/appearance/settings`.
- Get the stylguide url from theme settings. The link is displayed if the styleguide has been generated (with `npm run build `or `gulp fractal:build`). The compiled styleguide is located under `dist/styleguide`.
- Configuration for the styleguide can be edited under `gulpfile.js`.
- Browserlist configuration is under `packages.json` file.
- Define Browser-sync config under `gulp.config.js`.
- It is recommended to start a project by changing/checking all variables of `_variables.scss` file.

## GULP & NPM TASKS

- `$ npm run dev`
  - watches sass, js, twig files and new images located under `src`.
  - run browser-sync.
  - run Fractal styleguide server.
  - compress png, jpg, svg images.
- `$ npm run build`
  - compile sass, js.
  - compress png, jpg, svg images.
  - static build of Fractal styleguide under `dist/styleguide`.
- Configure browser-sync under `gulp.config.js` then check the logs after running `npm run dev`. By default, browser-sync will livereload `http://d8.lndo.site:4000` and Fractal will run at `http://localhost:3000`.
- If you want to write es6, use `.es6.js` extension for your js files under `/src/js`, they will be compiled as `.min.js` under `/dist/js`.
- SASS and JS errors are send as OS Notification with gulp notify.

## ROADMAP

- Review theme installation / potiential update method.
- Review Styleguide implementation, depending on Fractal v2? With GraphQl?
