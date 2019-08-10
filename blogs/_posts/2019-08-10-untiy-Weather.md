---
layout: post
title: 随机天气系统
categories: [blogs,Untiy]
tags: [blogs,Unity]
description: >
  随机生成天气，昼夜变化事件
image: /assets/img/t.jpg
noindex: false
---

### 天气
游戏内天气有： 睛、雨、雷雨、云、雪、大雪六种，每个季节出出现的天气概率不同  
```c#
public class Calendar
{
    public enum Weather
    {
        Clear = 1,
        LightRain = 2,
        Thunderstorm = 3,
        Cloudy = 4,
        Snow = 5,
        HeavySnow = 6,
    }
}
```

游戏内农牧场生产会受到天气影响  
每天子时随机生成天气，天气状态持续到当天结束  

获取当天天气接口，用法
```c#
public class GameTimer
{
    /// <summary>
    /// 今天天气
    /// </summary>
    public Calendar.Weather Weather { get; set; }
}

{
    //...
    print(GameTimer.Instance.Weather);
    //...
}
```

### 昼夜
晨时开始到酉时为白天，戌时进入夜晚，白天夜晚各有六个时辰  
`GameTimerScheduler` 提供两对接口注册事件，在进入白天和夜晚时，分发事件  
场景需要根据昼夜更换素材的可以在事件响应时更换
```c#
/// <summary>
/// 注册进入白天事件
/// </summary>
/// <param name="action">回调</param>
public static void RegisterDaybreak(Action action)
/// <summary>
/// 注册进入夜晚事件
/// </summary>
/// <param name="action">回调</param>
public static void RegisterNightfall(Action action)
/// <summary>
/// 取消注册进入白天事件
/// </summary>
/// <param name="action">回调</param>
public static void UnRegisterDaybreak(Action action)
/// <summary>
/// 取消注册进入夜晚事件
/// </summary>
/// <param name="action">回调</param>
public static void UnRegisterNightfall(Action action)
```