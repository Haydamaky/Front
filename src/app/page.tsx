import React from "react";

const Navigation = () => {
  return (
    <nav className="text-custom relative mx-auto mt-[35px] flex h-[32px] w-full max-w-[1170px] items-center justify-start overflow-visible rounded-[17.5px] bg-primary px-[25px] text-base md:px-[10%]">
      <button
        className="ml-[105px] h-[40px] w-[140px] rounded-[17.5px] border-[4px] border-primary bg-base text-center font-custom text-[15px] leading-[22px] text-primary transition-colors duration-300 hover:border-base hover:bg-primary hover:text-base md:ml-0"
        aria-label="Грати"
      >
        Грати
      </button>

      <div className="ml-[30px] hidden h-10 items-center space-x-[30px] font-custom text-base md:flex">
        {['TV', 'Друзі', 'Інвентар', 'Магазин'].map((item, index) => (
          <a
            key={index}
            href="#"
            className="relative text-standard transition-all duration-300 hover:text-lg hover:after:absolute hover:after:left-0 hover:after:top-[calc(100%+10px)] hover:after:h-[2px] hover:after:w-full hover:after:bg-primary"
          >
            {item}
          </a>
        ))}
      </div>

      <input
        type="text"
        placeholder="Пошук"
        className="absolute right-[200px] hidden h-[20px] w-[120px] rounded-[11.5px] bg-base px-2 text-[10px] text-primary outline-none focus:ring-2 focus:ring-primary md:block md:py-[6px] lg:block"
        aria-label="Пошук"
      />

      <div className="absolute right-[50px] hidden items-center justify-center md:flex">
        <div className="absolute h-[80px] w-[80px] rounded-full bg-primary"></div>
        <div className="relative flex h-[75px] w-[75px] items-center justify-center rounded-full border-[2px] border-dashed border-base">
          <span className="font-custom text-[14px]">Увійти</span>
        </div>
      </div>
    </nav>
  );
};

export default function Home() {
  return (
    <div className="px-6 py-12 md:px-0">
      <Navigation />

      <div className="mt-[345px] flex flex-col items-center text-center md:mt-[600px]">
        <p className="mb-6 w-full max-w-[220px] text-justify font-second text-standardMob leading-[1.4] text-primary md:max-w-[720px] md:text-standard md:leading-[1.6]">
          Готовий підкорити світ нерухомості та стати справжнім магнатом?
          Ласкаво просимо до онлайн монополії “Yuka”! Грай з друзями або новими
          знайомими, інвестуй, купуй, торгуй та захоплюй міста. Випробуй свою
          стратегію та покажи, хто справжній король бізнесу! Натискай, щоб
          розпочати гру і втілити свої фінансові мрії в реальність!
        </p>
        <button className="group relative flex h-[32px] w-[150px] items-center justify-center rounded-[5px] border border-black bg-helper font-custom text-standardMob text-black transition-colors duration-75 hover:bg-secondary hover:text-white md:h-[40px] md:w-[190px] md:text-standard">
          <span className="absolute left-[5px] top-[5px] -z-10 h-full w-full rounded-[5px] border border-black bg-secondary transition-colors duration-75 group-hover:bg-helper"></span>
          <span className="relative transition-colors duration-75 group-hover:text-white">
            Розпочати гру
          </span>
        </button>
      </div>
    </div>
  );
}
