#webpack+gulp多页面构建

### 如何基于本项目开始创建新项目

*	下载项目
	
```
git clone xxxx
```	yarn 
	
*	替换remote

```
	git remote remove origin
	git remote add origin 新项目的git地址
```

*	准备工作

```
	npm install
	
	bower install
```

*	开发模式

```
	--启动一个命令行
	npm run dev 
	
	--启动第二个命令行
	npm run start
	
```	
	
*	准备线上发布
	
```
	npm run build

	打包单个文件夹
	npm run release 2017Y3Q/stock
```	

### 项目使用要求
*	基础技术
	*	[jade]()
	*	[sass]()
	*	[jusior]()


### 开发过程

*	处理第三方插件
	*	webpack alias		
*	




参考资料:

*	[使用webpack构建多页面应用](https://segmentfault.com/a/1190000005920125)
*	[html-webpack-plugin](https://github.com/ampedandwired/html-webpack-plugin)

*	https://segmentfault.com/q/1010000002607794
*	https://segmentfault.com/a/1190000005920125#articleHeader3



```
https://github.com/spmjs/spm-webpack/issues/5

http://stackoverflow.com/questions/29192208/webpack-how-can-i-keep-the-output-not-flatten

https://github.com/webpack/webpack/issues/902
```