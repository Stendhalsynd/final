'use client'

import { useRecoilValue } from 'recoil'
import { Icon, Text } from 'components/atoms/index.ts'
import { Flex } from 'components/layout/index.ts'
import {
  FilterModal,
  MentoSearch,
  WorkerInfoCard,
} from 'components/organisms/index.ts'
import WorkerInfoListLayout from 'components/templates/WorkerInfoListLayout/index.tsx'
import {
  companyInputState,
  modalState,
  fieldInputState,
  skillInputState,
  countDataState,
} from 'utils/state.ts'

const WorkerInfoList = () => {
  const companyInput = useRecoilValue(companyInputState)
  const skillInput = useRecoilValue(skillInputState)
  const fieldInput = useRecoilValue(fieldInputState)
  const modalOpenState = useRecoilValue(modalState)
  const countData = useRecoilValue(countDataState)
  // console.log(skillInput) -> header 버튼들 눌렀을 때 데이터 초기화되는지 확인
  return (
    <WorkerInfoListLayout>
      <Flex
        flexDirection={'column'}
        padding={'62px 35px 30px 35px'}
        width={'100vw'}
        alignItems={'center'}
      >
        <Flex
          flexDirection={'column'}
          maxWidth={{ base: '100vw', sm: '1500px' }}
          zIndex={1}
          alignItems={'center'}
        >
          {/* 상단 */}
          <Flex
            flexDirection={'column'}
            alignItems={'center'}
            gap={'25px'}
            paddingBottom={'84px'}
          >
            <Text
              fontSize={{ base: 'mediumLarge', sm: 'large' }}
              fontWeight={'700'}
              color={'white'}
            >
              멘토 찾기
            </Text>
            <Text
              fontSize={{ base: 'xSmall', sm: 'small' }}
              fontWeight={'500'}
              color={'white'}
            >
              업계 전문가들의 노하우를 확인하세요!
            </Text>
            <MentoSearch />
            {modalOpenState && (
              <Flex
                width={'100vw'}
                justifyContent={'center'}
                alignItems={'center'}
                backgroundColor={'backgroundBlur'}
                position={'fixed'}
                zIndex={5}
                top={'0'}
                left={'0'}
                bottom={'0'}
                right={'0'}
              >
                <FilterModal />
              </Flex>
            )}
          </Flex>

          {/* 하단 */}
          {/* 1개: 260px, 2개: 555px 3개: 840px, 4개: 1130px 5개: 1420px*/}

          <Flex justifyContent={'center'}>
            <Flex
              flexWrap={'wrap'}
              gap={'30px'}
              justifyItems={'flex-start'}
              width={{ base: '260px', sm: '550px', md: '840px' }}
            >
              <WorkerInfoCard
                company={companyInput}
                skill={skillInput}
                field={fieldInput}
              />
            </Flex>
          </Flex>

          {countData === 0 && (
            <Flex alignItems="center" justifyContent="center">
              <Flex
                flexDirection="column"
                alignItems="center"
                justifyContent={'center'}
                borderRadius="20px"
                backgroundColor="white"
                width={{ base: '300px', sm: '700px' }}
                height={{ base: '190px', sm: '400px' }}
                padding="20px"
                gap={'40px'}
              >
                <Icon iconName="warning" width={50}></Icon>
                <Flex flexDirection={'column'} gap={'10px'}>
                  <Text
                    textAlign="center"
                    fontSize={{ base: 'small', sm: 'medium' }}
                  >
                    입력한 재직자의 정보가
                  </Text>
                  <Text
                    textAlign="center"
                    fontSize={{ base: 'small', sm: 'medium' }}
                  >
                    존재하지 않습니다.
                  </Text>
                </Flex>
              </Flex>
            </Flex>
          )}
        </Flex>
      </Flex>
    </WorkerInfoListLayout>
  )
}

export default WorkerInfoList
