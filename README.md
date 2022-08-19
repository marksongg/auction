# auction
 angular
# 启动服务方法1
 npm start
# 启动服务方法2
 ng serve
# chrome debug方法
 1. F12
 2. 点击【source】tab
 3. Ctrl + p, 输入想要debug的ts文件（例如：filter-pipe.ts）
 4. 加入断点
# 查看所有方法
  ng help
# 创建Angular cli脚手架工程
  ng new project-name
# 2022/08/19 增加了后台查询商品的类auction.ts
  1 前期准备
    ・1.1 安装typescript
          npm install -g typescript
    ・1.2 安装Node服务器运行程序，支持js文件更新，Node服务自动重新启动
          npm install -g nodemon
  2. 将auction.ts文件编译生成auction.js程序
     tsc auction.ts
  3. 启动后台查询商品服务service
     nodemon auction.js
     或
     node auction.js
  4. 增加了跨域用代理文件proxy.conf.json，跨域后可以访问其他port接口的服务
     "/products":{
        "target": "http://127.0.0.1:5555",
        "secure": false
      }
  5. 修改package.json文件 ，前端npm start启动时，自动加载跨域服务文件
     "scripts": {
        ......
        "start": "ng serve --proxy-config proxy.conf.json",
        ......
      }
# 2022/08/19 在angular cli 如何使用jquery
  ・npm install --save jquery
  ・npm install @types/jquery --save
  ・在ts文件中引入：import * as $ from "jquery";
  ・测试看是否成功：$('body').addClass('aaa');
  
  
