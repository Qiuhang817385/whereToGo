## useState

```js
问题?

1.既然没有传递任何参数

怎么知道返回的是count

2.为什么是本组件的count



usestate其实不知道返回的是count

返回的是一个变量

2.为什么是本组件的值?

js是单线程的

usestate调用的时候,只可能在自己组件的上下文当中调用本组就的值,闭包

3.如果一个函数组件有多个state,那么useState怎么知道
自己哪一个useState返回的是哪一个state呢?

    是按照第一次运行的顺序来返回的

每次app组件渲染的时候,useState第一次调用,一定返回第一个对应的值
第二次调用,返回第二个对应的值

现在这个修复了
只能使用const定义好顺序之后再使用

尝试1.每次改变useState的调用顺序,已经倍修复,这个实验不了
判断是否是奇数

// const [count, setCount] = useState(0)
  // const [name, setName] = useState('mike');

  let name, setName;
  let count, setCount;
  id += 1;
  if (id & 1) { 
     [count, setCount] = useState(0);
    [name, setName] = useState('mike');
  } else {
    [name, setName] = useState('mike');
    [count, setCount] = useState(0)
  }



useState是按照第一次运行的顺序,来按顺序返回useState的

尝试2.useState只能一一对应的调用
react要求,useState按照稳定的顺序和稳定的数量来调用,不能多也不能少
每次渲染调用一次count的useState就只能调用一次,不能多也不能少

原则,只能在顶层调用,不能在循环当中或者在条件语句当中调用



```

### 使用eslint插件

npm i eslint-plugin-react-hooks -D

配置

![image-20200508222414813](C:/Users/Artificial/AppData/Roaming/Typora/typora-user-images/image-20200508222414813.png)

### 场景:state的默认值是基于props的

虽然defaultCount第一次渲染的时候才会用到,用于赋值给useState默认值

但是这行的计算逻辑每次都会执行,浪费资源



 解决方式,函数形式,延迟初始化 count的默认值

 函数的返回值就是count的默认值

![image-20200508222828241](C:/Users/Artificial/AppData/Roaming/Typora/typora-user-images/image-20200508222828241.png)

只会运行一次

### 三,每次传递一样的值,组件不会渲染

```js
<button onClick={() => { setCount(0) }}>
```



## useEffect



## 什么时候调用?标准上是在每次render函数之后调用,根据自定义状态来决定是否调用



![image-20200508223213445](C:/Users/Artificial/AppData/Roaming/Typora/typora-user-images/image-20200508223213445.png)

副作用的调用时机

![image-20200508223227482](C:/Users/Artificial/AppData/Roaming/Typora/typora-user-images/image-20200508223227482.png)

第一次调用相当于disMount

之后的每次调用都相当于didupdate



![image-20200508223330995](C:/Users/Artificial/AppData/Roaming/Typora/typora-user-images/image-20200508223330995.png)

### 回调函数的作用

清除上一次副作用遗留下来的状态

第三次,第五次执行useeffect

那么在第四次,第六次视图渲染之前,执行清除函数

### Demo-class

![image-20200508223816591](C:/Users/Artificial/AppData/Roaming/Typora/typora-user-images/image-20200508223816591.png)

解绑

![image-20200508223746358](C:/Users/Artificial/AppData/Roaming/Typora/typora-user-images/image-20200508223746358.png)

 

### class

![image-20200508224053851](C:/Users/Artificial/AppData/Roaming/Typora/typora-user-images/image-20200508224053851.png)

记得给第二个参数传递一个空数组,要不然每次都执行绑定移除事件

![image-20200509145000124](C:/Users/Artificial/AppData/Roaming/Typora/typora-user-images/image-20200509145000124.png)





### 第二个参数

只有数组当中的每一项都不变的时候,才会不执行.

这个不变是一层还是两层???

数组声明变量的数量不能多也不能少,现在也有依赖收集工具来解决



### 正常情况下,只给一个绑定的话,直接绑定就完事了,并且来个空数组

![image-20200509150145679](C:/Users/Artificial/AppData/Roaming/Typora/typora-user-images/image-20200509150145679.png)

### 组件中访问dom绑定事件,如果频繁清除dom,需要频繁的清理副状态

![image-20200508224826343](C:/Users/Artificial/AppData/Roaming/Typora/typora-user-images/image-20200508224826343.png)

![image-20200508224841661](C:/Users/Artificial/AppData/Roaming/Typora/typora-user-images/image-20200508224841661.png)



## useContext,createContext+useC

![image-20200508225506122](C:/Users/Artificial/AppData/Roaming/Typora/typora-user-images/image-20200508225506122.png)

类组件使用,没有什么不同

![image-20200508225631900](C:/Users/Artificial/AppData/Roaming/Typora/typora-user-images/image-20200508225631900.png)

函数组件,其实不再限制context的数量,可以使用多个context

![image-20200508225743493](C:/Users/Artificial/AppData/Roaming/Typora/typora-user-images/image-20200508225743493.png)

缺点,破坏组件独立性

## memo/callback 没用过

```js
usecallback是usememo的变种

usememo跟useeffect参数一样,

但是调用时机不一样

useEffect是副作用,渲染之后

useMemo在渲染期间完成,useMemo的作用,定义一段函数逻辑是否重复执行
```

```js
第二个数组可以传递一个表达式,也就是Boolean值
```



![image-20200508230907609](C:/Users/Artificial/AppData/Roaming/Typora/typora-user-images/image-20200508230907609.png)

 

double的是一个变量,分析double的结果

0    

然后等到count==3 返回6  

然后判断count==4的时候,count再计算.double变成8  之后一直不变

每次判断和计算,都会计算一次

**什么时候变成的8  是count条件变成false,再重新计算,变成8**

```js
答案从false变为true，再变成false。中间发生了两次变化。所以double的值发生了两次变化。

其实根据的是变化的次数,而不是依赖的true和false,当然现在不能传递表达式了??
```





```js
memo类似于PureCompoent 作用是优化组件性能，防止组件触发重渲染

memo针对 一个组件的渲染是否重复执行

<Foo />
usememo针对 一段函数逻辑是否重复执行,输入的值固定,输出的值肯定一致,对等的

()=>{}
useEffect是在渲染之后完成的

useMemo是在渲染期间完成的

useMemo(()=>{},[])
参数如果是空数组的话就只会执行一次

useCallback

useMemo( ()=>{fn} ) 等价于 useCallback(fn)

memo用来优化函数组件
```

### 支持嵌套依赖,不能循环依赖

![image-20200509152214186](C:/Users/Artificial/AppData/Roaming/Typora/typora-user-images/image-20200509152214186.png)

```js
这样计算摄氏度和华氏度其实很有用,或者汇率
```



## useCallback 没用过

等价

![image-20200508233757467](C:/Users/Artificial/AppData/Roaming/Typora/typora-user-images/image-20200508233757467.png)

如果usememo返回的是一个函数,那么可以直接使用useCallback来代替

写法一致

![image-20200508233733077](C:/Users/Artificial/AppData/Roaming/Typora/typora-user-images/image-20200508233733077.png)

问题,怎么处理传递给子组件是一个函数,每次都重新渲染的问题>??????

**函数组件的做法,**利用memo来锁定句柄,每次传递的这个函数一致,进一步优化就是用useCallback

![image-20200508233615863](C:/Users/Artificial/AppData/Roaming/Typora/typora-user-images/image-20200508233615863.png)

![image-20200508233643699](C:/Users/Artificial/AppData/Roaming/Typora/typora-user-images/image-20200508233643699.png)

**类组件的做法**,使用箭头函数形式





### 为useCallback添加依赖 没用过

![image-20200509092850381](C:/Users/Artificial/AppData/Roaming/Typora/typora-user-images/image-20200509092850381.png)

![image-20200508234029620](C:/Users/Artificial/AppData/Roaming/Typora/typora-user-images/image-20200508234029620.png)

## useRef,不能用到函数组件上面

从这点触发,函数组件不能替代类组件

useRef !=createRef

### 作用1,存储,跨域渲染当中的任意数据

ref不会触发重渲染,比state更加好

### 作用2,获取(类)子组件或者dom句柄

调用子组件的方法



### 场景1

组件挂载,让count每秒+1,当到达10之后,不再增加



定义两个副作用effect

1.启动定时器

2.检查count值

![image-20200509161133079](C:/Users/Artificial/AppData/Roaming/Typora/typora-user-images/image-20200509161133079.png)

不生效

![image-20200509161218444](C:/Users/Artificial/AppData/Roaming/Typora/typora-user-images/image-20200509161218444.png)

因为每次都是重新的渲染 每次it都被赋值



#### 方法,使用useRef

![image-20200509161351952](C:/Users/Artificial/AppData/Roaming/Typora/typora-user-images/image-20200509161351952.png)

![image-20200509161338192](C:/Users/Artificial/AppData/Roaming/Typora/typora-user-images/image-20200509161338192.png)



#### 问题,怎么判断出来,每次it是重新创建的  在effect当中



## 自定义hook

![image-20200509164103624](C:/Users/Artificial/AppData/Roaming/Typora/typora-user-images/image-20200509164103624.png)



### 状态逻辑的复用

![image-20200509164118634](C:/Users/Artificial/AppData/Roaming/Typora/typora-user-images/image-20200509164118634.png)



## hook规则

![image-20200509170816754](C:/Users/Artificial/AppData/Roaming/Typora/typora-user-images/image-20200509170816754.png)

### 仅在顶层调用hook函数

为什么

useState，数量不能多也不能少

依赖于调用顺序

是hook放到顶层

而不是setState

### 仅在函数组件和自定义hook里面调用hook

![image-20200509171206190](C:/Users/Artificial/AppData/Roaming/Typora/typora-user-images/image-20200509171206190.png)

方式1ok

方式2会有问题



虽然可以合法的调用

但是也很容易被误用在其他不在hook或者函数组件的上下文当中

会报错，这个容易发现

不容易发现的，其实是吧fetchNews放到条件语句当中

导致调用顺序错乱的问题



3.eslint插件



# 附录,自定义hook

```js
import React, { useState, useEffect, useCallback, useRef, useMemo, PureComponent } from 'react';
class Count extends PureComponent {
  render () {
    return (
      <div>
        <h1>{this.props.count}</h1>
      </div>
    )
  }
}

function useCounter (count) {
  return (
    <h1>{count}</h1>
  )
}
/**
 * 获取浏览器窗口尺寸
 */
function useSize () {
  const [size, setSize] = useState({
    width: document.documentElement.clientWidth,
    height: document.documentElement.clientHeight,
  })
  const onResize = useCallback(() => {
    setSize({
      width: document.documentElement.clientWidth,
      height: document.documentElement.clientHeight,
    })
  }, [])

  useEffect(() => {
    window.addEventListener('resize', onResize, false)
    return () => {
      window.removeEventListener('resize', onResize, false)
    }
  }, [onResize])
  // return [size, setSize]
  return size
}

/**
 * 自定义hook,逻辑被封装到了这里面
 */
function useCount (defaultCount) {
  const [count, setCount] = useState(0);
  let it = useRef();
  useEffect(() => {
    it.current = setTimeout(() => {
      setCount(count + 1)
    }, 1000)
  }, [count])
  useEffect(() => {
    if (count === 10) {
      clearTimeout(it.current)
    }
  })
  // 仿照的是useState，返回的是一个数组
  return [count, setCount];
}

function App () {
  const [count, setCount] = useCount(0);
  const size = useSize();
  // const [count, setCount] = useState(0);
  const jsxe = useCounter(count);
  const [name, setName] = useState('mike');
  const onClick = () => {
    console.log('打印');
  }

  // useEffect(() => {
  //   console.log('渲染了');
  // }, [count])
  const double = useMemo(() => {
    return count * 2
  }, [count])
  return (
    <div className="App">
      <button onClick={() => { setCount(count + 1) }}>
        click({count},name({name}))
        <hr />
        {double}
      </button>
      <Count count={count}></Count>
      <hr />
      {jsxe}
      <hr />
      {size.width}*{size.height}
    </div>
  );
}
// ============================================================
export default App;

```

