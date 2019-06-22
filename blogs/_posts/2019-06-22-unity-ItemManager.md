---
layout: post
title: ItemManager 道具管理器
categories: [Unity]
tags: [Unity]
description: >
    道具管理器
image: /assets/img/bg2.jpg
noindex: false
---

道具管理类，游戏内每个拥有道具的 Npc、建筑等都可以创建一个道具管理器来管理道具

# 主要函数
---

```c#

/// <summary>
/// 获取主角的道具管理器
/// </summary>
public static ItemManager Instance

/// <summary>
/// 创建道具管理器
/// </summary>
/// <param name="player">Npc 数据</param>
/// <returns>道具管理器</returns>
public static ItemManager Create(PlayerData player)

/// <summary>
/// 创建道具管理器，用于拥有道具的对象，如：仓库
/// </summary>
/// <param name="items">源道具数据</param>
/// <returns>道具管理器</returns>
public static ItemManager Create(Dictionary<int,int> items)

/// <summary>
/// 从 from 转移道具到 to，from 没有道具或数量不足时，不转移
/// </summary>
/// <param name="from">道具管理器</param>
/// <param name="to">道具管理器</param>
/// <param name="id">道具 Id</param>
/// <param name="num">数量</param>
/// <returns>true 转移成功</returns>
public static bool Transfer(ItemManager from, ItemManager to, int id, int num)

/// <summary>
/// 道具管理器绑定的 Npc
/// </summary>
public PlayerData Player { get; private set; }

/// <summary>
/// 管理的所有道具
/// </summary>
public Dictionary<int, Item> Items { get => items; private set => items = value; }

/// <summary>
/// 把主角的道具转移到另一个道具管理器上
/// </summary>
/// <param name="to">道具管理器</param>
/// <param name="id">道具 Id</param>
/// <param name="num">数量</param>
/// <returns>true 转移成功</returns>
public bool TransferTo(ItemManager to, int id, int num)
/// <summary>
/// 转移道具到主角上
/// </summary>
/// <param name="from">道具管理器</param>
/// <param name="id">道具 Id</param>
/// <param name="num">数量</param>
/// <returns>true 转移成功</returns>
public bool TransferFrom(ItemManager from, int id, int num)

/// <summary>
/// 获取道具数据
/// </summary>
/// <param name="id">道具 Id</param>
/// <returns>道具数据</returns>
public Item GetItem(int id)

/// <summary>
/// 获取道具数量
/// </summary>
/// <param name="id">道具 Id</param>
/// <returns>道具数量</returns>
public int GetItemNum(int id)

/// <summary>
/// 获取这个类型的全部道具
/// </summary>
/// <param name="type">道具类型</param>
/// <returns>这个类型的全部道具</returns>
public List<Item> GetItemsByType(int type)

/// <summary>
/// 添加道具
/// </summary>
/// <param name="id">道具 Id</param>
/// <param name="num">数量</param>
/// <returns>道具数量</returns>
public int AddItem(int id, int num)

/// <summary>
/// 减少道具
/// </summary>
/// <param name="id">道具 Id</param>
/// <param name="num">数量</param>
/// <returns>道具数量</returns>
public int ReduceItem(int id, int num)

```

## 示例
```c#

var mItem = ItemManager.Instance;
var tem = ItemManager.Create(new Dictionary<int, int>() { { 1, 99 }, { 2, 99 } });
var num = mItem.GetItemNum(1);
var t2 = mItem.GetItemsByType(2);
var b = tem.TransferTo(mItem, 1, 9);
var item = mItem.GetItem(1);

```