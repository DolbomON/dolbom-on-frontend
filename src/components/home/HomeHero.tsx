const heroImage = '/assets/dolbomon/home/hero-care-check.png'

export function HomeHero() {
  return (
    <section
      className="relative mt-8 min-h-[520px]"
      aria-labelledby="home-title"
    >
      <div className="relative z-10 max-w-[282px]">
        <h1
          id="home-title"
          className="text-[42px] font-black leading-[1.16] tracking-[-0.07em] min-[390px]:text-[48px]"
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

        <p className="mt-6 text-[17px] font-medium leading-[1.58] tracking-[-0.045em] text-[#4e5662] min-[390px]:text-[18px]">
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
        className="pointer-events-none absolute bottom-0 right-[-104px] z-0 w-[620px] max-w-none select-none min-[390px]:right-[-120px] min-[390px]:w-[700px]"
        aria-hidden="true"
        draggable="false"
      />
    </section>
  )
}
