

const React = require('react');
const largeNumber = require('large-number');
const s = require('./search.less');
const img = require('../images/tim.jpg');

class Search extends React.Component {
  constructor() {
    super(...arguments);
    this.state = {
      Text: null
    };
  }

  loadComponent() {
    import('./test.js').then((Text) => {
      this.setState({
        Text: Text.default
      });
    });
  }

  render() {
    const { Text } = this.state;
    return (
      <div className="root">
        {Text ? <Text /> : null}
        {largeNumber('111', '999')}
搜索文字的内容44444444444
        <img src={img} onClick={this.loadComponent.bind(this)} />
      </div>
    );
  }
}

module.exports = <Search />;
