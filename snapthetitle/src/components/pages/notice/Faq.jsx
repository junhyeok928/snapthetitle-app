import React, { useState, useEffect } from 'react';
import { fetchFaqs } from 'api/publicApi'; // API 호출 함수는 /api/faqs 엔드포인트에 연결되어 있어야 함

function Faq() {
    const [faqs, setFaqs] = useState([]);
    const [activeIndex, setActiveIndex] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('전체');

    useEffect(() => {
        fetchFaqs()
            .then(setFaqs)
            .catch((err) => {
                console.error('FAQ 불러오기 실패:', err);
            });
    }, []);

    const toggleAccordion = (index) => {
        setActiveIndex(activeIndex === index ? null : index);
    };

    const categories = ['전체', ...new Set(faqs.map(faq => faq.category))];

    const filteredFaqs = faqs.filter(faq => {
        const matchesSearch = faq.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
            faq.answer.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesCategory = selectedCategory === '전체' || faq.category === selectedCategory;
        return matchesSearch && matchesCategory;
    });

    return (
        <section className="text-gray-700 bg-white relative py-16">
            <div className="container px-6 mx-auto max-w-4xl">
                {/* 제목 */}
                <div className="flex flex-col text-center w-full mb-20">
                    <div className="space-y-6">
                        <p className="lg:w-4/5 mx-auto leading-relaxed text-gray-600 text-base md:text-lg">
                            촬영에 대해 궁금한 점이 있다면 언제든 편하게 문의해 주세요.
                            <br className="hidden sm:block" />
                            제가 직접 겪고 느낀 기준으로 정리한 내용이 포함되어 있으므로
                            <br className="hidden sm:block" />
                            정답은 아닐 수 있지만, 촬영을 준비하시며 작은 참고가 될 수 있길 바랍니다.
                        </p>
                    </div>
                </div>

                <div className="border-t border-gray-200 mb-16"></div>

                {/* FAQ 섹션 */}
                <div className="space-y-12">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl md:text-4xl font-light text-gray-800 mb-6">FAQ</h2>
                        <div className="space-y-2">
                            <p className="text-gray-500 text-sm md:text-base">촬영과 관련된 궁금한 점들을 확인해보세요.</p>

                            {/* 검색 및 필터 */}
                            <div className="mt-8 space-y-6">
                                <div className="max-w-md mx-auto relative">
                                    <input
                                        type="text"
                                        placeholder="질문 검색..."
                                        value={searchTerm}
                                        onChange={(e) => setSearchTerm(e.target.value)}
                                        className="w-full px-4 py-3 text-sm border border-gray-200 rounded-lg focus:border-gray-400 focus:outline-none transition-colors duration-200 bg-white"
                                    />
                                    <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                                        <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                                        </svg>
                                    </div>
                                </div>

                                <div className="flex flex-wrap justify-center gap-2">
                                    {categories.map(category => (
                                        <button
                                            key={category}
                                            onClick={() => setSelectedCategory(category)}
                                            className={`px-4 py-2 rounded-full text-sm font-medium transition-colors duration-200 ${
                                                selectedCategory === category
                                                    ? 'bg-gray-700 text-white'
                                                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                                            }`}
                                        >
                                            {category}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* FAQ 리스트 */}
                    <div className="grid gap-8 md:gap-12">
                        {filteredFaqs.length > 0 ? (
                            filteredFaqs.map((faq, index) => (
                                <div key={faq.id} className="group">
                                    <div
                                        className="py-6 px-6 rounded-lg hover:bg-gray-50 transition-colors duration-200 cursor-pointer"
                                        onClick={() => toggleAccordion(index)}
                                    >
                                        <div className="flex items-start justify-between space-x-4">
                                            <div className="flex-1 min-w-0">
                                                <div className="flex flex-col space-y-3">
                                                    <span className="inline-block bg-gray-100 text-gray-700 px-4 py-2 rounded-full text-sm font-medium self-start">
                                                        {faq.category}
                                                    </span>
                                                    <h3 className="text-xl font-medium text-gray-800 leading-relaxed leading-relaxed whitespace-pre-wrap">
                                                        {faq.question}
                                                    </h3>
                                                </div>
                                            </div>
                                            <div className="flex-shrink-0 ml-4">
                                                <div className={`w-6 h-6 flex items-center justify-center transition-transform duration-200 ${
                                                    activeIndex === index ? 'rotate-45' : ''
                                                }`}>
                                                    <span className="text-xl font-light text-gray-500">+</span>
                                                </div>
                                            </div>
                                        </div>

                                        <div className={`overflow-hidden transition-all duration-300 ease-out ${
                                            activeIndex === index ? 'max-h-screen opacity-100' : 'max-h-0 opacity-0'
                                        }`}>
                                            <div className="mt-6 pt-6 border-t border-gray-200">
                                                <p className="text-gray-600 text-base md:text-lg leading-relaxed whitespace-pre-line">
                                                    {faq.answer}
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <div className="text-center py-16">
                                <p className="text-gray-500 text-lg">검색 결과가 없습니다.</p>
                                <p className="text-gray-400 text-base">다른 검색어로 다시 시도해주세요.</p>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </section>
    );
}

export default Faq;
