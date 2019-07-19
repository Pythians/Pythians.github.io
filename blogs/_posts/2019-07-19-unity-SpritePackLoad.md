---
layout: post
title: 小图精灵打包与加载
categories: [blogs,Unity]
tags: [blogs,Unity]
description: >
  Unity 精灵图集使用： 道具图标打包与加载
image: /assets/img/2019-07/b.gif
noindex: false
---

Unity 图集打包和工作原理参考：[UGUI研究院之全面理解图集与使用](http://www.xuanyusong.com/archives/3304)  
本文基于上文中的技术处理，并有一些优化  

测试发现问题： Unity 打包合集时不会检测文件是否相同，即同一张图片有不同名字的拷贝，会一起打包。尽量不要复制、多次导入同一资源  
另： 工程的 Sprite Packer 设置为 Always Enabled(Legacy Sprite Packer)

## 精灵打包流程
点击： Tools -> Make Sprite Prefab  
![工具](/assets/img/2019-07/c.png)  

提示选择目录  
![选择目录](/assets/img/2019-07/d.png)  
选择目录会连续弹出再次，分别选择资源路径和保存预制体路径，没有选择路径则会中断打包，并提示  
![中断](/assets/img/2019-07/e.png)  
两次选择路径后，弹出确认窗  
![确认](/assets/img/2019-07/f.png)  
确认后开始处理  
**处理过程比较慢，尤其是数量大时，耐心等到全部完成的提示窗**  
![完成](/assets/img/2019-07/g.png)  

## 加载工具

```c#
// 精灵加载工具
public class LoadSpriteUtils
{
    /// <summary>
    /// 动态载入道具精灵
    /// </summary>
    /// <param name="id">道具ID</param>
    /// <returns>道具精灵</returns>
    public static Sprite LoadItemSprite(int id)

    /// <summary>
    /// 动态载入道具精灵
    /// </summary>
    /// <param name="item">道具对象</param>
    /// <returns>道具精灵</returns>
    public static Sprite LoadItemSprite(Item item)

    /// <summary>
    /// 动态载入精灵预制体
    /// </summary>
    /// <param name="pfbPath">精灵预制体完整路径</param>
    /// <returns>精灵</returns>
    public static Sprite LoadSprite(string pfbPath)
}

// 道具类添加返回精灵函数
public class Item
{
    /// <summary>
    /// 返回动态载入的精灵
    /// </summary>
    /// <returns>精灵</returns>
    public UnityEngine.Sprite GetSprite()
}
```