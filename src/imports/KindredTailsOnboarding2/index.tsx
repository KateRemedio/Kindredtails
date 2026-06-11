import svgPaths from "./svg-2rwhh1zf75";

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
    <div className="absolute inset-[11.11%]" data-name="color">
      <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 62.2222 62.2222">
        <g id="color">
          <path d={svgPaths.p6f47ea0} fill="var(--fill-0, #92D3F5)" id="Vector" />
          <path d={svgPaths.p268fa380} fill="var(--fill-0, #C5D76F)" id="Vector_2" />
        </g>
      </svg>
    </div>
  );
}

function Line() {
  return (
    <div className="absolute inset-[11.11%]" data-name="line">
      <div className="absolute inset-[-1.61%]">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 64.2222 64.2222">
          <g id="line">
            <path d={svgPaths.p2a5e3900} id="Vector" stroke="var(--stroke-0, black)" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" strokeWidth="2" />
            <path d={svgPaths.p3b4c2b80} id="Vector_2" stroke="var(--stroke-0, black)" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" strokeWidth="2" />
          </g>
        </svg>
      </div>
    </div>
  );
}

function GlobeIllustration() {
  return (
    <div className="bg-[#f5f0e8] content-stretch flex items-center justify-center relative rounded-[20px] shrink-0 size-[100px]" data-name="Globe Illustration">
      <div className="overflow-clip relative shrink-0 size-[80px]" data-name="Icon/Onboarding/Globe">
        <Color />
        <Line />
      </div>
    </div>
  );
}

function ContainerMargin() {
  return (
    <div className="content-stretch flex flex-col items-center pb-[20px] relative shrink-0" data-name="Container (margin)">
      <GlobeIllustration />
    </div>
  );
}

function ContainerMargin1() {
  return (
    <div className="content-stretch flex flex-col items-center pb-[12px] relative shrink-0" data-name="Container (margin)">
      <p className="[word-break:break-word] font-['Inter:Bold',sans-serif] font-bold leading-[26px] not-italic relative shrink-0 text-[#2d2a26] text-[22px] text-center tracking-[-0.4492px] w-[336px]">Every pet deserves to be remembered</p>
    </div>
  );
}

function ContainerMargin2() {
  return (
    <div className="content-stretch flex flex-col items-center pb-[32px] relative shrink-0" data-name="Container (margin)">
      <p className="[word-break:break-word] font-['Inter:Regular',sans-serif] font-normal leading-[22.4px] not-italic relative shrink-0 text-[#5a4a3a] text-[14px] text-center tracking-[-0.1504px] w-[336px]">{`Kindred Tails is a living map of love - where families around the world plant a light for the companions they've lost.`}</p>
    </div>
  );
}

function Container9() {
  return <div className="bg-[#2a6b4a] h-[5.998px] relative rounded-[3px] shrink-0 w-[20px]" data-name="Container" />;
}

function Container10() {
  return <div className="bg-[#e8ddd0] relative rounded-[3px] shrink-0 size-[5.998px]" data-name="Container" />;
}

function Container11() {
  return <div className="bg-[#e8ddd0] relative rounded-[3px] shrink-0 size-[5.998px]" data-name="Container" />;
}

function Container12() {
  return <div className="bg-[#e8ddd0] relative rounded-[3px] shrink-0 size-[5.998px]" data-name="Container" />;
}

function Container8() {
  return (
    <div className="content-stretch flex gap-[6px] items-start justify-center relative shrink-0" data-name="Container">
      <Container9 />
      <Container10 />
      <Container11 />
      <Container12 />
    </div>
  );
}

function ContainerMargin3() {
  return (
    <div className="content-stretch flex flex-col items-center pb-[28px] relative shrink-0" data-name="Container (margin)">
      <Container8 />
    </div>
  );
}

function Button2() {
  return (
    <div className="bg-[#2a6b4a] h-[48px] relative rounded-[24px] shrink-0 w-[336px]" data-name="Button">
      <p className="-translate-x-1/2 [word-break:break-word] absolute font-['Inter:Bold',sans-serif] font-bold leading-[22px] left-[168px] not-italic text-[14px] text-center text-white top-[16px] tracking-[-0.2344px] w-[336px]">Continue →</p>
    </div>
  );
}

function Button3() {
  return (
    <div className="absolute h-[19.505px] left-[357.07px] top-[16px] w-[26.936px]" data-name="Button">
      <p className="-translate-x-1/2 [word-break:break-word] absolute font-['Inter:Medium',sans-serif] font-medium leading-[19.5px] left-[13.5px] not-italic text-[#9ca3af] text-[13px] text-center top-[0.67px] tracking-[-0.0762px] whitespace-nowrap">Skip</p>
    </div>
  );
}

function Container7() {
  return (
    <div className="bg-white drop-shadow-[0px_8px_16px_rgba(0,0,0,0.03)] h-[430px] max-w-[400px] relative rounded-[24px] shrink-0 w-[400px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-center max-w-[inherit] pb-[32px] pt-[40px] px-[32px] relative size-full">
        <ContainerMargin />
        <ContainerMargin1 />
        <ContainerMargin2 />
        <ContainerMargin3 />
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
    <div className="bg-white content-stretch flex flex-col items-start relative size-full" data-name="Kindred Tails - Onboarding 2">
      <Body />
      <Container6 />
    </div>
  );
}