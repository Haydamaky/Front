export default function Home() {
  return (
    <div className="relative flex min-h-screen flex-col justify-start text-base">
      <section className="mt-80 flex flex-col items-center justify-center text-center">
        <div className="relative z-10 max-w-3xl text-justify font-fixelDisplay text-standard">
          <p>
            Ready to conquer the world of real estate and become a real tycoon?
            Welcome to the online monopoly game Yuka! Play with friends or or
            new acquaintances, invest, buy, trade, and take over cities. Put
            your strategy to the test and show who is the real king of business!
            Click to start the game and make your financial dreams come true!
            into reality!
          </p>
        </div>

        <div className="group relative mt-6 inline-block h-[40px] w-[190px]">
          <span className="absolute inset-0 translate-x-1 translate-y-1 rounded-[5px] border border-white transition-all duration-200 group-hover:translate-x-0 group-hover:translate-y-0 group-hover:bg-primaryGame"></span>
          <button className="relative h-[40px] w-[190px] rounded-[5px] border border-white bg-primaryGame font-custom text-standard font-bold transition-all duration-200 group-hover:translate-x-1 group-hover:translate-y-1 group-hover:bg-darkHome">
            START THE GAME
          </button>
        </div>
        <div className="flex-grow"></div>
      </section>

      <section className="relative mt-36 flex min-h-screen w-full flex-col justify-center">
        <div className="flex w-full flex-col gap-6">
          <div className="ml-32 flex items-center gap-4">
            <img
              src="/images/monkey%231.png"
              alt="Грай безкоштовно"
              className="h-auto w-48"
            />
            <div>
              <h3 className="font-custom text-lg">PLAY FOR FREE</h3>
              <p className="mt-1 w-[287px] text-justify font-fixelDisplay text-standard">
                No payments or subscriptions - just create an account and start
                building your empire!
              </p>
            </div>
          </div>

          <div className="mr-40 mt-0 flex items-center gap-4 self-end">
            <img
              src="/images/monkey%232.png"
              alt="Знайомства"
              className="h-auto w-48"
            />
            <div>
              <h3 className="font-custom text-lg">MEETINGS AND NEW FRIENDS</h3>
              <p className="mt-1 w-[290px] text-justify font-fixelDisplay text-standard">
                Play with new people, make friends, and chat right in the game.
                Create tactics or just have fun together!
              </p>
            </div>
          </div>

          <div className="ml-32 mt-0 flex items-center gap-4">
            <img
              src="/images/monkey%233.png"
              alt="Грай будь-де"
              className="h-auto w-48"
            />
            <div>
              <h3 className="font-custom text-lg">PLAY ANYWHERE AND ANYTIME</h3>
              <p className="mt-1 w-[295px] text-justify font-fixelDisplay text-standard">
                Our game is available on any device - at home on your computer
                or on the go on your smartphone.
              </p>
            </div>
          </div>
        </div>
      </section>
      <section className="relative flex min-h-screen items-center justify-center">
        <img
          src="/images/molecule.png"
          alt="Molecule"
          className="absolute h-auto"
        />

        <div className="relative z-10 w-full max-w-5xl">
          <p className="absolute bottom-[60px] left-0 font-custom text-8xl">
            STATE <br />
            PART
          </p>

          <p className="absolute right-0 top-0 text-right font-custom text-8xl">
            OURS <br />
            COMMUNITY
          </p>
        </div>
      </section>
    </div>
  );
}
