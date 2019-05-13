---
layout: post
title: Uinty TableView 组件
tags: blogs
description: >
  可复用内容的滚动组件
image: /assets/img/2019-05/utv4.png
noindex: false
---

Unity UGUI 自带的 `ScrollView` 控件不支持复用滚动内容，在数量大的情况下，界面容易卡顿  
借鉴其他游戏控件，写了个可复用的滚动组件，扩展、优化了`ScrollView`  

TableView 组件的基本逻辑是注册 `ScrollRect` 滚动事件，在滚动时实时计算位置，将移出可视区域的内容，移动到即将进入可视区域的位置，并修改内容

### 使用
添加游戏对象  
![GameObject](/assets/img/2019-05/utv1.png)  

Scroll View 添加组件  
![Component](/assets/img/2019-05/utv3.png)  

### 自定义脚本
实现自定义效果需要添加一个实现 ITableViewInterface 接口的脚本

```c#
public interface ITableViewInterface
{
    /// <summary>
    /// 设置 cell 显示内容
    /// </summary>
    /// <param name="idx">cell 索引</param>
    /// <param name="gameObject">cell 对象</param>
    void SetCellAtIdx(int idx, GameObject gameObject);
    /// <summary>
    /// 每个 cell 大小
    /// </summary>
    /// <param name="idx">cell 索引</param>
    /// <returns>cell 大小</returns>
    Vector2 CellSizeAtIdx(int idx);
    /// <summary>
    /// 列表总数据量
    /// </summary>
    /// <returns>数据量</returns>
    int DataCount();
    /// <summary>
    /// 列表滚动方向，需要和 <code>ScrollRect</code> 方向一致
    /// </summary>
    /// <returns>滚动方向</returns>
    TableViewComponent.TableDirection TableViewDirection();
}
```

运行效果  

![效果](/assets/img/2019-05/utv2.png)  
