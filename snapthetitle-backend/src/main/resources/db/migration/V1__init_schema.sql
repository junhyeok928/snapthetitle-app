-- ============================================
-- unified schema (모든 이전 마이그레이션 통합 + deleted_yn 수정 반영)
-- ============================================

-- 1. attachments
create table if not exists attachments (
    id             bigint unsigned not null auto_increment,
    entity_type    varchar(50)     not null comment '파일 소속 엔티티명 (예: gallery, product, guide)',
    entity_id      bigint unsigned not null comment '소속 레코드의 PK 값',
    file_url       varchar(512)    not null comment '저장된 파일 URL 또는 경로',
    original_name  varchar(255)    not null comment '업로드 당시 원본 파일명',
    mime_type      varchar(100)    comment '파일 MIME 타입 (예: image/webp)',
    is_thumbnail   boolean         not null comment '썸네일 여부 (true: 썸네일)',
    created_at     datetime        not null default current_timestamp,
    updated_at     datetime        not null default current_timestamp on update current_timestamp,
    deleted_yn     varchar(1)      not null default 'N' comment '삭제 여부 (Y:삭제, N:활성)',
    primary key (id),
    index idx_attach_entity (entity_type, entity_id)
    ) engine=innodb default charset=utf8mb4 collate=utf8mb4_unicode_ci comment='첨부파일 테이블';

-- 2. products
create table if not exists products (
    id             bigint unsigned not null auto_increment,
    year           int             not null comment '상품 연도 (예: 2025)',
    name           varchar(100)    not null comment '상품 이름',
    description    text            comment '상품 설명',
    price          varchar(50)     not null comment '원 단위 문자열 (예: 400,000원)',
    image_url      varchar(512)    comment '이미지 경로 또는 URL',
    display_order  int             not null default 0 comment '정렬 순서',
    created_at     datetime        not null default current_timestamp,
    updated_at     datetime        not null default current_timestamp on update current_timestamp,
    deleted_yn     varchar(1)      not null default 'N' comment '삭제 여부 (Y:삭제, N:활성)',
    primary key (id)
    ) engine=innodb default charset=utf8mb4 collate=utf8mb4_unicode_ci comment='상품 테이블';

-- 2-1. product_options
create table if not exists product_options (
    id             bigint unsigned not null auto_increment,
    product_id     bigint unsigned not null comment 'products(id) 참조',
    label          varchar(50)     not null comment '옵션 라벨 (예: 장소)',
    value          varchar(100)    not null comment '옵션 값 (예: 1곳)',
    display_order  int             not null default 0 comment '정렬 순서',
    created_at     datetime        not null default current_timestamp,
    updated_at     datetime        not null default current_timestamp on update current_timestamp,
    deleted_yn     varchar(1)      not null default 'N' comment '삭제 여부 (Y:삭제, N:활성)',
    primary key (id),
    index idx_po_product (product_id),
    constraint fk_po_product foreign key (product_id) references products(id) on delete cascade
    ) engine=innodb default charset=utf8mb4 collate=utf8mb4_unicode_ci comment='상품 옵션 테이블';

-- 3. faqs
create table if not exists faqs (
    id           bigint unsigned not null auto_increment,
    category     varchar(50)     not null comment 'FAQ 카테고리',
    question     text            not null comment '질문 내용',
    answer       text            not null comment '답변 내용',
    created_at   datetime        not null default current_timestamp,
    updated_at   datetime        not null default current_timestamp on update current_timestamp,
    deleted_yn   varchar(1)      not null default 'N' comment '삭제 여부 (Y/N)',
    primary key (id)
    ) engine=innodb default charset=utf8mb4 collate=utf8mb4_unicode_ci comment='FAQ 테이블';

-- 4. partners
create table if not exists partners (
    id             bigint unsigned not null auto_increment,
    category       varchar(50)     not null comment '제휴 카테고리 (예: 부케, 수트 등)',
    name           varchar(100)    not null comment '업체명',
    instagram      varchar(100)    not null comment '인스타그램 핸들 (예: @ittageum)',
    link_url       varchar(255)    not null comment '인스타그램 링크 URL',
    display_order  int             not null default 0 comment '프론트 배열 순서',
    created_at     datetime        not null default current_timestamp,
    updated_at     datetime        not null default current_timestamp on update current_timestamp,
    deleted_yn     varchar(1)      not null default 'N' comment '삭제 여부 (Y:삭제, N:활성)',
    primary key (id),
    index idx_partner_order (display_order)
    ) engine=innodb default charset=utf8mb4 collate=utf8mb4_unicode_ci comment='파트너 테이블';

-- 5. guides
create table if not exists guides (
    id             bigint unsigned not null auto_increment,
    category       varchar(50)     not null comment '가이드 카테고리',
    content        text            not null comment '가이드 본문 내용',
    link_text      varchar(100)    comment '링크 텍스트',
    link_url       varchar(255)    comment '링크 URL',
    display_order  int             not null default 0 comment '정렬 순서',
    created_at     datetime        not null default current_timestamp,
    updated_at     datetime        not null default current_timestamp on update current_timestamp,
    deleted_yn     varchar(1)      not null default 'N' comment '삭제 여부 (Y/N)',
    primary key (id)
    ) engine=innodb default charset=utf8mb4 collate=utf8mb4_unicode_ci comment='가이드 테이블';

-- 5-1. guide_details
create table if not exists guide_details (
    id             bigint unsigned not null auto_increment,
    guide_id       bigint unsigned not null comment 'guides(id) 참조',
    subtitle       varchar(100)    not null comment '세부 제목',
    description    text            not null comment '세부 설명',
    display_order  int             not null default 0 comment '정렬 순서',
    created_at     datetime        not null default current_timestamp,
    updated_at     datetime        not null default current_timestamp on update current_timestamp,
    deleted_yn     varchar(1)      not null default 'N' comment '삭제 여부 (Y/N)',
    primary key (id),
    index idx_gd_guide (guide_id),
    constraint fk_gd_guide foreign key (guide_id) references guides(id) on delete cascade
    ) engine=innodb default charset=utf8mb4 collate=utf8mb4_unicode_ci comment='가이드 상세 테이블';

-- 6. gallery_photos
create table if not exists gallery_photos (
    id             bigint unsigned not null auto_increment,
    category       varchar(50)     not null comment '이미지 카테고리 (예: 바다, 들판, 스튜디오, 기타)',
    display_order  int             not null default 0 comment '정렬 순서',
    created_at     datetime        not null default current_timestamp,
    updated_at     datetime        not null default current_timestamp on update current_timestamp,
    deleted_yn     varchar(1)      not null default 'N' comment '삭제 여부 (Y/N)',
    primary key (id)
    ) engine=innodb default charset=utf8mb4 collate=utf8mb4_unicode_ci comment='갤러리 사진 테이블';

-- 7. admin_users
create table if not exists admin_users (
    id           int auto_increment primary key,
    username     varchar(50)  not null unique comment '관리자 로그인 아이디',
    password     varchar(100) not null comment 'BCrypt 암호화 비밀번호',
    role         varchar(20)  not null default 'ADMIN' comment '권한 (예: ADMIN)',
    created_at   timestamp    default current_timestamp comment '생성 시각'
    ) engine=innodb default charset=utf8mb4 collate=utf8mb4_unicode_ci comment='관리자 계정 테이블';

-- 8. visit_logs
create table if not exists visit_logs (
    id           bigint unsigned not null auto_increment comment 'PK',
    ip_address   varchar(45)     comment '방문자 IP 주소 (IPv6 포함)',
    user_agent   text            comment '브라우저/디바이스 User-Agent',
    referer      text            comment '이전 페이지 Referer (유입 경로)',
    url          varchar(255)    comment '요청된 URL 경로',
    method       varchar(10)     comment 'HTTP 메서드 (GET, POST 등)',
    status_code  int             comment '응답 상태 코드',
    visited_at   datetime        not null default current_timestamp comment '방문 시각',
    primary key (id),
    index idx_visit_time (visited_at),
    index idx_visit_url (url),
    index idx_visit_ip (ip_address)
    ) engine=innodb default charset=utf8mb4 collate=utf8mb4_unicode_ci comment='방문자 로그 기록 테이블';

-- 9. main_photos
create table if not exists main_photos (
    id             bigint unsigned not null auto_increment,
    display_order  int             not null default 0 comment '출력 순서',
    created_at     datetime        not null default current_timestamp,
    updated_at     datetime        not null default current_timestamp on update current_timestamp,
    deleted_yn     varchar(1)      not null default 'N' comment '삭제 여부 (Y/N)',
    primary key (id)
    ) engine=innodb default charset=utf8mb4 collate=utf8mb4_unicode_ci comment='메인 이미지 테이블';

-- 초기 관리자 계정 (BCrypt 해시된 비밀번호)
insert into admin_users (username, password, role)
values ('gonggongjoo', '$2a$10$JMKojEoSRORhqJV19irdJOOdtQBPzqpw1RlA2flrn0pSBJ7U9LQmG', 'ADMIN')
    on duplicate key update username = username;
