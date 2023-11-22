/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  compiler: (() => {
    let compilerConfig = {
      // styledComponents 활성화
      styledComponents: true,
    }

    if (process.env.NODE_ENV === 'production') {
      compilerConfig = {
        ...compilerConfig,
        // 프러덕션 환경에서는 React Testing Library에서 사용하는 data-testid 속성을 삭제
        reactRemoveProperties: { properties: ['^data-testid$'] },
      }
    }

    return compilerConfig
  })(),
  async rewrites() {
    return [
      {
        // ex. /api/proxy
        source: `${process.env.NEXT_PUBLIC_API_BASE_PATH}/:match*`,
        // ex. http://localhost:8000
        destination: `${process.env.API_BASE_URL}/:match*`,
      },
    ]
  },
  webpack: (config) => {
    config.module.rules.push({
      test: /\.svg$/,
      use: ['@svgr/webpack'],
    })
    return config
  },
}

module.exports = nextConfig

// svg 파일을 React 컴포넌트로 변환하기 위한 설정을 추가하는 부분
// @svgr/webpack 라이브러리를 사용하여 svg 파일을 React 컴포넌트로 변환한다.
module.exports = {
  webpack: (config) => {
    config.module.rules.push({
      test: /\.svg$/,
      use: ['@svgr/webpack'],
    })
    return config
  },
}
