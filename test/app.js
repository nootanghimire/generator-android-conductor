'use strict';
var path = require('path');
var assert = require('yeoman-assert');
var helpers = require('yeoman-test');

describe('generator-android-kotlin-conductor', function () {
  this.timeout(15000);

  before(function () {
    return helpers.run(path.join(__dirname, '../generators/app'))
      .withPrompts({
        name: 'SampleApp',
        package: 'com.sample.mvp',
        targetSdk: '21',
        minSdk: '14',
        language: 'kotlin'
      })
      .toPromise();
  });

  it('creates project files', function () {
    assert.file([
      '.gitignore',
      'build.gradle',
      'gradle.properties',
      'gradlew',
      'gradlew.bat',
      'settings.gradle'
    ]);
  });

  it('creates core app files', function () {
    assert.file([
      'app/.gitignore',
      'app/build.gradle',
      'app/proguard-rules.pro',
      'app/output.gradle',
      'app/versioning.gradle'
    ]);
  });

  it('copies config files', function () {
    assert.file([
      'config/quality/checkstyle/checkstyle-config.xml',
      'config/quality/findbugs/android-exclude-filter.xml',
      'config/quality/pmd/pmd-ruleset.xml',
      'config/quality/quality.gradle'
    ]);
  });

  it('copies gradle wrapper', function () {
    assert.file([
      'gradle/wrapper/gradle-wrapper.jar',
      'gradle/wrapper/gradle-wrapper.properties'
    ]);
  });

  it('placeholder should be replaced', function () {
    assert.noFileContent('build.gradle', 'androidTargetSdkVersion');
    assert.noFileContent('build.gradle', 'androidMinSdkVersion');
    assert.noFileContent('app/build.gradle', 'appPackage');
    assert.noFileContent('app/src/main/AndroidManifest.xml', 'appPackage');
  });
});
