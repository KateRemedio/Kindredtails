import svgPaths from "./svg-tp76njlao1";

function Text() {
  return (
    <div className="h-[30px] relative shrink-0 w-[124px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="[word-break:break-word] absolute font-['Inter:Extra_Bold',sans-serif] font-extrabold leading-[30px] left-[-0.19px] not-italic text-[#111827] text-[20px] top-0 tracking-[-0.4px] whitespace-nowrap">Kindred Tails</p>
      </div>
    </div>
  );
}

function Container5() {
  return <div className="bg-[#2a6b4a] relative rounded-[5px] shrink-0 size-[10px]" data-name="Container" />;
}

function Container4() {
  return (
    <div className="relative shrink-0" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex gap-[8px] items-center relative size-full">
        <Text />
        <Container5 />
      </div>
    </div>
  );
}

function Button() {
  return (
    <div className="bg-[#f3f4f6] min-h-[44px] min-w-[44px] relative rounded-[8px] shrink-0 w-[44px]" data-name="Button">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center justify-center min-h-[inherit] min-w-[inherit] px-[8px] py-[4px] relative size-full">
        <p className="[word-break:break-word] font-['Inter:Bold',sans-serif] font-bold leading-[19.5px] not-italic relative shrink-0 text-[#6b7280] text-[13px] text-center whitespace-nowrap">◀</p>
      </div>
    </div>
  );
}

function Container3() {
  return (
    <div className="h-[60px] relative shrink-0 w-[331.444px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center justify-between pb-[16px] relative size-full">
        <Container4 />
        <Button />
      </div>
    </div>
  );
}

function Button1() {
  return (
    <div className="absolute bg-white border border-[#e8ddd0] border-solid h-[48px] left-0 rounded-[14px] top-[0.24px] w-[331px]" data-name="Button">
      <p className="-translate-x-1/2 [word-break:break-word] absolute font-['Inter:Bold','Noto_Sans_Symbols2:Regular',sans-serif] font-bold leading-[22.5px] left-[164.63px] not-italic text-[#2d2a26] text-[15px] text-center top-[10.08px] tracking-[0.15px] whitespace-nowrap">✕ Close</p>
    </div>
  );
}

function InlineContent() {
  return (
    <div className="h-[48.246px] relative shrink-0 w-full" data-name="Inline content">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <Button1 />
      </div>
    </div>
  );
}

function Container2() {
  return (
    <div className="relative shrink-0 w-full" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start pb-[12px] pt-[24px] px-[24px] relative size-full">
        <Container3 />
        <InlineContent />
      </div>
    </div>
  );
}

function Paragraph() {
  return (
    <div className="relative shrink-0 w-full" data-name="Paragraph">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start relative size-full">
        <p className="[word-break:break-word] font-['Inter:Regular',sans-serif] font-normal leading-[18px] not-italic relative shrink-0 text-[#9ca3af] text-[12px] w-[340px]">Your memorial will appear as a glowing light on the global map.</p>
      </div>
    </div>
  );
}

function Label() {
  return (
    <div className="h-[20px] relative shrink-0 w-[339.444px]" data-name="Label">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start pb-[4px] relative size-full">
        <p className="[word-break:break-word] font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[16px] not-italic relative shrink-0 text-[#9c8a7a] text-[12px] tracking-[0.3px] uppercase whitespace-nowrap">Pet Name</p>
      </div>
    </div>
  );
}

function TextInput() {
  return (
    <div className="absolute bg-[#faf8f5] h-[37px] left-0 rounded-[10px] top-[0.04px] w-[339px]" data-name="Text Input">
      <div className="content-stretch flex flex-col items-start justify-center overflow-clip px-[12.556px] py-[8.556px] relative rounded-[inherit] size-full">
        <p className="[word-break:break-word] font-['Courier_Prime:Regular',sans-serif] leading-[normal] not-italic relative shrink-0 text-[#9c8a7a] text-[14px] w-full">e.g. Buddy, Luna, Oliver…</p>
      </div>
      <div aria-hidden className="absolute border-[#e8ddd0] border-[0.556px] border-solid inset-0 pointer-events-none rounded-[10px]" />
    </div>
  );
}

function InlineContent1() {
  return (
    <div className="h-[37.047px] relative shrink-0 w-full" data-name="Inline content">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <TextInput />
      </div>
    </div>
  );
}

function Container7() {
  return (
    <div className="relative shrink-0 w-full" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start relative size-full">
        <Label />
        <InlineContent1 />
      </div>
    </div>
  );
}

function Label1() {
  return (
    <div className="h-[20px] relative shrink-0 w-[339.444px]" data-name="Label">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start pb-[4px] relative size-full">
        <p className="[word-break:break-word] font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[16px] not-italic relative shrink-0 text-[#9c8a7a] text-[12px] tracking-[0.3px] uppercase whitespace-nowrap">Pet Type</p>
      </div>
    </div>
  );
}

function Dropdown() {
  return <div className="absolute bg-white border-[#e5e7eb] border-[0.556px] border-solid h-[35px] left-0 rounded-[10px] top-[-0.07px] w-[339px]" data-name="Dropdown" />;
}

function InlineContent2() {
  return (
    <div className="h-[34.936px] relative shrink-0 w-full" data-name="Inline content">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <Dropdown />
      </div>
    </div>
  );
}

function Container8() {
  return (
    <div className="h-[70.936px] relative shrink-0 w-[339.444px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start pt-[16px] relative size-full">
        <Label1 />
        <InlineContent2 />
      </div>
    </div>
  );
}

function Label2() {
  return (
    <div className="h-[20px] relative shrink-0 w-[339.444px]" data-name="Label">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start pb-[4px] relative size-full">
        <p className="[word-break:break-word] font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[16px] not-italic relative shrink-0 text-[#9c8a7a] text-[12px] tracking-[0.3px] uppercase whitespace-nowrap">Breed (optional)</p>
      </div>
    </div>
  );
}

function TextInput1() {
  return (
    <div className="absolute bg-[#faf8f5] h-[37px] left-0 rounded-[10px] top-[0.04px] w-[339px]" data-name="Text Input">
      <div className="content-stretch flex flex-col items-start justify-center overflow-clip px-[12.556px] py-[8.556px] relative rounded-[inherit] size-full">
        <p className="[word-break:break-word] font-['Inter:Regular',sans-serif] font-normal leading-[normal] not-italic relative shrink-0 text-[#9c8a7a] text-[14px] w-full">e.g. German Shepherd</p>
      </div>
      <div aria-hidden className="absolute border-[#e8ddd0] border-[0.556px] border-solid inset-0 pointer-events-none rounded-[10px]" />
    </div>
  );
}

function InlineContent3() {
  return (
    <div className="h-[37.047px] relative shrink-0 w-full" data-name="Inline content">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <TextInput1 />
      </div>
    </div>
  );
}

function Container9() {
  return (
    <div className="relative shrink-0 w-[339.444px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start pt-[16px] relative size-full">
        <Label2 />
        <InlineContent3 />
      </div>
    </div>
  );
}

function Label3() {
  return (
    <div className="h-[20px] relative shrink-0 w-[339.444px]" data-name="Label">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start pb-[4px] relative size-full">
        <p className="[word-break:break-word] font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[0] not-italic relative shrink-0 text-[#9c8a7a] text-[0px] tracking-[0.3px] uppercase whitespace-nowrap">
          <span className="leading-[16px] text-[12px]">{`Memorial Text `}</span>
          <span className="font-['Inter:Regular',sans-serif] font-normal leading-[16px] text-[12px]">(0/600)</span>
        </p>
      </div>
    </div>
  );
}

function TextArea() {
  return (
    <div className="absolute bg-[#faf8f5] h-[97px] left-0 min-h-[96px] rounded-[10px] top-[0.04px] w-[339px]" data-name="Text Area">
      <div className="content-stretch flex flex-col items-start min-h-[inherit] overflow-clip px-[12.556px] py-[8.556px] relative rounded-[inherit] size-full">
        <p className="[word-break:break-word] font-['Courier_Prime:Regular',sans-serif] leading-[20px] not-italic relative shrink-0 text-[#9c8a7a] text-[14px] w-full">Share a cherished memory or a message to your beloved companion…</p>
      </div>
      <div aria-hidden className="absolute border-[#e8ddd0] border-[0.556px] border-solid inset-0 pointer-events-none rounded-[10px]" />
    </div>
  );
}

function InlineContent4() {
  return (
    <div className="h-[103.155px] relative shrink-0 w-full" data-name="Inline content">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <TextArea />
      </div>
    </div>
  );
}

function Container10() {
  return (
    <div className="relative shrink-0 w-[339.444px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start pt-[16px] relative size-full">
        <Label3 />
        <InlineContent4 />
      </div>
    </div>
  );
}

function Label4() {
  return (
    <div className="h-[20px] relative shrink-0 w-[339.444px]" data-name="Label">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start pb-[4px] relative size-full">
        <p className="[word-break:break-word] font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[16px] not-italic relative shrink-0 text-[#9c8a7a] text-[12px] tracking-[0.3px] uppercase whitespace-nowrap">Age or Years Together (optional)</p>
      </div>
    </div>
  );
}

function TextInput2() {
  return (
    <div className="absolute bg-[#faf8f5] h-[37px] left-0 rounded-[10px] top-[0.04px] w-[339px]" data-name="Text Input">
      <div className="content-stretch flex flex-col items-start justify-center overflow-clip px-[12.556px] py-[8.556px] relative rounded-[inherit] size-full">
        <p className="[word-break:break-word] font-['Inter:Regular',sans-serif] font-normal leading-[normal] not-italic relative shrink-0 text-[#9c8a7a] text-[14px] w-full">e.g. 13 years</p>
      </div>
      <div aria-hidden className="absolute border-[#e8ddd0] border-[0.556px] border-solid inset-0 pointer-events-none rounded-[10px]" />
    </div>
  );
}

function InlineContent5() {
  return (
    <div className="h-[37.047px] relative shrink-0 w-full" data-name="Inline content">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <TextInput2 />
      </div>
    </div>
  );
}

function Container11() {
  return (
    <div className="relative shrink-0 w-[339.444px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start pt-[16px] relative size-full">
        <Label4 />
        <InlineContent5 />
      </div>
    </div>
  );
}

function Label5() {
  return (
    <div className="h-[20px] relative shrink-0 w-[339.444px]" data-name="Label">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start pb-[4px] relative size-full">
        <p className="[word-break:break-word] font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[16px] not-italic relative shrink-0 text-[#9c8a7a] text-[12px] tracking-[0.3px] uppercase whitespace-nowrap">Date of Passing (optional)</p>
      </div>
    </div>
  );
}

function DatePicker() {
  return <div className="absolute bg-[#faf8f5] border-[#e8ddd0] border-[0.556px] border-solid h-[37px] left-0 rounded-[10px] top-[0.04px] w-[339px]" data-name="Date Picker" />;
}

function InlineContent6() {
  return (
    <div className="h-[37.047px] relative shrink-0 w-full" data-name="Inline content">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <DatePicker />
      </div>
    </div>
  );
}

function Container12() {
  return (
    <div className="h-[73.047px] relative shrink-0 w-[339.444px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start pt-[16px] relative size-full">
        <Label5 />
        <InlineContent6 />
      </div>
    </div>
  );
}

function Label6() {
  return (
    <div className="relative shrink-0 w-full" data-name="Label">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start relative size-full">
        <p className="[word-break:break-word] font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[0] not-italic relative shrink-0 text-[#6a7282] text-[0px] tracking-[0.3px] uppercase whitespace-nowrap">
          <span className="leading-[16px] text-[12px]">{`Photos `}</span>
          <span className="font-['Inter:Regular',sans-serif] font-normal leading-[16px] text-[#99a1af] text-[12px]">(0/3)</span>
        </p>
      </div>
    </div>
  );
}

function Container16() {
  return (
    <div className="relative shrink-0 w-full" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-center relative size-full">
        <p className="[word-break:break-word] font-['Inter:Regular',sans-serif] font-normal leading-[36px] not-italic relative shrink-0 text-[#99a1af] text-[30px] text-center whitespace-nowrap">📷</p>
      </div>
    </div>
  );
}

function Container17() {
  return (
    <div className="relative shrink-0 w-[152px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-center pt-[4px] relative size-full">
        <div className="[word-break:break-word] font-['Inter:Regular',sans-serif] font-normal leading-[0] not-italic relative shrink-0 text-[#99a1af] text-[12px] text-center w-[153px]">
          <p className="leading-[16px] mb-0">Click to add up to 3 photos</p>
          <p className="leading-[16px] text-[#d1d5dc]">PNG · JPG · WebP · HEIC</p>
        </div>
      </div>
    </div>
  );
}

function Container15() {
  return (
    <div className="relative shrink-0 w-[152px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start relative size-full">
        <Container16 />
        <Container17 />
      </div>
    </div>
  );
}

function Container14() {
  return (
    <div className="bg-white content-stretch flex h-[100px] items-center justify-center p-[1.667px] relative rounded-[12px] shrink-0 w-full" data-name="Container">
      <div aria-hidden className="absolute border-[#e8ddd0] border-[1.667px] border-dashed inset-0 pointer-events-none rounded-[12px]" />
      <Container15 />
    </div>
  );
}

function ContainerMargin() {
  return (
    <div className="relative shrink-0 w-full" data-name="Container (margin)">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start pt-[4px] relative size-full">
        <Container14 />
      </div>
    </div>
  );
}

function Container13() {
  return (
    <div className="relative shrink-0 w-[339.444px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start pt-[16px] relative size-full">
        <Label6 />
        <ContainerMargin />
      </div>
    </div>
  );
}

function Label7() {
  return (
    <div className="relative shrink-0 w-full" data-name="Label">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start relative size-full">
        <p className="[word-break:break-word] font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[16px] not-italic relative shrink-0 text-[#9c8a7a] text-[12px] tracking-[0.3px] uppercase whitespace-nowrap">City / Location</p>
      </div>
    </div>
  );
}

function TextInput3() {
  return (
    <div className="absolute bg-[#faf8f5] h-[37px] left-0 rounded-[10px] top-0 w-[339px]" data-name="Text Input">
      <div className="content-stretch flex flex-col items-start justify-center overflow-clip px-[12.556px] py-[8.556px] relative rounded-[inherit] size-full">
        <p className="[word-break:break-word] font-['Inter:Regular',sans-serif] font-normal leading-[normal] not-italic relative shrink-0 text-[#9c8a7a] text-[14px] w-full">Search for a city…</p>
      </div>
      <div aria-hidden className="absolute border-[#e8ddd0] border-[0.556px] border-solid inset-0 pointer-events-none rounded-[10px]" />
    </div>
  );
}

function LocationSearch() {
  return (
    <div className="h-[37px] relative shrink-0 w-full" data-name="LocationSearch">
      <TextInput3 />
    </div>
  );
}

function LocationSearchMargin() {
  return (
    <div className="relative shrink-0 w-full" data-name="LocationSearch (margin)">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start pt-[4px] relative size-full">
        <LocationSearch />
      </div>
    </div>
  );
}

function Container18() {
  return (
    <div className="relative shrink-0 w-[339.444px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start py-[16px] relative size-full">
        <Label7 />
        <LocationSearchMargin />
      </div>
    </div>
  );
}

function Button2() {
  return (
    <div className="absolute bg-[#2a6b4a] h-[48px] left-0 rounded-[12px] top-[0.28px] w-[339px]" data-name="Button">
      <p className="-translate-x-1/2 [word-break:break-word] absolute font-['Inter:Bold',sans-serif] font-bold leading-[22.5px] left-[169.51px] not-italic text-[14px] text-center text-white top-[11.08px] whitespace-nowrap">🌱 Plant This Memory</p>
    </div>
  );
}

function InlineContent7() {
  return (
    <div className="h-[48.509px] relative shrink-0 w-full" data-name="Inline content">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <Button2 />
      </div>
    </div>
  );
}

function PetForm() {
  return (
    <div className="relative shrink-0 w-[339.444px]" data-name="PetForm">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start pb-[24px] pt-[14px] relative size-full">
        <Container7 />
        <Container8 />
        <Container9 />
        <Container10 />
        <Container11 />
        <Container12 />
        <Container13 />
        <Container18 />
        <InlineContent7 />
      </div>
    </div>
  );
}

function Container6() {
  return (
    <div className="relative shrink-0 w-full" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start px-[20px] relative size-full">
        <Paragraph />
        <PetForm />
      </div>
    </div>
  );
}

function Container19() {
  return <div className="h-0 relative shrink-0 w-full" data-name="Container" />;
}

function Text1() {
  return (
    <div className="h-[25px] relative shrink-0 w-[17px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="[word-break:break-word] absolute font-['Inter:Regular',sans-serif] font-normal leading-[25.5px] left-[-0.11px] not-italic text-[#0a0a0a] text-[17px] top-[0.25px] whitespace-nowrap">🛡️</p>
      </div>
    </div>
  );
}

function Container23() {
  return (
    <div className="relative shrink-0 w-full" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start relative size-full">
        <p className="[word-break:break-word] font-['Inter:Bold',sans-serif] font-bold leading-[16.5px] not-italic relative shrink-0 text-[#2a6b4a] text-[11px] whitespace-nowrap">Privacy Guard</p>
      </div>
    </div>
  );
}

function Container24() {
  return (
    <div className="relative shrink-0 w-[283px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start pt-[2px] relative size-full">
        <p className="[word-break:break-word] font-['Inter:Regular',sans-serif] font-normal leading-[15.4px] not-italic relative shrink-0 text-[#6b7280] text-[11px] w-[284px]">City-Level Fuzzy Geolocation. Your exact location is never stored.</p>
      </div>
    </div>
  );
}

function Container22() {
  return (
    <div className="relative shrink-0 w-[283px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start relative size-full">
        <Container23 />
        <Container24 />
      </div>
    </div>
  );
}

function Container21() {
  return (
    <div className="bg-[#f0f7f4] relative rounded-[14px] shrink-0 w-full" data-name="Container">
      <div aria-hidden className="absolute border-[#e0f2fe] border-[0.556px] border-solid inset-0 pointer-events-none rounded-[14px]" />
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex gap-[10px] items-start px-[14.556px] py-[12.556px] relative size-full">
        <Text1 />
        <Container22 />
      </div>
    </div>
  );
}

function Container20() {
  return (
    <div className="relative shrink-0 w-full" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start pb-[20px] pt-[12px] px-[20px] relative size-full">
        <Container21 />
      </div>
    </div>
  );
}

function Container1() {
  return (
    <div className="relative shrink-0 w-full" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start relative size-full">
        <Container2 />
        <Container6 />
        <Container19 />
        <Container20 />
      </div>
    </div>
  );
}

function Container() {
  return (
    <div className="bg-white h-[1060px] relative shrink-0 w-full" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start overflow-clip pr-[0.556px] relative rounded-[inherit] size-full">
        <Container1 />
      </div>
      <div aria-hidden className="absolute border-[#f3f4f6] border-r-[0.556px] border-solid inset-0 pointer-events-none" />
    </div>
  );
}

function Sidebar() {
  return (
    <div className="h-full relative shrink-0 w-[380px]" data-name="Sidebar">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start overflow-clip relative rounded-[inherit] size-full">
        <Container />
      </div>
    </div>
  );
}

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

function Container28() {
  return (
    <div className="absolute content-stretch flex flex-col items-start left-[1097.78px] p-[1.667px] rounded-[4px] top-[972.67px]" data-name="Container">
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

function Container29() {
  return (
    <div className="absolute bg-[rgba(255,255,255,0.8)] h-[13.993px] left-[881.21px] top-[1046.01px] w-[259.905px]" data-name="Container">
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

function Container27() {
  return (
    <div className="h-0 relative shrink-0 w-full" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <Container28 />
        <Container29 />
      </div>
    </div>
  );
}

function Container26() {
  return (
    <div className="absolute bg-[#faf8f5] content-stretch flex flex-col h-[1060px] items-start left-0 overflow-clip top-0 w-[1141.111px]" data-name="Container">
      <Container27 />
    </div>
  );
}

function Text2() {
  return (
    <div className="h-[21px] relative shrink-0 w-[14px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="[word-break:break-word] absolute font-['Inter:Regular',sans-serif] font-normal leading-[21px] left-[0.06px] not-italic text-[#0a0a0a] text-[14px] top-[-0.5px] whitespace-nowrap">🔍</p>
      </div>
    </div>
  );
}

function TextInput4() {
  return (
    <div className="flex-[268_0_0] h-[20px] min-w-px relative" data-name="Text Input">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start justify-center overflow-clip relative rounded-[inherit] size-full">
        <p className="[word-break:break-word] font-['Inter:Regular',sans-serif] font-normal leading-[normal] not-italic relative shrink-0 text-[#9c8a7a] text-[13px] w-full">Search city or country…</p>
      </div>
    </div>
  );
}

function Button3() {
  return (
    <div className="bg-[#e5e7eb] h-[32px] min-h-[32px] relative rounded-[50px] shrink-0 w-[44px]" data-name="Button">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="-translate-x-1/2 [word-break:break-word] absolute font-['Inter:Bold',sans-serif] font-bold leading-[18px] left-[22.32px] not-italic text-[#9ca3af] text-[12px] text-center top-[7.39px] whitespace-nowrap">Go</p>
      </div>
    </div>
  );
}

function Container30() {
  return (
    <div className="absolute bg-white content-stretch drop-shadow-[0px_4px_10px_rgba(0,0,0,0.12)] flex gap-[6px] h-[44px] items-center left-[390.56px] pl-[16px] pr-[6px] py-[6px] rounded-[50px] top-[15.99px]" data-name="Container">
      <Text2 />
      <TextInput4 />
      <Button3 />
    </div>
  );
}

function Container25() {
  return (
    <div className="flex-[1141.111_0_0] h-full min-w-px relative" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid overflow-clip relative rounded-[inherit] size-full">
        <Container26 />
        <Container30 />
      </div>
    </div>
  );
}

function App1() {
  return (
    <div className="bg-[#faf8f5] h-[1060px] relative shrink-0 w-[1521.111px]" data-name="App">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-start overflow-clip relative rounded-[inherit] size-full">
        <Sidebar />
        <Container25 />
      </div>
    </div>
  );
}

function KindredTailsPlantAMemory() {
  return (
    <div className="bg-[#faf8f5] h-[1060px] relative shrink-0 w-[1521px]" data-name="Kindred Tails - Plant a memory">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start relative size-full">
        <App1 />
      </div>
    </div>
  );
}

function ButtonZoomIn1() {
  return (
    <div className="bg-white relative rounded-tl-[2px] rounded-tr-[2px] shrink-0 size-[30px]" data-name="Button - Zoom in">
      <div aria-hidden className="absolute border-[#ccc] border-b-[0.556px] border-solid inset-0 pointer-events-none rounded-tl-[2px] rounded-tr-[2px]" />
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-center pb-[0.556px] relative size-full">
        <p className="[word-break:break-word] font-['Monaco:Bold',sans-serif] leading-[30px] not-italic relative shrink-0 text-[22px] text-black text-center whitespace-nowrap">+</p>
      </div>
    </div>
  );
}

function ButtonZoomOut1() {
  return (
    <div className="bg-white relative rounded-bl-[2px] rounded-br-[2px] shrink-0 size-[30px]" data-name="Button - Zoom out">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-center relative size-full">
        <p className="[word-break:break-word] font-['Monaco:Bold',sans-serif] leading-[30px] not-italic relative shrink-0 text-[22px] text-black text-center whitespace-nowrap">−</p>
      </div>
    </div>
  );
}

function Container34() {
  return (
    <div className="absolute content-stretch flex flex-col items-start left-[1097.78px] p-[1.667px] rounded-[4px] top-[972.67px]" data-name="Container">
      <div aria-hidden className="absolute border-[1.667px] border-[rgba(0,0,0,0.2)] border-solid inset-0 pointer-events-none rounded-[4px]" />
      <ButtonZoomIn1 />
      <ButtonZoomOut1 />
    </div>
  );
}

function Icon1() {
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

function Container35() {
  return (
    <div className="absolute bg-[rgba(255,255,255,0.8)] h-[13.993px] left-[881.21px] top-[1046.01px] w-[259.905px]" data-name="Container">
      <Icon1 />
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

function Container33() {
  return (
    <div className="h-0 relative shrink-0 w-full" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <Container34 />
        <Container35 />
      </div>
    </div>
  );
}

function Container32() {
  return (
    <div className="absolute bg-[#f8fafc] content-stretch flex flex-col h-[1060px] items-start left-0 overflow-clip top-0 w-[1141.111px]" data-name="Container">
      <Container33 />
    </div>
  );
}

function Text3() {
  return (
    <div className="h-[21px] relative shrink-0 w-[14px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="[word-break:break-word] absolute font-['Inter:Regular',sans-serif] font-normal leading-[21px] left-[0.06px] not-italic text-[#0a0a0a] text-[14px] top-[-0.5px] whitespace-nowrap">🔍</p>
      </div>
    </div>
  );
}

function TextInput5() {
  return (
    <div className="flex-[268_0_0] h-[20px] min-w-px relative" data-name="Text Input">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start justify-center overflow-clip relative rounded-[inherit] size-full">
        <p className="[word-break:break-word] font-['Inter:Regular',sans-serif] font-normal leading-[normal] not-italic relative shrink-0 text-[13px] text-[rgba(17,24,39,0.5)] w-full">Search city or country…</p>
      </div>
    </div>
  );
}

function Button4() {
  return (
    <div className="bg-[#e5e7eb] h-[32px] min-h-[32px] relative rounded-[50px] shrink-0 w-[44px]" data-name="Button">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="-translate-x-1/2 [word-break:break-word] absolute font-['Inter:Bold',sans-serif] font-bold leading-[18px] left-[22.32px] not-italic text-[#9ca3af] text-[12px] text-center top-[7.39px] whitespace-nowrap">Go</p>
      </div>
    </div>
  );
}

function Container36() {
  return (
    <div className="absolute bg-white content-stretch drop-shadow-[0px_4px_10px_rgba(0,0,0,0.12)] flex gap-[6px] h-[44px] items-center left-[390.56px] pl-[16px] pr-[6px] py-[6px] rounded-[50px] top-[15.99px]" data-name="Container">
      <Text3 />
      <TextInput5 />
      <Button4 />
    </div>
  );
}

function Container31() {
  return (
    <div className="flex-[1141.111_0_0] h-full min-w-px relative" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid overflow-clip relative rounded-[inherit] size-full">
        <Container32 />
        <Container36 />
      </div>
    </div>
  );
}

function App() {
  return (
    <div className="bg-white h-[1060px] relative shrink-0 w-[1521.111px]" data-name="App">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-start overflow-clip relative rounded-[inherit] size-full">
        <KindredTailsPlantAMemory />
        <Container31 />
      </div>
    </div>
  );
}

function Color() {
  return (
    <div className="absolute inset-[16.33%_13.55%_21.38%_13.08%]" data-name="color">
      <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 52.8233 44.845">
        <g id="color">
          <path d={svgPaths.p1f64c700} fill="var(--fill-0, white)" id="Vector" />
          <path d={svgPaths.pac02f40} fill="var(--fill-0, white)" id="Vector_2" />
          <path d={svgPaths.p3e0065f1} fill="var(--fill-0, #E898B0)" id="Vector_3" />
          <path d={svgPaths.p1e95b380} fill="var(--fill-0, #E898B0)" id="Vector_4" />
          <path d={svgPaths.p1184b700} fill="var(--fill-0, white)" id="Vector_5" />
        </g>
      </svg>
    </div>
  );
}

function Line() {
  return (
    <div className="absolute inset-[15.68%_12.96%_20.83%_12.64%]" data-name="line">
      <div className="absolute inset-[-2.19%_-1.87%]">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 55.5669 47.7132">
          <g id="line">
            <path d={svgPaths.p2c3f6e40} id="Vector" stroke="var(--stroke-0, black)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
            <path d={svgPaths.pa3e380} id="Vector_2" stroke="var(--stroke-0, black)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
            <path d={svgPaths.p2716e140} id="Vector_3" stroke="var(--stroke-0, black)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
            <path d={svgPaths.p1438d980} id="Vector_4" stroke="var(--stroke-0, black)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
          </g>
        </svg>
      </div>
    </div>
  );
}

function Container39() {
  return (
    <div className="bg-[#faf8f5] content-stretch flex items-center justify-center relative rounded-[18px] shrink-0 size-[110px]" data-name="Container">
      <div className="relative shrink-0 size-[72px]" data-name="Icon/Pet/Bunny">
        <div className="bg-clip-padding border-0 border-[transparent] border-solid overflow-clip relative rounded-[inherit] size-full">
          <Color />
          <Line />
        </div>
      </div>
    </div>
  );
}

function ContainerMargin1() {
  return (
    <div className="relative shrink-0 w-full" data-name="Container (margin)">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-center relative size-full">
        <Container39 />
      </div>
    </div>
  );
}

function Heading() {
  return (
    <div className="relative shrink-0 w-full" data-name="Heading 2">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-center relative size-full">
        <p className="[word-break:break-word] font-['Courier_Prime:Bold',sans-serif] leading-[33px] not-italic relative shrink-0 text-[#111827] text-[22px] text-center whitespace-nowrap">Luna</p>
      </div>
    </div>
  );
}

function Paragraph1() {
  return (
    <div className="h-[24px] relative shrink-0 w-[372.014px]" data-name="Paragraph">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-center pt-[4px] relative size-full">
        <p className="[word-break:break-word] font-['Inter:Regular',sans-serif] font-normal leading-[19.5px] not-italic relative shrink-0 text-[#9ca3af] text-[13px] text-center whitespace-nowrap">🐰 bunny · Holland Lop · Melbourne, Australia</p>
      </div>
    </div>
  );
}

function Paragraph2() {
  return (
    <div className="h-[21px] relative shrink-0 w-[372.014px]" data-name="Paragraph">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-center pt-[3px] relative size-full">
        <p className="[word-break:break-word] font-['Inter:Regular',sans-serif] font-normal leading-[18px] not-italic relative shrink-0 text-[#9ca3af] text-[12px] text-center whitespace-nowrap">🕰 8 years · 🕊 March 24, 2025</p>
      </div>
    </div>
  );
}

function Container40() {
  return (
    <div className="h-[90px] relative shrink-0 w-[372.014px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start pt-[12px] relative size-full">
        <Heading />
        <Paragraph1 />
        <Paragraph2 />
      </div>
    </div>
  );
}

function Button5() {
  return (
    <div className="flex-[185.451_0_0] h-full min-h-[44px] min-w-px relative" data-name="Button">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="-translate-x-1/2 [word-break:break-word] absolute font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[18px] left-[92.59px] not-italic text-[#6b7280] text-[12px] text-center top-[13.66px] whitespace-nowrap">Memorial</p>
      </div>
    </div>
  );
}

function Button6() {
  return (
    <div className="bg-[#2a6b4a] flex-[185.451_0_0] h-full min-h-[44px] min-w-px relative rounded-[11px]" data-name="Button">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="-translate-x-1/2 [word-break:break-word] absolute font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[18px] left-[93.3px] not-italic text-[12px] text-center text-white top-[13.66px] whitespace-nowrap">Your Memorial ❤️</p>
      </div>
    </div>
  );
}

function Container41() {
  return (
    <div className="bg-[#f9fafb] h-[45.104px] relative rounded-[12px] shrink-0 w-[372.014px]" data-name="Container">
      <div className="content-stretch flex items-start overflow-clip p-[0.556px] relative rounded-[inherit] size-full">
        <Button5 />
        <Button6 />
      </div>
      <div aria-hidden className="absolute border-[#e5e7eb] border-[0.556px] border-solid inset-0 pointer-events-none rounded-[12px]" />
    </div>
  );
}

function ContainerMargin2() {
  return (
    <div className="relative shrink-0" data-name="Container (margin)">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start pt-[16px] relative size-full">
        <Container41 />
      </div>
    </div>
  );
}

function Button7() {
  return (
    <div className="absolute bg-white border-[#e5e7eb] border-[0.556px] border-solid h-[44.609px] left-0 rounded-[14px] top-0 w-[372.014px]" data-name="Button">
      <p className="-translate-x-1/2 [word-break:break-word] absolute font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[19.5px] left-[185.62px] not-italic text-[#374151] text-[13px] text-center top-[12.66px] whitespace-nowrap">Edit Memorial ✏️</p>
    </div>
  );
}

function Button8() {
  return (
    <div className="absolute h-[25.981px] left-0 top-[53.06px] w-[372.014px]" data-name="Button">
      <p className="-translate-x-1/2 [word-break:break-word] absolute font-['Inter:Medium',sans-serif] font-medium leading-[18px] left-[186.3px] not-italic text-[#ef4444] text-[12px] text-center top-[4.66px] whitespace-nowrap">Remove this memorial</p>
    </div>
  );
}

function InlineContent8() {
  return (
    <div className="h-[95.035px] relative shrink-0 w-full" data-name="Inline content">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <Button7 />
        <Button8 />
      </div>
    </div>
  );
}

function Color1() {
  return (
    <div className="absolute inset-[13.89%_13.89%_13.72%_13.72%]" data-name="color">
      <div className="absolute inset-[-2.88%]">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 36.7475 36.7475">
          <g id="color">
            <path d={svgPaths.p98f1000} fill="var(--fill-0, #DA6D68)" id="Vector" stroke="var(--stroke-0, #DA6D68)" strokeMiterlimit="10" strokeWidth="2" />
            <path d={svgPaths.p2e8d9700} fill="var(--fill-0, #EC8F83)" id="Vector_2" />
            <path d={svgPaths.p301de600} fill="var(--fill-0, #FDC677)" id="Vector_3" stroke="var(--stroke-0, #FDC677)" strokeMiterlimit="10" strokeWidth="2" />
            <path d={svgPaths.p2e36cb40} fill="var(--fill-0, #F8EA54)" id="Vector_4" stroke="var(--stroke-0, #F8EA54)" strokeMiterlimit="10" strokeWidth="2" />
          </g>
        </svg>
      </div>
    </div>
  );
}

function Line1() {
  return (
    <div className="absolute inset-[13.89%_13.89%_13.72%_13.72%]" data-name="line">
      <div className="absolute inset-[-2.88%]">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 36.7475 36.7475">
          <g id="line">
            <path d={svgPaths.p2e8d9700} id="Vector" stroke="var(--stroke-0, black)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
            <path d={svgPaths.p16c4be00} id="Vector_2" stroke="var(--stroke-0, black)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
            <path d={svgPaths.pc5c7200} id="Vector_3" stroke="var(--stroke-0, black)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
            <path d={svgPaths.p1df06fe0} id="Vector_4" stroke="var(--stroke-0, black)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
            <path d={svgPaths.p16c14800} id="Vector_5" stroke="var(--stroke-0, black)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
            <path d={svgPaths.p301de600} id="Vector_6" stroke="var(--stroke-0, black)" strokeLinejoin="round" strokeWidth="2" />
            <path d={svgPaths.p2e36cb40} id="Vector_7" stroke="var(--stroke-0, black)" strokeLinejoin="round" strokeWidth="2" />
          </g>
        </svg>
      </div>
    </div>
  );
}

function Container45() {
  return (
    <div className="h-[42.005px] relative shrink-0 w-[101.571px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <div className="absolute left-[26.89px] overflow-clip size-[48px] top-[-2.85px]" data-name="Icon/Tribute/Flower">
          <Color1 />
          <Line1 />
        </div>
      </div>
    </div>
  );
}

function Container46() {
  return (
    <div className="h-[16.493px] relative shrink-0 w-[101.571px]" data-name="Container">
      <p className="-translate-x-1/2 [word-break:break-word] absolute font-['Inter:Regular',sans-serif] font-normal leading-[16.5px] left-[50.93px] not-italic text-[#9ca3af] text-[11px] text-center top-[0.11px] whitespace-nowrap">Flowers</p>
    </div>
  );
}

function ContainerMargin3() {
  return (
    <div className="relative shrink-0" data-name="Container (margin)">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start pt-[2px] relative size-full">
        <Container46 />
      </div>
    </div>
  );
}

function Container47() {
  return (
    <div className="h-[30px] relative shrink-0 w-[101.571px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="-translate-x-1/2 [word-break:break-word] absolute font-['Inter:Extra_Bold',sans-serif] font-extrabold leading-[30px] left-[51.36px] not-italic text-[#111827] text-[20px] text-center top-[-0.22px] whitespace-nowrap">0</p>
      </div>
    </div>
  );
}

function Container44() {
  return (
    <div className="absolute bg-[#f9fafb] content-stretch flex flex-col items-start left-0 px-[8.556px] py-[12.556px] rounded-[14px] top-0" data-name="Container">
      <div aria-hidden className="absolute border-[#f3f4f6] border-[0.556px] border-solid inset-0 pointer-events-none rounded-[14px]" />
      <Container45 />
      <ContainerMargin3 />
      <Container47 />
    </div>
  );
}

function Color2() {
  return (
    <div className="absolute inset-[11.11%]" data-name="color">
      <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 37.3333 37.3333">
        <g id="color">
          <path d={svgPaths.p3b677100} fill="var(--fill-0, #B68647)" id="Vector" />
          <path d={svgPaths.p2f507580} fill="var(--fill-0, #89654D)" id="Vector_2" />
          <path d={svgPaths.p13b0dc00} fill="var(--fill-0, #89654D)" id="Vector_3" />
          <path d={svgPaths.p75e370} fill="var(--fill-0, #89654D)" id="Vector_4" />
          <path d={svgPaths.p283a2300} fill="var(--fill-0, #89654D)" id="Vector_5" />
          <path d={svgPaths.p97304f0} fill="var(--fill-0, #89654D)" id="Vector_6" />
          <path d={svgPaths.p337c800} fill="var(--fill-0, #89654D)" id="Vector_7" />
          <path d={svgPaths.p392d9800} fill="var(--fill-0, #89654D)" id="Vector_8" />
        </g>
      </svg>
    </div>
  );
}

function Line2() {
  return (
    <div className="absolute inset-[10.94%_11.11%_11.28%_11.11%]" data-name="line">
      <div className="absolute inset-[-2.6%]">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 39.2727 39.2724">
          <g id="line">
            <path d={svgPaths.p32fc1230} id="Vector" stroke="var(--stroke-0, black)" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" strokeWidth="1.9394" />
            <path d={svgPaths.p123c2b00} id="Vector_2" stroke="var(--stroke-0, black)" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" strokeWidth="1.9394" />
            <path d={svgPaths.p106411f0} id="Vector_3" stroke="var(--stroke-0, black)" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" strokeWidth="1.9394" />
            <path d={svgPaths.p37a91c00} id="Vector_4" stroke="var(--stroke-0, black)" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" strokeWidth="1.9394" />
            <path d={svgPaths.pe90ec80} id="Vector_5" stroke="var(--stroke-0, black)" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" strokeWidth="1.9394" />
            <path d={svgPaths.p1e9a280} id="Vector_6" stroke="var(--stroke-0, black)" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" strokeWidth="1.9394" />
            <path d={svgPaths.p45de800} id="Vector_7" stroke="var(--stroke-0, black)" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" strokeWidth="1.9394" />
            <path d={svgPaths.p7782e00} id="Vector_8" stroke="var(--stroke-0, black)" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" strokeWidth="1.9394" />
          </g>
        </svg>
      </div>
    </div>
  );
}

function Container49() {
  return (
    <div className="h-[42.005px] relative shrink-0 w-[101.571px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <div className="absolute left-[27.22px] overflow-clip size-[48px] top-[-2.85px]" data-name="Icon/Tribute/Treat">
          <Color2 />
          <Line2 />
        </div>
      </div>
    </div>
  );
}

function Container50() {
  return (
    <div className="h-[16.493px] relative shrink-0 w-[101.571px]" data-name="Container">
      <p className="-translate-x-1/2 [word-break:break-word] absolute font-['Inter:Regular',sans-serif] font-normal leading-[16.5px] left-[51.07px] not-italic text-[#9ca3af] text-[11px] text-center top-[0.11px] whitespace-nowrap">Treats</p>
    </div>
  );
}

function ContainerMargin4() {
  return (
    <div className="relative shrink-0" data-name="Container (margin)">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start pt-[2px] relative size-full">
        <Container50 />
      </div>
    </div>
  );
}

function Container51() {
  return (
    <div className="h-[30px] relative shrink-0 w-[101.571px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="-translate-x-1/2 [word-break:break-word] absolute font-['Inter:Extra_Bold',sans-serif] font-extrabold leading-[30px] left-[51.36px] not-italic text-[#111827] text-[20px] text-center top-[-0.22px] whitespace-nowrap">0</p>
      </div>
    </div>
  );
}

function Container48() {
  return (
    <div className="absolute bg-[#f9fafb] content-stretch flex flex-col items-start left-[126.67px] px-[8.556px] py-[12.556px] rounded-[14px] top-0" data-name="Container">
      <div aria-hidden className="absolute border-[#f3f4f6] border-[0.556px] border-solid inset-0 pointer-events-none rounded-[14px]" />
      <Container49 />
      <ContainerMargin4 />
      <Container51 />
    </div>
  );
}

function Color3() {
  return (
    <div className="absolute inset-[7.08%_13.89%_14.16%_13.89%]" data-name="color">
      <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 34.6667 37.8063">
        <g id="color">
          <path d={svgPaths.p363e300} fill="var(--fill-0, #D7D68D)" id="Vector" />
          <path d={svgPaths.p3482d080} fill="var(--fill-0, #D7D68D)" id="Vector_2" />
          <path d={svgPaths.p2d8ef500} fill="var(--fill-0, #82BDB3)" id="Vector_3" />
          <path d={svgPaths.p300e8700} fill="var(--fill-0, #D7D68D)" id="Vector_4" />
          <path d={svgPaths.p12f98300} fill="var(--fill-0, #3F3F3F)" id="Vector_5" />
          <path d={svgPaths.p278ebb80} fill="var(--fill-0, #D7D68D)" id="Vector_6" />
          <path d={svgPaths.p228b7000} fill="var(--fill-0, #D7D68D)" id="Vector_7" />
        </g>
      </svg>
    </div>
  );
}

function Line3() {
  return (
    <div className="absolute inset-[7.08%_15.28%_15.27%_15.28%]" data-name="line">
      <div className="absolute inset-[-2.68%_-3%]">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 35.3333 39.2699">
          <g id="line">
            <path d={svgPaths.p29da4c80} fill="var(--fill-0, black)" id="Vector" />
            <path d={svgPaths.p1a8b0b80} fill="var(--fill-0, black)" id="Vector_2" />
            <path d={svgPaths.p369f5d00} id="Vector_3" stroke="var(--stroke-0, black)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
            <path d={svgPaths.p1dccf800} id="Vector_4" stroke="var(--stroke-0, black)" strokeMiterlimit="10" strokeWidth="2" />
            <path d={svgPaths.p135c300} id="Vector_5" stroke="var(--stroke-0, black)" strokeMiterlimit="10" strokeWidth="2" />
            <path d={svgPaths.p1048fa00} id="Vector_6" stroke="var(--stroke-0, black)" strokeMiterlimit="10" strokeWidth="2" />
            <path d={svgPaths.p340bd400} id="Vector_7" stroke="var(--stroke-0, black)" strokeMiterlimit="10" strokeWidth="2" />
            <path d={svgPaths.p2cb2ac00} id="Vector_8" stroke="var(--stroke-0, black)" strokeLinecap="round" strokeMiterlimit="10" strokeWidth="2" />
            <path d={svgPaths.p33511b00} id="Vector_9" stroke="var(--stroke-0, black)" strokeLinecap="round" strokeMiterlimit="10" strokeWidth="2" />
            <path d={svgPaths.p1471f500} id="Vector_10" stroke="var(--stroke-0, black)" strokeMiterlimit="10" strokeWidth="2" />
            <path d={svgPaths.p26067000} id="Vector_11" stroke="var(--stroke-0, black)" strokeMiterlimit="10" strokeWidth="2" />
            <path d="M17.6667 19.1563V21.1563" id="Vector_12" stroke="var(--stroke-0, black)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
            <path d={svgPaths.p1f531b80} id="Vector_13" stroke="var(--stroke-0, black)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
            <path d={svgPaths.p1a329580} id="Vector_14" stroke="var(--stroke-0, black)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
            <path d={svgPaths.p3c9c3ee0} id="Vector_15" stroke="var(--stroke-0, black)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
            <path d={svgPaths.p3a0f3800} id="Vector_16" stroke="var(--stroke-0, black)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
            <path d={svgPaths.p296756e0} id="Vector_17" stroke="var(--stroke-0, black)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
            <path d={svgPaths.p74cfe80} id="Vector_18" stroke="var(--stroke-0, black)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
          </g>
        </svg>
      </div>
    </div>
  );
}

function Container53() {
  return (
    <div className="h-[42.005px] relative shrink-0 w-[101.571px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <div className="absolute left-[26.56px] overflow-clip size-[48px] top-[-2.85px]" data-name="Icon/Tribute/Toy">
          <Color3 />
          <Line3 />
        </div>
      </div>
    </div>
  );
}

function Container54() {
  return (
    <div className="h-[16.493px] relative shrink-0 w-[101.571px]" data-name="Container">
      <p className="-translate-x-1/2 [word-break:break-word] absolute font-['Inter:Regular',sans-serif] font-normal leading-[16.5px] left-[50.98px] not-italic text-[#9ca3af] text-[11px] text-center top-[0.11px] whitespace-nowrap">Toys</p>
    </div>
  );
}

function ContainerMargin5() {
  return (
    <div className="relative shrink-0" data-name="Container (margin)">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start pt-[2px] relative size-full">
        <Container54 />
      </div>
    </div>
  );
}

function Container55() {
  return (
    <div className="h-[30px] relative shrink-0 w-[101.571px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="-translate-x-1/2 [word-break:break-word] absolute font-['Inter:Extra_Bold',sans-serif] font-extrabold leading-[30px] left-[51.36px] not-italic text-[#111827] text-[20px] text-center top-[-0.22px] whitespace-nowrap">0</p>
      </div>
    </div>
  );
}

function Container52() {
  return (
    <div className="absolute bg-[#f9fafb] content-stretch flex flex-col items-start left-[253.33px] px-[8.556px] py-[12.556px] rounded-[14px] top-0" data-name="Container">
      <div aria-hidden className="absolute border-[#f3f4f6] border-[0.556px] border-solid inset-0 pointer-events-none rounded-[14px]" />
      <Container53 />
      <ContainerMargin5 />
      <Container55 />
    </div>
  );
}

function Container43() {
  return (
    <div className="h-[115.599px] relative shrink-0 w-full" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <Container44 />
        <Container48 />
        <Container52 />
      </div>
    </div>
  );
}

function Container56() {
  return (
    <div className="h-[36px] relative shrink-0 w-[372.014px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start pt-[16px] relative size-full">
        <p className="[word-break:break-word] font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[19.5px] not-italic relative shrink-0 text-[#374151] text-[13px] whitespace-nowrap">Tribute log</p>
      </div>
    </div>
  );
}

function Container57() {
  return (
    <div className="relative shrink-0 w-[372.014px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-center pb-[24px] pt-[32px] px-[24px] relative size-full">
        <p className="[word-break:break-word] font-['Inter:Regular',sans-serif] font-normal leading-[19.5px] not-italic relative shrink-0 text-[#9ca3af] text-[13px] text-center w-[325px]">No tributes yet. Share your memorial and watch the love arrive! 🌸</p>
      </div>
    </div>
  );
}

function Container42() {
  return (
    <div className="relative shrink-0 w-[372.014px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start pt-[16px] relative size-full">
        <InlineContent8 />
        <Container43 />
        <Container56 />
        <Container57 />
      </div>
    </div>
  );
}

function Container38() {
  return (
    <div className="relative shrink-0 w-full" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start p-[24px] relative size-full">
        <ContainerMargin1 />
        <Container40 />
        <ContainerMargin2 />
        <Container42 />
      </div>
    </div>
  );
}

function ButtonClose() {
  return (
    <div className="absolute bg-[#f3f4f6] left-[362.01px] min-h-[44px] min-w-[44px] rounded-[21.997px] size-[44px] top-[13.99px]" data-name="Button - Close">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center justify-center min-h-[inherit] min-w-[inherit] relative size-full">
        <p className="[word-break:break-word] font-['Inter:Medium','Noto_Sans_Symbols2:Regular',sans-serif] font-medium leading-[24px] not-italic relative shrink-0 text-[#6b7280] text-[16px] text-center whitespace-nowrap">✕</p>
      </div>
    </div>
  );
}

function Container37() {
  return (
    <div className="bg-white h-[665.694px] max-h-[975.2000122070312px] max-w-[420px] relative rounded-[24px] shadow-[0px_24px_64px_0px_rgba(0,0,0,0.16),0px_8px_24px_0px_rgba(0,0,0,0.08)] shrink-0 w-[420px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start max-h-[inherit] max-w-[inherit] overflow-clip relative rounded-[inherit] size-full">
        <Container38 />
        <ButtonClose />
      </div>
    </div>
  );
}

function PetModal() {
  return (
    <div className="absolute bg-[rgba(0,0,0,0.45)] h-[1060px] left-0 top-0 w-[1521.111px]" data-name="PetModal">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center justify-center p-[16px] relative size-full">
        <Container37 />
      </div>
    </div>
  );
}

export default function KindredTailsYourMemorialTab() {
  return (
    <div className="bg-white content-stretch flex flex-col items-start relative size-full" data-name="Kindred Tails - Your Memorial Tab">
      <App />
      <PetModal />
    </div>
  );
}