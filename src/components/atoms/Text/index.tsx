'use client'

/* eslint-disable prettier/prettier */
import styled from 'styled-components'
import type { Responsive } from 'types/styles'
import {
  toPropValue,
  Color,
  FontSize,
  LetterSpacing,
  LineHeight,
} from 'utils/styles'

// 텍스트 변형
export type TextVariant =
  | 'xxSmall'
  | 'xSmall'
  | 'extraSmall'
  | 'small'
  | 'medium'
  | 'mediumLarge'
  | 'large'
  | 'xxSmallBold'
  | 'xSmallBold'
  | 'extraSmallBold'
  | 'smallBold'
  | 'mediumBold'
  | 'mediumLargeBold'
  | 'largeBold'
  | 'extraLargeBold'

export type TextProps = {
  /**
   * @description
   * xxSmall : 12 / xSmall : 14 / extraSmall : 16 / small : 20 / medium : 24 / mediumLarge : 32 / large : 40
   * @description
   * 뒤에 Bold 를 붙이면 fontWeight : 700, 없으면 fontWeight : 500
   */
  variant?: TextVariant
  /** xxSmall : 12 / xSmall : 14 / extraSmall : 16 / small : 20 / medium : 24 / mediumLarge : 32 / large : 40 */
  fontSize?: Responsive<FontSize>
  fontWeight?: Responsive<string>
  fontFamily?: String
  letterSpacing?: Responsive<LetterSpacing>
  lineHeight?: Responsive<LineHeight>
  textAlign?: Responsive<string>
  color?: Responsive<Color>
  textShadow?: Responsive<string>
  backgroundColor?: Responsive<Color>
  width?: Responsive<string>
  height?: Responsive<string>
  minWidth?: Responsive<string>
  minHeight?: Responsive<string>
  display?: Responsive<string>
  border?: Responsive<string>
  overflow?: Responsive<string>
  margin?: Responsive<string>
  marginTop?: Responsive<string>
  marginRight?: Responsive<string>
  marginBottom?: Responsive<string>
  marginLeft?: Responsive<string>
  padding?: Responsive<string>
  paddingTop?: Responsive<string>
  paddingRight?: Responsive<string>
  paddingBottom?: Responsive<string>
  paddingLeft?: Responsive<string>
}

const variants = {
  xxSmall: {
    fontSize: 'xxSmall',
    fontWeight: '500',
    letterSpacing: 0,
    lineHeight: 0,
  },
  xSmall: {
    fontSize: 'xSmall',
    fontWeight: '500',
    letterSpacing: 0,
    lineHeight: 0,
  },
  extraSmall: {
    fontSize: 'extraSmall',
    fontWeight: '500',
    letterSpacing: 0,
    lineHeight: 0,
  },
  small: {
    fontSize: 'small',
    fontWeight: '500',
    letterSpacing: 1,
    lineHeight: 1,
  },
  medium: {
    fontSize: 'medium',
    fontWeight: '500',
    letterSpacing: 2,
    lineHeight: 2,
  },
  mediumLarge: {
    fontSize: 'mediumLarge',
    fontWeight: '500',
    letterSpacing: 3,
    lineHeight: 3,
  },
  large: {
    fontSize: 'large',
    fontWeight: '500',
    letterSpacing: 4,
    lineHeight: 4,
  },
  extraLarge: {
    fontSize: 'extraLarge',
    fontWeight: '500',
    letterSpacing: 5,
    lineHeight: 5,
  },

  xxSmallBold: {
    fontSize: 'xxSmall',
    fontWeight: '700',
    letterSpacing: 0,
    lineHeight: 0,
  },
  xSmallBold: {
    fontSize: 'xSmall',
    fontWeight: '700',
    letterSpacing: 0,
    lineHeight: 0,
  },
  extraSmallBold: {
    fontSize: 'extraSmall',
    fontWeight: '700',
    letterSpacing: 0,
    lineHeight: 0,
  },
  smallBold: {
    fontSize: 'small',
    fontWeight: '700',
    letterSpacing: 1,
    lineHeight: 1,
  },
  mediumBold: {
    fontSize: 'medium',
    fontWeight: '700',
    letterSpacing: 2,
    lineHeight: 2,
  },
  mediumLargeBold: {
    fontSize: 'mediumLarge',
    fontWeight: '700',
    letterSpacing: 3,
    lineHeight: 3,
  },
  largeBold: {
    fontSize: 'large',
    fontWeight: '700',
    letterSpacing: 4,
    lineHeight: 4,
  },
  extraLargeBold: {
    fontSize: 'extraLarge',
    fontWeight: '700',
    letterSpacing: 5,
    lineHeight: 5,
  },
}

/**
 * 텍스트
 * 변형, 색상, 타이포그래피, 레이아웃, 스페이스 관련 Props 추가
 * @description fontSize, letterSpacing, lineHeight 의 경우만 variant 로 한번에 설정 가능. 반응형은 base, sm, md 세종류. 폰트체 설정해두었으니 아래 예시처럼 className 으로 적용할 수 있습니다.
 * @example
 * import { notable, notoSansKr } from 'styles/fonts/ts'
 *
 * <Text className={notoSansKr.className} variant="small" fontSize={{base: 'small', md: 'large'}} >notoSans 예시</Text >
 * <Text className={notable.className} variant="small" fontSize={{base: 'small', md: 'large'}} >notable 예시</Text >
 *
 * TODO: font family 를 포함하여 variant 별 속성이 적용되도록 해야한다.
 */
const Text = styled.span<TextProps>`
  ${({ variant, fontSize, fontWeight, letterSpacing, lineHeight, theme }) => {
    // 변형 스타일에 적용
    if (variant && variants[variant]) {
      const styles = []
      !fontSize &&
        styles.push(toPropValue('font-size', variants[variant].fontSize, theme))
      !letterSpacing &&
        styles.push(
          toPropValue('letter-spacing', variants[variant].letterSpacing, theme),
        )
      !lineHeight &&
        styles.push(
          toPropValue('line-height', variants[variant].lineHeight, theme),
        )
      !fontWeight &&
        styles.push(
          toPropValue('font-weight', variants[variant].fontWeight, theme),
        )
      return styles.join('\n')
    }
  }}
  ${(props) => toPropValue('font-size', props.fontSize, props.theme)}
  ${(props) => toPropValue('font-weight', props.fontWeight, props.theme)}
  ${(props) => toPropValue('letter-spacing', props.letterSpacing, props.theme)}
  ${(props) => toPropValue('line-height', props.lineHeight, props.theme)}
  ${(props) => toPropValue('text-align', props.textAlign, props.theme)}
  ${(props) => toPropValue('text-shadow', props.textShadow, props.theme)}
  ${(props) => {
    return toPropValue('color', props.color, props.theme)
  }}
  ${(props) =>
    toPropValue('background-color', props.backgroundColor, props.theme)}
  ${(props) => toPropValue('width', props.width, props.theme)}
  ${(props) => toPropValue('height', props.height, props.theme)}
  ${(props) => toPropValue('min-width', props.minWidth, props.theme)}
  ${(props) => toPropValue('min-height', props.minHeight, props.theme)}
  ${(props) => toPropValue('display', props.display, props.theme)}
  ${(props) => toPropValue('border', props.border, props.theme)}
  ${(props) => toPropValue('overflow', props.overflow, props.theme)}
  ${(props) => toPropValue('margin', props.margin, props.theme)}
  ${(props) => toPropValue('margin-top', props.marginTop, props.theme)}
  ${(props) => toPropValue('margin-left', props.marginLeft, props.theme)}
  ${(props) => toPropValue('margin-bottom', props.marginBottom, props.theme)}
  ${(props) => toPropValue('margin-right', props.marginRight, props.theme)}
  ${(props) => toPropValue('padding', props.padding, props.theme)}
  ${(props) => toPropValue('padding-top', props.paddingTop, props.theme)}
  ${(props) => toPropValue('padding-left', props.paddingLeft, props.theme)}
  ${(props) => toPropValue('padding-bottom', props.paddingBottom, props.theme)}
  ${(props) => toPropValue('padding-right', props.paddingRight, props.theme)}
`

Text.defaultProps = {
  variant: 'medium',
  color: 'black',
}

export default Text
