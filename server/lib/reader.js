const path = require('path');
const fs = require('fs');
// const NEED_CACHE = true;

class Reader {
  /**
   * @param {object} opts
   * @param {string} opts.bookDir opts.bookDir,
   */
  constructor(opts = {}) {
    opts.bookDir = opts.bookDir.replace(/[\.]{2,}/ig, '');
    const { bookDir } = opts;
    this.__opts = opts;
    this.__readmePath = path.join(bookDir, 'README.md');
    this.__summaryPath =  path.join(bookDir, 'SUMMARY.md');
    this.__cache = {
      timestamp: 0,
      list: [],
      files: {
        // 'SUMMARY.md' : '',
        // 'README.md' : '',
        // 'xxx/xxx.md': '',
      }
    }
  }

  getSummary() {
    const reuslt = this.__getFile(this.__summaryPath);
    return reuslt;
  }

  getReadme() {
    const reuslt = this.__getFile(this.__readmePath);
    return reuslt;
  }

  getPage(pagePath, opts = {}) {
    pagePath = pagePath.replace(/[\.]{2,}/ig, '');
    const filePath = path.join(this.__opts.bookDir, `${pagePath}.md`);
    let summaryRes = { success: false, data: { content: null, summary: null } };
    if (opts && opts.summary === true) {
      summaryRes = this.getSummary()
    }
    const pageRes = this.__getFile(filePath);
    const result = {
      success: pageRes.success,
      data: {
        content: pageRes.data.content,
        summary: summaryRes.data.content,
      }
    }
    return result;
  }

  __getFile(filePath) {
    const result = {
      success: false,
      content: null,
    };
    if (fs.existsSync(filePath) === true) {
      if (fs.statSync(filePath).isFile() === true) {
        result.data = {
          content: fs.readFileSync(filePath, { encoding: 'utf8' }),
          summary: null,
        };
        result.success = true;
      }
    }
    return result;
  }
};


module.exports = Reader;

