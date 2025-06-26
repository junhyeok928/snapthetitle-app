import React from "react";

const Reservation = () => {
    return (
        <section className="text-gray-600 body-font relative">
            <div className="container px-5 mx-auto">
                <div className="flex flex-col text-center w-full mb-12">
                    <p className="lg:w-2/3 mx-auto leading-relaxed text-base sm:text-xxs md:text-base lg:text-base">
                        모든 예약/문의는 카카오톡 채널 <strong>"스냅더타이틀"</strong>을 통해 받고 있습니다.
                    </p>
                </div>
                {/* 로고 및 버튼 */}
                <div className="flex justify-center items-center mb-3">
                    {/* 로고 이미지 */}
                    <div className="w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center">
                        <img
                            src="/kakao.png"
                            alt="kakao"
                            className="mx-auto w-full max-w-md"
                        />
                    </div>
                </div>
                <div className="flex justify-center">
                    <a
                        href="https://pf.kakao.com/_HquIG"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex text-white bg-gray-400 border-0 py-2 px-6 focus:outline-none hover:bg-gray-600 rounded text-md"
                    >
                        카카오톡 채널 상담 바로가기
                    </a>
                </div>
                {/* 중앙 선 */}
                <div className="border-t-2 border-gray-300 my-10"></div>
                {/* 텍스트 정보 */}
                <div className="text-center">
                    <p className="mb-4 text-red-500 font-medium text-xs sm:text-xxs md:text-base lg:text-base">
                        공지사항 및 예약 규정 미숙지로 인해 발생되는 일은 책임지지 않습니다. <br/>불이익이 없으시도록 꼼꼼히 체크한 후 신중한 예약을 부탁드립니다.
                    </p>
                    <p className="mb-4 text-gray-700 text-xs sm:text-xxs md:text-base lg:text-base">
                        예약확정은 <strong>입금순</strong>으로 진행됩니다.
                    </p>
                    <p className="mb-4 text-gray-700 text-xs sm:text-xxs md:text-base lg:text-base">
                        예약금은 촬영금액의 50%이며, 입금 시 예약이 확정됩니다.
                    </p>
                    <p className="mb-4 text-gray-700 text-xs sm:text-xxs md:text-base lg:text-base">
                        잔금은 촬영 시작 전까지 입금하는 것을 원칙으로 합니다.
                    </p>
                    <p className="mb-4 text-gray-700 text-xs sm:text-xxs md:text-base lg:text-base">
                        채널 친구추가 후 자동으로 예약양식이 발송되오나, 발송되지 않을 경우에는 아래의 예약 정보를 참고해주세요.
                    </p>
                    {/* 예약 정보 */}
                    <div className="p-6 text-center">
                        <p className="mb-2 text-gray-700 text-xs sm:text-xxs md:text-xs lg:text-sm">신랑님 성함:</p>
                        <p className="mb-2 text-gray-700 text-xs sm:text-xxs md:text-xs lg:text-sm">신부님 성함:</p>
                        <p className="mb-2 text-gray-700 text-xs sm:text-xxs md:text-xs lg:text-sm">대표 연락처:</p>
                        <p className="mb-2 text-gray-700 text-xs sm:text-xxs md:text-xs lg:text-sm">본식일:</p>
                        <p className="mb-2 text-gray-700 text-xs sm:text-xxs md:text-xs lg:text-sm">촬영희망일:</p>
                        <p className="mb-2 text-gray-700 text-xs sm:text-xxs md:text-xs lg:text-sm">촬영상품:</p>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Reservation;
