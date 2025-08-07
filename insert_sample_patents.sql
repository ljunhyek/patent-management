-- ljunhyek@naver.com 사용자의 특허 샘플 데이터 삽입

-- 먼저 해당 사용자 ID 확인 (주석으로 표시)
-- SELECT id FROM "User" WHERE email = 'ljunhyek@naver.com';

-- 사용자 ID를 변수로 설정 (실제 실행 시 사용자 ID로 교체 필요)
-- 임시로 'user_id_placeholder'로 표시

-- 특허 1: 10-2021-0012467
INSERT INTO "Patent" (
  id,
  "applicationNo",
  "registrationNo", 
  title,
  applicant,
  inventor,
  "applicationDate",
  "publicationDate",
  "registrationDate",
  "pctDeadline",
  "pctNumber",
  status,
  "userId",
  "createdAt",
  "updatedAt"
) VALUES (
  'clpatent001',
  '10-2021-0012467',
  '10-0026783',
  '샘플 특허 1',
  '주경애',
  '노종섭',
  '2006-05-23'::timestamp,
  NULL,
  '2006-05-23'::timestamp,
  '2007-05-23'::timestamp,
  'PCT/KR2022/014524',
  '등록',
  'USER_ID_PLACEHOLDER',
  NOW(),
  NOW()
);

-- 특허 2: 10-2022-0012467
INSERT INTO "Patent" (
  id,
  "applicationNo",
  "registrationNo",
  title,
  applicant,
  inventor,
  "applicationDate",
  "publicationDate", 
  "registrationDate",
  "pctDeadline",
  "pctNumber",
  status,
  "userId",
  "createdAt",
  "updatedAt"
) VALUES (
  'clpatent002',
  '10-2022-0012467',
  '20-0026783',
  '샘플 특허 2',
  '주경애',
  '노종섭',
  '2007-05-23'::timestamp,
  NULL,
  '2007-05-23'::timestamp,
  '2008-05-23'::timestamp,
  'PCT/KR2022/014524',
  '등록',
  'USER_ID_PLACEHOLDER',
  NOW(),
  NOW()
);

-- 특허 3: 10-2023-0012467
INSERT INTO "Patent" (
  id,
  "applicationNo",
  "registrationNo",
  title,
  applicant,
  inventor,
  "applicationDate",
  "publicationDate",
  "registrationDate", 
  "pctDeadline",
  "pctNumber",
  status,
  "userId",
  "createdAt",
  "updatedAt"
) VALUES (
  'clpatent003',
  '10-2023-0012467',
  '30-0026783',
  '샘플 특허 3',
  '주경애',
  '노종섭',
  '2008-05-23'::timestamp,
  NULL,
  '2008-05-23'::timestamp,
  '2009-05-23'::timestamp,
  'PCT/KR2022/014524',
  '등록',
  'USER_ID_PLACEHOLDER',
  NOW(),
  NOW()
);