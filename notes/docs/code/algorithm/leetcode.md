---
title: LeetCode-数组篇
icon: file
order: 
date: 2025-06-04
category:
  - 算法
tags:
  - 算法
  - LeetCode
  - 数组
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
class Solution001 {

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

#### 解法 1

```java
class Solution004 {
    public static double findMedianSortedArrays(int[] nums1, int[] nums2) {
        int len1 = nums1.length;
        int len2 = nums2.length;

        int[] arr = new int[len1 + len2];
        int index = 0;

        int i = 0; int j = 0;
        while(i < len1 && j < len2 ) {
            if (nums2[j] < nums1[i]) {
                arr[index++] = nums2[j++];
            } else {
                arr[index++] = nums1[i++];
            }
        }

        // Put the remaining elements into the array.
        while (i < len1) {
            arr[index++] = nums1[i++];
        }
        while (j < len2) {
            arr[index++] = nums2[j++];
        }

        System.out.println(Arrays.toString(arr));

        if (arr.length % 2 == 0) {
            return (double) (arr[arr.length / 2] + arr[arr.length / 2 - 1]) / 2;
        } else {
            return (double) arr[arr.length / 2];
        }
    }

    public static void main(String[] args) {
        double medianSortedArrays = findMedianSortedArrays(new int[]{1, 2}, new int[]{2});
        System.out.println(medianSortedArrays);
    }
}
```

时间复杂度 O( m + n )  
每一次循环，都会从 nums1 或 nums2 中取出一个元素，放进 arr 中，加上剩余元素的处理次数，是 O( m + n ) 次

计算中位数是常数时间 O(1)

空间复杂度 O(m + n)  
使用了一个数组，用来存储两个数组合并后的结果，随着数组的输入规模增加而增加，所以是 O(m + n)

#### 解法 2