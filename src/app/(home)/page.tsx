import { Button } from '@nextui-org/react';

export default function Home() {
    return (
        <div className="relative flex min-h-screen flex-col justify-start text-base">
          <section className="flex flex-col mt-80 items-center justify-center text-center">
            <div className="relative z-10 max-w-3xl text-justify font-fixelDisplay text-standard">
              <p>
                Готовий підкорити світ нерухомості та стати справжнім магнатом?
                Ласкаво просимо до онлайн монополії “Yuka”! Грай з друзями або
                новими знайомими, інвестуй, купуй, торгуй та захоплюй міста.
                Випробуй свою стратегію та покажи, хто справжній король бізнесу!
                Натискай, щоб розпочати гру і втілити свої фінансові мрії в
                реальність!
              </p>
            </div>

            <div className="group relative mt-6 inline-block h-[40px] w-[190px]">
      <span
          className="absolute inset-0 translate-x-1 translate-y-1 rounded-[5px] border border-white transition-all duration-200 group-hover:translate-x-0 group-hover:translate-y-0 group-hover:bg-primaryGame"></span>
              <button
                  className="relative h-[40px] w-[190px] rounded-[5px] border border-white bg-primaryGame font-custom text-standard font-bold transition-all duration-200 group-hover:translate-x-1 group-hover:translate-y-1 group-hover:bg-primary">
                РОЗПОЧАТИ ГРУ
              </button>
            </div>
            <div className="flex-grow"></div>
          </section>

          <section className="relative w-full mt-36 min-h-screen flex flex-col justify-center">
            <div className="w-full flex flex-col gap-6">
              <div className="flex items-center gap-4 ml-32">
                <img src="/images/monkey%231.png" alt="Грай безкоштовно" className="h-auto w-48"/>
                <div>
                  <h3 className="font-custom text-lg">ГРАЙ БЕЗКОШТОВНО!</h3>
                  <p className="mt-1 w-[287px] text-justify font-fixelDisplay text-standard">
                    Ніяких оплат чи підписок – просто створюйте акаунт і починайте будувати свою імперію!
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-4 self-end mt-0 mr-40">
                <img src="/images/monkey%232.png" alt="Знайомства" className="h-auto w-48"/>
                <div>
                  <h3 className="font-custom text-lg">ЗНАЙОМСТВА ТА НОВІ ДРУЗІ!</h3>
                  <p className="mt-1 w-[290px] text-justify font-fixelDisplay text-standard">
                    Грай з новими людьми, знаходь друзів та спілкуйся прямо в грі. Створюйте тактики або просто
                    веселіться разом!
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-4 mt-0 ml-32">
                <img src="/images/monkey%233.png" alt="Грай будь-де" className="h-auto w-48"/>
                <div>
                  <h3 className="font-custom text-lg">ГРАЙ БУДЬ-ДЕ І БУДЬ-КОЛИ</h3>
                  <p className="mt-1 w-[295px] text-justify font-fixelDisplay text-standard">
                    Наша гра доступна на будь-якому пристрої – вдома на комп’ютері чи в дорозі на смартфоні.
                  </p>
                </div>
              </div>
            </div>
          </section>
          <section className="relative flex items-center justify-center min-h-screen">
            <img
                src="/images/molecule.png"
                alt="Molecule"
                className="absolute h-auto"
            />

            <div className="relative z-10 w-full max-w-5xl">
              <p className="absolute bottom-[60px] left-0 text-8xl  font-custom">
                СТАНЬ <br/>
                ЧАСТИНОЮ
              </p>

              <p className="absolute top-0 right-0 text-right text-8xl font-custom">
                НАШОГО <br/>
                COMMUNITY
              </p>
            </div>
          </section>

        </div>
    );
}
