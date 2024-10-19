## 🎉简介
欢迎来到随机语录挂件！在这片知识的海洋中，让我们为那些不变的真理注入新鲜的变化！每一次的语录都将带来独特的启发，点燃你的激情与思考！

本人对html, css, js不熟悉，代码中有不足之处还望海涵。

## 🍴使用
1. 从思源集市下载或者自己下载将文件夹放在{思源工作空间}/data/widgets/下
2. 如果不只是本机使用，自己部署了服务器，需要在config.js中填写服务器地址siyuan_host
3. 如果自己部署设置了访问授权码，需要在config.js中填写自己的授权码siyuan_token，或设置->关于里的token
4. 刷新网页试试吧


## 📱功能
1. 从[一言API](https://v1.hitokoto.cn/)随机生成一句语录


## ⚙️设置功能
1. 选择语录类型：哲学，诗词，游戏，网络等
2. 是否跳转一言官网
    出于对开源、免费API的支持，本应该默认开启超链接。不过这是笔记软件，误点什么的影响学习。望[一言](https://v1.hitokoto.cn/)谅解。
3. 背景色修改
4. 文本颜色修改

颜色选择器不支持透明度，颜色输入框支持透明度，也可以先用颜色选择器选择一个颜色，再在颜色输入框最后加上alpha通道


## 🔍细节
- 挂件可变宽（有最小限制），自适应高
- 设置属性存在本身挂件块的属性中，每个设置功能一个自定义属性
- 直接修改块属性导致值不对的情况使用默认值
- config.js里可以修改一言host和思源host，[一言](https://v1.hitokoto.cn/)支持自部署，方便自定义和调试


## ⏰友情提醒
一言API有频率限制，不要过于频繁的触发请求，触发限制后短时间内无法请求。自己部署就没事了


## 🐞已知缺陷
1. 直接在思源的块菜单里修改属性无法自动刷新，需要重开文档块或主动刷新。不知道思源有没有通知事件


## 📤反馈
如果有意见或是bug反馈，欢迎在[Github](https://github.com/Frankgbg/OneSentence)提issue联系我


## 🧑‍⚖️声明
- 语录本身由[一言](https://v1.hitokoto.cn/)生成，无法保证内容的舒适度与准确性，敬请谅解！
- 如有侵权，请随时与我联系，我将及时整改！
