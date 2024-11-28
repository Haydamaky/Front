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

            <div className="ml-[30px] hidden h-10 items-center space-x-[30px] font-custom text-[13px] text-base md:flex">
                {["TV", "Друзі", "Інвентар", "Магазин"].map((item, index) => (
                    <a
                        key={index}
                        href="#"
                        className="relative text-base transition-all duration-300 hover:text-lg hover:after:absolute hover:after:left-0 hover:after:top-[calc(100%+10px)] hover:after:h-[2px] hover:after:w-full hover:after:bg-primary"
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

            <div className="absolute right-[50px] hidden md:flex items-center justify-center">
                <div className="absolute h-[80px] w-[80px] rounded-full bg-primary"></div>
                <div className="relative flex h-[75px] w-[75px] items-center justify-center rounded-full border-[2px] border-dashed border-base">
                    <span className="text-[14px] font-custom text-base">Увійти</span>
                </div>
            </div>
        </nav>
    );
};

export default function Home() {
    return (
        <section id="hero">
            <div className="px-6 py-12 md:px-0">
                <Navigation />
            </div>
        </section>
    );
}
