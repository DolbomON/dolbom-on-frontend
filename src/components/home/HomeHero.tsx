const heroImage = '/assets/dolbomon/home/hero-care-check.png'

export function HomeHero() {
  return (
    <section
      className="relative mt-7 min-h-[410px] flex-1 min-[390px]:mt-8 min-[390px]:min-h-[480px]"
      aria-labelledby="home-title"
    >
      <div className="relative z-10 max-w-[280px] min-[390px]:max-w-[330px]">
        <h1
          id="home-title"
          className="text-[39px] font-black leading-[1.12] min-[390px]:text-[49px]"
          aria-label="오늘의 안부를 쉽고 안전하게 기록하세요"
        >
          오늘의 안부를
          <br />
          쉽고{' '}
          <span className="text-[#0057dd]">
            안전하게
            <br />
            기록하세요
          </span>
        </h1>

        <p className="mt-5 text-[18px] font-medium leading-[1.45] text-[#4e5662] min-[390px]:text-[20px]">
          큰 버튼과 음성 안내로 복약, 식사,
          <br />
          통증, 기분, 수면 상태를 쉽게
          <br />
          남길 수 있습니다.
        </p>
      </div>

      <img
        src={heroImage}
        alt=""
        width="1448"
        height="1086"
        className="pointer-events-none absolute bottom-[-12px] right-[-44px] z-0 w-[424px] max-w-none select-none min-[390px]:bottom-[-18px] min-[390px]:right-[-40px] min-[390px]:w-[540px]"
        aria-hidden="true"
        draggable="false"
      />
    </section>
  )
}
