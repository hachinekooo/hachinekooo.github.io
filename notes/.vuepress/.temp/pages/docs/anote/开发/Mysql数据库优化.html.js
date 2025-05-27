import comp from "/Users/wangwenpeng/Code/area/notes/.vuepress/.temp/pages/docs/anote/开发/Mysql数据库优化.html.vue"
const data = JSON.parse("{\"path\":\"/docs/anote/%E5%BC%80%E5%8F%91/Mysql%E6%95%B0%E6%8D%AE%E5%BA%93%E4%BC%98%E5%8C%96.html\",\"title\":\"覆盖索引\",\"lang\":\"zh-CN\",\"frontmatter\":{\"创建日期\":\"2024.04.27 星期六 8点10分44秒 晚上<br>\",\"最后修改\":\"2024.05.6 星期一 4点23分35秒 下午<br>\",\"description\":\"覆盖索引 查询的列要被所建的索引覆盖到 为了避免回表查询，导致的不必要的性能损耗。 在业务场景中，如果存在多个查询条件，考虑针对于查询字段建立索引时，建议建立联合索引，而非单列索引。 索引设计原则 针对于数据量较大，且查询比较频繁的表建立索引。 针对于常作为查询条件（where）、排序（order by）、分组（group by）操作的字段建立索引。 ...\",\"gitInclude\":[],\"head\":[[\"meta\",{\"property\":\"og:url\",\"content\":\"https://mister-hope.github.io/docs/anote/%E5%BC%80%E5%8F%91/Mysql%E6%95%B0%E6%8D%AE%E5%BA%93%E4%BC%98%E5%8C%96.html\"}],[\"meta\",{\"property\":\"og:site_name\",\"content\":\"忧郁男孩的救赎\"}],[\"meta\",{\"property\":\"og:title\",\"content\":\"覆盖索引\"}],[\"meta\",{\"property\":\"og:description\",\"content\":\"覆盖索引 查询的列要被所建的索引覆盖到 为了避免回表查询，导致的不必要的性能损耗。 在业务场景中，如果存在多个查询条件，考虑针对于查询字段建立索引时，建议建立联合索引，而非单列索引。 索引设计原则 针对于数据量较大，且查询比较频繁的表建立索引。 针对于常作为查询条件（where）、排序（order by）、分组（group by）操作的字段建立索引。 ...\"}],[\"meta\",{\"property\":\"og:type\",\"content\":\"article\"}],[\"meta\",{\"property\":\"og:locale\",\"content\":\"zh-CN\"}],[\"meta\",{\"property\":\"article:author\",\"content\":\"Mr.Hope\"}],[\"script\",{\"type\":\"application/ld+json\"},\"{\\\"@context\\\":\\\"https://schema.org\\\",\\\"@type\\\":\\\"Article\\\",\\\"headline\\\":\\\"覆盖索引\\\",\\\"image\\\":[\\\"\\\"],\\\"dateModified\\\":null,\\\"author\\\":[{\\\"@type\\\":\\\"Person\\\",\\\"name\\\":\\\"Mr.Hope\\\",\\\"url\\\":\\\"https://mister-hope.com\\\"}]}\"]]},\"headers\":[],\"readingTime\":{\"minutes\":2.27,\"words\":681},\"filePathRelative\":\"docs/anote/开发/Mysql数据库优化.md\",\"excerpt\":\"\\n<blockquote>\\n<p>查询的列要被所建的索引覆盖到</p>\\n</blockquote>\\n<p>为了避免回表查询，导致的不必要的性能损耗。</p>\\n<p>在业务场景中，如果存在多个查询条件，考虑针对于查询字段建立索引时，建议建立联合索引，而非单列索引。</p>\\n<h1>索引设计原则</h1>\\n<ul>\\n<li>\\n<p>针对于数据量较大，且查询比较频繁的表建立索引。</p>\\n</li>\\n<li>\\n<p>针对于常作为查询条件（where）、排序（order by）、分组（group by）操作的字段建立索引。</p>\\n</li>\\n<li>\\n<p>尽量选择区分度高的列作为索引，尽量建立唯一索引，区分度越高，使用索引的效率越高。</p>\\n</li>\\n<li>\\n<p>如果是字符串类型的字段，字段的长度较长，可以针对于字段的特点，建立前缀索引。</p>\\n</li>\\n<li>\\n<p>尽量使用联合索引，减少单列索引，查询时，联合索引很多时候可以覆盖索引，节省存储空间，避免回表，提高查询效率。</p>\\n</li>\\n<li>\\n<p>要控制索引的数量，索引并不是多多益善，索引越多，维护索引结构的代价也就越大，会影响增删改的效率。</p>\\n</li>\\n<li>\\n<p>如果索引列不能存储 NULL 值，请在创建表时使用 NOT NULL 约束它。当优化器知道每列是否包含 NULL 值时，它可以更好地确定哪个索引最有效地用于查询。</p>\\n</li>\\n</ul>\",\"autoDesc\":true}")
export { comp, data }

if (import.meta.webpackHot) {
  import.meta.webpackHot.accept()
  if (__VUE_HMR_RUNTIME__.updatePageData) {
    __VUE_HMR_RUNTIME__.updatePageData(data)
  }
}

if (import.meta.hot) {
  import.meta.hot.accept(({ data }) => {
    __VUE_HMR_RUNTIME__.updatePageData(data)
  })
}
