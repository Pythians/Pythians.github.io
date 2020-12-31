---
layout: post
title: Lua lazy loader
categories: [blogs]
tags: [blogs]
description: >
  A template blogs.
image: /assets/img/2020/a.gif
noindex: false
---

* [引言](#引言)
* [一个例子](#一个例子)
* [一点优化](#一点优化)
* [一些思考](#一些思考)

# 引言
自定义`lua`元表，实现代理、延迟载入的加载器（Ps.需要[`lua`元表][1]相关知识）

## 一个例子
```lua
local mkProxy = function(path)
	local instance = nil
	return setmetatable({}, {
		__index = function(t, k)
			if not instance then
				instance = require(path)
			end
			return instance[k]
		end,
		__newindex = function(t, k, v)
			if not instance then
				instance = require(path)
			end
			instance[k] = v
		end
	})
end
```
调用`local proxy = mkProxy(path)`返回一个**设置元表的空表** `proxy`，并不会真实`reauire`文件
当调用`proxy`的字段时，进入`__index`方法，检查`instance`，没有加载则`require`，然后返回调用的字段值
同理，设置`proxy`字段值也需要检查`instance`，`__newindex`也可以不设置`instance`的值，使`proxy`成为只读`table`，非常适合作为配置表加载器
`proxy`的懒加载特性适合集中管理，在程序开始的地方，生成所有的代理，在实际用的地方加载真实数据，解决程序同时加载大量文件卡顿的问题

## 一点优化
多数情况下`proxy`都可以代替原表来使用，但`proxy`本质是个空表，`pairs`、`dump`、`debug`都是空的，开发不方便
在`Programming in Lua`第13章[Tracking Table Accesses][2]有这个问题的解决方法：`private key`指向原始`table`
`private key`是一个`local table`，外部拿不到
`table`作为键，外部也无法猜测也不会撞到真实键

下面是个改进后的`mkProxy`:
```lua
local index = {}

local checkIndex = function(t)
	local pIndex = rawget(t, index)
	if pIndex.__need_load__ then
		local chunk = require(pIndex.__path__)
		if type(rawget(chunk, "new")) == "function" then
			rawset(t, index, chunk.new())
		else
			rawset(t, index, chunk)
		end
	end
end

local mtIndex = function(t, k)
	checkIndex(t)
	return rawget(t, index)[k]
end

local mtNewIndex = function(t, k, v)
	checkIndex(t)
	rawget(t, index)[k] = v
end

local mtDelNewIndex = function(t, k, v)
	assert(false, "Say something")
end

local mt = {
	__index = mtIndex,
	__newindex = mtNewIndex,
}

local mtRead = {
	__index = mtIndex,
	__newindex = mtDelNewIndex,
}

local mkProxy = function(path, mt)
	return setmetatable({
		[index] = {
			__need_load__ = true,
			__path__ = path,
		}
	}, mt or mtRead)
end
```
## 一些思考

[1]:http://www.lua.org/pil/13.html
[2]:http://www.lua.org/pil/13.4.4.html