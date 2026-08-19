module.exports = function(eleventyConfig) {
  // Passthrough copy for existing static pages and assets
  eleventyConfig.addPassthroughCopy("admin");
  eleventyConfig.addPassthroughCopy("submit");
  eleventyConfig.addPassthroughCopy("thank-you");
  eleventyConfig.addPassthroughCopy("privacy");
  eleventyConfig.addPassthroughCopy("assets");
  eleventyConfig.addPassthroughCopy("robots.txt");
  eleventyConfig.addPassthroughCopy("llms.txt");

  // Playbooks collection
  eleventyConfig.addCollection("playbooks", function(collectionApi) {
    return collectionApi.getFilteredByGlob("playbooks/posts/*.md")
      .filter(post => !post.data.draft)
      .sort((a, b) => b.date - a.date);
  });

  // Archives collection
  eleventyConfig.addCollection("archives", function(collectionApi) {
    return collectionApi.getFilteredByGlob("archives/posts/*.md")
      .filter(post => !post.data.draft)
      .sort((a, b) => b.date - a.date);
  });

  // Learn collection
  eleventyConfig.addCollection("learn", function(collectionApi) {
    return collectionApi.getFilteredByGlob("learn/posts/*.md")
      .filter(post => !post.data.draft)
      .sort((a, b) => b.date - a.date);
  });

  // RSS date filters
  eleventyConfig.addFilter("rssDate", (dateObj) => {
    return new Date(dateObj).toUTCString();
  });
  eleventyConfig.addFilter("isoDate", (dateObj) => {
    return new Date(dateObj).toUTCString();
  });

  // Date formatting filter
  eleventyConfig.addFilter("readableDate", (dateObj) => {
    return new Date(dateObj).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  });

  // Map an original-source URL to a human platform name for attribution
  eleventyConfig.addFilter("sourceName", (url) => {
    if (!url) return '';
    let host = '';
    try { host = new URL(url).hostname.replace(/^www\./, '').toLowerCase(); }
    catch (e) { return 'the original post'; }
    const map = {
      'youtube.com': 'YouTube',
      'youtu.be': 'YouTube',
      'reddit.com': 'Reddit',
      'old.reddit.com': 'Reddit',
      'news.ycombinator.com': 'Hacker News',
      'discord.com': 'Discord',
      'github.com': 'GitHub',
      'x.com': 'X',
      'twitter.com': 'X',
      'bsky.app': 'Bluesky',
      'medium.com': 'Medium',
      'clawhub.ai': 'ClawHub'
    };
    if (map[host]) return map[host];
    if (host.endsWith('.substack.com')) return 'Substack';
    return host;
  });

  // " on Reddit" — omitted when originalAuthor already carries the platform, e.g. "hawkph (r/openclaw)"
  eleventyConfig.addFilter("platformSuffix", function(author, url) {
    if (!url) return '';
    const name = eleventyConfig.getFilter("sourceName")(url);
    if (!name) return '';
    if (author && /\)\s*$/.test(author)) return '';
    return ' on ' + name;
  });

  // "Watch" for video sources, "Read" otherwise
  eleventyConfig.addFilter("sourceVerb", function(url) {
    const name = eleventyConfig.getFilter("sourceName")(url);
    return name === 'YouTube' ? 'Watch' : 'Read';
  });

  // Excerpt filter
  eleventyConfig.addFilter("excerpt", (content) => {
    if (!content) return '';
    const text = content.replace(/<[^>]+>/g, '').replace(/\n/g, ' ').trim();
    return text.length > 160 ? text.substring(0, 157) + '...' : text;
  });

  return {
    dir: {
      input: ".",
      output: "_site",
      includes: "_includes",
      data: "_data"
    },
    passthroughFileCopy: true,
    htmlTemplateEngine: false,
    markdownTemplateEngine: "njk"
  };
};
