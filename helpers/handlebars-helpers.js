module.exports = {
  ifEq: function (a, b, opts) {
    return (a === b) ? opts.fn(this) : opts.inverse(this)
  }
}
