# taro-plugin-mul-appid

> 适用 taro 版本 3.x；开发微信小程序时，允许根据 NODE_ENV 环境配置在编译时设置不同的 appid

## 使用

### 安装

```
npm i taro-plugin-mul-appid -D
```

### 使用插件

#### 将 appid 配置在环境中

`/config/[prod | dev].js`

```js
module.exports = {
  env: {
    NODE_ENV: '"production"',
  },
  mini: {
    // 配置appid
    appid: "xxxxxxxxxxxx",
  },
};
```

#### 在使用插件时直接指定 appid，优先级高于在环境中配置

`/config/index.js`

```js
const config = {
  plugins: [
    [
      "taro-plugin-mul-appid",
      {
        // 指定appid
        appid: "xxxxxxxxxxxx",
        // 是否修改源代码project.config.json中的appid
        sourceEdit: false,
      },
    ],
  ],
};
```
