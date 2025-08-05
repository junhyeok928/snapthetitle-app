import React, { useEffect, useState } from 'react';
import { fetchProductYears, fetchProducts } from 'api/publicApi';

function Product() {
    const [years, setYears] = useState([]);
    const [selectedYear, setSelectedYear] = useState(null);
    const [productsByYear, setProductsByYear] = useState({});

    // 연도 목록 처음에 불러오기
    useEffect(() => {
        const loadYears = async () => {
            try {
                const yearList = await fetchProductYears();
                setYears(yearList);
                if (yearList.length > 0) {
                    setSelectedYear(yearList[0].toString());
                }
            } catch (err) {
                console.error('연도 목록 불러오기 실패:', err);
            }
        };

        loadYears();
    }, []);

    // 연도 변경될 때 상품 목록 불러오기
    useEffect(() => {
        if (!selectedYear || productsByYear[selectedYear]) return;

        const loadProducts = async () => {
            try {
                const data = await fetchProducts(selectedYear);
                setProductsByYear(prev => ({
                    ...prev,
                    [selectedYear]: data
                }));
            } catch (err) {
                console.error('상품 불러오기 실패:', err);
            }
        };

        loadProducts();
    }, [selectedYear]);

    const currentProducts = productsByYear[selectedYear] || [];

    return (
        <section className="text-gray-700 bg-white relative py-16">
            <div className="container px-6 mx-auto max-w-7xl">
                {/* 제목 및 설명 */}
                <div className="flex flex-col text-center w-full mb-20">
                    <div className="space-y-6">
                        <p className="lg:w-4/5 mx-auto leading-relaxed text-gray-600 text-base md:text-lg">
                            스냅 더 타이틀의 다양한 촬영 패키지를 확인해보세요.
                        </p>
                        <p className="lg:w-4/5 mx-auto leading-relaxed text-gray-600 text-base md:text-lg">
                            문의나 예약은 언제든지 편하게 연락주세요.
                        </p>
                    </div>
                </div>

                <div className="border-t border-gray-200 mb-16"></div>

                {/* 연도 탭 */}
                <div className="text-center mb-16">
                    <h2 className="text-3xl md:text-4xl font-light text-gray-800 mb-6">Product</h2>
                    <div className="flex justify-center space-x-4 mb-12">
                        {years.map((year) => (
                            <button
                                key={year}
                                onClick={() => setSelectedYear(year.toString())}
                                className={`px-6 py-3 rounded-lg font-medium transition-all duration-200 ${
                                    selectedYear === year.toString()
                                        ? 'bg-gray-800 text-white shadow-lg'
                                        : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                                }`}
                            >
                                {year}년
                            </button>
                        ))}
                    </div>
                    {/* 2026년 선택 시 안내문구 */}
                    {selectedYear === '2026' && (
                        <p className="text-sm text-gray-500 mt-2">
                            모든 상품은 VAT 별도입니다.
                        </p>
                    )}
                </div>

                {/* 상품 목록 */}
                <div
                    className={`grid grid-cols-1 ${
                        currentProducts.length === 4 ? 'md:grid-cols-2' : 'md:grid-cols-3'
                    } gap-8 md:gap-12 items-stretch`}
                >
                    {currentProducts.map((product) => (
                        <div key={product.id} className="group flex flex-col">
                            <div className="py-6 px-6 rounded-lg hover:bg-gray-50 transition h-full flex flex-col">
                                <div className="text-center mb-6 flex-grow">
                                    <h3 className="text-lg font-medium text-gray-800 mb-2">{product.name}</h3>
                                    <p className="text-gray-600 text-sm leading-relaxed whitespace-pre-wrap text-left">
                                        {product.description}
                                    </p>
                                </div>
                                <div className="space-y-3 mb-6">
                                    {product.options.map((opt) => (
                                        <div key={opt.id} className="bg-gray-50 rounded-lg p-3">
                                            <div className="flex justify-between">
                                                <span className="font-medium text-gray-800 text-sm">{opt.label}</span>
                                                <span className="text-gray-600 text-sm">{opt.value}</span>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                                <div className="text-center pt-4 border-t border-gray-200 mt-auto">
                                  <span className="text-lg font-semibold text-gray-900">
                                    {Number(product.price).toLocaleString()}원
                                  </span>
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
                            패키지 선택에 고민이 되시거나 추가 문의사항이 있으시면 언제든지 연락주세요.
                        </p>
                        <p className="lg:w-4/5 mx-auto leading-relaxed text-gray-700 text-base md:text-lg font-medium">
                            소중한 순간을 아름답게 담아내는 것이 저희의 약속입니다.
                        </p>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default Product;
