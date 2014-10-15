var React = require('react');

var EditInPlaceInput = React.createClass({

  getInitialState: function() {
    return {editMode: false}
  },

  render: function() {
    var clazz = this.state.editMode ? 'is-editing' : '';
    clazz = clazz + ' ' + this.props.className;

    return (
      <div className={"editInPlaceInput " + clazz}>
        <span className="_readOnlyText" onClick={this.enterEditMode}>{this.props.text}</span>
        <input type="text" ref="text" className="_input" onKeyDown={this.handleInputKeyDown}/>
        <div className="_editControls">
          <span className="_control _save" onClick={this.saveEdition}><i className="fi-check"></i></span>
          <span className="_control _cancel" onClick={this.cancelEdition}><i className="fi-x"></i></span>
        </div>
      </div>
    );
  },

  handleInputKeyDown: function (event) {
      if (event.which === 13) {
        this.saveEdition();
      }

      if (event.which === 27) {
        this.escapeEdition();
      }
  },

  saveEdition: function() {
    var text = this.refs.text.getDOMNode().value;
    this.setState({editMode: false, dirtyText: undefined});
    this.props.onEdit(text);
  },

  escapeEdition: function() {
    var text = this.refs.text.getDOMNode().value;
    this.setState({editMode: false, dirtyText: text});
  },

  cancelEdition: function(event, options) {
    this.refs.text.getDOMNode().value = "";
    this.setState({editMode: false, dirtyText: undefined});
  },

  enterEditMode: function(event) {
    var input = this.refs.text.getDOMNode();

    input.value = this.state.dirtyText ?  this.state.dirtyText: this.props.text;
    this.setState({editMode: true}, () => input.select());
  }

});

module.exports = EditInPlaceInput;