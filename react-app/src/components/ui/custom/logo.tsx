import Image from 'next/image';

export default function Logo ({ isInverted = false }: { isInverted?: boolean}) {
  let logoSrc = "/logo.svg";

  if (isInverted) {
    logoSrc = "/logo-invert.svg";
  }

  return (
    <a href="/">
      {/* <Image
        src={logoSrc}
        width={128}
        height={128}
        alt="Partial asterisk"
      /> */}
      <img src="/logo.svg" className={isInverted ? 'filter-white' : 'filter-black'}
        style={{transform: [{rotate: '0.01deg'}] as any }}/>
    </a>
  );
};