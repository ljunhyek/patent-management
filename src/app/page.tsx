import Link from "next/link"
import Image from "next/image"

export default function Home() {
  return (
    <div className="min-h-screen bg-[#f9fafb]">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 bg-white shadow-sm z-50">
        <nav className="max-w-[1200px] mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center">
            <div className="text-[#54B435] font-bold text-xl">특허청</div>
          </div>
          <div className="hidden md:flex items-center space-x-8">
            <a href="#" className="text-[#2F3B40] hover:text-[#54B435] font-medium">Real Time IP</a>
            <a href="#" className="text-[#2F3B40] hover:text-[#54B435] font-medium">특허검색-AI분석</a>
            <a href="#" className="text-[#2F3B40] hover:text-[#54B435] font-medium">등록특허</a>
            <a href="#" className="text-[#2F3B40] hover:text-[#54B435] font-medium">AI검색</a>
            <a href="#" className="text-[#2F3B40] hover:text-[#54B435] font-medium">출원공개</a>
            <a href="#" className="text-[#2F3B40] hover:text-[#54B435] font-medium">Contact</a>
          </div>
        </nav>
      </header>

      {/* Hero Section */}
      <section 
        className="relative pt-20 pb-16 min-h-[500px] flex items-center justify-center"
        style={{
          backgroundImage: 'url(/hero-background-tech.jpg)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat'
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-blue-900/70 to-gray-900/50"></div>
        <div className="relative z-10 text-center text-white max-w-4xl mx-auto px-4">
          <h1 className="text-4xl md:text-5xl font-bold mb-6" style={{ fontFamily: "'Noto Sans KR', sans-serif" }}>
            내 특허의 모든 것<br />
            유니코에서 실시간으로 확인 간편하게
          </h1>
          <p className="text-lg md:text-xl mb-8 opacity-90">
            특허검색부터 AI분석까지 한번에! 내 특허 관리가 간편해집니다.
          </p>
          <button className="bg-[#54B435] hover:bg-[#469b2d] text-white px-8 py-3 rounded-md text-lg font-medium transition-all duration-300 transform hover:-translate-y-1">
            지금시작
          </button>
        </div>
      </section>

      {/* Main Content */}
      <main className="max-w-[1200px] mx-auto px-4 py-16">
        {/* Features Section */}
        <section className="text-center mb-16">
          <h2 className="text-2xl font-bold text-[#2F3B40] mb-4" style={{ fontFamily: "'Noto Sans KR', sans-serif" }}>
            내 특허 실시간 확인을 위한 워크플로
          </h2>
          <p className="text-[#2F3B40] mb-12">
            특허검색 A부터 실시간으로 경쟁사를 분석하는 업무의 변화를 한눈에 보여드립니다.
          </p>
          
          <div className="bg-white rounded-lg shadow-lg p-8 mb-12">
            <div className="relative">
              <Image
                src="/main.png"
                alt="Patent Management Dashboard"
                width={800}
                height={500}
                className="mx-auto rounded-lg"
              />
              <div className="absolute top-4 right-4 bg-[#54B435] text-white px-3 py-1 rounded text-sm font-medium">
                Excel
              </div>
            </div>
          </div>
        </section>

        {/* Features List */}
        <section className="grid md:grid-cols-2 gap-12 items-center mb-16">
          <div>
            <Image
              src="/main.png"
              alt="Patent Analysis Tool"
              width={500}
              height={400}
              className="rounded-lg shadow-lg"
            />
          </div>
          <div className="space-y-6">
            <h3 className="text-xl font-bold text-[#2F3B40]" style={{ fontFamily: "'Noto Sans KR', sans-serif" }}>
              모든 특허 업무를 한 눈에 볼 수 있어요
            </h3>
            <div className="space-y-4">
              <div className="flex items-start space-x-3">
                <div className="w-6 h-6 bg-[#54B435] rounded-full flex items-center justify-center text-white text-sm">1</div>
                <div>
                  <h4 className="font-medium text-[#2F3B40]">실시간으로 등록특허와 출원공개의 정보를 취득합니다.</h4>
                  <p className="text-sm text-gray-600">특허청으로 등록되거나 공개되는 정보를 실시간으로 업데이트합니다.</p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <div className="w-6 h-6 bg-[#54B435] rounded-full flex items-center justify-center text-white text-sm">2</div>
                <div>
                  <h4 className="font-medium text-[#2F3B40]">관심기술키워드와 경쟁사의 출원동향과 특허기술동향을</h4>
                  <p className="text-sm text-gray-600">실시간으로 업데이트 할 수 있는 정보로 스크래핑 할 수 있습니다.</p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <div className="w-6 h-6 bg-[#54B435] rounded-full flex items-center justify-center text-white text-sm">3</div>
                <div>
                  <h4 className="font-medium text-[#2F3B40]">특허분석을 위한 검색결과에 경쟁사 동향 분석 비교 구성</h4>
                  <p className="text-sm text-gray-600">기술 발전과 신특허등의 경쟁상황을 분석할 수 있습니다.</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Contact Section */}
        <section className="bg-white rounded-lg shadow-lg p-8">
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-xl font-bold text-[#2F3B40] mb-4" style={{ fontFamily: "'Noto Sans KR', sans-serif" }}>
                서비스 출시전 자료 등록 및 테스트 특허사무소 모집중입니다.
              </h3>
              <div className="space-y-3 text-sm text-[#2F3B40]">
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-[#54B435] rounded-full"></div>
                  <span>특허법 검색결과에 대한 심층분석 기능을 탑재합니다.</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-[#54B435] rounded-full"></div>
                  <span>특허검색 분야별 심층분석 기능 탑재합니다.</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-[#54B435] rounded-full"></div>
                  <span>등록특허 분야별 심층 전용 분류체계 분류진행 특허자동</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-[#54B435] rounded-full"></div>
                  <span>모집상황과 심층 특허 출원 내용을 특허사무소와 IP</span>
                </div>
              </div>
            </div>
            <div className="space-y-4">
              <div className="bg-[#f9fafb] p-4 rounded text-sm">
                <div className="mb-2 font-bold text-[#54B435]">특허청</div>
                <div className="space-y-1 text-[#2F3B40]">
                  <div>Patent Office System Korea</div>
                  <div>운영자를 위한 자료</div>
                  <div>대한민국 특허청과는 직접적인 관계가 없습니다</div>
                  <div>더 많은 정보를 알고 싶으시다면 문의해주시기 바랍니다</div>
                </div>
              </div>
              <button className="bg-[#54B435] hover:bg-[#469b2d] text-white px-6 py-2 rounded font-medium transition-colors">
                지금시작
              </button>
            </div>
          </div>
        </section>
      </main>
    </div>
  )
}
