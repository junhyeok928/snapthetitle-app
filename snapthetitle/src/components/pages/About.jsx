
const About = () => {
    return (
        <div className="flex flex-col lg:flex-row justify-center items-center">
            <section className="text-gray-600 body-font order-1 lg:order-none">
                <div className="container px-3 mx-auto">
                    <img
                        src="/about.jpg"
                        alt="About"
                        className="mx-auto mb-8 w-full max-w-md"
                    />
                </div>
            </section>
            <section className="text-gray-600 body-font order-2 lg:order-none flex flex-col justify-end">
                <div className="flex container px-3 pb-5 mx-auto">
                    <div className="xl:w-full lg:w-full w-full mx-auto mt-3 ">
                        <p className="leading-relaxed text-sm text-gray-500">
                            사진영상학 전공
                        </p>
                        <p className="leading-relaxed text-sm text-gray-500">
                            제 41회 신사회 展 LA FOTO , 서울
                        </p>
                        <p className="leading-relaxed text-sm text-gray-500 mb-5 lg:mb-12">
                            웨딩스튜디오 메인작가 (2018 - )
                        </p>
                        <p className="leading-relaxed text-md">결혼은 우리의 아름다운 장면들로 가득 찬 영화입니다.</p>
                        <p className="leading-relaxed text-md">
                            제가 찍는 사진은 그 영화의 타이틀이자, 장면이 됩니다.
                        </p>
                        <p className="leading-relaxed text-md">
                            그렇기에 제 촬영은 두 분에게 사랑에 빠지는 것 부터 시작합니다.
                        </p>
                        <p className="leading-relaxed text-md">
                            시선에 애정을 가득 담아,
                        </p>
                        <p className="leading-relaxed text-md">
                            각각의 커플이 가진 고유한 무드를 담아내고,
                        </p>
                        <p className="leading-relaxed text-md">
                            언제 봐도 그 순간이 다시 느껴지는 사진을 남기겠습니다.
                        </p>
                        <span className="inline-block h-1 w-10 rounded bg-gray-700 mt-8 mb-12"></span>
                        <h2 className="text-gray-900 font-medium title-font tracking-wider text-sm">
                            YEON JOO</h2>
                        <p className="text-gray-500">
                            Photographer
                        </p>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default About;