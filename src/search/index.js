

import React from 'react';
import ReactDOM from 'react-dom';
import './search.less';
import largeNumber from 'large-number';
import img from '../images/tim.jpg';

class Serach extends React.Component {
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

ReactDOM.render(<Serach />, document.getElementById('root'));
