---
title: LeetCode专题
icon: file
order: 
date: 2025-06-04
category:
  - 算法
tags:
  - 算法
  - LeetCode
---
## 数组
### 两数之和

[1. 两数之和 - 力扣（LeetCode）](https://leetcode.cn/problems/two-sum/description/)

#### 暴力解法
```java
class Solution {
    public int[] twoSum(int[] nums, int target) {
        int len = nums.length;
        for (int i = 0; i < len; i++) {
            for (int j = i + 1; j < len; j++) {
                if (nums[i] + nums[j] == target) {
                    return new int[]{i, j};
                }
            }
        }
        
        return new int[]{0, 0};
    }
}
```

时间复杂度：O(n 方)


空间复杂度：

 
#### 优化解法 1: