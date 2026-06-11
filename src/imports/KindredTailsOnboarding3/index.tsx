import svgPaths from "./svg-dqv2a2246c";

function ButtonZoomIn() {
  return (
    <div className="bg-white relative rounded-tl-[2px] rounded-tr-[2px] shrink-0 size-[30px]" data-name="Button - Zoom in">
      <div aria-hidden className="absolute border-[#ccc] border-b-[0.556px] border-solid inset-0 pointer-events-none rounded-tl-[2px] rounded-tr-[2px]" />
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-center pb-[0.556px] relative size-full">
        <p className="[word-break:break-word] font-['Inter:Bold',sans-serif] font-bold leading-[30px] not-italic relative shrink-0 text-[22px] text-black text-center whitespace-nowrap">+</p>
      </div>
    </div>
  );
}

function ButtonZoomOut() {
  return (
    <div className="bg-white relative rounded-bl-[2px] rounded-br-[2px] shrink-0 size-[30px]" data-name="Button - Zoom out">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-center relative size-full">
        <p className="[word-break:break-word] font-['Inter:Bold',sans-serif] font-bold leading-[30px] not-italic relative shrink-0 text-[22px] text-black text-center whitespace-nowrap">−</p>
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
        <p className="[word-break:break-word] font-['Inter:Regular',sans-serif] font-normal leading-[normal] not-italic relative shrink-0 text-[13px] text-[rgba(17,24,39,0.5)] w-full">Search city or country...</p>
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
    <div className="absolute bg-[#2a6b4a] content-stretch drop-shadow-[0px_4px_10px_rgba(6,182,212,0.4)] flex h-[44.991px] items-center left-[20px] min-h-[44px] px-[20px] py-[12px] rounded-[50px] top-[20px]" data-name="Button">
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
    <div className="absolute inset-[11.04%_19.26%_11.05%_19.26%]" data-name="color">
      <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 49.1848 62.328">
        <g id="color">
          <path d={svgPaths.p8f84140} fill="var(--fill-0, #D0CFCE)" id="Vector" />
          <path d={svgPaths.p75d2000} fill="var(--fill-0, white)" id="Vector_2" />
        </g>
      </svg>
    </div>
  );
}

function Line() {
  return (
    <div className="absolute inset-[11.58%_19.24%_11.61%_20.14%]" data-name="line">
      <div className="absolute inset-[-1.63%_-2.06%]">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 50.4916 63.448">
          <g id="line">
            <path d={svgPaths.p16777780} id="Vector" stroke="var(--stroke-0, black)" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" strokeWidth="2" />
            <path d={svgPaths.p3a370680} id="Vector_2" stroke="var(--stroke-0, black)" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" strokeWidth="2" />
          </g>
        </svg>
      </div>
    </div>
  );
}

function IllustrationContainer() {
  return (
    <div className="bg-[#f5f0e8] content-stretch flex flex-col items-center justify-center relative rounded-[20px] shrink-0 size-[100px]" data-name="Illustration Container">
      <div className="overflow-clip relative shrink-0 size-[80px]" data-name="Icon/Onboarding/Dove">
        <Color />
        <Line />
      </div>
    </div>
  );
}

function Illustration() {
  return (
    <div className="relative shrink-0 w-full" data-name="Illustration">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-center pb-[20px] relative size-full">
        <IllustrationContainer />
      </div>
    </div>
  );
}

function Container8() {
  return (
    <div className="h-[25.998px] relative shrink-0 w-[256.597px]" data-name="Container">
      <p className="[word-break:break-word] absolute font-['Inter:Bold',sans-serif] font-bold inset-[-0.44px_0_0_0] leading-[26px] not-italic overflow-hidden text-[#2d2a26] text-[22px] text-ellipsis tracking-[-0.4492px] whitespace-nowrap">Send love across the world</p>
    </div>
  );
}

function ContainerMargin() {
  return (
    <div className="relative shrink-0" data-name="Container (margin)">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start pb-[12px] relative size-full">
        <Container8 />
      </div>
    </div>
  );
}

function Container9() {
  return (
    <div className="h-[67.188px] relative shrink-0 w-[336.007px]" data-name="Container">
      <p className="-translate-x-1/2 [word-break:break-word] absolute font-['Inter:Regular',sans-serif] font-normal leading-[22.4px] left-[168.5px] not-italic text-[#5a4a3a] text-[14px] text-center top-[0.78px] tracking-[-0.1504px] w-[337px]">Visit any memorial and leave a flower, treat, or toy. Every tribute is a small act of kindness across the globe.</p>
    </div>
  );
}

function ContainerMargin1() {
  return (
    <div className="relative shrink-0" data-name="Container (margin)">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start pb-[32px] relative size-full">
        <Container9 />
      </div>
    </div>
  );
}

function ProgressDots() {
  return (
    <div className="h-[6px] relative shrink-0 w-[56px]" data-name="Progress Dots">
      <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 56 6">
        <g id="Progress Dots">
          <circle cx="3" cy="3" fill="var(--fill-0, #E8DDD0)" id="Ellipse" r="3" />
          <circle cx="15" cy="3" fill="var(--fill-0, #E8DDD0)" id="Ellipse_2" r="3" />
          <ellipse cx="34" cy="3" fill="var(--fill-0, #2A6B4A)" id="Ellipse_3" rx="10" ry="3" />
          <circle cx="53" cy="3" fill="var(--fill-0, #E8DDD0)" id="Ellipse_4" r="3" />
        </g>
      </svg>
    </div>
  );
}

function ContainerMargin2() {
  return (
    <div className="relative shrink-0" data-name="Container (margin)">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start pb-[28px] relative size-full">
        <ProgressDots />
      </div>
    </div>
  );
}

function Button2() {
  return (
    <div className="bg-[#2a6b4a] h-[48px] relative rounded-[24px] shrink-0 w-[336px]" data-name="Button">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="-translate-x-1/2 [word-break:break-word] absolute font-['Inter:Bold',sans-serif] font-bold leading-[22px] left-[168px] not-italic text-[14px] text-center text-white top-[16px] tracking-[-0.2344px] w-[336px]">Continue →</p>
      </div>
    </div>
  );
}

function Button3() {
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
    <div className="bg-white drop-shadow-[0px_8px_16px_rgba(0,0,0,0.08)] h-[410px] max-w-[400px] relative rounded-[24px] shrink-0 w-[400px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-center max-w-[inherit] pb-[32px] pt-[40px] px-[32px] relative size-full">
        <Illustration />
        <ContainerMargin />
        <ContainerMargin1 />
        <ContainerMargin2 />
        <Button2 />
        <Button3 />
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
    <div className="bg-white content-stretch flex flex-col items-start relative size-full" data-name="Kindred Tails - Onboarding 3">
      <Body />
      <Container6 />
    </div>
  );
}