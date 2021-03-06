const React = require('react');
const Constraints = require('./constraints');
const MarkdownPreview = require('react-marked-markdown').MarkdownPreview;
const ImmutablePropTypes = require('react-immutable-proptypes');
const Component = require('react-pure-render/component');
const Definition = require('./definition');

class ObjectDefinitionTable extends Component {

  static propTypes = {
    definitions: ImmutablePropTypes.map,
  };

  render() {
    const { definitions } = this.props;
    return (
      <table className="table table-hover">
        <thead>
          <tr>
            <th>Name <small>/type</small></th>
            <th>Description <small>/example</small></th>
            <th>Constraints</th>
          </tr>
        </thead>
        <tbody>
          {definitions && definitions.entrySeq().map(([key, definition]) =>
            <tr key={key}>
              <td>
                <strong>{key.toLowerCase()}</strong><br />
                <small><em>{definition.get('type')}</em></small>
              </td>
              <td>
                {definition.get('description') &&
                  <MarkdownPreview value={definition.get('description')} />}
                <div>
                  {definition.get('example') &&
                    <small>
                      <code>{definition.get('example')}</code>
                    </small>
                  }
                  {definition.get('oneOf') && <span><br />One of the following:</span>}
                  {definition.get('anyOf') && <span><br />Any of the following:</span>}
                </div>

                {definition.get('all_props') &&
                  <Definition definitions={definition.get('all_props')} />
                }

                {definition.get('oneOf') &&
                  definition.get('oneOf').entrySeq().map(([subkey, subdefinition]) =>
                    <div key={subkey}>
                      <h6>{subdefinition.get('description')}</h6>
                      <Definition definitions={subdefinition.get('all_props')} />
                    </div>
                )}

                {definition.get('anyOf') &&
                  definition.get('anyOf').entrySeq().map(([subkey, subdefinition]) =>
                    <div key={subkey}>
                      <h6>{subdefinition.get('description')}</h6>
                      <Definition definitions={subdefinition.get('all_props')} />
                    </div>
                )}
              </td>
              <td>
                <Constraints constraints={definition} />
              </td>
            </tr>
          )}
        </tbody>
      </table>
    );
  }

}

module.exports = ObjectDefinitionTable;
