var React = require('../../../shims/react');

var LabelsSelector = React.createComponent({

  render: function() {
    var clazz;
    if (this.props.shown)
      clazz = 'displayed';
    else
      clazz = '';

    return (
      <div className={'labelsSelector ' + clazz}>
      </div>
    );
  }

});

module.exports = LabelsSelector;
