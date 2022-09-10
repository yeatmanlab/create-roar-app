#!/usr/bin/env node

import { create } from 'create-create-app';
import { resolve } from 'path';

const templateRoot = resolve(__dirname, '..', 'templates');

const defaultDescription = `e.g., This is a simple, two-alternative forced \
choice, time-limited lexical decision task measuring the automaticity of word \
recognition. ROAR-SWR is described in further detail at \
https://doi.org/10.1038/s41598-021-85907-x`;

create('create-roar-app', {
  templateRoot,
  defaultDescription: defaultDescription.replace(/(\s\s+|[\t\n])/g, ' ').trim(),
  promptForLicense: false,
  promptForTemplate: true,
  defaultLicense: 'UNLICENSED',
  defaultTemplate: 'empty',
  extra: {
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
