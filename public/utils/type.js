var TYPE = {};

(function () {
  function TypeText() {}
  TypeText.prototype = {
    constructor: TypeText
  }
  TypeText.init = function(text, style) {
    return {
      type: 'text',
      text: text,
      style: style
    };
  }

  TYPE.Text = TypeText;
})();