# Contributing to missileMaps

## Overview

The project contains a variety of packages that are published and versioned collectively. Each package lives in its own
directory in the `/packages` directory. Each package is self contained, and defines its dependencies in a package.json file.

We use [Yarn Workspaces](https://yarnpkg.com/lang/en/docs/workspaces/) and [Lerna](https://github.com/lerna/lerna) for
managing and publishing multiple packages in the same repository.

## Getting Started

1. Clone the repo.
2. Install yarn (>= 1.2) if you haven't already: `npm install --global yarn`.
3. Run the setup task: `yarn run setup`.

After this step, the following tasks will be available:

-   `start` – Run the `start` task for each project
-   `build` – Create a production bundle for all projects
-   `test` – Run unit tests for each project
-   `lint` – Run JS and CSS linters for each project
-   `format` – Run prettier to auto-format `*.js`, `*.jsx` and `*.css` files. This command will overwrite files without
    asking, `format:verify` won't.

Running `yarn run setup` once is required to enable all other tasks. The command might take a few minutes to finish.

4. Run the task to change SVG loader: `yarn svg-loader-setup`.
5. Re-run the setup task: `yarn run setup`.
6. Export `SPLUNK_HOME`: `export SPLUNK_HOME=<SPLUNK_HOME_PATH>`.
7. Go to `packages/pew-pew/` and run: `yarn link:app`.

-   This will create a symbolic link to the `stage` folder inside `$SPLUNK_HOME/etc/apps/`.

8. Run the app: `yarn start`.

-   Check that a `stage` directory is added to your application with the files from your existing application. The symbolic link generated before will link to this folder.

9. Package the app following the section `Packaging a @splunk/create app` below.

## Developer Scripts

Commands run from the root directory will be applied to all packages. This is handy when working on multiple packages
simultaneously. Commands can also be run from individual packages. This may be better for performance and reporting when
only working on a single package. All of the packages have similar developer scripts, but not all scripts are implemented
for every package. See the `package.json` of the package in question to see which scripts are available there.

For more granular control of development scripts, consider using [Lerna](https://github.com/lerna/lerna) directly.

## Code Formatting

missileMaps uses [prettier](https://github.com/prettier/prettier) to ensure consistent code formatting. It is recommended
to [add a prettier plugin to your editor/ide](https://github.com/prettier/prettier#editor-integration).

## Testing

Go to `missileMaps/packages/search-manager` and run: `yarn start:demo`.

**TO BE COMPLETED**

## Packaging a @splunk/create app

The `@splunk/create` package does not have its own unique packaging functionality. In general, packaging a `@splunk/create` app can be treated the same as packaging a regular Splunk app and is subject to the same limitations and nuances of the available packaging options for Splunk apps.

You can use a built in OS archive command to package a Splunk app, for example a \*nix system would use a command similar to the one below for `@splunk/create` apps. Note you would need to run this from the `$SPLUNK_HOME/etc/apps` folder.

`COPYFILE_DISABLE=true tar -zcvh --exclude='.gitignore' --exclude='.git' --exclude='local/' --exclude='stage/' --exclude='local.meta' --exclude='.DS_Store' -f <filename>.tar.gz pew-pew/`.
