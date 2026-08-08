interface FloatingLogoProps {
  src: string;
  alt: string;
  position: string;
  animation: string;
  enterAnimation: string;
}

const logos: FloatingLogoProps[] = [
  {
    src: "/tux.png",
    alt: "",
    position:
      "left-0 top-[12%] -translate-x-[24%] sm:-translate-x-[30%] md:-translate-x-[32%]",
    animation: "floating-logo-left-1",
    enterAnimation: "logo-enter-left",
  },
  {
    src: "/rust-r.png",
    alt: "",
    position:
      "right-0 top-[24%] translate-x-[24%] sm:translate-x-[30%] md:translate-x-[32%]",
    animation: "floating-logo-right-1",
    enterAnimation: "logo-enter-right",
  },
  {
    src: "/cpp-r.png",
    alt: "",
    position:
      "left-0 top-[38%] -translate-x-[26%] sm:-translate-x-[34%] md:-translate-x-[38%]",
    animation: "floating-logo-left-2",
    enterAnimation: "logo-enter-left",
  },
  {
    src: "/python-r.png",
    alt: "",
    position:
      "right-0 top-[52%] translate-x-[26%] sm:translate-x-[34%] md:translate-x-[38%]",
    animation: "floating-logo-right-2",
    enterAnimation: "logo-enter-right",
  },
  {
    src: "/photoshop-r.png",
    alt: "",
    position:
      "left-0 top-[66%] -translate-x-[22%] sm:-translate-x-[28%] md:-translate-x-[30%]",
    animation: "floating-logo-left-3",
    enterAnimation: "logo-enter-left",
  },
  {
    src: "/gopher.png",
    alt: "",
    position:
      "right-0 top-[78%] translate-x-[22%] sm:translate-x-[28%] md:translate-x-[30%]",
    animation: "floating-logo-right-3",
    enterAnimation: "logo-enter-right",
  },
];

interface FloatingLogosProps {
  transitionKey?: string | number;
}

export default function FloatingLogos({
  transitionKey = "initial",
}: FloatingLogosProps) {
  return (
    <aside
      key={transitionKey}
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 z-0 overflow-visible"
    >
      {logos.map((logo, index) => (
        <figure
          key={`${transitionKey}-${logo.src}-${index}`}
          className={`
            absolute
            ${logo.position}
            ${logo.enterAnimation}
          `}
          style={{
            animationDelay: `${index * 90}ms`,
          }}
        >
          <img
            src={logo.src}
            alt=""
            draggable={false}
            className={`
              h-auto
              w-16
              sm:w-16
              md:w-20
              lg:w-16
              select-none
              object-contain
              drop-shadow-xl
              ${logo.animation}
            `}
          />
        </figure>
      ))}
    </aside>
  );
}
