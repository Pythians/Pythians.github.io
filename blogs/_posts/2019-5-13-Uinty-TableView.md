---
layout: post
title: Uinty TableView 组件
categories: [blogs,untiy]
tags: [blogs,untiy]
description: >
  可复用内容的滚动组件
image: /assets/img/2019-05/utv4.png
noindex: false
---

**Unity UGUI** 自带的 `ScrollView` 控件不支持复用滚动内容，在数量大的情况下，界面容易卡顿  
借鉴其他游戏控件，写了个可复用的滚动组件，扩展、优化了`ScrollView`  

`TableView` 组件的基本逻辑是注册 `ScrollRect` 滚动事件，在滚动时实时计算位置，将移出可视区域的内容，移动到即将进入可视区域的位置，并修改内容

### 使用
添加游戏对象  
![GameObject](/assets/img/2019-05/utv1.png)  

`Scroll View` 添加组件  
![Component](/assets/img/2019-05/utv3.png)  

### 自定义脚本
实现自定义效果需要添加一个实现 `ITableViewInterface` 接口的脚本

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

`TableView` 组件的公共属性和功能

~~~c#
/// <summary>
/// 实现接口的对象
/// </summary>
public ITableViewInterface tableView { get; set; }

/// <summary>
/// 跳到第 idx 个 cell 
/// </summary>
/// <param name="idx">索引</param>
public void JumpToIndex(int idx)

/// <summary>
/// 更新 Idx 位置的 Cell
/// Cell 的大小不变，只更新显示内容
/// </summary>
/// <param name="idx">索引</param>
public void RefreshCellAtIndex(int idx)

/// <summary>
/// 刷新列表，有增删或某个 Cell 大小变化，刷新整个列表
/// </summary>
public void ResetTable()
~~~

自定义脚本获取到 `TableView` 组件，设置 `tableView` 属性  
运行时，可以调用公共方法，更新列表或跳转到某个位置


##### 运行效果  

![效果](/assets/img/2019-05/utv2.png)  
