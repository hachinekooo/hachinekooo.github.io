<template><div><p>主要步骤，安装conda，创建一个新的虚拟环境，一切操作都在这个虚拟环境中做，这样可以很好的隔离开配置AI环境时python包影响其他情况下的使用</p>
<p>执行mlc_llm chat HF://mlc-ai/Llama-3-8B-Instruct-q4f16_1-MLC可能会遇到网络为题，这是因为命令行默认是不走代理的：
我们可以现在命令行中进行代理的配置，这里以ClashX为例
ClashX后台图标 - 帮助 - 端口 - 查看Sockets Port 端口号</p>
<p>其次就是可能会出现requests 库缺少 SOCKS 代理支持的依赖的问题：
如果你正在使用 macOS，你可以使用 Homebrew 来安装必要的依赖项。请尝试以下步骤：</p>
<ol>
<li>安装 Homebrew（如果尚未安装）：/bin/bash -c &quot;$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)&quot;</li>
<li>安装 openssl 和 libffi：brew install openssl libffi</li>
<li>在 mlcLLM 环境中使用 Conda 安装 PySocks：conda install -c conda-forge pysocks</li>
<li>验证安装：安装完成后，通过以下命令验证 PySocks 是否已成功安装：pip show PySocks</li>
</ol>
</div></template>


