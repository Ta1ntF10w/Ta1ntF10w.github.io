+++
date = '2026-05-10T12:15:02+08:00'
draft = false

math = true

title = 'Soot Study 4: 基于指针分析与上下文敏感的调用图构建理论与实现'
categories = ["static-analysis"]
tags = ["Study", "Point Analysis", "Soot Study 4"]
+++

最近看到哆啦A梦讲408，觉得很有意思，于是把我之前的写的关于静态分析的内容，喂给ai，让他帮忙生成小漫画，看起来效果还不错

![9d8c1f0bd2fc5155478cc233aae4f69f](D:\LdsSec-blog\content\posts\Satic Analysis summary\9d8c1f0bd2fc5155478cc233aae4f69f.png)

![c6750fb8a0455f03a64ac6f6d145b897](D:\LdsSec-blog\content\posts\Satic Analysis summary\c6750fb8a0455f03a64ac6f6d145b897.png)

![3e09555ece5097ce1bc1bede997d2c0e](D:\LdsSec-blog\content\posts\Satic Analysis summary\3e09555ece5097ce1bc1bede997d2c0e.png)

![14081dc3ab23e8b1fb3d925da52abc33](D:\LdsSec-blog\content\posts\Satic Analysis summary\14081dc3ab23e8b1fb3d925da52abc33.png)

![fd8af8ae8535a0e46c40389155593b39](D:\LdsSec-blog\content\posts\Satic Analysis summary\fd8af8ae8535a0e46c40389155593b39.png)