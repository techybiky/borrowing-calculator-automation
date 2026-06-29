module.exports = {
  default: {
    paths: ['features/**/*.feature'],
    require: ['step_definitions/**/*.js', 'support/**/*.js'],
    format: [
      'progress-bar',
      'json:reports/results.json',
      'message:reports/results.ndjson',
      'junit:reports/results.xml'
    ],
    formatOptions: {
      snippetInterface: 'async-await'
    }
  }
};
