import kakaoIcon from '@/assets/icons/kakao-btn.svg'
import naverIcon from '@/assets/icons/naver.svg'
import Button from '@/components/ui/button'
import { cn } from '@/lib/utils'

type Provider = 'kakao' | 'naver'

type SocialLoginButtonProps = {
  provider: Provider
  onClick?: () => void
}

const SOCIAL_CONFIG = {
  kakao: {
    label: '카카오 간편 로그인 / 가입',
    bg: 'bg-[#FEE500] hover:bg-[#FEE500] active:bg-[#FEE500]',
    textColor: 'text-[#391C1A]',
    icon: kakaoIcon,
  },
  naver: {
    label: '네이버 간편 로그인 / 가입',
    bg: 'bg-[#03C75A] hover:bg-[#03C75A] active:bg-[#03C75A]',
    textColor: 'text-white',
    icon: naverIcon,
  },
} as const

const SocialLoginButton = ({ provider, onClick }: SocialLoginButtonProps) => {
  const { label, bg, textColor, icon } = SOCIAL_CONFIG[provider]

  return (
    <Button
      type="button"
      onClick={onClick}
      className={cn('h-[52px] w-full rounded-[4px] p-[8px]', bg, textColor)}
    >
      <span className="flex items-center gap-[4px]">
        <span className="flex h-[20px] w-[20px] items-center justify-center">
          <img
            src={icon}
            alt=""
            aria-hidden="true"
            className="block h-auto w-[13px] flex-shrink-0"
          />
        </span>

        <span className="text-[16px] leading-[19px] tracking-[-0.02em]">
          {label}
        </span>
      </span>
    </Button>
  )
}

export default SocialLoginButton
