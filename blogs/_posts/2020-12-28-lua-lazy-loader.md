---
layout: post
title: Lua lazy loader
categories: [blogs]
tags: [blogs]
description: >
  Lua 文件懒加载实现
image: /assets/img/2020/a.gif
noindex: false
---

* [引言](#引言)
* [一个例子](#一个例子)
* [一点优化](#一点优化)
* [一些思考](#一些思考)

## 引言
自定义`lua`元表，实现代理、延迟载入的加载器（Ps.需要[`lua`元表][1]相关知识）

### 一个例子
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
调用`local proxy = mkProxy(path)`返回一个**设置了元表的空表** `proxy`，并不会真实`reauire`文件  
当调用`proxy`的字段时，进入`__index`或`__newindex`方法，检查`instance`，没有加载则`require`，然后返回调用的字段值  
`proxy`的懒加载特性适合集中管理，在程序开始的地方，生成所有的代理，在实际用的地方加载真实数据，可解决程序同时加载大量文件卡顿的问题  
*`__index`, `__newindex`也可以添加高级功能，实现访问控制、统计、缓存等等*  

### 一点优化
多数情况下`proxy`都可以代替原表来使用，但`proxy`本质是个空表，`pairs`、`dump`、`debug`都是空的，对开发不友好  
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

### 一些思考
* 安全  
`private key`一般方法确实无法访问，但能被`pairs`遍历到，就能用`next`函数拿到`private key`和原始`table`  
安全也是相对而言
* 内存  
如果`private key`不指向原始`table`，而是新表，安全性是不是又提升了  
确实可以，而且实际开发中原始`table`可能有复杂的结构，读写可能有安全措施，新建一个数据友好型的新表，增加一个访问缓存，都可行，是高级用法，惟一的问题是新表占用内存，最初的`proxy`只是一个*设置了元表的空表*，加了新表、访问缓存却实打实的占用了内存，也可能随着访问次数逐渐增大  

[加载器](#一个例子)的基本功能是延迟加载，完全访问原始表的功能  
但是重载了`__index`和`__newindex`配合`private key`实现高级功能的`proxy`则是个强大的工具  
实际开发中跟据项目选用合适的功能，付出一些代价，换取开发便利，性能提升，高级功能，也是值得的。  

[1]:http://www.lua.org/pil/13.html
[2]:http://www.lua.org/pil/13.4.4.html