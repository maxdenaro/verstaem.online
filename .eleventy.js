const pageAssetsPlugin = require('./helpers/page-assets');
const syntaxHighlight = require("@11ty/eleventy-plugin-syntaxhighlight");
const readingTime = require('eleventy-plugin-reading-time');
const moment = require('moment-timezone');
const htmlmin = require("html-minifier");

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
    postsMatching: ["src/blog/**/*.md", "src/projects/**/*.md", "src/experts/**/*.md"],
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
        case 'fishki':
          arg2 = 'Фишки'
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

  eleventyConfig.addFilter('categoryFilter', function(collection, category) {
    if (!category) return false;
      const filtered = collection.filter(item => item.data.cat == category)
      return filtered;
  });

  eleventyConfig.addFilter('filterLastArticles', (array) => {
    let lastElement = [];
    lastElement.push(array[array.length - 1]);
    return lastElement;
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
