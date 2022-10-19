#!/usr/bin/env node

import { create } from 'create-create-app';
import { resolve } from 'path';

const templateRoot = resolve(__dirname, '..', 'templates');

create('create-roar-app', {
  templateRoot,
  promptForLicense: false,
  promptForTemplate: true,
  defaultLicense: 'UNLICENSED',
  defaultTemplate: 'hot-dog-2afc',
  extra: {
    githubUsername: {
      type: 'input',
      describe: 'Your GitHub username or organization name.',
      default: 'yeatmanlab',
      prompt: 'if-no-arg',
    },
    orgName: {
      type: 'input',
      describe: 'Your lab or organization name.',
      default: 'yeatmanlab',
      prompt: 'if-no-arg',
    },
    variant: {
      type: 'input',
      describe: `The name of the task variant. For example, some tasks have \
      variants for real vs. pseudo fonts. Or for random vs. adaptive stimulus \
      selection.`
        .replace(/(\s\s+|[\t\n])/g, ' ')
        .trim(),
      default: 'default',
      prompt: 'if-no-arg',
    },
    variantDescription: {
      type: 'input',
      describe: 'A description of the task variant.',
      default: 'default',
      prompt: 'if-no-arg',
    },
  },
  after: async ({ installNpmPackage }) => {
    console.log('Installing additional packages');
    await installNpmPackage([
      '@babel/core',
      '@babel/preset-env',
      'babel-loader',
      'file-loader',
      'jspsych',
      'papaparse',
      'regenerator-runtime',
      'roarr',
      'webpack',
      'webpack-cli',
      'webpack-dev-server',
      '@bdelab/roar-firekit',
      '@jspsych/plugin-fullscreen',
      '@jspsych/plugin-survey-text',
      '@jspsych/plugin-preload',
      '@jspsych/plugin-html-keyboard-response',
    ]);

    await installNpmPackage(
      [
        'css-loader',
        'eslint',
        'eslint-config-airbnb-base',
        'eslint-plugin-import',
        'folder-hash',
        'html-webpack-plugin',
        'style-loader',
        'webpack-merge',
      ],
      true,
    );
  },
  caveat: ({ packageDir }) => {
    console.log('Next step:');
    console.log(`cd ${packageDir}`);
    console.log('Then edit files as necessary');
    console.log('Then use npm start');
  },
});
