参考文章：
http://witcher42.github.io/2014/05/28/doctype/
https://developer.mozilla.org/zh-CN/docs/%E6%80%AA%E5%BC%82%E6%A8%A1%E5%BC%8F%E5%92%8C%E6%A0%87%E5%87%86%E6%A8%A1%E5%BC%8F
http://www.jianshu.com/p/c3dcdad42e6d
http://harttle.com/2016/01/22/doctype.html

DOCTYPE的理解和作用：
1.浏览器有三种呈现模式，Standards(标准)模式，Quirks（怪癖/兼容）模式，Almost Standards（近似标准）
2.在html5以前，HTML 都是用 SGML 来书写的，DOCTYPE 则用来声明文档类型，它可以告诉 SGML parser 使用什么 DTD 来解析文档。
3.dtd是什么：DTD（document type definition，文档类型定义）是一系列的语法规则， 用来定义XML或(X)HTML的文件类型。
4.HTML5 不再是基于 SGML 的语言，而 doctype 只是用来激活模式的，所以不用指定dtd
5.怪异模式下，浏览器可能没法辨识一些新特性，造成布局混乱。
