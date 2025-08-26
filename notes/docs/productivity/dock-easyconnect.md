---
title: 我的电脑我做主之：用 docker 隔离 easyconnect 并正确配置内网流量转发
icon: file
order:
date: 2025-08-26
category:
  - 效率
tags:
  - VPN
  - Docker
  - Mac
  - easyconnect
---
## 安装 easyconnect-docker

```shell
docker run \
  --name app-easyconnect \            # 容器名称
  --device /dev/net/tun \             # 挂载网络隧道设备
  --cap-add NET_ADMIN \               # 添加网络管理权限
  -privileged \                       # 最高权限模式
  -ti \                              # 交互式终端
  -e PASSWORD=xxxx \                  # VNC 连接密码
  -e URLWIN=1 \                      # 启用窗口模式
  -e DISABLE_PKG_VERSION_XML=1 \     # 禁用包版本检查（适配 ARM64）
  -v /Users/wangwenpeng/docker/app/easy-connect:/root \ # 挂载数据卷
  -p 127.0.0.1:5901:5901 \          # VNC 端口映射
  -p 127.0.0.1:1080:1080 \          # SOCKS5 代理端口映射
  -p 127.0.0.1:8888:8888 \          # HTTP 代理端口映射
  hagb/docker-easyconnect:7.6.7      # 镜像名称和版本
```

- `--name`：容器名称，便于管理和引用
- `--device /dev/net/tun`：挂载网络隧道设备，VPN 连接必需
- `--cap-add NET_ADMIN`：添加网络管理能力，允许修改网络配置
- `-privileged`：特权模式，给予容器几乎所有主机权限
- `-ti`：`-t` 分配伪终端 + `-i` 保持交互式输入
- `-e PASSWORD=xxxx`：设置 VNC 远程桌面连接密码
- `-e URLWIN=1`：启用 URL 窗口模式，方便操作
- `-e DISABLE_PKG_VERSION_XML=1`：禁用软件包版本 XML 检查，解决 ARM64 兼容性问题
- `-v /path:/root`：将主机目录挂载到容器内，持久化配置和数据
- `-p 127.0.0.1:5901:5901`：VNC 服务端口，用于远程桌面访问
- `-p 127.0.0.1:1080:1080`：SOCKS5 代理端口，供其他应用使用
- `-p 127.0.0.1:8888:8888`：HTTP 代理端口，Web 浏览器代理

## 编辑全局拓展脚本

![](../../appends/img/dock-easyconnect.jpg)

根据需要修改，我写的是：

- name 中的名字可以随便起
- `127.0.0.1:1080` 是我本地 docker 中，容器 `app-easyconnect` 暴露出来的 Socks5 代理端口。这个 `server` 与 `port` 可以按需而改
- UDP 为 true 意味着像是游戏、视频场景的流量也可以转发到这个地址的端口处
- `config.rules.unshift` 意思是往数组中最开始添加一条规则，匹配网段 `10.193.108.0/24` 的地址，走名字为 `ec` 的代理

```javascript
function main(config, profileName) {
  // 添加 EasyConnect 代理
  config.proxies.push({
    name: 'ec',
    type: 'socks5',
    server: '127.0.0.1',
    port: 1080,
    udp: true
  });

  // 添加内网规则
  config.rules.unshift(
    "IP-CIDR,10.193.108.0/24,ec"
  );

  return config;
}
```

## 修改系统配置

首先查看一下自己的代理软件配置，找到代理端口
![](../../appends/img/dock-easyconnect-3.jpeg)

打开系统的网络设置

![](../../appends/img/dock-easyconnect-4.jpeg)

设置一下代理标签页，三个都开启，填写正确的地址与端口

![](../../appends/img/dock-easyconnect-1.jpeg)
![](../../appends/img/dock-easyconnect-2.jpeg)


> [!tip] 
> 有一点需要注意，如果你希望某个内网地址走代理的话，要看看一下蓝色区域中是否包含，如果有的话自行删除，否则不会走代理软件。


## 配置 Git 代理

经过上述配置之后，如果你的远程地址也是使用的是 HTTP 协议的，如：`http://10.100.108.110:8600/project/your-project.git`，按理来说，你的 IDEA 可以正常拉取更新代码了。

如果不行，最推荐的方式是改为 HTTP 的，配置更简单。

```shell
# 查看当前远程地址
git remote -v

# 将 SSH 地址改为 HTTP 地址
git remote set-url origin http://10.100.108.110:8600/project/your-project.git

# 验证修改
git remote -v
```