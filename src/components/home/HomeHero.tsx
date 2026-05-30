const heroImage = '/assets/dolbomon/home/hero-care-check.png'

export function HomeHero() {
  return (
    <section
      className="relative mt-4 min-h-[292px] min-[390px]:mt-5 min-[390px]:min-h-[332px]"
      aria-labelledby="home-title"
    >
      <div className="relative z-10 max-w-[230px] min-[390px]:max-w-[260px]">
        <h1
          id="home-title"
          className="text-[32px] font-black leading-[1.12] tracking-[-0.07em] min-[390px]:text-[38px]"
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

        <p className="mt-3 text-[14px] font-medium leading-[1.38] tracking-[-0.045em] text-[#4e5662] min-[390px]:mt-4 min-[390px]:text-[15px]">
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
        className="pointer-events-none absolute bottom-[-4px] right-[-76px] z-0 w-[430px] max-w-none select-none min-[390px]:right-[-96px] min-[390px]:w-[520px]"
        aria-hidden="true"
        draggable="false"
      />
    </section>
  )
}
