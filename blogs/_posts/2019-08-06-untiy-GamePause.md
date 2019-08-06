---
layout: post
title: 游戏暂停,缓存数据
categories: [blogs,Unity]
tags: [blogs,Unity]
description: >
  游戏暂停接口，场景转换时缓存数据，返回时恢复场景状态
image: /assets/img/2019_/a.png
noindex: false
---

游戏打开全局设置时，暂停场景内动作、输入等，注册场景管理器的暂停、恢复接口，实现自己功能  

```c#
/// <summary>
/// 注册暂停事件
/// </summary>
/// <param name="action">回调</param>
public static void RegisterPause(Action action)
/// <summary>
/// 取消注册暂停事件
/// </summary>
/// <param name="action">回调</param>
public static void UnRegisterPause(Action action)
/// <summary>
/// 注册恢复事件
/// </summary>
/// <param name="action">回调</param>
public static void RegisterResume(Action action)
/// <summary>
/// 取消注册恢复事件
/// </summary>
/// <param name="action">回调</param>
public static void UnRegisterResume(Action action)

/// <summary>
/// 加载场景
/// </summary>
/// <param name="sceneName">场景</param>
public static void TransitionToScene(string sceneName)

/// <summary>
/// 是否正在加载场景
/// </summary>
public static bool Transitioning

/// <summary>
/// 暂停游戏，暂停游戏时间、分发注册的暂停事件
/// </summary>
public void pauseGame()

/// <summary>
/// 恢复游戏，恢复游戏时间、颁发注册的恢复事件
/// </summary>
public void resumeGame()

/// <summary>
/// 游戏暂停标记
/// </summary>
public bool IsPause { get; set; }
```

## 缓存功能
- 缓存由 `PersistentDataManager` 管理  
- 需要缓存数据的对像需要实现接口 `IDataPersister`  
- 缓存的数据必须是 `Data` 的5个模板之一  
- `PersistentDataManager` 在需要的时候调用接口方法来缓存和载入数据，也可以调用 `PersistentDataManager.SetDirty(this)` 来主动缓存数据

```c#
public interface IDataPersister
{
    /// <summary>
    /// 返回缓存数据属性
    /// </summary>
    /// <returns><see cref="DataSettings"/> 缓存数据属性</returns>
    DataSettings GetDataSettings();
    /// <summary>
    /// 缓存数据属性变更
    /// </summary>
    /// <param name="dataTag">数据标记</param>
    /// <param name="persistenceType"><see cref="DataSettings.PersistenceType"/> 缓存类型</param>
    void SetDataSettings(string dataTag, DataSettings.PersistenceType persistenceType);
    /// <summary>
    /// 返回需要缓存的数据
    /// </summary>
    /// <returns>缓存的数据</returns>
    Data SaveData();
    /// <summary>
    /// 载入数据，还原场景
    /// </summary>
    /// <param name="data"><see cref="SaveData"/>缓存的数据</param>
    void LoadData(Data data);
}
```

缓存的数据要求  

```c#
// 缓存数据属性
[Serializable]
public class DataSettings
{
    public enum PersistenceType
    {
        DoNotPersist,
        ReadOnly,
        WriteOnly,
        ReadWrite,
        Serialize,
    }

    public string dataTag;
    public PersistenceType persistenceType;

    public DataSettings()
    {
        dataTag = Guid.NewGuid().ToString();
        persistenceType = PersistenceType.ReadWrite;
    }

    public DataSettings(string tag)
    {
        dataTag = tag;
        persistenceType = PersistenceType.ReadWrite;
    }

    public DataSettings(string tag, PersistenceType type)
    {
        dataTag = tag;
        persistenceType = type;
    }

    public DataSettings(PersistenceType type) : this()
    {
        persistenceType = type;
    }

    public override string ToString()
    {
        return $"{dataTag} -- {persistenceType}";
    }
}

// 缓存数据
[Serializable]
public class Data
{
    public Data() { }
}

// 有5个模板可选
[Serializable]
public class Data<T> : Data
{
    public T value;

    public Data(T value)
    {
        this.value = value;
    }
}


[Serializable]
public class Data<T0, T1> : Data
{
    public T0 value0;
    public T1 value1;

    public Data(T0 value0, T1 value1)
    {
        this.value0 = value0;
        this.value1 = value1;
    }
}


[Serializable]
public class Data<T0, T1, T2> : Data
{
    public T0 value0;
    public T1 value1;
    public T2 value2;

    public Data(T0 value0, T1 value1, T2 value2)
    {
        this.value0 = value0;
        this.value1 = value1;
        this.value2 = value2;
    }
}


[Serializable]
public class Data<T0, T1, T2, T3> : Data
{
    public T0 value0;
    public T1 value1;
    public T2 value2;
    public T3 value3;

    public Data(T0 value0, T1 value1, T2 value2, T3 value3)
    {
        this.value0 = value0;
        this.value1 = value1;
        this.value2 = value2;
        this.value3 = value3;
    }
}


[Serializable]
public class Data<T0, T1, T2, T3, T4> : Data
{
    public T0 value0;
    public T1 value1;
    public T2 value2;
    public T3 value3;
    public T4 value4;

    public Data(T0 value0, T1 value1, T2 value2, T3 value3, T4 value4)
    {
        this.value0 = value0;
        this.value1 = value1;
        this.value2 = value2;
        this.value3 = value3;
        this.value4 = value4;
    }
}
```

`PersistentDataManager` 几个常用静态函数  

```c#
/// <summary>
/// 注册缓存数据
/// </summary>
/// <param name="persister">实现缓存数据接口的对象</param>
public static void RegisterPersister(IDataPersister persister)
/// <summary>
/// 取消缓存数据
/// </summary>
/// <param name="persister">实现缓存数据接口的对象</param>
public static void UnregisterPersister(IDataPersister persister)
/// <summary>
/// 主动缓存数据
/// </summary>
/// <param name="dp">实现缓存数据接口的对象</param>
public static void SetDirty(IDataPersister dp)
```  

一个应用例子，可收集元素组件

```c#
using System.Collections;
using System.Collections.Generic;
using UnityEngine;

namespace Gamekit2D
{
    [RequireComponent(typeof(CircleCollider2D))]
    public class InventoryItem : MonoBehaviour, IDataPersister
    {
        public string inventoryKey = "";
        public LayerMask layers;
        public bool disableOnEnter = false;

        [HideInInspector]
        new public CircleCollider2D collider;

        public AudioClip clip;

        // 缓存数据属性
        public DataSettings dataSettings;

        // 注册缓存数据
        void OnEnable()
        {
            collider = GetComponent<CircleCollider2D>();
            PersistentDataManager.RegisterPersister(this);
        }
        // 取消注册
        void OnDisable()
        {
            PersistentDataManager.UnregisterPersister(this);
        }
        void Reset()
        {
            layers = LayerMask.NameToLayer("Everything");
            collider = GetComponent<CircleCollider2D>();
            collider.radius = 5;
            collider.isTrigger = true;

            // new 缓存属性
            dataSettings = new DataSettings();
        }

        void OnTriggerEnter2D(Collider2D other)
        {
            if (layers.Contains(other.gameObject))
            {
                var ic = other.GetComponent<InventoryController>();
                ic.AddItem(inventoryKey);
                if (disableOnEnter)
                {
                    gameObject.SetActive(false);
                    Save();
                }

                if (clip) AudioSource.PlayClipAtPoint(clip, transform.position);

            }
        }

        // 主动缓存数据
        public void Save()
        {
            PersistentDataManager.SetDirty(this);
        }

        void OnDrawGizmos()
        {
            Gizmos.DrawIcon(transform.position, "InventoryItem", false);
        }

        // 实现接口，返回数据属性
        public DataSettings GetDataSettings()
        {
            return dataSettings;
        }

        // 实现接口，设置数据属性
        public void SetDataSettings(string dataTag, DataSettings.PersistenceType persistenceType)
        {
            dataSettings.dataTag = dataTag;
            dataSettings.persistenceType = persistenceType;
        }

        // 实现接口，返回需要缓存的数据
        public Data SaveData()
        {
            return new Data<bool>(gameObject.activeSelf);
        }

        // 实现接口，加载数据
        public void LoadData(Data data)
        {
            Data<bool> inventoryItemData = (Data<bool>)data;
            gameObject.SetActive(inventoryItemData.value);
        }
    }
}
```