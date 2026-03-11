import MainExam from '@/assets/images/main-exam.png'
import MainQna from '@/assets/images/main-qna.png'
import MainCommunity from '@/assets/images/main-community.png'

export type TabType = '쪽지시험' | '질의응답' | '커뮤니티'

type TabContent = {
  title: [string, string]
  image: string
  alt: string
}

type TabContents = {
  쪽지시험: TabContent
  질의응답: TabContent
  커뮤니티: TabContent
}

export const TAB_LIST: TabType[] = ['쪽지시험', '질의응답', '커뮤니티']

export const TAB_CONTENTS: TabContents = {
  쪽지시험: {
    title: ['쪽지시험으로', '실력을 차곡차곡 쌓아보세요'],
    image: MainExam,
    alt: '쪽지시험 서비스 화면 예시',
  },
  질의응답: {
    title: ['질문하고 배우고', '동료 수강생과 함께 성장해요'],
    image: MainQna,
    alt: '질의응답 서비스 화면 예시',
  },
  커뮤니티: {
    title: ['정보 공유부터 팀원 모집까지', '커뮤니티에서 함께 해결해요'],
    image: MainCommunity,
    alt: '커뮤니티 서비스 화면 예시',
  },
}
