import { is } from '@react-three/fiber/dist/declarations/src/core/utils';
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
      { isInverted ? <img src="/logo-invert.svg"/> : <img src="/logo.svg"/>}
      {/* <img src="/logo.svg" className={isInverted ? 'filter-white' : 'filter-black'}/> */}
    </a>
  );
};