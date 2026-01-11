```sql
-- 复核记录表
CREATE TABLE wms_review_workbench (
    id BIGINT AUTO_INCREMENT PRIMARY KEY COMMENT '主键ID',
    
    -- 复核配置信息
    role_id BIGINT NOT NULL COMMENT '复核角色ID',
    role_name VARCHAR(30) NOT NULL COMMENT '角色名称（关联system_role表的name）',
    role_code VARCHAR(100) NOT NULL COMMENT '角色权限字符串（关联system_role表的code）',
    
    -- 项目信息（参考wms_project表）
    project_id VARCHAR(255) NOT NULL COMMENT '项目ID',
    project_doc_no VARCHAR(50) NOT NULL COMMENT '项目单据号',
    project_name VARCHAR(255) NULL COMMENT '项目名称',
    
    -- 业务关联信息
    biz_type VARCHAR(50) NOT NULL COMMENT '业务类型: INBOUND/OUTBOUND等',
    biz_id VARCHAR(255) NOT NULL COMMENT '业务记录ID',
    biz_doc_no VARCHAR(50) NOT NULL COMMENT '业务记录单据号',
    
    -- 业务机构信息（参考wms_stock_inbound表）
    biz_org_id VARCHAR(255) NULL COMMENT '业务机构ID',
    biz_org_name VARCHAR(255) NULL COMMENT '业务机构名称',
    
    -- 业务部门信息
    biz_dept_id VARCHAR(255) NULL COMMENT '业务部门ID',
    biz_dept_name VARCHAR(255) NULL COMMENT '业务部门名称',
    
    -- 业务员信息
    salesman_id VARCHAR(255) NULL COMMENT '业务员ID',
    salesman_name VARCHAR(255) NULL COMMENT '业务员姓名',
    
	-- 制单人信息
	doc_maker_id BIGINT NULL COMMENT '制单人ID',
	doc_maker_name VARCHAR(50) NULL COMMENT '制单人姓名',
    
    -- 审核状态
    review_status VARCHAR(20) NOT NULL COMMENT '审批状态: PENDING/APPROVED/REJECTED',
    review_comment TEXT NULL COMMENT '审批意见',
    reviewer_id BIGINT NULL COMMENT '审核人ID',
    reviewer_name VARCHAR(50) NULL COMMENT '审核人姓名',
    review_time TIMESTAMP NULL COMMENT '审核时间',
    
    -- 元信息
    tenant_id             int                                  null comment '租户ID；用于多租户区分',  
	creator               varchar(255)                         null comment '创建人',  
	create_time           datetime   default CURRENT_TIMESTAMP null comment '创建时间',  
	updater               varchar(255)                         null comment '更新人',  
	update_time           datetime   default CURRENT_TIMESTAMP null on update CURRENT_TIMESTAMP comment '更新时间',  
	deleted               tinyint(1) default 0                 null comment '逻辑删除标志，0表示未删除，1表示已删除',
    
    
	-- 索引
	-- 按角色和状态查询待办任务
	INDEX idx_role_status (role_id, review_status),
	
	-- 按业务单据查询
	INDEX idx_biz_doc (biz_type, biz_id),
	
	-- 按项目维度查询
	INDEX idx_project_status (project_id, review_status),
	
	-- 按单据号查询（业务单据）
	INDEX idx_biz_doc_no (biz_doc_no),
	
	-- 按项目单据号查询
	INDEX idx_project_doc_no (project_doc_no),
	
	-- 按制单人查询
	INDEX idx_doc_maker (doc_maker_id),
	
	-- 按审核人查询
	INDEX idx_reviewer (reviewer_id),
	
	-- 按审核时间范围查询
	INDEX idx_review_time (review_time),
	
	-- 按创建时间查询统计
	INDEX idx_create_time (create_time),
	
	-- 联合索引：按业务类型和状态查询
	INDEX idx_biz_type_status (biz_type, review_status),
	
	-- 联合索引：按项目和业务类型查询
	INDEX idx_project_biz (project_id, biz_type)
    
) COMMENT '复核工作台记录表，聚合各业务单据的复核审批流转信息';
```