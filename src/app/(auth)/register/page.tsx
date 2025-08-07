"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import axios from "axios"

export default function Register() {
  const [formData, setFormData] = useState({
    name: "",
    patentNumber: "",
    email: "",
    password: "",
    confirmPassword: "",
    userType: "",
    manager: "",
    inventor: "",
    contact: "",
    termsAgreed: false,
    privacyAgreed: false,
    emailAgreed: false
  })
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value
    })
  }

  const getUserTypeLabel = (type: string) => {
    switch(type) {
      case "1": return "법인"
      case "2": return "개인" 
      case "3": return "법인+발명자"
      default: return ""
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")

    if (formData.password !== formData.confirmPassword) {
      setError("비밀번호가 일치하지 않습니다")
      return
    }

    if (formData.password.length < 6) {
      setError("비밀번호는 최소 6자리 이상이어야 합니다")
      return
    }

    if (!formData.userType) {
      setError("사용자 구분을 선택해주세요")
      return
    }

    if (!formData.termsAgreed) {
      setError("이용약관에 동의해주세요")
      return
    }

    if (!formData.privacyAgreed) {
      setError("개인정보 처리방침에 동의해주세요")
      return
    }

    // 특허번호 형식 검증 (12자리 숫자)
    if (!/^\d{12}$/.test(formData.patentNumber)) {
      setError("특허번호는 12자리 숫자여야 합니다 (예: 920090000421)")
      return
    }

    setLoading(true)

    try {
      await axios.post("/api/auth/register", {
        name: formData.name,
        patentNumber: formData.patentNumber,
        email: formData.email,
        password: formData.password,
        userType: formData.userType,
        manager: formData.manager,
        inventor: formData.inventor,
        contact: formData.contact,
        termsAgreed: formData.termsAgreed,
        privacyAgreed: formData.privacyAgreed,
        emailAgreed: formData.emailAgreed
      })

      router.push("/login?message=회원가입이 완료되었습니다")
    } catch (error: any) {
      if (error.response?.data?.error) {
        setError(error.response.data.error)
      } else {
        setError("오류가 발생했습니다. 다시 시도해주세요.")
      }
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-lg w-full space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            회원 가입
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            또는{" "}
            <Link
              href="/login"
              className="font-medium text-indigo-600 hover:text-indigo-500"
            >
              기존 계정으로 로그인
            </Link>
          </p>
        </div>
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="space-y-4">
            {/* 사용자(권리자)명 */}
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                사용자(권리자)명 *
              </label>
              <input
                id="name"
                name="name"
                type="text"
                required
                className="mt-1 appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                placeholder="사용자명을 입력하세요"
                value={formData.name}
                onChange={handleChange}
              />
            </div>

            {/* 특허번호 */}
            <div>
              <label htmlFor="patentNumber" className="block text-sm font-medium text-gray-700">
                특허번호 (12자리) *
              </label>
              <input
                id="patentNumber"
                name="patentNumber"
                type="text"
                required
                maxLength={12}
                className="mt-1 appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                placeholder="920090000421"
                value={formData.patentNumber}
                onChange={handleChange}
              />
            </div>

            {/* 이메일 주소 */}
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                이메일 주소 *
              </label>
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                required
                className="mt-1 appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                placeholder="example@email.com"
                value={formData.email}
                onChange={handleChange}
              />
            </div>

            {/* 비밀번호 */}
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                비밀번호 *
              </label>
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="new-password"
                required
                className="mt-1 appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                placeholder="비밀번호를 입력하세요 (최소 6자리)"
                value={formData.password}
                onChange={handleChange}
              />
            </div>

            {/* 비밀번호 확인 */}
            <div>
              <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">
                비밀번호 확인 *
              </label>
              <input
                id="confirmPassword"
                name="confirmPassword"
                type="password"
                required
                className="mt-1 appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                placeholder="비밀번호를 다시 입력하세요"
                value={formData.confirmPassword}
                onChange={handleChange}
              />
            </div>

            {/* 사용자 구분 */}
            <div>
              <label htmlFor="userType" className="block text-sm font-medium text-gray-700">
                사용자 구분 * {formData.userType && <span className="text-indigo-600">({getUserTypeLabel(formData.userType)})</span>}
              </label>
              <select
                id="userType"
                name="userType"
                required
                className="mt-1 block w-full px-3 py-2 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                value={formData.userType}
                onChange={handleChange}
              >
                <option value="">사용자 구분을 선택하세요</option>
                <option value="1">법인</option>
                <option value="2">개인</option>
                <option value="3">법인+발명자</option>
              </select>
            </div>

            {/* 담당자 */}
            <div>
              <label htmlFor="manager" className="block text-sm font-medium text-gray-700">
                담당자
              </label>
              <input
                id="manager"
                name="manager"
                type="text"
                className="mt-1 appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                placeholder="담당자명을 입력하세요 (선택사항)"
                value={formData.manager}
                onChange={handleChange}
              />
            </div>

            {/* 발명자 */}
            <div>
              <label htmlFor="inventor" className="block text-sm font-medium text-gray-700">
                발명자
              </label>
              <input
                id="inventor"
                name="inventor"
                type="text"
                className="mt-1 appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                placeholder="발명자명을 입력하세요 (선택사항)"
                value={formData.inventor}
                onChange={handleChange}
              />
            </div>

            {/* 연락처 */}
            <div>
              <label htmlFor="contact" className="block text-sm font-medium text-gray-700">
                연락처
              </label>
              <input
                id="contact"
                name="contact"
                type="text"
                className="mt-1 appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                placeholder="연락처를 입력하세요 (선택사항)"
                value={formData.contact}
                onChange={handleChange}
              />
            </div>

            {/* 약관 동의 */}
            <div className="space-y-3 pt-4 border-t border-gray-200">
              <div className="flex items-start">
                <input
                  id="termsAgreed"
                  name="termsAgreed"
                  type="checkbox"
                  className="mt-1 h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                  checked={formData.termsAgreed}
                  onChange={handleChange}
                />
                <label htmlFor="termsAgreed" className="ml-2 block text-sm text-gray-700">
                  <span className="text-red-500">*</span> 이용약관에 동의합니다
                </label>
              </div>

              <div className="flex items-start">
                <input
                  id="privacyAgreed"
                  name="privacyAgreed"
                  type="checkbox"
                  className="mt-1 h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                  checked={formData.privacyAgreed}
                  onChange={handleChange}
                />
                <label htmlFor="privacyAgreed" className="ml-2 block text-sm text-gray-700">
                  <span className="text-red-500">*</span> 개인정보 처리방침에 동의합니다
                </label>
              </div>

              <div className="flex items-start">
                <input
                  id="emailAgreed"
                  name="emailAgreed"
                  type="checkbox"
                  className="mt-1 h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                  checked={formData.emailAgreed}
                  onChange={handleChange}
                />
                <label htmlFor="emailAgreed" className="ml-2 block text-sm text-gray-700">
                  이메일 수신에 동의합니다 (선택사항)
                </label>
              </div>
            </div>
          </div>

          {error && (
            <div className="text-red-600 text-sm text-center bg-red-50 p-3 rounded-md">{error}</div>
          )}

          <div>
            <button
              type="submit"
              disabled={loading}
              className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50"
            >
              {loading ? "회원가입 중..." : "회원 가입"}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}