# emr-jcst

## envs
node -v `v12.1.0`
npm -v `6.9.0`
node 12 版本应该都行

## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Lints and fixes files
```
npm run lint
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).


### 查看效果
当前使用的是 new -> setting-ww.js 配置文件。
1. 运行 `npm run serve` 后
2. 访问地址 
   1. http://localhost:8080/index.html?hdcId=00001_608&hdcEncId=00001_1708 查看只有住院情况的集成视图
   2. http://localhost:8080/index.html?hdcId=00001_608&hdcEncId=00001_1708%5E00001_5013 查看住院和门诊都有的集成视图