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

时间复杂度：O(n²)

外层循环从 0 - n - 1，即 n 次

内层循环  
当 n = 0 时， n - 1 次  
当 n = 1 时， n - 2   
...... 
当 n = 3 时， 2 次 
当 n = 2 时， 1 次

等差数列求和可知，总共执行 n²/2


空间复杂度：O(1)   
- 没有使用额外的数据结构（如 HashMap）
- 空间使用量与输入规模 n 无关
 
#### 使用 HashMap 优化:
```java
class Solution {

    /*
    * 基本思想：
    * 使用 map 记录了数值元素值与下标的关系，借助 map 高效的查找方法
    **/
    public int[] twoSum(int[] nums, int target) {

        int len = nums.length;

        HashMap<Integer, Integer> map = new HashMap();
        for (int i = 0; i < len; i++) {
            map.put(nums[i], i);
        }

        for (int i = 0; i < len; i++) {
            int part = target - nums[i];
            if (map.containsKey(part) && map.get(part) != i) {
                return new int[]{map.get(part), i};
            }
        }
        
        return new int[]{0, 0};
    }
}
```

时间复杂度是 O(n)  
虽然有两个 for 循环，但是他们之间是独立的关系，执行次数算的时候用加法，即 n + n， O(2 n) = n

空间复杂度是 n  
使用到了一个 map，大小会随着数组的变大而变大


```java
class Solution {

    public int[] twoSum(int[] nums, int target) {

        int len = nums.length;

        HashMap<Integer, Integer> map = new HashMap();
        for (int i = 0; i < len; i++) {
            int part = target - nums[i];
            if (map.containsKey(part)) {
                return new int[]{map.get(part), i};
            } 
			map.put(nums[i], i);
        }
        
        return new int[]{0, 0};
    }
}
```

### 寻找两个正序数组的中位数

[寻找两个正序数组的中位数](https://leetcode.cn/problems/median-of-two-sorted-arrays/)

#### 