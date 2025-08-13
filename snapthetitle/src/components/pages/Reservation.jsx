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
                        공지사항 및 예약 규정을 충분히 숙지하지 않아 발생하는 상황에 대해서는 책임지지 않습니다.
                        <br/>
                        불이익이 없도록 반드시 내용을 꼼꼼히 확인하시고 신중하게 예약해 주시기 바랍니다.
                    </p>
                    
                    {/* 추가된 예약 및 결제 규정 */}
                    <div className="mb-8 text-left max-w-4xl mx-auto space-y-6">
                        {/* 예약 및 결제 규정 */}
                        <div className="bg-white p-6 rounded-xl border-l-4 border-gray-400 shadow-lg">
                            <h3 className="text-xl font-bold mb-4 text-gray-800 flex items-center">
                                {/*<span className="text-2xl mr-3">💳</span>*/}
                                예약 및 결제 규정
                            </h3>
                            <div className="mb-4">
                                <h4 className="font-semibold mb-3 text-gray-700">• 예약 확정 절차</h4>
                                <div className="ml-4 text-sm space-y-2 bg-gray-50 p-4 rounded-lg border">
                                    <p className="flex items-start"><span className="text-gray-500 mr-2 font-medium">1.</span>촬영 가능 여부 안내 후 2시간 이내 예약금 입금</p>
                                    <p className="flex items-start"><span className="text-gray-500 mr-2 font-medium">2.</span>입금 확인 시 예약 확정 (입금 순 예약 확정)</p>
                                    <p className="flex items-start"><span className="text-gray-500 mr-2 font-medium">3.</span>2시간 이내 미입금 시 자동 취소(재예약 필요)</p>
                                </div>
                            </div>
                            <div className="text-sm space-y-2 bg-gray-50 p-4 rounded-lg border">
                                <p className="flex items-center"><span className="w-2 h-2 bg-gray-400 rounded-full mr-3"></span>예약금: 촬영 금액의 50% (입금 확인 시 예약 확정)</p>
                                <p className="flex items-center"><span className="w-2 h-2 bg-gray-400 rounded-full mr-3"></span>잔금: 촬영 시작 하루 전 자정까지 입금</p>
                                <p className="flex items-center"><span className="w-2 h-2 bg-gray-400 rounded-full mr-3"></span>입금 계좌 정보는 예약 확정 시 안내드립니다.</p>
                            </div>
                        </div>

                        {/* 예약 정보 제출 */}
                        <div className="bg-white p-6 rounded-xl border-l-4 border-gray-400 shadow-lg">
                            <h3 className="text-xl font-bold mb-4 text-gray-800 flex items-center">
                                {/*<span className="text-2xl mr-3">📅</span>*/}
                                예약 정보 제출
                            </h3>
                            <div className="bg-gray-50 p-4 rounded-lg mb-4 border">
                                <p className="mb-3 text-sm text-gray-700">카카오톡 채널 친구 추가 시 자동으로 예약 양식이 발송됩니다.</p>
                                <p className="mb-3 text-sm font-medium text-gray-700">자동 발송이 되지 않는 경우, 아래 양식에 맞춰 보내주세요.</p>
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                                <div className="text-sm bg-gray-50 p-3 rounded-lg border border-gray-200">
                                    <p className="flex items-center"><span className="w-6 h-6 bg-gray-200 text-gray-600 rounded-full flex items-center justify-center text-xs mr-2 font-medium">1</span>신랑님 성함</p>
                                </div>
                                <div className="text-sm bg-gray-50 p-3 rounded-lg border border-gray-200">
                                    <p className="flex items-center"><span className="w-6 h-6 bg-gray-200 text-gray-600 rounded-full flex items-center justify-center text-xs mr-2 font-medium">2</span>신부님 성함</p>
                                </div>
                                <div className="text-sm bg-gray-50 p-3 rounded-lg border border-gray-200">
                                    <p className="flex items-center"><span className="w-6 h-6 bg-gray-200 text-gray-600 rounded-full flex items-center justify-center text-xs mr-2 font-medium">3</span>대표 연락처</p>
                                </div>
                                <div className="text-sm bg-gray-50 p-3 rounded-lg border border-gray-200">
                                    <p className="flex items-center"><span className="w-6 h-6 bg-gray-200 text-gray-600 rounded-full flex items-center justify-center text-xs mr-2 font-medium">4</span>이메일 주소</p>
                                </div>
                                <div className="text-sm bg-gray-50 p-3 rounded-lg border border-gray-200">
                                    <p className="flex items-center"><span className="w-6 h-6 bg-gray-200 text-gray-600 rounded-full flex items-center justify-center text-xs mr-2 font-medium">5</span>본식일</p>
                                </div>
                                <div className="text-sm bg-gray-50 p-3 rounded-lg border border-gray-200">
                                    <p className="flex items-center"><span className="w-6 h-6 bg-gray-200 text-gray-600 rounded-full flex items-center justify-center text-xs mr-2 font-medium">6</span>촬영희망일 (최대 3순위까지)</p>
                                </div>
                                <div className="text-sm bg-gray-50 p-3 rounded-lg border border-gray-200">
                                    <p className="flex items-center"><span className="w-6 h-6 bg-gray-200 text-gray-600 rounded-full flex items-center justify-center text-xs mr-2 font-medium">7</span>촬영상품</p>
                                </div>
                                <div className="text-sm bg-gray-50 p-3 rounded-lg border border-gray-200">
                                    <p className="flex items-center"><span className="w-6 h-6 bg-gray-200 text-gray-600 rounded-full flex items-center justify-center text-xs mr-2 font-medium">8</span>서해바다 촬영 희망 여부</p>
                                </div>
                                <div className="text-sm bg-gray-50 p-3 rounded-lg border border-gray-200 md:col-span-2">
                                    <p className="flex items-center"><span className="w-6 h-6 bg-gray-200 text-gray-600 rounded-full flex items-center justify-center text-xs mr-2 font-medium">9</span>초상권 업로드 동의 여부 (SNS·홈페이지 업로드 가능 여부)</p>
                                </div>
                            </div>
                        </div>

                        {/* 서해바다 촬영 안내 */}
                        <div className="bg-white p-6 rounded-xl border-l-4 border-gray-400 shadow-lg">
                            <h3 className="text-xl font-bold mb-4 text-gray-800 flex items-center">
                                {/*<span className="text-2xl mr-3">🌊</span>*/}
                                서해바다 촬영 안내
                            </h3>
                            <div className="text-sm space-y-3">
                                <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                                    <p className="flex items-center"><span className="w-2 h-2 bg-gray-400 rounded-full mr-3"></span>바다 촬영은 물때 확인이 필수입니다.</p>
                                </div>
                                <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                                    <p className="flex items-center"><span className="w-2 h-2 bg-gray-400 rounded-full mr-3"></span>예약 시 낮 / 일몰 중 촬영 시간 선택이 필요합니다.</p>
                                </div>
                                <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                                    <p className="flex items-center"><span className="w-2 h-2 bg-gray-400 rounded-full mr-3"></span>물때와 기상 상황에 따라 촬영 가능 여부가 변경될 수 있습니다.</p>
                                </div>
                            </div>
                        </div>

                        {/* 촬영 진행 안내 */}
                        <div className="bg-white p-6 rounded-xl border-l-4 border-gray-400 shadow-lg">
                            <h3 className="text-xl font-bold mb-4 text-gray-800 flex items-center">
                                {/*<span className="text-2xl mr-3">📷</span>*/}
                                촬영 진행 안내
                            </h3>
                            <div className="text-sm space-y-3">
                                <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                                    <p className="flex items-start"><span className="w-2 h-2 bg-gray-400 rounded-full mr-3 mt-2"></span>상담 – 촬영 – 보정 전 과정은 1인 포토그래퍼가 직접 진행합니다.</p>
                                </div>
                                <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                                    <p className="flex items-start"><span className="w-2 h-2 bg-gray-400 rounded-full mr-3 mt-2"></span>촬영 중에는 신랑·신부님께만 집중하므로 답변이 다소 지연될 수 있습니다.</p>
                                </div>
                                <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                                    <p className="flex items-start"><span className="w-2 h-2 bg-gray-400 rounded-full mr-3 mt-2"></span>남겨주신 메시지는 늦더라도 반드시 확인 후 답변드립니다.</p>
                                </div>
                            </div>
                        </div>

                        {/* 사전 확인 필수 */}
                        <div className="bg-white p-6 rounded-xl border-l-4 border-gray-400 shadow-lg">
                            <h3 className="text-xl font-bold mb-4 text-gray-800 flex items-center">
                                {/*<span className="text-2xl mr-3">📖</span>*/}
                                사전 확인 필수
                            </h3>
                            <div className="text-sm space-y-3">
                                <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                                    <p className="flex items-start"><span className="w-2 h-2 bg-gray-400 rounded-full mr-3 mt-2"></span>NOTICE의 가이드와 FAQ를 반드시 꼼꼼히 확인해 주시기 바랍니다.</p>
                                </div>
                                <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                                    <p className="flex items-start"><span className="w-2 h-2 bg-gray-400 rounded-full mr-3 mt-2"></span>사전 안내사항을 숙지하지 않아 발생하는 불이익에 대해서는 책임지지 않습니다.</p>
                                </div>
                            </div>
                        </div>

                        {/* 변경·취소·환불 규정 */}
                        <div className="bg-white p-6 rounded-xl border-l-4 border-gray-400 shadow-lg">
                            <h3 className="text-xl font-bold mb-4 text-gray-800 flex items-center">
                                {/*<span className="text-2xl mr-3">🔄</span>*/}
                                변경·취소·환불 규정
                            </h3>
                            
                            <div className="space-y-4">
                                <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                                    <h4 className="font-semibold mb-3 text-gray-700 flex items-center">
                                        {/*<span className="text-lg mr-2">📌</span>*/}
                                        환불 안내
                                    </h4>
                                    <div className="text-sm space-y-2 ml-6">
                                        <p className="flex items-start"><span className="w-2 h-2 bg-gray-400 rounded-full mr-3 mt-2"></span>촬영이 진행된 이후에는 어떤 사유로도 환불이 불가합니다.</p>
                                        <p className="flex items-start"><span className="w-2 h-2 bg-gray-400 rounded-full mr-3 mt-2"></span>예약금을 입금하신 경우, 본 안내에 동의하신 것으로 간주됩니다.</p>
                                    </div>
                                </div>

                                <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                                    <h4 className="font-semibold mb-3 text-gray-700 flex items-center">
                                        {/*<span className="text-lg mr-2">📌</span>*/}
                                        예약금 환불 규정 (촬영일 기준)
                                    </h4>
                                    <div className="text-sm space-y-3 ml-6">
                                        <div className="bg-white p-3 rounded-lg border border-gray-300">
                                            <p className="font-medium text-gray-700 mb-1">• 예약 확정 후 48시간 이내: 전액 환불</p>
                                        </div>
                                        <div className="bg-white p-3 rounded-lg border border-gray-300">
                                            <p className="font-medium text-gray-700 mb-1">• 촬영일 61일 전까지 요청 시: 예약금 50% 환불</p>
                                            <p className="ml-4 text-xs text-gray-600">◦ 예: 촬영일이 10월 31일인 경우 → 8월 31일까지 요청 시 적용</p>
                                        </div>
                                        <div className="bg-white p-3 rounded-lg border border-gray-300">
                                            <p className="font-medium text-gray-700 mb-1">• 촬영일 31일~60일 전 요청 시: 예약금 20% 환불</p>
                                            <p className="ml-4 text-xs text-gray-600">◦ 예: 촬영일이 10월 31일인 경우 → 9월 1일~9월 30일 사이 요청 시 적용</p>
                                        </div>
                                        <div className="bg-white p-3 rounded-lg border border-gray-300">
                                            <p className="font-medium text-gray-700 mb-1">• 촬영일 기준 21일 이내(3주 이내) 요청 시: 환불 불가</p>
                                            <p className="ml-4 text-xs text-gray-600">◦ 예: 촬영일이 10월 31일인 경우 → 10월 10일 이후 요청 시 환불 불가</p>
                                        </div>
                                    </div>
                                </div>

                                <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                                    <h4 className="font-semibold mb-3 text-gray-700 flex items-center">
                                        {/*<span className="text-lg mr-2">📌</span>*/}
                                        조건부 환불 불가 사유
                                    </h4>
                                    <div className="text-sm space-y-2 ml-6">
                                        <p className="flex items-start"><span className="w-2 h-2 bg-gray-400 rounded-full mr-3 mt-2"></span>임신, 파혼 등 개인 사정</p>
                                        <p className="flex items-start"><span className="w-2 h-2 bg-gray-400 rounded-full mr-3 mt-2"></span>일정 변경 후 취소 (예약 1회 변경 가능, 이후 취소 시 환불 불가)</p>
                                        <p className="flex items-start"><span className="w-2 h-2 bg-gray-400 rounded-full mr-3 mt-2"></span>촬영 당일 날씨, 건강 상태, 서비스 만족도 등 주관적인 사유</p>
                                    </div>
                                </div>

                                <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                                    <h4 className="font-semibold mb-3 text-gray-700 flex items-center">
                                        {/*<span className="text-lg mr-2">📌</span>*/}
                                        업체 과실에 의한 환불
                                    </h4>
                                    <div className="text-sm space-y-2 ml-6">
                                        <p className="flex items-start"><span className="w-2 h-2 bg-gray-400 rounded-full mr-3 mt-2"></span>촬영 원본이 소실된 경우에 한해 촬영 대금 전액 환불</p>
                                        <p className="flex items-start"><span className="w-2 h-2 bg-gray-400 rounded-full mr-3 mt-2"></span>단, 이는 업체의 명백한 과실로 인한 경우에만 해당</p>
                                    </div>
                                </div>

                                <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                                    <h4 className="font-semibold mb-3 text-gray-700 flex items-center">
                                        {/*<span className="text-lg mr-2">📌</span>*/}
                                        적용 범위
                                    </h4>
                                    <div className="text-sm space-y-2 ml-6">
                                        <p className="flex items-start"><span className="w-2 h-2 bg-gray-400 rounded-full mr-3 mt-2"></span>위 내용은 모든 촬영 상품에 동일하게 적용됩니다.</p>
                                        <p className="flex items-start"><span className="w-2 h-2 bg-gray-400 rounded-full mr-3 mt-2"></span>예약금 입금 시 본 약관에 동의한 것으로 간주됩니다.</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Reservation;