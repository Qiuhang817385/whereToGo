## react只是一个视图层的框架

需要用户交互和网络请求

使用一种规范约束数据被更新

并且用于追踪数据

实现调试功能和扩展能力

## 可控制,可依赖,可追溯的数据流管理方案和数据容器管理--->redux



![image-20200509171743304](C:/Users/Artificial/AppData/Roaming/Typora/typora-user-images/image-20200509171743304.png)



数据流是什么:修改数据的途径

比如什么形态来表达对数据的改动,如何组织数据的关系



### redux有柯里化???应用在哪呢

## 基础理论

### 单一数据源

1.应用程序的所有数据,挂载到同一个对象下面,方便管理

2.同一信息量的数据,只有一份,避免不同步

### 状态不可变

修改数据前后,数据源不是同一个对象了,实现时间旅行的功能,每次存到不同的状态

可以实现应用程序状态的保存,实现时间旅行的功能

避免不按约定,直接修改数据的行为

### 纯函数修改状态

1.纯函数没有副作用,不依赖外部变量,同样的输入产生同样的输出,类似react的渲染行为

![image-20200509172323190](C:/Users/Artificial/AppData/Roaming/Typora/typora-user-images/image-20200509172323190.png)







## 从没有redux推导redux

![image-20200509172424106](C:/Users/Artificial/AppData/Roaming/Typora/typora-user-images/image-20200509172424106.png)



## dispatch和action

实现bindActionCreator

![image-20200509225748213](C:/Users/Artificial/AppData/Roaming/Typora/typora-user-images/image-20200509225748213.png)

把下面的对象，转换成上面的函数

![image-20200509230410687](C:/Users/Artificial/AppData/Roaming/Typora/typora-user-images/image-20200509230410687.png)

![image-20200509230444364](C:/Users/Artificial/AppData/Roaming/Typora/typora-user-images/image-20200509230444364.png)



![image-20200509230541701](C:/Users/Artificial/AppData/Roaming/Typora/typora-user-images/image-20200509230541701.png)



## ----------------------------------------------------------------------朗科

![image-20200509233507645](C:/Users/Artificial/AppData/Roaming/Typora/typora-user-images/image-20200509233507645.png)

绑定action function 创建器

功能

代替thisprops  :  匿名函数这种形式



![image-20200509233650930](C:/Users/Artificial/AppData/Roaming/Typora/typora-user-images/image-20200509233650930.png)

改造后

![image-20200509233725961](C:/Users/Artificial/AppData/Roaming/Typora/typora-user-images/image-20200509233725961.png)

生成的就是上面的对象，属性值+匿名函数的形式

![image-20200509233932352](C:/Users/Artificial/AppData/Roaming/Typora/typora-user-images/image-20200509233932352.png)

![image-20200509234142905](C:/Users/Artificial/AppData/Roaming/Typora/typora-user-images/image-20200509234142905.png)

## ----------------------------------------------------------------------朗科



对应第五章

实际上就是redux+thunk+store+react-redux+reducer的源码

