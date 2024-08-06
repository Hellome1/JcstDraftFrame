let state = jcst['modalTwo'];
state.main = function (h) {
  return h(
    'span',
    {},
    [
      h(
        require('@/' + this.path).default,
        {}
      )
    ]
  )
}

export default {
  state: state
}