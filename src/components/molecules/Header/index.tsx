'use client'

import axios from 'axios'
import { useEffect, useState } from 'react'
import { Icon, Logo, Text } from 'components/atoms/index.ts'
import { Flex } from 'components/layout/index.ts'
import SideMenu from 'components/molecules/SideMenu/index.tsx'
import { successAlert, warningAlert } from 'lib/sweetAlert.tsx'

/**
 * 헤더
 * @description
 * 헤더 내 로고, 텍스트, 아이콘 컴포넌트들 가운데 정렬
 * 반응형 웹 적용: viewport가 모바일 사이즈인 경우, 텍스트 컴포넌트 display: none / 901px부터 텍스트 컴포넌트 display: flex
 * @example <Header />
 */
const Header = () => {
  const [isHovered, setHovered] = useState(false)
  const [menuName, setMenuName] = useState('menu')
  const [roleType, setRoleType] = useState(null)
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [isSideMenuOpen, setIsSideMenuOpen] = useState(false)
  const [menuClicked, setMenuClicked] = useState(false)

  const toggleSideMenu = () => {
    setIsSideMenuOpen(!isSideMenuOpen)
    setMenuName('menu')
    setHovered(false)
    setTimeout(
      () => {
        setMenuClicked(false)
      },
      menuClicked ? 1000 : 1200,
    )
  }

  const handleClickMenu = () => {
    setMenuName('menu')
    setMenuClicked(true)
    setTimeout(() => {
      toggleSideMenu()
    }, 1000)
  }

  const handleLogout = () => {
    localStorage.removeItem('token')
    setIsLoggedIn(false)
    successAlert('로그아웃 성공', '로그아웃이 완료되었습니다.', '확인').then(
      () => {
        window.location.href = '/'
      },
    )
  }

  const handleClickChat = (e: React.MouseEvent) => {
    if (!isLoggedIn) {
      e.preventDefault()
      warningAlert('로그인 필요', '로그인 후 이용해주세요.', '확인').then(
        () => {
          window.location.href = '/login'
        },
      )
    }
  }

  useEffect(() => {
    const apiUrl = 'https://api.career-up.live:8080/mypage'
    const token = localStorage.getItem('token')

    if (token) {
      setIsLoggedIn(true)
      const requestConfig = {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'multipart/form-data',
        },
      }

      axios
        .get(apiUrl, requestConfig)
        .then((response) => {
          setRoleType(response.data.roleType)
        })
        .catch((error) => {
          console.error(error)
        })
    }
  }, [])

  return (
    <Flex
      backgroundColor={'black'}
      justifyContent={'space-between'}
      alignItems={'center'}
      height={{ base: '40px', md: '60px' }}
      padding={'15px'}
      position={'sticky'}
      top={'0'}
      zIndex={999}
    >
      <a href="/">
        <Flex>
          <Logo width={60} />
        </Flex>
      </a>

      <Flex
        justifyContent={'space-evenly'}
        width={'400px'}
        display={{ base: 'none', md: 'flex' }}
      >
        <a href="/search">
          <Text variant="smallBold" color={'white'}>
            멘토 찾기
          </Text>
        </a>
        <a
          href={roleType === 'WORKER' ? '/workerChat' : '/seekerChat'}
          onClick={handleClickChat}
        >
          <Text variant="smallBold" color={'white'}>
            나의 채팅
          </Text>
        </a>
        {isLoggedIn ? (
          <>
            <a href={roleType === 'WORKER' ? '/workers/edit' : '/seekers/edit'}>
              <Text variant="smallBold" color={'white'}>
                마이페이지
              </Text>
            </a>
            <Text
              variant="smallBold"
              color={'white'}
              onClick={handleLogout}
              style={{ cursor: 'pointer' }}
            >
              로그아웃
            </Text>
          </>
        ) : (
          <a href="/login">
            <Text variant="smallBold" color={'white'}>
              로그인
            </Text>
          </a>
        )}
      </Flex>

      <Flex
        onMouseEnter={() => {
          setHovered(true)
          setMenuName('menu_black')
        }}
        onMouseLeave={() => {
          setHovered(false)
          setMenuName('menu')
        }}
        position={'relative'}
        justifyContent={'center'}
        alignItems={'center'}
        style={{ transition: '0.6s' }}
      >
        <div
          style={{
            position: 'absolute',
            width: `${
              isHovered && !menuClicked ? '50px' : menuClicked ? '500vw' : '0'
            }`,
            height: `${
              isHovered && !menuClicked ? '50px' : menuClicked ? '500vw' : '0'
            }`,
            borderRadius: '50%',
            backgroundColor: 'white',
            zIndex: 100,
            pointerEvents: 'none',
            transition: `${!menuClicked ? '0.6s' : '1.4s'}`,
          }}
        />
        <Flex zIndex={101}>
          <div>
            <Icon
              iconName={isSideMenuOpen ? 'close' : menuName}
              width={28}
              height={28}
              onClick={handleClickMenu}
            />
          </div>
        </Flex>

        <SideMenu
          closeMenu={toggleSideMenu}
          isLoggedIn={isLoggedIn}
          roleType={roleType}
          isSideMenuOpen={isSideMenuOpen}
        />
      </Flex>
    </Flex>
  )
}

export default Header
