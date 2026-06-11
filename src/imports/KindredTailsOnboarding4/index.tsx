import svgPaths from "./svg-jn6h2n1mme";

function ButtonZoomIn() {
  return (
    <div className="bg-white relative rounded-tl-[2px] rounded-tr-[2px] shrink-0 size-[30px]" data-name="Button - Zoom in">
      <div aria-hidden className="absolute border-[#ccc] border-b-[0.556px] border-solid inset-0 pointer-events-none rounded-tl-[2px] rounded-tr-[2px]" />
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-center pb-[0.556px] relative size-full">
        <p className="[word-break:break-word] font-['Monaco:Bold',sans-serif] leading-[30px] not-italic relative shrink-0 text-[22px] text-black text-center whitespace-nowrap">+</p>
      </div>
    </div>
  );
}

function ButtonZoomOut() {
  return (
    <div className="bg-white relative rounded-bl-[2px] rounded-br-[2px] shrink-0 size-[30px]" data-name="Button - Zoom out">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-center relative size-full">
        <p className="[word-break:break-word] font-['Monaco:Bold',sans-serif] leading-[30px] not-italic relative shrink-0 text-[22px] text-black text-center whitespace-nowrap">−</p>
      </div>
    </div>
  );
}

function Container3() {
  return (
    <div className="absolute content-stretch flex flex-col items-start left-[1477.78px] p-[1.667px] rounded-[4px] top-[972.67px]" data-name="Container">
      <div aria-hidden className="absolute border-[1.667px] border-[rgba(0,0,0,0.2)] border-solid inset-0 pointer-events-none rounded-[4px]" />
      <ButtonZoomIn />
      <ButtonZoomOut />
    </div>
  );
}

function Icon() {
  return (
    <div className="absolute h-[6.667px] left-[5px] top-[3.89px] w-[10px]" data-name="Icon">
      <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 10 6.66667">
        <g clipPath="url(#clip0_78_2453)" id="Icon">
          <path d="M0 0H10V3.33333H0V0Z" fill="var(--fill-0, #4C7BE1)" id="Vector" />
          <path d={svgPaths.p1e4b1800} fill="var(--fill-0, #FFD500)" id="Vector_2" />
          <path d={svgPaths.p318e1100} fill="var(--fill-0, #E0BC00)" id="Vector_3" />
        </g>
        <defs>
          <clipPath id="clip0_78_2453">
            <rect fill="white" height="6.66667" width="10" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

function Container4() {
  return (
    <div className="absolute bg-[rgba(255,255,255,0.8)] h-[13.993px] left-[1261.21px] top-[1046.01px] w-[259.905px]" data-name="Container">
      <Icon />
      <p className="[word-break:break-word] absolute font-['Inter:Regular',sans-serif] font-normal leading-[14px] left-[15px] not-italic text-[#0078a8] text-[10px] top-[0.11px] whitespace-nowrap">{` Leaflet`}</p>
      <p className="[word-break:break-word] absolute font-['Inter:Regular',sans-serif] font-normal leading-[0] left-[50.23px] not-italic text-[#333] text-[10px] top-[0.11px] whitespace-nowrap">
        <span className="leading-[14px]">{` | © `}</span>
        <span className="leading-[14px] text-[#0078a8]">OpenStreetMap</span>
        <span className="leading-[14px]">{` contributors © `}</span>
        <span className="leading-[14px] text-[#0078a8]">CARTO</span>
      </p>
    </div>
  );
}

function Container2() {
  return (
    <div className="h-0 relative shrink-0 w-full" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <Container3 />
        <Container4 />
      </div>
    </div>
  );
}

function Container1() {
  return (
    <div className="absolute bg-[#f8fafc] content-stretch flex flex-col h-[1060px] items-start left-0 overflow-clip top-0 w-[1521.111px]" data-name="Container">
      <Container2 />
    </div>
  );
}

function Text() {
  return (
    <div className="h-[21px] relative shrink-0 w-[14px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="[word-break:break-word] absolute font-['Inter:Regular',sans-serif] font-normal leading-[21px] left-[0.06px] not-italic text-[#0a0a0a] text-[14px] top-[-0.5px] whitespace-nowrap">🔍</p>
      </div>
    </div>
  );
}

function TextInput() {
  return (
    <div className="flex-[268_0_0] h-[20px] min-w-px relative" data-name="Text Input">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start justify-center overflow-clip relative rounded-[inherit] size-full">
        <p className="[word-break:break-word] font-['Inter:Regular',sans-serif] font-normal leading-[normal] not-italic relative shrink-0 text-[13px] text-[rgba(17,24,39,0.5)] w-full">Search city or country…</p>
      </div>
    </div>
  );
}

function Button() {
  return (
    <div className="bg-[#e5e7eb] h-[32px] min-h-[32px] relative rounded-[50px] shrink-0 w-[44px]" data-name="Button">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="-translate-x-1/2 [word-break:break-word] absolute font-['Inter:Bold',sans-serif] font-bold leading-[18px] left-[22.32px] not-italic text-[#9ca3af] text-[12px] text-center top-[7.39px] whitespace-nowrap">Go</p>
      </div>
    </div>
  );
}

function Container5() {
  return (
    <div className="absolute bg-white content-stretch drop-shadow-[0px_4px_10px_rgba(0,0,0,0.12)] flex gap-[6px] h-[44px] items-center left-[580.56px] pl-[16px] pr-[6px] py-[6px] rounded-[50px] top-[15.99px]" data-name="Container">
      <Text />
      <TextInput />
      <Button />
    </div>
  );
}

function Button1() {
  return (
    <div className="absolute bg-[#2a6b4a] content-stretch flex h-[48px] items-center left-[20px] min-h-[48px] px-[20px] py-[12px] rounded-[24px] top-[20px]" data-name="Button">
      <p className="[word-break:break-word] font-['Inter:Bold',sans-serif] font-bold leading-[21px] not-italic relative shrink-0 text-[14px] text-center text-white whitespace-nowrap">🌱 Plant a Memory</p>
    </div>
  );
}

function Container() {
  return (
    <div className="flex-[1521.111_0_0] h-full min-w-px relative" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid overflow-clip relative rounded-[inherit] size-full">
        <Container1 />
        <Container5 />
        <Button1 />
      </div>
    </div>
  );
}

function Body() {
  return (
    <div className="bg-white h-[1060px] relative shrink-0 w-[1521.111px]" data-name="Body">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-start overflow-clip relative rounded-[inherit] size-full">
        <Container />
      </div>
    </div>
  );
}

function Color() {
  return (
    <div className="absolute inset-[12.75%_16.58%_13.87%_15.92%]" data-name="color">
      <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 54.0011 58.7078">
        <g id="color">
          <path d={svgPaths.p667d400} fill="var(--fill-0, white)" id="Vector" />
          <path d={svgPaths.p3c9e4b00} fill="var(--fill-0, #92D3F5)" id="Vector_2" />
        </g>
      </svg>
    </div>
  );
}

function Skin() {
  return (
    <div className="absolute inset-[43.27%_34%_11.26%_33.6%]" data-name="skin">
      <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 25.916 36.3774">
        <g id="skin">
          <path d={svgPaths.p178ee580} fill="var(--fill-0, #FCF392)" id="Vector" />
          <path d={svgPaths.p3d0f9f0} fill="var(--fill-0, #FCF392)" id="Vector_2" />
          <path d={svgPaths.p1a983a80} fill="var(--fill-0, #FCF392)" id="Vector_3" />
        </g>
      </svg>
    </div>
  );
}

function Line() {
  return (
    <div className="absolute inset-[12.84%_11.39%_12.42%_10.73%]" data-name="line">
      <div className="absolute inset-[-1.67%_-1.61%]">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 64.3059 61.79">
          <g id="line">
            <path d="M59.1539 59.0181V13.0905" id="Vector" stroke="var(--stroke-0, black)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
            <path d={svgPaths.p2e383a00} id="Vector_2" stroke="var(--stroke-0, black)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
            <path d="M5.15199 59.0181V13.0905" id="Vector_3" stroke="var(--stroke-0, black)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
            <path d={svgPaths.p1e084e80} id="Vector_4" stroke="var(--stroke-0, black)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
            <path d={svgPaths.p12c9f700} id="Vector_5" stroke="var(--stroke-0, black)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
            <path d={svgPaths.p2e1f9700} id="Vector_6" stroke="var(--stroke-0, black)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
            <path d={svgPaths.p3d99ed00} id="Vector_7" stroke="var(--stroke-0, black)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
            <path d={svgPaths.p31610580} id="Vector_8" stroke="var(--stroke-0, black)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
            <path d={svgPaths.p24d053a0} id="Vector_9" stroke="var(--stroke-0, black)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
            <path d={svgPaths.p1ba87ae0} id="Vector_10" stroke="var(--stroke-0, black)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
            <path d={svgPaths.p376e5560} id="Vector_11" stroke="var(--stroke-0, black)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
            <g id="Group">
              <path d={svgPaths.p28bdc300} id="Vector_12" stroke="var(--stroke-0, black)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
              <path d={svgPaths.p1fe35e80} id="Vector_13" stroke="var(--stroke-0, black)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
            </g>
            <path d={svgPaths.p26f8f600} id="Vector_14" stroke="var(--stroke-0, black)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
            <path d={svgPaths.p13158e00} id="Vector_15" stroke="var(--stroke-0, black)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
            <path d={svgPaths.p240b5600} id="Vector_16" stroke="var(--stroke-0, black)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
          </g>
        </svg>
      </div>
    </div>
  );
}

function Illustration() {
  return (
    <div className="absolute bg-[#f5f0e8] content-stretch flex flex-col items-center justify-center left-0 overflow-clip rounded-[20px] size-[100px] top-0" data-name="Illustration">
      <div className="overflow-clip relative shrink-0 size-[80px]" data-name="Icon/Onboarding/Home">
        <Color />
        <Skin />
        <Line />
      </div>
    </div>
  );
}

function Container8() {
  return (
    <div className="h-[55.998px] relative shrink-0 w-[56.111px]" data-name="Container">
      <Illustration />
    </div>
  );
}

function ContainerMargin() {
  return (
    <div className="h-[100px] relative shrink-0 w-[97px]" data-name="Container (margin)">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start pb-[20px] relative size-full">
        <Container8 />
      </div>
    </div>
  );
}

function Container9() {
  return (
    <div className="h-[26px] relative shrink-0 w-[229px]" data-name="Container">
      <p className="[word-break:break-word] absolute font-['Inter:Bold',sans-serif] font-bold inset-[-0.44px_-0.46px_0_0] leading-[26px] not-italic overflow-hidden text-[#2d2a26] text-[22px] text-ellipsis tracking-[-0.4492px] whitespace-nowrap">Your privacy is sacred</p>
    </div>
  );
}

function ContainerMargin1() {
  return (
    <div className="relative shrink-0" data-name="Container (margin)">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start pb-[12px] relative size-full">
        <Container9 />
      </div>
    </div>
  );
}

function Container10() {
  return (
    <div className="h-[67.188px] relative shrink-0 w-[336.007px]" data-name="Container">
      <p className="-translate-x-1/2 [word-break:break-word] absolute font-['Inter:Regular',sans-serif] font-normal leading-[22.4px] left-[168.5px] not-italic text-[#5a4a3a] text-[14px] text-center top-[0.78px] tracking-[-0.1504px] w-[337px]">Only your city is shown — never your exact location. No account needed. Your memorial lives here free, forever.</p>
    </div>
  );
}

function ContainerMargin2() {
  return (
    <div className="h-[69px] relative shrink-0" data-name="Container (margin)">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start pb-[32px] relative size-full">
        <Container10 />
      </div>
    </div>
  );
}

function Container12() {
  return <div className="bg-[#e8ddd0] relative rounded-[3px] shrink-0 size-[5.998px]" data-name="Container" />;
}

function Container13() {
  return <div className="bg-[#e8ddd0] relative rounded-[3px] shrink-0 size-[5.998px]" data-name="Container" />;
}

function Container14() {
  return <div className="bg-[#e8ddd0] relative rounded-[3px] shrink-0 size-[5.998px]" data-name="Container" />;
}

function Container15() {
  return <div className="bg-[#2a6b4a] h-[5.998px] relative rounded-[3px] shrink-0 w-[20px]" data-name="Container" />;
}

function Container11() {
  return (
    <div className="content-stretch flex gap-[6px] items-start relative shrink-0" data-name="Container">
      <Container12 />
      <Container13 />
      <Container14 />
      <Container15 />
    </div>
  );
}

function ContainerMargin3() {
  return (
    <div className="h-[20px] relative shrink-0" data-name="Container (margin)">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start pb-[28px] relative size-full">
        <Container11 />
      </div>
    </div>
  );
}

function Button2() {
  return (
    <div className="bg-[#2a6b4a] h-[48px] relative rounded-[24px] shrink-0 w-[336px]" data-name="Button">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="-translate-x-1/2 [word-break:break-word] absolute font-['Inter:Bold',sans-serif] font-bold leading-[20px] left-[168px] not-italic text-[14px] text-center text-white top-[17px] tracking-[-0.2344px] w-[336px]">🌱 Plant a Memory</p>
      </div>
    </div>
  );
}

function Button3() {
  return (
    <div className="bg-white h-[48px] relative rounded-[24px] shrink-0 w-[336px]" data-name="Button">
      <div aria-hidden className="absolute border border-[#e8ddd0] border-solid inset-0 pointer-events-none rounded-[24px]" />
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="-translate-x-1/2 [word-break:break-word] absolute font-['Inter:Regular',sans-serif] font-normal leading-[20px] left-[168.45px] not-italic text-[#5a4a3a] text-[14px] text-center top-[14px] tracking-[-0.2344px] w-[336px]">Explore the Garden</p>
      </div>
    </div>
  );
}

function Container16() {
  return (
    <div className="relative shrink-0 w-[336.007px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col gap-[10px] items-start relative size-full">
        <Button2 />
        <Button3 />
      </div>
    </div>
  );
}

function Button4() {
  return (
    <div className="absolute h-[19.505px] left-[357.07px] top-[16px] w-[26.936px]" data-name="Button">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="-translate-x-1/2 [word-break:break-word] absolute font-['Inter:Medium',sans-serif] font-medium leading-[19.5px] left-[13.5px] not-italic text-[#9ca3af] text-[13px] text-center top-[0.67px] tracking-[-0.0762px] whitespace-nowrap">Skip</p>
      </div>
    </div>
  );
}

function Container7() {
  return (
    <div className="bg-white drop-shadow-[0px_8px_16px_rgba(0,0,0,0.08)] h-[462px] max-w-[400px] relative rounded-[24px] shrink-0 w-[400px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col gap-[12px] items-center max-w-[inherit] pb-[32px] pt-[40px] px-[32px] relative size-full">
        <ContainerMargin />
        <ContainerMargin1 />
        <ContainerMargin2 />
        <ContainerMargin3 />
        <Container16 />
        <Button4 />
      </div>
    </div>
  );
}

function Container6() {
  return (
    <div className="absolute bg-[rgba(0,0,0,0.55)] h-[1060px] left-0 top-0 w-[1521.111px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center justify-center p-[20px] relative size-full">
        <Container7 />
      </div>
    </div>
  );
}

export default function KindredTailsOnboarding() {
  return (
    <div className="bg-white content-stretch flex flex-col items-start relative size-full" data-name="Kindred Tails - Onboarding 4">
      <Body />
      <Container6 />
    </div>
  );
}