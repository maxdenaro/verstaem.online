const pageAssetsPlugin = require('./helpers/page-assets');
const syntaxHighlight = require("@11ty/eleventy-plugin-syntaxhighlight");
const readingTime = require('eleventy-plugin-reading-time');
const moment = require('moment-timezone');
const htmlmin = require("html-minifier");
const markdownItDefault = require('markdown-it');
const outdent = require('outdent');

// you can use any plugins and configs you want
const markdownIt = markdownItDefault({
  html: true,
  breaks: false,
  linkify: true,
});

module.exports = function(eleventyConfig) {

  eleventyConfig.addPassthroughCopy("assets");

  eleventyConfig.addPassthroughCopy("src/js");
  eleventyConfig.addPassthroughCopy("src/css");

  eleventyConfig.addFilter("dateformat", function(dateIn) {
    moment.locale('ru');
      return moment(dateIn).tz('Europe/Moscow').format('DD.MM.YY');
  });

  eleventyConfig.addTransform("htmlmin", function(content, outputPath) {
    if( outputPath.endsWith(".html") ) {
      let minified = htmlmin.minify(content, {
        removeComments: true,
        collapseWhitespace: true
      });
      return minified;
    }

    return content;
  });

  eleventyConfig.addPlugin(pageAssetsPlugin, {
    mode: "directory",
    postsMatching: ["src/blog/**/*.md", "src/projects/**/*.md", "src/experts/**/*.md", "src/tasks/**/*.md"],
    recursive: true,
  });

  eleventyConfig.addCollection('categoryList', collection => {
    let catSet = {};
    collection.getAll().forEach(item => {
        if (!item.data.categories) return;
        item.data.categories.filter(
            cat => !['blog'].includes(cat)
        ).forEach(
            cat => {
                if (!catSet[cat]) { catSet[cat] = []; }
                catSet[cat].push(item)
            }
        );
    });
    return catSet;
  });

  eleventyConfig.addCollection('levelsList', collection => {
    let catSet = {};
    collection.getAll().forEach(item => {
        if (!item.data.levels) return;
        item.data.levels.filter(
            cat => !['projects'].includes(cat)
        ).forEach(
            cat => {
                if (!catSet[cat]) { catSet[cat] = []; }
                catSet[cat].push(item)
            }
        );
    });
    return catSet;
  });

  eleventyConfig.addCollection('levelsListTasks', collection => {
    let catSet = {};
    collection.getAll().forEach(item => {
        if (!item.data.levels2) return;
        item.data.levels2.filter(
            cat => !['tasks'].includes(cat)
        ).forEach(
            cat => {
                if (!catSet[cat]) { catSet[cat] = []; }
                catSet[cat].push(item)
            }
        );
    });
    return catSet;
  });

   eleventyConfig.addFilter("changeTextInRussian", function(arg1) {
      let arg2;
      switch (arg1) {
        case 'easy':
          arg2 = 'Легкий'
          break;
        case 'normal':
          arg2 = 'Средний'
          break;
        case 'hard':
          arg2 = 'Сложный'
          break;
        case 'info':
          arg2 = 'Объявления'
          break;
        case 'howto':
          arg2 = 'Как это делается?'
          break;
        case 'HTML':
          arg2 = 'HTML'
          break;
        case 'nearweb':
          arg2 = 'Околовеб'
          break;
        default:
          arg2 = 'Показать все';
      }

      return arg2;
    });

  eleventyConfig.addPlugin(readingTime);

  eleventyConfig.addPlugin(syntaxHighlight);

  eleventyConfig.addFilter('consoleDump', function(asd) {
    console.log(asd);
  });

  eleventyConfig.addPairedShortcode("tableShortcode", function(children) {
    const content = markdownIt.render(children);
    return outdent`<div class="table-wrapper">${content}</div>`
});

  return {
    addPassthroughFileCopy: true,
    markdownTemplateEngine: "njk",
    dataTemplateEngine: "njk",
    templateFormats: ["html", "njk", "md"],
    dir: {
      input: "src",
      output: "app",
      includes: "includes",
      layouts: "layouts",
      data: "_data",
    }
  }
}
