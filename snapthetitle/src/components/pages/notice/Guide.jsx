import React, { useEffect, useState } from 'react';
import { fetchGuides } from 'api/publicApi'; // API 함수

function Guide() {
    const [guideItems, setGuideItems] = useState([]);

    useEffect(() => {
        fetchGuides()
            .then(setGuideItems)
            .catch(err => console.error("가이드 불러오기 실패:", err));
    }, []);

    return (
        <section className="text-gray-700 bg-white relative py-16">
            <div className="container px-6 mx-auto max-w-4xl">

                {/* 섹션 설명 */}
                <div className="flex flex-col text-center w-full mb-20">
                    <div className="space-y-6">
                        <p className="lg:w-4/5 mx-auto leading-relaxed text-gray-600 text-base md:text-lg">
                            상담부터 촬영, 보정까지 모두 1인 여성 포토그래퍼가 진행합니다.
                            <br className="hidden sm:block" />
                            촬영 전 미리 확인하시면 더욱 원활한 촬영이 가능합니다.
                        </p>
                        <p className="lg:w-4/5 mx-auto leading-relaxed text-gray-600 text-base md:text-lg">
                            촬영중에는 신랑신부님께 집중하므로 답변이 늦을 수 있는 점 양해부탁드립니다.
                        </p>
                    </div>
                </div>

                <div className="border-t border-gray-200 mb-16"></div>

                {/* 가이드 리스트 */}
                <div className="space-y-12">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl md:text-4xl font-light text-gray-800 mb-6">Guide</h2>
                        <div className="space-y-2">
                            <p className="text-gray-500 text-sm md:text-base">촬영 준비를 위한 상세 가이드입니다.</p>
                            <p className="text-gray-500 text-sm md:text-base">궁금한 점이 있으시면 언제든 문의해주세요.</p>
                        </div>
                    </div>

                    <div className="grid gap-8 md:gap-12">
                        {guideItems.map((item, index) => (
                            <div key={index} className="group">
                                <div className="flex flex-col md:flex-row items-start justify-center md:space-x-8 space-y-2 md:space-y-0 py-6 px-6 rounded-lg hover:bg-gray-50 transition-colors duration-200">
                                    <div className="md:w-32 text-center md:text-right">
                                        <span className="inline-block bg-gray-100 text-gray-700 px-4 py-2 rounded-full text-sm font-medium">
                                            {item.category}
                                        </span>
                                    </div>
                                    <div className="flex-1 text-center md:text-left">
                                        <div className="text-gray-600 text-base leading-relaxed space-y-3">
                                            <p>{item.content}</p>

                                            {item.linkUrl && item.linkText && (
                                                <a
                                                    href={item.linkUrl}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="text-gray-500 hover:text-gray-700 text-sm transition-colors duration-200 hover:underline block"
                                                >
                                                    {item.linkText}
                                                </a>
                                            )}

                                            {item.details && item.details.length > 0 && (
                                                <div className="mt-4 space-y-2">
                                                    {item.details.map((detail, detailIndex) => (
                                                        <div key={detailIndex} className="bg-gray-50 rounded-lg p-4">
                                                            <h4 className="font-medium text-gray-800 mb-2">{detail.subtitle}</h4>
                                                            <p className="text-sm text-gray-600">{detail.description}</p>
                                                        </div>
                                                    ))}
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* 마무리 메시지 */}
                    <div className="mt-16 text-center">
                        <div className="border-t border-gray-200 mb-12"></div>
                        <div className="space-y-6">
                            <p className="lg:w-4/5 mx-auto leading-relaxed text-gray-600 text-base md:text-lg">
                                준비하시면서 고민되거나 어려운 부분이 있으시다면 언제든지 연락주세요.
                                <br className="hidden sm:block" />
                                함께 고민하겠습니다.
                            </p>
                            <p className="lg:w-4/5 mx-auto leading-relaxed text-gray-700 text-base md:text-lg font-medium">
                                두 분의 무드가 가득 담긴 타이틀을 기다리겠습니다.
                                <br className="hidden sm:block" />
                                감사합니다.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default Guide;