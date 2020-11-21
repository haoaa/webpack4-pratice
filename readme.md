- js
```
 @babel/core @babel/preset-env babel-loader -D
 rules: [
      {
        test: /\.js$/,
        use: 'babel-loader'
      }
 ]
 ```
- react
 ```
 yarn add react react-dom @babel/preset-react -D
 ```
 ```jsx
 'use strict'
import React from 'react'
import ReactDOM from 'react-dom'

class Serach extends React.Component{
  render() {
    return <div>search text</div>
  }
}

ReactDOM.render(
  <Serach/>,
  document.getElementById('root')
)
```

- css
```
yarn add style-loader css-loader -D
```

- watch需要手动刷新
  watchOptions: {
    aggregateTimeout: 600,
    ignored: /node_modules/
  }

- webpack-dev-server热更新输出到内存

yarn add webpack-dev-server -D

plugins: [
    new webpack.HotModuleReplacementPlugin()
  ],
  devServer: {
    contentBase: './dist',
    hot: true
  }
]