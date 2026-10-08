export default function AuthBackground() {
  return (
    <div className="pointer-events-none fixed inset-0 overflow-hidden">
      <div className="absolute inset-0 bg-[#4880FF] dark:bg-[#1B2431]" />

      <svg
        className="absolute inset-0 h-full w-full"
        viewBox="0 0 1440 1070"
        preserveAspectRatio="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
      >
        {/* Top left */}
        <path
          className="fill-[#5288FF] dark:fill-[#222D3E]"
          d="
            M0 0
            H780
            C815 85 820 175 800 255
            C775 350 715 405 635 430
            C550 455 465 420 395 365
            C320 305 270 280 205 290
            C130 300 65 350 0 375
            Z
          "
        />

        {/* Top right */}
        <path
          className="fill-[#5288FF] dark:fill-[#273142]"
          d="
            M790 0
            H1440
            V80
            C1370 410 1340 385 1290 400
            C1190 415 1120 380 1090 385
            C1000 360 940 325 905 250
            C965 175 850 85 850 0
            Z
          "
        />

        {/* Bottom left */}
        <path
          className="fill-[#5288FF] dark:fill-[#222D3E]"
          d="
            M0 565
            C85 510 175 480 255 485
            C315 490 335 525 322 590
            C308 660 275 730 288 790
            C300 850 350 870 425 852
            C500 835 570 815 630 845
            C700 880 715 955 705 1070
            H0
            Z
          "
        />

        {/* Bottom right */}
        <path
          className="fill-[#5288FF] dark:fill-[#273142]"
          d="
            M850 1070
            C840 975 850 900 900 850
            C950 805 1025 805 1095 825
            C1170 845 1235 875 1290 858
            C1350 840 1370 790 1380 715
            C1390 635 1405 535 1440 435
            V1070
            Z
          "
        />
      </svg>
    </div>
  )
}