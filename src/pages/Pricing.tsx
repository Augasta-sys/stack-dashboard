import { useState } from "react"
import { Check, X } from "lucide-react"
import { useNavigate } from "react-router-dom"

import DashboardLayout from "../components/dashboard/DashboardLayout"
import { useLanguage } from "../context/LanguageContext"

type Language = "en" | "fr" | "es"
type PlanId = "basic" | "standard" | "premium"

type Plan = {
  id: PlanId
  name: Record<Language, string>
  price: string
  features: [boolean, boolean, boolean, boolean, boolean, boolean, boolean]
}

const plans: Plan[] = [
  {
    id: "basic",
    name: { en: "Basic", fr: "Basique", es: "Básico" },
    price: "$14.99",
    features: [true, true, true, false, false, false, false],
  },
  {
    id: "standard",
    name: { en: "Standard", fr: "Standard", es: "Estándar" },
    price: "$49.99",
    features: [true, true, true, true, true, false, true],
  },
  {
    id: "premium",
    name: { en: "Premium", fr: "Premium", es: "Premium" },
    price: "$89.99",
    features: [true, true, true, true, true, true, true],
  },
]

const copy = {
  en: {
    title: "Pricing",
    monthly: "Monthly Charge",
    features: [
      "Free Setup",
      "Bandwidth Limit 10 GB",
      "20 User Connection",
      "Analytics Report",
      "Public API Access",
      "Plugins Integration",
      "Custom Content Management",
    ],
    getStarted: "Get Started",
    trial: "Start Your 30 Day Free Trial",
    selected: "Plan Selected",
    selectedText: "You selected the {plan} plan.",
    continue: "Continue to Sign Up",
    close: "Close",
    secure: "No payment is required to start your free trial.",
  },
  fr: {
    title: "Tarification",
    monthly: "Frais mensuels",
    features: [
      "Installation gratuite",
      "Limite de bande passante 10 Go",
      "20 connexions utilisateur",
      "Rapport analytique",
      "Accès API public",
      "Intégration des plugins",
      "Gestion de contenu personnalisée",
    ],
    getStarted: "Commencer",
    trial: "Commencer votre essai gratuit de 30 jours",
    selected: "Forfait sélectionné",
    selectedText: "Vous avez sélectionné le forfait {plan}.",
    continue: "Continuer vers l'inscription",
    close: "Fermer",
    secure: "Aucun paiement n'est requis pour commencer votre essai gratuit.",
  },
  es: {
    title: "Precios",
    monthly: "Cargo mensual",
    features: [
      "Configuración gratuita",
      "Límite de ancho de banda 10 GB",
      "20 conexiones de usuario",
      "Informe de análisis",
      "Acceso a API pública",
      "Integración de plugins",
      "Gestión de contenido personalizada",
    ],
    getStarted: "Comenzar",
    trial: "Comienza tu prueba gratuita de 30 días",
    selected: "Plan seleccionado",
    selectedText: "Has seleccionado el plan {plan}.",
    continue: "Continuar al registro",
    close: "Cerrar",
    secure: "No se requiere ningún pago para comenzar la prueba gratuita.",
  },
} as const

function AmoebaPattern() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 700 1000"
      preserveAspectRatio="none"
      className="
        pointer-events-none
        absolute
        inset-0
        h-full
        w-full
        text-[#202224]
        opacity-[0.045]
        dark:text-white
        dark:opacity-[0.025]
      "
    >
      <g
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        {/* =====================================================
            CONTINUOUS OUTER ORGANIC CONTOUR
            ===================================================== */}

        <path
          d="
            M -80 120

            C 20 40, 150 35, 220 95
            C 285 150, 260 225, 325 255
            C 395 286, 505 235, 575 280
            C 655 332, 650 425, 585 475

            C 530 518, 430 490, 395 550
            C 350 625, 440 665, 505 690
            C 590 722, 625 805, 570 870

            C 520 930, 420 890, 350 930
            C 270 975, 290 1035, 300 1080
          "
        />

        {/* =====================================================
            SECOND CONTINUOUS CONTOUR
            ===================================================== */}

        <path
          d="
            M -60 140

            C 25 65, 135 60, 195 110
            C 250 155, 235 215, 290 245
            C 350 278, 470 240, 540 285
            C 610 330, 610 405, 555 450

            C 505 490, 420 470, 385 535
            C 350 600, 425 640, 495 670
            C 565 700, 600 770, 555 825

            C 515 875, 425 845, 360 885
            C 290 925, 300 985, 310 1025
          "
        />

        {/* =====================================================
            THIRD CONTINUOUS CONTOUR
            ===================================================== */}

        <path
          d="
            M -40 160

            C 30 90, 120 88, 175 125
            C 220 158, 212 205, 258 235
            C 310 270, 425 248, 505 290
            C 570 325, 575 390, 530 425

            C 485 460, 415 450, 382 515
            C 355 570, 415 615, 480 645
            C 540 673, 570 735, 535 780

            C 500 825, 430 805, 370 842
            C 315 876, 315 935, 322 975
          "
        />

        {/* =====================================================
            FOURTH CONTINUOUS CONTOUR
            ===================================================== */}

        <path
          d="
            M -15 182

            C 42 120, 105 115, 158 145
            C 198 169, 195 204, 235 230
            C 280 260, 380 255, 465 295
            C 525 325, 535 375, 500 405

            C 465 437, 408 432, 380 495
            C 356 545, 410 590, 465 618
            C 515 644, 540 698, 512 738

            C 485 778, 430 765, 380 795
            C 335 822, 330 875, 337 920
          "
        />

        {/* =====================================================
            LEFT SIDE CONTINUOUS FINGERPRINT CURVES
            These connect into the main contour flow.
            ===================================================== */}

        <path
          d="
            M -90 350

            C -20 290, 85 295, 125 350
            C 165 405, 130 465, 70 470
            C 10 475, -25 425, 5 380

            C 35 335, 105 345, 125 390
            C 145 435, 115 465, 80 475

            C 50 485, 35 515, 50 545
            C 65 575, 105 585, 135 570
          "
        />

        <path
          d="
            M -65 365

            C -5 320, 70 325, 105 365
            C 140 405, 112 445, 72 450
            C 32 455, 8 425, 27 395

            C 46 365, 92 372, 105 402
            C 117 432, 98 450, 75 458

            C 50 467, 48 492, 61 515
          "
        />

        {/* =====================================================
            RIGHT SIDE CONTINUOUS FLOW
            ===================================================== */}

        <path
          d="
            M 480 120

            C 550 80, 650 105, 720 165
            C 760 200, 750 255, 700 275

            C 650 295, 600 270, 590 230
            C 580 190, 620 165, 660 180

            C 700 195, 705 235, 680 250
            C 655 265, 625 250, 620 225

            C 615 200, 640 188, 658 198
          "
        />

        {/* =====================================================
            LOWER CONTINUOUS CURVES
            ===================================================== */}

        <path
          d="
            M -70 700

            C 10 635, 120 650, 155 715
            C 190 780, 140 835, 75 830
            C 10 825, -20 770, 20 730

            C 60 690, 125 710, 140 755
            C 155 800, 125 825, 92 828

            C 60 832, 55 865, 78 890
            C 105 920, 150 915, 185 895
          "
        />

        <path
          d="
            M 210 650

            C 290 610, 390 635, 420 695
            C 450 755, 410 810, 350 805
            C 290 800, 260 755, 285 715

            C 310 675, 370 680, 390 715
            C 410 750, 385 780, 355 780

            C 325 780, 315 805, 330 830
            C 345 855, 390 858, 425 840
          "
        />

        {/* =====================================================
            VERY LARGE BOTTOM CONTINUOUS CONTOUR
            ===================================================== */}

        <path
          d="
            M 120 1020

            C 95 960, 130 900, 195 885
            C 260 870, 310 915, 295 965
            C 280 1010, 220 1030, 180 1000
            C 145 975, 155 930, 190 915
            C 225 900, 260 925, 258 955
            C 256 980, 225 995, 205 978
          "
        />
      </g>
    </svg>
  )
}

export default function Pricing() {
  const { language } = useLanguage()
  const navigate = useNavigate()
  const currentLanguage = (language in copy ? language : "en") as Language
  const t = copy[currentLanguage]
  const [selectedPlan, setSelectedPlan] = useState<Plan | null>(null)
  const [action, setAction] = useState<"started" | "trial">("started")

  const openPlan = (plan: Plan, nextAction: "started" | "trial") => {
    setSelectedPlan(plan)
    setAction(nextAction)
  }

  const continueToSignUp = () => {
    if (!selectedPlan) return

    const trial = action === "trial" ? "true" : "false"
    navigate(`/signup?plan=${selectedPlan.id}&trial=${trial}`)
  }

  return (
    <DashboardLayout>
      <section className="w-full">
        <h1 className="mb-7 font-sans text-[24px] font-bold leading-none tracking-[-0.11px] text-[#202224] dark:text-white sm:text-[32px]">
          {t.title}
        </h1>

        <div className="grid grid-cols-1 items-stretch gap-6 sm:gap-[30px] md:grid-cols-2 xl:grid-cols-3">
        {plans.map((plan) => (
            <article
              key={plan.id}
              className="group relative flex min-h-[760px] w-full flex-col items-center overflow-hidden rounded-[24px] border border-[#B9B9B9]/20 bg-white px-6 py-8 text-center shadow-[6px_6px_54px_rgba(0,0,0,0.05)] transition-all duration-300 hover:-translate-y-1.5 hover:shadow-xl dark:border-[#313D4F] dark:bg-[#273142] sm:min-h-[820px] sm:px-10 sm:py-[40px]"
            >
            <AmoebaPattern />

              <div className="relative z-10 flex w-full flex-1 flex-col items-center">
                <div className="w-full border-b border-[#202224]/10 pb-8 dark:border-white/10">
                  <h2 className="mb-3 font-sans text-[22px] font-bold leading-none tracking-[-0.08px] text-[#202224] dark:text-white">
                    {plan.name[currentLanguage]}
                  </h2>
                  <p className="mb-3 text-[16px] font-normal leading-[24px] text-[#202224]/75 dark:text-white/75">
                    {t.monthly}
                  </p>
                  <p className="font-sans text-[48px] font-bold leading-none tracking-[-1px] text-[#4880FF] sm:text-[50px]">
                    {plan.price}
                  </p>
                </div>

                <div className="flex w-full flex-1 flex-col items-center pt-6 sm:pt-8">
                  <ul className="flex w-full flex-1 flex-col items-center">
                    {t.features.map((feature, featureIndex) => {
                      const enabled = plan.features[featureIndex]

                      return (
                        <li
                          key={feature}
                          className={`flex min-h-[53px] w-full items-center justify-center text-center text-[17px] leading-[24px] transition-colors duration-200 sm:text-[18px] ${
                            enabled
                              ? "text-[#202224] dark:text-white"
                              : "text-[#202224]/35 dark:text-white/35"
                          }`}
                        >
                          <span>{feature}</span>
                        </li>
                      )
                    })}
                  </ul>

                  <div className="mt-auto flex w-full flex-col items-center">
                    <button
                      type="button"
                      onClick={() => openPlan(plan, "started")}
                      className="flex h-[60px] w-full max-w-[250px] items-center justify-center rounded-full border-2 border-[#4880FF] bg-transparent px-6 text-[16px] font-bold text-[#4880FF] outline-none transition-all duration-200 hover:-translate-y-0.5 hover:bg-[#4880FF] hover:text-white hover:shadow-[0_10px_25px_rgba(72,128,255,0.22)] focus-visible:ring-2 focus-visible:ring-[#4880FF] focus-visible:ring-offset-2 dark:focus-visible:ring-offset-[#273142]"
                    >
                      {t.getStarted}
                    </button>

                    <button
                      type="button"
                      onClick={() => openPlan(plan, "trial")}
                      className="mt-6 rounded-md text-[16px] font-semibold leading-6 text-[#202224] underline decoration-1 underline-offset-2 transition-colors duration-200 hover:text-[#4880FF] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#4880FF] dark:text-white dark:hover:text-[#4880FF]"
                    >
                      {t.trial}
                    </button>
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      {selectedPlan && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50 px-4 py-6 backdrop-blur-sm"
          role="presentation"
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) setSelectedPlan(null)
          }}
        >
          <div
            role="dialog"
            aria-modal="true"
            aria-labelledby="pricing-dialog-title"
            className="relative w-full max-w-[460px] rounded-[24px] bg-white p-7 shadow-2xl dark:bg-[#273142] sm:p-9"
          >
            <button
              type="button"
              aria-label={t.close}
              onClick={() => setSelectedPlan(null)}
              className="absolute right-5 top-5 flex h-9 w-9 items-center justify-center rounded-full text-[#202224]/60 transition-colors hover:bg-[#F5F6FA] hover:text-[#202224] dark:text-white/60 dark:hover:bg-[#1B2431] dark:hover:text-white"
            >
              <X size={20} />
            </button>

            <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-full bg-[#4880FF]/10 text-[#4880FF]">
              <Check size={24} strokeWidth={2.5} />
            </div>

            <h2
              id="pricing-dialog-title"
              className="pr-8 text-[24px] font-bold text-[#202224] dark:text-white"
            >
              {action === "trial" ? t.trial : t.selected}
            </h2>

            <p className="mt-3 text-[16px] leading-6 text-[#202224]/70 dark:text-white/70">
              {t.selectedText.replace("{plan}", selectedPlan.name[currentLanguage])}
            </p>

            <div className="mt-5 rounded-[16px] bg-[#F5F6FA] p-4 dark:bg-[#1B2431]">
              <div className="flex items-center justify-between gap-4">
                <span className="text-[15px] text-[#202224]/70 dark:text-white/70">
                  {selectedPlan.name[currentLanguage]}
                </span>
                <span className="text-[20px] font-bold text-[#4880FF]">
                  {selectedPlan.price}
                </span>
              </div>
              <p className="mt-2 text-[13px] leading-5 text-[#202224]/55 dark:text-white/55">
                {t.secure}
              </p>
            </div>

            <div className="mt-7 flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
              <button
                type="button"
                onClick={() => setSelectedPlan(null)}
                className="h-11 rounded-full border border-[#D5D5D5] px-6 text-[15px] font-semibold text-[#202224] transition-colors hover:bg-[#F5F6FA] dark:border-[#313D4F] dark:text-white dark:hover:bg-[#1B2431]"
              >
                {t.close}
              </button>
              <button
                type="button"
                onClick={continueToSignUp}
                className="h-11 rounded-full bg-[#4880FF] px-6 text-[15px] font-semibold text-white transition-all hover:bg-[#3d73eb] hover:shadow-[0_8px_20px_rgba(72,128,255,0.25)]"
              >
                {t.continue}
              </button>
            </div>
          </div>
        </div>
      )}
    </DashboardLayout>
  )
}
