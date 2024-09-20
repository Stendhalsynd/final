'use client'

import React from 'react'
import { useForm } from 'react-hook-form'
import { useSetRecoilState } from 'recoil'
import Icon from 'components/atoms/Icon/index.tsx'
import Text from 'components/atoms/Text'
import Flex from 'components/layout/Flex'
import SelectButton from 'components/molecules/Button/SelectButton.tsx'
import Input from 'components/molecules/Input/index.tsx'
import {
  companyInputState,
  modalState,
  skillInputState,
  skillModalState,
} from 'utils/state.ts'

export type SearchInputVariant =
  | 'primarySmall'
  | 'primaryLarge'
  | 'skillSmall'
  | 'skillLarge'

type SearchInputProps = {
  variant: SearchInputVariant
}

const PrimarySmallSearchInput = () => {
  const { register, handleSubmit } = useForm()

  const setModalOpenState = useSetRecoilState(modalState)

  const handleOpenModal = () => {
    setModalOpenState(true)
  }

  const setCompanySearchInput = useSetRecoilState(companyInputState)

  const onSubmit = (data: any) => {
    setCompanySearchInput(data['SearchInput/company'])
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Flex flexDirection={'column'} alignItems={'center'}>
        <Flex
          flexDirection={'row'}
          backgroundColor={'white'}
          borderRadius={'50px'}
          padding={'10px 16px'}
          justifyContent={'space-between'}
          width={'80vw'}
        >
          <Flex>
            <Icon iconName="search" width={25} height={25} />
            <Input
              type="text"
              placeholder="회사 검색"
              {...register('SearchInput/company')}
            />
          </Flex>

          <Flex gap={'10px'}>
            <Icon
              iconName="filter"
              width={40}
              height={40}
              onClick={handleOpenModal}
            />
            <SelectButton
              variant="dark"
              width={'130px'}
              height={'45px'}
              padding={'0px'}
              type="submit"
            >
              검색
            </SelectButton>
          </Flex>
        </Flex>
      </Flex>
    </form>
  )
}

const PrimaryLargeSearchInput = () => {
  const { register, handleSubmit } = useForm()

  const setCompanySearchInput = useSetRecoilState(companyInputState)

  const onSubmit = (data: any) => {
    setCompanySearchInput(data['SearchInput/company'])
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Flex
        flexDirection={'row'}
        borderBottom={'1px solid white'}
        padding={'10px 16px'}
        width={'100%'}
      >
        <Icon iconName="search" width={25} height={25} />
        <Input
          type="text"
          placeholder="회사를 검색해보세요"
          {...register('SearchInput/company')}
        />
        <SelectButton
          variant="dark"
          width={'130px'}
          height={'45px'}
          type="submit"
        >
          검색
        </SelectButton>
      </Flex>
    </form>
  )
}

const SkillSmallSearchInput = () => {
  const { register, handleSubmit } = useForm({ mode: 'onBlur' })

  const setSkillSearchInput = useSetRecoilState(skillModalState)

  const onSubmit = (data: any) => {
    setSkillSearchInput(data['SearchInput/skill'])
    console.log(data)
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Flex
        flexDirection={'row'}
        width={'100%'}
        borderBottom={'1px solid black'}
        paddingBottom={'6px'}
        alignItems={'center'}
      >
        <Text fontSize={'extraSmall'} color={'black'}>
          기술 스택
        </Text>
        <Flex marginLeft={'15px'}>
          <Input
            color={'gray'}
            placeholder="직무 스킬을 검색해보세요"
            {...register('SearchInput/skill')}
          ></Input>
        </Flex>
      </Flex>
    </form>
  )
}

const SkillLargeSearchInput = () => {
  const { register, handleSubmit } = useForm()

  const setSkillSearchInput = useSetRecoilState(skillInputState)

  const onSubmit = (data: any) => {
    setSkillSearchInput(data['SearchInput/skill'])
    // console.log(data)
  }
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Flex
        flexDirection={'row'}
        width={'80vw'}
        alignItems={'center'}
        maxWidth={'fit-content'}
      >
        <Icon iconName="desktop" width={24} height={24} />
        <Text fontSize={'extraSmall'} color={'darkGray'} marginLeft={'10px'}>
          기술 스택
        </Text>
        <Flex padding={'4px 0'} marginLeft={'20px'} paddingRight={'33px'}>
          <Input
            color={'gray'}
            placeholder="직무 스킬을 검색해보세요"
            {...register('SearchInput/skill')}
          ></Input>
        </Flex>
      </Flex>
    </form>
  )
}

/**
 * 검색 입력
 * TODO: 반응형을 각 컴포넌트별 어떻게 적용할 수 있을지 찾아야한다.
 * @description 검색할 내용을 입력할 때 쓰이는 컴포넌트
 * @example <SearchInput variant={'primarySmall'} />
      <SearchInput variant={'primaryLarge'} />
      <SearchInput variant={'skillSmall'} />
      <SearchInput variant={'skillLarge'} />
 */
const SearchInput = ({ variant }: SearchInputProps) => {
  switch (variant) {
    case 'primarySmall':
      return <PrimarySmallSearchInput />
    case 'primaryLarge':
      return <PrimaryLargeSearchInput />
    case 'skillSmall':
      return <SkillSmallSearchInput />
    case 'skillLarge':
      return <SkillLargeSearchInput />
    default:
      return null
  }
}

export default SearchInput
