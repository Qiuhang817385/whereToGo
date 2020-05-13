## 开始PWA,不涉及框架和工具

![image-20200510005309865](C:/Users/Artificial/AppData/Roaming/Typora/typora-user-images/image-20200510005309865.png)

![image-20200510005404141](C:/Users/Artificial/AppData/Roaming/Typora/typora-user-images/image-20200510005404141.png)

```js
与原生应用程序相媲美的web应用程序

持续更新

seo

url分享

有这些特性

PWA已经封装好了


```







## service worker

1.web worker

一种独立于浏览器主线程的环境

一般用于较复杂的计算操作

不会阻塞页面渲染

与主线程通过postMessage通信,,这个好像熟起来了



service worker和webworker类似

更多特性

1.独立页面,可以常驻内存运行

2.代理网络请求

3.依赖https

service worker是pwa中最重要的api,就是它大脑

![image-20200510005659919](C:/Users/Artificial/AppData/Roaming/Typora/typora-user-images/image-20200510005659919.png)

桌面环境支持OK

----------------

必须使用http协议

### 安装serve

![image-20200510010823063](C:/Users/Artificial/AppData/Roaming/Typora/typora-user-images/image-20200510010823063.png)



全局安装完,直接执行serve就可以了

![image-20200510010915668](C:/Users/Artificial/AppData/Roaming/Typora/typora-user-images/image-20200510010915668.png)







## promise

![image-20200510005852000](C:/Users/Artificial/AppData/Roaming/Typora/typora-user-images/image-20200510005852000.png)

![image-20200510013326078](C:/Users/Artificial/AppData/Roaming/Typora/typora-user-images/image-20200510013326078.png)



有一个操作,无论成功还是失败,都会进行这步的操作

是什么来着

final+什么场景

这个是关闭

现在只有chrome支持

![image-20200510013428241](C:/Users/Artificial/AppData/Roaming/Typora/typora-user-images/image-20200510013428241.png)

静态方法技巧 把入参转成一个完成的promise

![image-20200510013533148](C:/Users/Artificial/AppData/Roaming/Typora/typora-user-images/image-20200510013533148.png)

![image-20200510013610512](C:/Users/Artificial/AppData/Roaming/Typora/typora-user-images/image-20200510013610512.png)

promise.all的入参其实是一个可以迭代的对象就可以传递进去

传入字符串'abc'

![image-20200510013657756](C:/Users/Artificial/AppData/Roaming/Typora/typora-user-images/image-20200510013657756.png)



await可以把链式的promise改成同步语句的格式

![image-20200510013739818](C:/Users/Artificial/AppData/Roaming/Typora/typora-user-images/image-20200510013739818.png)



![image-20200510013758257](C:/Users/Artificial/AppData/Roaming/Typora/typora-user-images/image-20200510013758257.png)

promise一般用完polifill都支持

async和await尽量使用babel转换一下



### 问题,我想promise并行加载100张图片,但是最多只有10个promise在运行

如何做到并且保证效率

















## fetch

![image-20200510010143290](C:/Users/Artificial/AppData/Roaming/Typora/typora-user-images/image-20200510010143290.png)

缺点

https://www.jianshu.com/p/79ab9f2e6c94

https://www.cnblogs.com/wonyun/p/fetch_polyfill_timeout_jsonp_cookie_progress.html

![image-20200510014048903](C:/Users/Artificial/AppData/Roaming/Typora/typora-user-images/image-20200510014048903.png)



![image-20200510014134946](C:/Users/Artificial/AppData/Roaming/Typora/typora-user-images/image-20200510014134946.png)

上图,credentials来控制发送的凭证,比如cookie,一般是include



![image-20200510014219776](C:/Users/Artificial/AppData/Roaming/Typora/typora-user-images/image-20200510014219776.png)

service当中访问不到ajax对象,只能用fetch

1.不能查看上传进度

2.不能控制中断

3.不能控制超时时间







## cacheAPI

![image-20200510010134013](C:/Users/Artificial/AppData/Roaming/Typora/typora-user-images/image-20200510010134013.png)



之前的localstorage cookie都属于内存数据

对于js css和图片没有办法缓存

![image-20200510010310830](C:/Users/Artificial/AppData/Roaming/Typora/typora-user-images/image-20200510010310830.png)



1.打开特定的缓存空间

2.写入必要的数据









## notificationAPI

![image-20200510010359404](C:/Users/Artificial/AppData/Roaming/Typora/typora-user-images/image-20200510010359404.png)







![image-20200510030433916](C:/Users/Artificial/AppData/Roaming/Typora/typora-user-images/image-20200510030433916.png)

当前页面是否允许通知



弹出授权请求,进行设置

![image-20200510030527734](C:/Users/Artificial/AppData/Roaming/Typora/typora-user-images/image-20200510030527734.png)

![image-20200510030551158](C:/Users/Artificial/AppData/Roaming/Typora/typora-user-images/image-20200510030551158.png)



页面,创建一个实例,就相当于一个通知

![image-20200510030656855](C:/Users/Artificial/AppData/Roaming/Typora/typora-user-images/image-20200510030656855.png)

切换上下文到service worker,居然是拒绝

![image-20200510030719944](C:/Users/Artificial/AppData/Roaming/Typora/typora-user-images/image-20200510030719944.png)

![image-20200510030757272](C:/Users/Artificial/AppData/Roaming/Typora/typora-user-images/image-20200510030757272.png)

不存在,是不允许弹出授权i请求的

因为如果页面不存在,都不知道是哪里弹出的通知



所以必须在页面的上下文当中

允许,然后切换到service worker就变成允许了



service worker创建通知的方式

![image-20200510030942348](C:/Users/Artificial/AppData/Roaming/Typora/typora-user-images/image-20200510030942348.png)

什么是上下文??



## 怎么开启pwa

![image-20200510031043128](C:/Users/Artificial/AppData/Roaming/Typora/typora-user-images/image-20200510031043128.png)



需求就是支持离线环境

![image-20200510031113183](C:/Users/Artificial/AppData/Roaming/Typora/typora-user-images/image-20200510031113183.png)

![image-20200510031144146](C:/Users/Artificial/AppData/Roaming/Typora/typora-user-images/image-20200510031144146.png)





![image-20200510031201677](C:/Users/Artificial/AppData/Roaming/Typora/typora-user-images/image-20200510031201677.png)

需要开启的话,改成register就可以了



一般,开发环境下面不需要开启

打完包再开启的

这个是静态资源

![image-20200510031302432](C:/Users/Artificial/AppData/Roaming/Typora/typora-user-images/image-20200510031302432.png)



![image-20200510031323258](C:/Users/Artificial/AppData/Roaming/Typora/typora-user-images/image-20200510031323258.png)

定义web项目一些源信息,比如图标,

这样web应用可以在桌面上,创建快捷方式



在上线前开启service worker就可以支持pwa