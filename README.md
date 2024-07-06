# codeSandbox

npx openapi --input http://localhost:8080/swagger/doc.json --output ./generated --client axios


然后去到对应的文件夹中，将url前缀删除 core/OpenAPI.ts 

## Project setup
```
yarn install
```

### Compiles and hot-reloads for development
```
yarn serve
```

### Compiles and minifies for production
```
yarn build
```

### Lints and fixes files
```
yarn lint
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).
