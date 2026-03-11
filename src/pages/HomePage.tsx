import { useState } from 'react'
import MainBanner from '@/assets/images/main-banner.png'
import {
  type TabType,
  TAB_LIST,
  TAB_CONTENTS,
} from '@/constants/mainTabContents'
import { cn } from '@/lib/utils'

function HomePage() {
  const [tab, setTab] = useState<TabType>('쪽지시험')
  const currentContent = TAB_CONTENTS[tab]

  return (
    <main>
      <section
        aria-labelledby="hero-title"
        className="flex flex-col items-center bg-[#FAFAFB] pt-42 pb-41"
      >
        <h1
          id="hero-title"
          className="text-ui-gray-primary text-center text-[48px] leading-[150%] font-bold tracking-[-0.03em]"
        >
          {currentContent.title[0]}
          <br />
          {currentContent.title[1]}
        </h1>

        <nav
          aria-label="서비스 카테고리"
          className="border-grey-7 bg-grey-1 mt-14 mb-[34px] flex h-[78px] w-[469px] items-center justify-center rounded-[99px] border"
        >
          <ul className="text-grey-9 flex w-full justify-center gap-2 p-3 text-center text-[20px] font-bold">
            {TAB_LIST.map((item) => (
              <li key={item}>
                <button
                  type="button"
                  onClick={() => setTab(item)}
                  className={cn(
                    `flex h-[54px] w-[143px] items-center justify-center rounded-[40px] ${
                      tab === item
                        ? 'bg-btn-fill-default text-grey-1'
                        : 'text-grey-9'
                    }`
                  )}
                >
                  {item}
                </button>
              </li>
            ))}
          </ul>
        </nav>

        <div>
          <img
            src={currentContent.image}
            alt={currentContent.alt}
            className="w-300"
          />
        </div>
      </section>

      <section aria-labelledby="feedback-title" className="px-90 py-35">
        <div className="flex items-center justify-center">
          <img src={MainBanner} alt="서비스 소개 배너" className="w-300" />
        </div>
      </section>
    </main>
  )
}

export default HomePage
