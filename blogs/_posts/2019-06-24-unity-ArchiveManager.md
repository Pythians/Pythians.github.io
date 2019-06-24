---
layout: post
title: 存档管理系统
categories: [Unity]
tags: [Unity]
description: >
    ArchiveData 数据、ArchiveDataManager 管理器、PersistentDataManager 辅助方法
image: /assets/img/2019-06/a.jpg
noindex: false
---

存档系统由 ArchiveData、ArchiveDataManager、PersistentDataManager 组成

## ArchiveData 存储数据

`ArchiveData` 包含所有需要存储的数据，所有字段需要支持序列化，任何一个对象可以还原存储游戏时的状态  
下面两个方法分别在保存数据前，载入数据后调用，所有字段可以在这里执行自定义操作，更新数据或重构数据结构

```c#
/// <summary>
/// 保存存档，更新信息
/// </summary>
/// <returns>this</returns>
public ArchiveData SaveData()

/// <summary>
/// 读取存档，补上未保存的数据 
/// </summary>
/// <returns>this</returns>
public ArchiveData ReadData()
```

## ArchiveDataManager 存档管理

存档管理游戏存档  
游戏有多个存档，按建立时间排序，每一个存档才能还原为一个 `ArchiveData`， 还原当时的游戏状态

存档管理内联存档信息 `ArchiveInfo`

```c#
/// <summary>
/// 存档信息，禁止 new 对象，从 ArchiveDataManager 获取
/// </summary>
public class ArchiveInfo
{
    /// <summary>
    /// 绝对路径
    /// </summary>
    public string FullName;
    /// <summary>
    /// 文件前缀名
    /// </summary>
    public string Name;
    /// <summary>
    /// 是否是自动保存的
    /// </summary>
    public bool AutoSave;
    /// <summary>
    /// 保存的日期时间
    /// </summary>
    public DateTime SaveDateTime;
}
```

管理存档的几个方法  

```c#
/// <summary>
/// 获取所有存档信息
/// </summary>
/// <returns>存档信息列表</returns>
public List<ArchiveInfo> GetArchives()

/// <summary>
/// 获取最新的存档信息
/// </summary>
/// <returns>存档信息</returns>
public ArchiveInfo GetFirstArchiveInfo()

/// <summary>
/// 获取默认存档
/// <para>
///     没有存档时，创建一个默认的存档
///     有存档时，取最新的一个
/// </para>
/// </summary>
/// <returns>存档</returns>
public ArchiveData GetArchiveData()

/// <summary>
/// 创建存档
/// </summary>
/// <param name="id">存档 Id</param>
/// <param name="name">存档名</param>
/// <returns>存档</returns>
public ArchiveData CreateArchive(int id, string name)

/// <summary>
/// 清除全部存档
/// </summary>
public void RemoveAllArchive()

/// <summary>
/// 删除存档
/// </summary>
/// <param name="info">删除的存档信息</param>
public void DeleteArchive(ArchiveInfo info)

/// <summary>
/// 载入存档<para>当存档损坏时，返回 null</para>
/// </summary>
/// <param name="info">需要载入的存档信息</param>
/// <returns>
/// 存档对象
/// 当存档损坏时，返回 null
/// </returns>
public ArchiveData LoadArchive(ArchiveInfo info)

/// <summary>
/// 保存 ArchiveData 到磁盘
/// </summary>
/// <param name="data">存档对象</param>
public void SaveArchive(ArchiveData data)
```

## PersistentDataManager 数据持久化处理

`PersistentDataManager` 提供了几个常用的存档操作静态方法，简化存档操作

```c#
/// <summary>
/// 获取存档管理器
/// </summary>
/// <returns>存档管理器</returns>
public static ArchiveDataManager GetArchiveDataManager()

/// <summary>
/// 获取当前的存档
/// </summary>
/// <returns>存档</returns>
public static ArchiveData GetCurrentArchiveData()

/// <summary>
/// 保存当前存档
/// </summary>
/// <param name="autoSave">自动保存标记</param>
public static void SaveCurrentArchiveData(bool autoSave = false)

/// <summary>
/// 获取主游戏数据
/// </summary>
/// <returns>PlayerData</returns>
public static PlayerData GetMainPlayerData()
```