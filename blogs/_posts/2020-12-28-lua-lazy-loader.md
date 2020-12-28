---
layout: post
title: Lua lazy loader
categories: [blogs]
tags: [blogs]
description: >
  A template blogs.
image: /assets/img/2020/a.jpg
noindex: false
---

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
	assert(false, "DO NOT write data into a read only table or object!")
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
	}, mt)
end
```