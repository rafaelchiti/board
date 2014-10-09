var React = require('react');

var LabelsSelector = React.createClass({

  render: function() {
    var clazz;
    if (this.props.shown)
      clazz = 'displayed';
    else
      clazz = '';

    return (
      <div className={'labelsSelector ' + clazz}>
        <span className="labelsSelector__label label1"></span>
        <span className="labelsSelector__label label2"></span>
        <span className="labelsSelector__label label3"></span>
        <span className="labelsSelector__label label4"></span>
      </div>
    );
  }

});

module.exports = LabelsSelector;
