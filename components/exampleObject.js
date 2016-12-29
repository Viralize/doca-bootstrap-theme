const React = require('react');
const Highlight = require('react-highlight');
const Component = require('react-pure-render/component');

class ExampleObject extends Component {

  static propTypes = {
    example: React.PropTypes.string.isRequired,
  };

  render() {
    const { example } = this.props;
    return (
      <div>
        <div>
          <h5>Example object</h5>
        </div>
        <div>
          <Highlight
            className="json"
          >
            {example}
          </Highlight>
        </div>
      </div>
    );
  }

}

module.exports = ExampleObject;
