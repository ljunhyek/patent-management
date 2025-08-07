const { PrismaClient } = require('@prisma/client')

const prisma = new PrismaClient()

async function insertSamplePatents() {
  try {
    // ljunhyek@naver.com 사용자 찾기
    const user = await prisma.user.findUnique({
      where: { email: 'ljunhyek@naver.com' }
    })

    if (!user) {
      console.log('사용자를 찾을 수 없습니다: ljunhyek@naver.com')
      console.log('먼저 해당 이메일로 회원가입을 해주세요.')
      return
    }

    console.log('사용자 찾음:', user.name, '(', user.email, ')')

    // 기존 특허 데이터 삭제 (선택사항)
    await prisma.patent.deleteMany({
      where: { userId: user.id }
    })
    console.log('기존 특허 데이터 삭제 완료')

    // 샘플 특허 데이터 삽입
    const patents = [
      {
        applicationNo: '10-2021-0012467',
        registrationNo: '10-0026783',
        title: '인공지능 기반 특허 관리 시스템',
        applicant: '주경애',
        inventor: '노종섭',
        applicationDate: new Date('2006-05-23'),
        registrationDate: new Date('2006-05-23'),
        pctDeadline: new Date('2007-05-23'),
        pctNumber: 'PCT/KR2022/014524',
        status: '등록',
        userId: user.id
      },
      {
        applicationNo: '10-2022-0012467',
        registrationNo: '20-0026783',
        title: '블록체인 기반 지식재산권 보호 방법',
        applicant: '주경애',
        inventor: '노종섭',
        applicationDate: new Date('2007-05-23'),
        registrationDate: new Date('2007-05-23'),
        pctDeadline: new Date('2008-05-23'),
        pctNumber: 'PCT/KR2022/014524',
        status: '등록',
        userId: user.id
      },
      {
        applicationNo: '10-2023-0012467',
        registrationNo: '30-0026783',
        title: 'IoT 기반 스마트 특허 모니터링 장치',
        applicant: '주경애',
        inventor: '노종섭',
        applicationDate: new Date('2008-05-23'),
        registrationDate: new Date('2008-05-23'),
        pctDeadline: new Date('2009-05-23'),
        pctNumber: 'PCT/KR2022/014524',
        status: '등록',
        userId: user.id
      }
    ]

    // 특허 데이터 일괄 삽입
    for (const patentData of patents) {
      const patent = await prisma.patent.create({
        data: patentData
      })
      console.log('특허 생성 완료:', patent.applicationNo, '-', patent.title)
    }

    console.log('\n샘플 데이터 삽입 완료!')
    console.log('총', patents.length, '개의 특허가 생성되었습니다.')

  } catch (error) {
    console.error('오류 발생:', error)
  } finally {
    await prisma.$disconnect()
  }
}

// 스크립트 실행
insertSamplePatents()