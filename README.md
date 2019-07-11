# WEBPACK4_DEMO多页项目

> WEBPACK4_DEMO

**技术栈**

* webpack4.0
* es6
* scss
* postcss

**项目配置项**
``` bash
# 项目初始化
yarn
npm install
# 项目启动
yarn start / yarn run dev
npm start / npm run dev

# 项目发布
yarn run build
npm run build
```

**命名规范**

- 文件名：
单词用‘-’隔开，如：customer-service
**(文件名中严禁出现大写字字母和下划线)**

- 变量名：
使用小驼峰命名，如：customerService

**Commit Message 规范**
以 angular 规范为例，格式如下：

type(scope): subject        # head 必填，其中 type 和 subject 必填。
                            # 空行
72-character wrapped.       # body 选填。
                            # 空行
BREAKING CHANGE: msg.       # footer 选填。
其中：

head 部分
type （只允许下列7个标识）：

feat：新功能（feature）

fix：修补bug

docs：文档（documentation）

style： 格式（不影响代码运行的变动）

refactor：重构（即不是新增功能，也不是修改bug的代码变动）

test：增加测试

chore：构建过程或辅助工具的变动

注意：feat 和 fix 类型的 commit 将出现在 Change log 中。

scope（选填）：

此次提交的影响范围，如数据层、控制层、视图层等，多个可以用 * 代替，必须在type 之后、小括号之内。

subject：

此次提交的简要描述，必须在 type 之后的冒号之后的一个空格之后，结尾没有句号。

body 部分（选填）
此次提交的详细描述，应包含变动描述、变动理由等内容，使用第一人称现在时描述。

必须和 head 部分间隔一个空行，每超过72的字符必须换一行。

foot 部分（选填）
包含两种情况：1.当前代码不兼容上一个版本，BREAKING CHANGE冒号空格，后跟变动描述、变动理由和迁移方法；2.关闭 Issue，Closes #234 。

特殊情况：当前 commit 用于撤销之前的 commit，revert冒号空格，后跟要撤销的 commit 的 head。

Commit Message 规范约束工具
在项目中安装 commitizen ：

npm i -D commitizen cz-conventional-changelog
在项目根目录创建 .czrc 文件：

{ "path": "cz-conventional-changelog" }
修改项目中 package.json 文件：

"script":{
    "commit":"git-cz",
},
"config":{
    "commitizen":{
        "path":"node_modules/cz-conventional-changelog",
    },
},
此时，在项目中使用 git cz 或 npm run commit 命令可以代替 git commit 命令，在提交时会自动带出 angular 规范的 commit message 编辑选项，下面将使用 cz-customizable 实现自定义规范。

在项目中安装 cz-customizable：

npm i -D cz-customizable
修改项目中 .czrc 文件：

{ "path": "cz-customizable" }
修改项目中 package.json 文件：

"script":{
    "commit":"git-cz",
},
"config":{
    "commitizen":{
        "path":"node_modules/cz-customizable",
    },
},
在项目根目录创建 .cz-config.js 文件，配置项如下：

type: {Array of Object}：项目中使用的 type 和默认描述。
scopes: {Array of Strings}：预设项目中使用的可选 scope 。如：在一个银行系统项目中使用 [“acccounts”, “payments”]；在一个旅行应用中使用 [“bookings”, “search”, “profile”]。
scopeOverrides: {Object where key contains a Array of String}：当您想重写特定提交类型的作用域时，使用此方法。如：在类型为“fix”时指定范围 { fix: [ {name: 'merge'}, {name: 'style'}, {name: 'e2eTest'},{name: 'unitTest'} ] }。
allowCustomScopes: {boolean, default false}：增加自定义 scope 选项，开启可以在设置 scope 时支持直接输入。
allowBreakingChanges: {Array of Strings: default none}：配置想要 breaking change 弹出提示的scope列表，如：[‘feat’, ‘fix’]。
appendBranchNameToCommitMessage：当配合 cz-customizable-ghooks 使用 cz-customizable 时, 可自动获取分支名称并添加到 commit message 中，此功能已经在 cz-customizable-ghooks实现，对应选项已经被添加到 cz-customizable-ghooks, v1.3.0. 中，默认值为 true。
breakingPrefix: {string, default ‘BREAKING CHANGE:’}：设置自定义 breaking change 块。
footerPrefix: {string, default ‘ISSUES CLOSED:’}：设置自定义 foot 块。
下面是是一个示例，具体可以参考项目根目录下node_modules下cz-customizable下cz-config-EXAMPLE.js文件：

module.exports = {
  types: [
    {value: 'feat',     name: 'feat:     A new feature'},
    {value: 'fix',      name: 'fix:      A bug fix'}
  ],
  scopes: [
    {name: 'accounts'},
    {name: 'admin'}
  ],
  messages: {
    type: 'Select the type of change that you\'re committing:',
    scope: '\nDenote the SCOPE of this change (optional):',
    customScope: 'Denote the SCOPE of this change:', 
    // used if allowCustomScopes is true
  },
  allowCustomScopes: true,
  allowBreakingChanges: ['feat', 'fix']
}
此时，在使用 commit 命令会自动带出 自定义 规范的 commit message 编辑选项。

Commit Message 校验
在项目中安装 commitlint/cli：

npm i -D @commitlint/cli @commitlint/config-conventional
在项目根目录创建 commitlint.config.js 文件：

module.exports = {extends: ['@commitlint/config-conventional']}
此时，commitlint 默认按照angular 规范对 commit message 校验，要校验自定义规范可以通过 rules 参数来实现。

module.exports = {
    extends: ['@commitlint/config-conventional'],
    rules: {
        'type-enum': [2, 'always', 
            ["feat", "fix", "docs", "style", "refactor", "test", "chore", "revert"]
        ],
        'subject-full-stop': [0, 'never'],
        'subject-case': [0, 'never']
    }
}
由于前面使用了 cz 来自定义 commit message 规范，下面将实现根据 cz 规范进行校验。

在项目中安装 commitlint-config-cz ：

npm i -D commitlint-config-cz @commitlint/cli
修改项目中 commitlint.config.js 文件：

module.exports = {extends: ['cz'], rules:{}}
此时 commitlint 虽然可以校验之前指定的 commit message 规范，但是没有关联到 commit 指令上，下面将实现在提交代码时按照规范约束并自动校验。

在项目中安装 husky ：

npm i -D husky
修改项目 package.json 文件：

"husky": {
    "hooks": { "commit-msg":"commitlint -e $GIT_PARAMS" }
},
此时，在提交代码时将按照之前自定义的规范约束 commit message 并自动按照对应规范进行校验，下面将实现自动生成 Change log（需要符合 angular 规范）。

在项目中安装 conventional-changelog-cli：

npm i -D conventional-changelog-cli
输出 Change log

conventional-changelog -p angular -i CHANGELOG.md -s
根据实际需要，可以将输出 Change log 命令，加入项目中 package.json 文件：

"script":{
    "commit":"git-cz",
    "changelog":"conventional-changelog -p angular -i CHANGELOG.md -s",
}
代码格式校验
在项目中安装eslint：

npm i -D eslint
在项目中创建 .eslintrc.json / .eslintrc / .eslintrc.js （任一即可，非 json 文件需要导出） ，详细配置参考 Eslint 规则详解，下面是示例代码：

{ // 务必删除注释
  "env": { // 环境变量
    "node": true, // brower、node、es6、mocha等
    "es6": true
  },
  "globals": { // 全局变量
    "vue": true, // "$"、"wx"、"ng"等
  },
  "parserOptions": { // 格式配置
    "ecmaVersion": 6,  //es 版本，默认5，可选3、6（2015）、7（2016）等
    "ecmaFeatures": { // 附加语言特征，globalReturn、impliedStrict、jsx
      "globalReturn": true,
      "jsx": true
    }
  },
  
  "rules": { // 规则配置，0或'off'：关闭规则；1或'warn'：打开规则，且作为警告（检查通过）；2或'error'：打开规则，且作为错误（退出码为1，检查不通过）。
    "camelcase": 2,
    "curly": 2,
    "brace-style": [2, "1tbs"],
    "quotes": [2, "single"],
    "semi": [2, "always"],
    "space-in-brackets": [2, "never"],
    "space-infix-ops": 2
  }
}
除了手动设置规范还可以使用目前 eslint 三种（google、standard、airbnb）流行规范，并在其基础上进一步自定义，安装方式如下：

npm i eslint-config-google -D
 
npm i eslint-config-standard eslint-plugin-import eslint-plugin-node eslint-plugin-promise eslint-plugin-standard -D 
 
npm i eslint-config-airbnb eslint-plugin-import eslint-plugin-jsx-a11y eslint-plugin-react -D
修改项目中 package.json 文件：

"husky": {
    "hooks": {
      "commit-msg": "commitlint -e $GIT_PARAMS",
      "pre-commit" : "eslint ./app/**/*.js --fix"
    }
  },
配置好eslint 规则之后，在提交时会自动带出之前的自定义约束，输入完成后自动校验 commit message ，并自动校验代码规范，只有全部通过才能提交成功，否则退出 commit ，同时还可以使用指令输出 change log 文档。

如果在项目中使用了 typescript，则可以继续添加响应校验：

在项目中安装tslint：

npm i -D tslint typescript
在项目中创建 tslint.json  ，详细配置参考 TSLlint Rules，下面是示例代码：

{
  "lintOptions": {
    "typeCheck": true
  },
  "extends": [
    "tslint:recommended"
  ],
  "rules": {
    "no-constant-condition": true,
    "file-header": [
      true,
      "Author \\w{2,20}\nCopyright 20\\d{2} Qietv"
    ],
    "max-line-length": [
      true,
      120
    ]
  }
}
除了手动设置规范也可以使用诸如 tslint-config-standard 等规范，并在其基础上进一步自定义，安装方式如下：

npm i tslint-config-standard -D
 
npm i tslint-eslint-rules -D 
修改项目中 tslint.json 文件 ：

{
  "lintOptions": {
    "typeCheck": true
  },
  "extends": [
    "tslint:recommended",
    "tslint-config-standard"
  ],
  "rulesDirectory": [
    "node_modules/tslint-eslint-rules/dist/rules"
  ],
  "rules": {
    "no-constant-condition": true,
    "file-header": [
      true,
      "Author \\w{2,20}\nCopyright 20\\d{2} Qietv"
    ],
    "max-line-length": [
      true,
      120
    ]
  }
}
除此之外，还需要在项目中创建 tsconfig.json 文件 ，下面是示例代码：

{
  "compilerOptions": {
    "module": "commonjs",
    "target": "es2017",
    "sourceMap": true,
    "allowJs": true
  },
  "exclude": [
    "app/public",
    "app/views",
    "node_modules*"
  ]
}
修改项目中 package.json 文件，把 ts 校验绑定到提交操作：

"husky": {
    "hooks": {
      "commit-msg": "commitlint -e $GIT_PARAMS",
      "pre-commit" : "eslint ./app/**/*.js --fix && tslint ./app/**/*.ts --fix"
    }
  },
此时，在项目中提交时会自动带出之前的自定义约束，输入完成后自动校验 commit message ，并自动校验指定位置的 js 和 ts 代码规范，只有全部通过才能提交成功，否则退出 commit ，同时还可以使用指令输出 change log 文档。




