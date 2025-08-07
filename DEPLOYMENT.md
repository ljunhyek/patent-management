# Vercel 배포 가이드

## 배포 전 체크리스트

### 1. GitHub Repository 준비
- [ ] 코드가 GitHub에 push되어 있는지 확인
- [ ] `.env` 파일이 `.gitignore`에 포함되어 있는지 확인

### 2. Vercel 프로젝트 설정
- [ ] Vercel에서 GitHub repository와 연결
- [ ] Framework Preset이 Next.js로 설정되어 있는지 확인

### 3. 환경변수 설정 (Vercel Dashboard > Settings > Environment Variables)

#### Production Environment:
```
DATABASE_URL = your_postgresql_production_url
NEXTAUTH_SECRET = your_production_secret (openssl rand -base64 32로 생성)
NEXTAUTH_URL = https://your-app-name.vercel.app
```

#### Preview Environment:
```
DATABASE_URL = your_postgresql_production_url (또는 별도 preview DB)
NEXTAUTH_SECRET = your_production_secret
NEXTAUTH_URL = https://your-app-name-git-main-yourusername.vercel.app
```

### 4. 데이터베이스 마이그레이션
배포 후 Vercel 대시보드의 Functions 탭에서 아래 명령어 실행:
```bash
npx prisma migrate deploy
```

### 5. 배포 후 확인사항
- [ ] 홈페이지 로드 확인
- [ ] 로그인 기능 테스트
- [ ] 데이터베이스 연결 확인
- [ ] API 엔드포인트 동작 확인

## 문제 해결

### 빌드 에러 발생 시
1. Vercel 대시보드의 "Functions" 탭에서 로그 확인
2. Prisma 관련 에러: `prisma generate` 명령어가 build script에 포함되어 있는지 확인
3. 환경변수 에러: Vercel 환경변수가 올바르게 설정되어 있는지 확인

### 데이터베이스 연결 에러
1. DATABASE_URL이 올바른지 확인
2. Supabase의 경우 Connection pooling 설정 확인
3. 데이터베이스 방화벽 설정에서 Vercel IP가 허용되어 있는지 확인

### NextAuth 에러
1. NEXTAUTH_URL이 실제 배포된 도메인과 일치하는지 확인
2. NEXTAUTH_SECRET이 설정되어 있는지 확인
3. 각 환경별로 올바른 URL이 설정되어 있는지 확인

## 추가 최적화
- Vercel의 Edge Functions 활용
- 이미지 최적화 설정
- 정적 파일 캐싱 설정