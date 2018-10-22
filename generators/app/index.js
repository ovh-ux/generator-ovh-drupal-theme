"use strict";
const Generator = require("yeoman-generator");
const yosay = require("yosay");
const chalk = require("chalk");
const _ = require("lodash");
const mkdirp = require("mkdirp");

module.exports = class extends Generator {

    prompting() {
        // Have Yeoman greet the user.
        this.log(yosay(
            "Welcome to the OVH Drupal Theme generator!"
        ));

        const prompts = [{
            name: "themeName",
            message: "Enter the new theme name:",
            default: "My Awesome Theme",
            validate: (input) => {
                if (!input) {
                    return "Please enter your theme's name.";
                }
                return true;
            }
        }, {
            name: "themeMachineName",
            message: "Enter the module machine name:",
            default: (props) => { return _.snakeCase(props.themeName); },
            validate: (input) => {
                if (!input) {
                    return "Please enter your theme's name.";
                } else if (!/^[a-z0-9_]+$/.test(input)) {
                    return "Please enter only lowercase letters, numbers and underscores."
                }
                return true;
            }
        }, {
            name: "themeDesc",
            message: "Enter theme description:",
            validate: (input) => {
                if (!input) {
                    return "Please enter your theme's description.";
                }
                return true;
            }
        }, {
            name: "themePackageName",
            message: "Enter package name:",
            default: "Other",
            validate: (input) => {
                if (!input) {
                    return "Please enter your package's name.";
                }
                return true;
            }
        }, {
            name: "themeCoreVersion",
            message: "Enter Drupal Core version:",
            default: "8.x",
            validate: (input) => {
                if (!input) {
                    return "Please enter the Drupal Core version.";
                }
                return true;
            }
        }, {
            name: "themeBaseTheme",
            message: "Do you want to be a sub-theme?",
            type: "confirm",
            default: false

        }, {
            name: "themeBaseThemeName",
            message: "Enter the base theme name (i.e. classy, seven):",
            default: "ovh_theme_base",
            when: (props) => { return !!props.themeBaseTheme; },
            validate: (input) => {
                if (!input) {
                    return "Please enter your base theme's name.";
                } else if (!/^[a-z0-9_]+$/.test(input)) {
                    return "Please enter only lowercase letters, numbers and underscores."
                }
                return true;
            }
        }];

        return this.prompt(prompts).then((props) => {
            this.props = {
                themeName: props.themeName,
                themeMachineName: props.themeMachineName,
                themeDesc: props.themeDesc,
                themePackageName: props.themePackageName,
                themeCoreVersion: props.themeCoreVersion,
                themeBaseTheme: props.themeBaseTheme,
                themeBaseThemeName: props.themeBaseThemeName
            };
        });
    }

    writing() {

        const destinationRoot = this.props.themeMachineName;

        mkdirp.sync(destinationRoot);
        this.destinationRoot(destinationRoot);

        // JS
        mkdirp.sync(`${destinationRoot}/js`);
        this.fs.copyTpl(
            this.templatePath("js/_main.js"),
            this.destinationPath("js/main.js"),
            this.props
        );

        // SCSS
        this.fs.copy(
            this.templatePath("scss"),
            this.destinationPath("scss")
        );

        // Images
        mkdirp.sync(`${destinationRoot}/images`);
        mkdirp.sync(`${destinationRoot}/images/icons`);
        this.fs.copy(
            this.templatePath("images/favicon.ico"),
            this.destinationPath("images/favicon.ico")
        );
        this.fs.copy(
            this.templatePath("images/README.md"),
            this.destinationPath("images/README.md")
        );

        // Fonts
        this.fs.copy(
            this.templatePath("fonts"),
            this.destinationPath("fonts")
        );

        // Templates
        mkdirp.sync(`${destinationRoot}/templates`);
        mkdirp.sync(`${destinationRoot}/templates/block`);
        mkdirp.sync(`${destinationRoot}/templates/component`);
        mkdirp.sync(`${destinationRoot}/templates/content`);
        mkdirp.sync(`${destinationRoot}/templates/input`);
        mkdirp.sync(`${destinationRoot}/templates/layout`);
        mkdirp.sync(`${destinationRoot}/templates/navigation`);
        mkdirp.sync(`${destinationRoot}/templates/system`);
        mkdirp.sync(`${destinationRoot}/templates/user`);
        mkdirp.sync(`${destinationRoot}/templates/views`);

        // Config
        this.fs.copyTpl(
            this.templatePath("_package.json"),
            this.destinationPath("package.json"),
            this.props
        );
        this.fs.copyTpl(
            this.templatePath("_README.md"),
            this.destinationPath("README.md"),
            this.props
        );
        this.fs.copy(
            this.templatePath("babelrc"),
            this.destinationPath(".babelrc")
        );
        this.fs.copy(
            this.templatePath("editorconfig"),
            this.destinationPath(".editorconfig")
        );
        this.fs.copy(
            this.templatePath("eslintignore"),
            this.destinationPath(".eslintignore")
        );
        this.fs.copy(
            this.templatePath("eslintrc.yaml"),
            this.destinationPath(".eslintrc.yaml")
        );
        this.fs.copy(
            this.templatePath("gitignore"),
            this.destinationPath(".gitignore")
        );
        this.fs.copy(
            this.templatePath("stylelintignore"),
            this.destinationPath(".stylelintignore")
        );
        this.fs.copy(
            this.templatePath("stylelintrc.js"),
            this.destinationPath(".stylelintrc.js")
        );
        this.fs.copy(
            this.templatePath("gulpfile.js"),
            this.destinationPath("gulpfile.js")
        );
        this.fs.copy(
            this.templatePath("gulpfile.yml"),
            this.destinationPath("gulpfile.yml")
        );
        this.fs.copy(
            this.templatePath("logo.png"),
            this.destinationPath("logo.png")
        );
        this.fs.copy(
            this.templatePath("logo.svg"),
            this.destinationPath("logo.svg")
        );
        this.fs.copy(
            this.templatePath("screenshot.png"),
            this.destinationPath("screenshot.png")
        );

        // Drupal config
        this.fs.copyTpl(
            this.templatePath("_theme.breakpoints.yml"),
            this.destinationPath(`${this.props.themeMachineName}.breakpoints.yml`),
            this.props
        );
        this.fs.copyTpl(
            this.templatePath("_theme.info.yml"),
            this.destinationPath(`${this.props.themeMachineName}.info.yml`),
            this.props
        );
        this.fs.copyTpl(
            this.templatePath("_theme.libraries.yml"),
            this.destinationPath(`${this.props.themeMachineName}.libraries.yml`),
            this.props
        );
        this.fs.copyTpl(
            this.templatePath("_theme.settings.yml"),
            this.destinationPath(`config/install/${this.props.themeMachineName}.settings.yml`),
            this.props
        );
        this.fs.copyTpl(
            this.templatePath("_theme.theme"),
            this.destinationPath(`${this.props.themeMachineName}.theme`),
            this.props
        );
    }

    install() {
        const skipInstall = this.options["skip-install"];

        this.installDependencies({
            skipInstall: skipInstall,
            bower: false,
            npm: true,
            callback: () => {
                if (!skipInstall) {
                    this.emit("dependenciesInstalled");
                } else {
                    this.log("Done! You can now:");
                    this.log("  - run 'npm install'");
                    this.log("  - if you use Webpack (default), run 'cp node_modules/gulp-drupal-theme-core/templates/webpack.config.js ./'");
                    this.log("  - run 'gulp compile' or other Gulp tasks");
                }
            }
        });

        this.on("dependenciesInstalled", () => {

            try {
                this.fs.copy(
                    this.destinationPath("node_modules/gulp-drupal-theme-core/templates/webpack.config.js"),
                    this.destinationPath("webpack.config.js")
                );
            } catch(e) {
                this.log(chalk.red("Impossible to copy 'node_modules/gulp-drupal-theme-core/templates/webpack.config.js'. Please try it yourself."));
            }

            this.log(chalk.green("\n>> Done! You can now run 'gulp compile' or other Gulp tasks.\n"));

        });
    }
};
