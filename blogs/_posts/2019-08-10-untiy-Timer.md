---
layout: post
title: 计时、定时器
categories: [blogs,Unity]
tags: [blogs,Unity]
description: >
  自定义计时、定时器
image: /assets/img/2019_/c.gif
noindex: false
---

- [计时器](#计时器)
  - [`CalendarTime` 通用时间数据结构](#通用时间数据结构)
  - [`GameTimer` 计时器接口](#计时器接口)  
- [定时器](#定时器)

## 计时器
游戏玩法上要求游戏内有一个完备的历法，且存档有回到游戏某一时间的能力，需要计时功能，而 Unity 没有提供这个功能，因此开发了计时器  

计时器仿照 Unix 时间戳来实现，`秒` 为基本单位，游戏开始，计时开始，直到游戏通关结束

`CalendarTime` [通用时间数据结构](#通用时间数据结构) 提供了时间和历法的数据  

`GameTimer` [计时器接口](#计时器接口)  
* 计时器提供了返回当前时间、历法、天气、昼夜信息的功能  
* 计时器提供了基本的计算、转换时间功能  
* 计时器有暂停、恢复时间能力  
* 计时器可以跳过一段时间，同时提供了两个事件，分别在跳时间前后触发

> __游戏内历法__  
> 游戏内最大时间单位是 `年`， 每年有四 `季`，每季 30 `天`， 每天 12 `时辰`， 时辰有多少 `秒`
> ```c#
> public class Calendar
> {
>     public enum ShiChen
>     {
>         Zi, Chou, Yin, Mao, Chen, Si, Wu, Wei, Shen, You, Xu, Hai,
>     }
> 
>     public enum Season
>     {
>         Spring,
>         Summer,
>         Autumn,
>         Winter,
>     }
> }
> ```

### 通用时间数据结构
```c#
public class CalendarTime
{
    /// <summary>
    /// 游戏内时间戳
    /// </summary>
    public uint time;
    /// <summary>
    /// 第几年
    /// </summary>
    public int year;
    /// <summary>
    /// 第几天
    /// </summary>
    public int day;
    /// <summary>
    /// 当前季
    /// </summary>
    public Calendar.Season season;
    /// <summary>
    /// 当前时辰
    /// </summary>
    public Calendar.ShiChen shiChen;
}
```

### 计时器接口

```c#
public class GameTimer
{
    // 单例对象
    public static GameTimer Instance { get; }

    #region static mode
    /// <summary>
    /// 进入游戏，开始计时 
    /// </summary>
    /// <param name="time"> 上次游戏的时间 </param>
    public static void StartTime(uint time)

    /// <summary>
    /// 时间戳对应的时辰
    /// </summary>
    /// <param name="time"></param>
    /// <returns>时间戳</returns>
    public static Calendar.ShiChen GetShiChen(uint time)

    /// <summary>
    /// 时间戳对应的天数
    /// </summary>
    /// <param name="time">时间戳</param>
    /// <returns>天数</returns>
    public static int GetDays(uint time)

    /// <summary>
    /// 时间戳对应的季节
    /// </summary>
    /// <param name="time">时间戳</param>
    /// <returns>季节</returns>
    public static Calendar.Season GetSeason(uint time)

    /// <summary>
    /// 跟据天数获取季节
    /// </summary>
    /// <param name="days">天数</param>
    /// <returns>季节</returns>
    public static Calendar.Season GetSeason(int days)

    /// <summary>
    /// 时间戳对应的年份
    /// </summary>
    /// <param name="time">时间戳</param>
    /// <returns>年</returns>
    public static int GetYear(uint time)

    /// <summary>
    /// 跟据天数获取年份
    /// </summary>
    /// <param name="days">天数</param>
    /// <returns>年</returns>
    public static int GetYear(int days)

    /// <summary>
    /// 当前时间
    /// </summary>
    /// <returns>当前时间</returns>
    public static CalendarTime GetTime()
    #endregion

    public void dump()
    public override string ToString()

    /// <summary>
    /// 游戏内时间快进前事件
    /// </summary>
    public event Action PreFastForwardTime;
    /// <summary>
    /// 游戏内时间快进后事件
    /// </summary>
    public event Action DoneFastForwardTime;

    /// <summary>
    /// 此时是否是夜晚
    /// </summary>
    public bool IsNight { get: }
    /// <summary>
    /// 秒/时辰， 一个时辰有多少秒
    /// </summary>
    public int ShiChen1Sec { get ; set; }

    /// <summary>
    /// 今天天气
    /// </summary>
    public Calendar.Weather Weather { get; set; }

    /// <summary>
    /// 当前季节
    /// </summary>
    /// <returns>当前季节</returns>
    public Calendar.Season GetSeason()

    /// <summary>
    /// 当前时辰
    /// </summary>
    /// <returns>当前时辰</returns>
    public Calendar.ShiChen GetShiChen()

    /// <summary>
    /// 当前天数
    /// </summary>
    /// <returns>当前天数</returns>
    public int GetDays()

    /// <summary>
    /// 当前年
    /// </summary>
    /// <returns>当前年</returns>
    public int GetYear()

    /// <summary>
    /// 过去时辰
    /// </summary>
    /// <returns>过去时辰</returns>
    public int GetPassShiChens()

    /// <summary>
    /// 过去天数
    /// </summary>
    /// <returns>过去天数</returns>
    public int GetPassDays()

    /// <summary>
    /// 过去季节
    /// </summary>
    /// <returns>过去季节</returns>
    public int GetPassSeasons()

    /// <summary>
    /// 过去年
    /// </summary>
    /// <returns>过去年</returns>
    public int GetPassYears()

    /// <summary>
    /// 当前时间 
    /// </summary>
    /// <returns></returns>
    public CalendarTime getTime()

    /// <summary>
    /// 获取从当前时间到 dayCount 天，shiChen 的秒数
    /// </summary>
    /// <param name="dayCount">多少天后</param>
    /// <param name="shiChen">未来某天的时辰</param>
    /// <returns>秒数</returns>
    public uint getSecoundsWithDayFromNow(int dayCount = 1, Calendar.ShiChen shiChen = GameTimerScheduler.DefaultShiChen)
    
    /// <summary>
    /// 获取当前时间到 shiChenCount 时辰后的秒数
    /// </summary>
    /// <param name="shiChenCount">时辰数</param>
    /// <returns>秒数</returns>
    public uint getSecoundsWithShiChenFromNow(int shiChenCount = 1)

    /// <summary>
    /// 时间跳到 dayCount 天后的 shiChen 
    /// </summary>
    /// <param name="dayCount">多少天</param>
    /// <param name="shiChen">某个时辰</param>
    public void FastForwardWithDay(int dayCount = 1, Calendar.ShiChen shiChen = GameTimerScheduler.DefaultShiChen)

    /// <summary>
    /// 时间跳到 shiChenCount 个时辰后
    /// </summary>
    /// <param name="shiChenCount">时辰数</param>
    public void FastForwardWithShiChen(int shiChenCount = 1)

    /// <summary>
    /// 是否暂停 
    /// </summary>
    /// <returns></returns>
    public bool isPause()

    /// <summary> 
    /// 暂停计时 
    /// </summary>
    public void Pause()

    /// <summary>
    /// 恢复计时 
    /// </summary>
    public void Resume()
}
```

## 定时器

基于`计时器`功能实现定时任务功能，可以实现在几个时辰、几天后触发一个事件

> **注意**  
> 由于计时器是在多线程实现的，Unity 的机制不允许其他线程调用主线程引擎级的功能  
> 定时器位于主线程，在 `FixedUpdate` 内检测计时器设置的标记来触发事件，可能有几毫秒的延迟

```c#
/// <summary>
/// 单次定时器
/// </summary>
/// <param name="name"></param>
/// <param name="schedule"></param>
/// <param name="time"></param>
public static void ScheduleTime(string name, ScheduleDelegate schedule, uint time)
/// <summary>
/// 游戏内定时器
/// </summary>
/// <param name="name">定时器名，有惟一性</param>
/// <param name="schedule">回调</param>
/// <param name="time">多少秒后回调</param>
/// <param name="autoReset">是否重复调用</param>
public static void ScheduleTime(string name, ScheduleDelegate schedule, uint time, bool autoReset)

/// <summary>
/// 游戏内定时器以时辰为单位
/// </summary>
/// <param name="name">定时器名，有惟一性</param>
/// <param name="schedule">回调</param>
/// <param name="count">多少个时辰</param>
public static void ScheduleShiChen(string name, ScheduleDelegate schedule, int count)
/// <summary>
/// 游戏内定时器以时辰为单位
/// </summary>
/// <param name="name">定时器名，有惟一性</param>
/// <param name="schedule">回调</param>
/// <param name="count">多少个时辰</param>
/// <param name="autoReset">是否重复调用</param>
public static void ScheduleShiChen(string name, ScheduleDelegate schedule, int count, bool autoReset)

/// <summary>
/// 游戏内定时器以天为单位
/// </summary>
/// <param name="name">定时器名，有惟一性</param>
/// <param name="schedule">回调</param>
/// <param name="count">多少天？</param>
/// <param name="shiChen">什么时辰？</param>
public static void ScheduleDay(string name, ScheduleDelegate schedule, int count, Calendar.ShiChen shiChen = DefaultShiChen)
/// <summary>
/// 游戏内定时器以天为单位
/// </summary>
/// <param name="name">定时器名，有惟一性</param>
/// <param name="schedule">回调</param>
/// <param name="count">多少天？</param>
/// <param name="autoReset">是否重复调用</param>
/// <param name="shiChen">什么时辰？</param>
public static void ScheduleDay(string name, ScheduleDelegate schedule, int count, bool autoReset, Calendar.ShiChen shiChen)

/// <summary>
/// 清除定时器
/// </summary>
/// <param name="scheduleName">定时器名</param>
public static void RemoveScheduleTime(string scheduleName)
/// <summary>
/// 清除时辰定时器
/// </summary>
/// <param name="scheduleName">定时器名</param>
public static void RemoveScheduleShiChen(string scheduleName)
/// <summary>
/// 清除天定时器
/// </summary>
/// <param name="scheduleName">定时器名</param>
public static void RemoveScheduleDay(string scheduleName)

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