import React, { useEffect, useState, useCallback, useMemo } from "react";
import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";
import { fetchGalleryPhotos } from "api/publicApi";

const ITEMS_PER_PAGE = 9;

const GalleryComponent = () => {
    const [allPhotos, setAllPhotos] = useState([]);
    const [isOpen, setIsOpen] = useState(false);
    const [currentIndex, setCurrentIndex] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const [selectedCategory, setSelectedCategory] = useState('전체');

    useEffect(() => {
        const loadPhotos = async () => {
            try {
                const data = await fetchGalleryPhotos();
                setAllPhotos(data);
            } catch (error) {
                console.error(error);
                alert("갤러리 데이터를 불러오는데 실패했습니다.");
            }
        };
        loadPhotos();
    }, []);

    const photosByCategory = useMemo(() => {
        const categories = {
            '전체': allPhotos,
            '바다': allPhotos.filter(p => p.category === '바다'),
            '들판': allPhotos.filter(p => p.category === '들판'),
            '스튜디오': allPhotos.filter(p => p.category === '스튜디오'),
            '기타': allPhotos.filter(p => p.category === '기타'),
        };
        return categories;
    }, [allPhotos]);

    const currentPhotos = photosByCategory[selectedCategory] || [];
    const totalPages = Math.ceil(currentPhotos.length / ITEMS_PER_PAGE);
    const paginatedPhotos = currentPhotos.slice((currentPage - 1) * ITEMS_PER_PAGE, currentPage * ITEMS_PER_PAGE);

    const handleClick = useCallback((index) => {
        const actualIndex = (currentPage - 1) * ITEMS_PER_PAGE + index;
        setCurrentIndex(actualIndex);
        setIsOpen(true);
    }, [currentPage]);

    const handlePageChange = (newPage) => {
        setCurrentPage(newPage);
        window.scrollTo({ top: 0, behavior: "smooth" });
    };

    const handleCategoryChange = (category) => {
        setSelectedCategory(category);
        setCurrentPage(1);
        window.scrollTo({ top: 0, behavior: "smooth" });
    };

    const categories = ['전체', '바다', '들판', '스튜디오', '기타'];

    return (
        <section className="text-gray-700 bg-white relative py-16">
            <div className="container px-6 mx-auto max-w-7xl">
                <div className="flex flex-col text-center w-full mb-20">
                    <div className="space-y-6">
                        <p className="lg:w-4/5 mx-auto leading-relaxed text-gray-600 text-base md:text-lg">
                            둘만의 타이틀을 담기 위해,
                            <br className="hidden sm:block" />
                            커스터마이징 촬영을 진행하고 있습니다.
                        </p>
                    </div>
                </div>

                <div className="border-t border-gray-200 mb-16"></div>

                <div className="space-y-12">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl md:text-4xl font-light text-gray-800 mb-6">Gallery</h2>
                        <div className="space-y-2 mb-8">
                            <p className="text-gray-500 text-sm md:text-base">이미지를 클릭하시면 확대하여 보실 수 있으며,</p>
                            <p className="text-gray-500 text-sm md:text-base">더 많은 사진은 Instagram에서 확인하실 수 있습니다.</p>
                        </div>

                        <div className="flex justify-center flex-wrap gap-3 mb-12">
                            {categories.map((category) => (
                                <button
                                    key={category}
                                    onClick={() => handleCategoryChange(category)}
                                    className={`px-4 py-2 md:px-6 md:py-3 rounded-lg font-medium transition-all duration-200 text-sm md:text-base ${
                                        selectedCategory === category
                                            ? 'bg-gray-800 text-white shadow-lg'
                                            : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                                    }`}
                                >
                                    {category}
                                    <span className="ml-2 text-xs opacity-75">
                                        ({photosByCategory[category]?.length || 0})
                                    </span>
                                </button>
                            ))}
                        </div>

                        <div className="mb-8">
                            <p className="text-gray-600 text-sm md:text-base">
                                <span className="font-medium">{selectedCategory}</span> 카테고리
                                <span className="mx-2">•</span>
                                총 <span className="font-medium">{currentPhotos.length}</span>장의 사진
                            </p>
                        </div>
                    </div>

                    {currentPhotos.length > 0 ? (
                        <>
                            <div className="columns-1 sm:columns-2 lg:columns-3 gap-4 space-y-4">
                                {paginatedPhotos.map((photo, index) => {
                                    if (!photo?.thumbnailUrl) return null;

                                    return (
                                        <div key={`photo-${currentPage}-${index}`} className="group break-inside-avoid">
                                            <img
                                                src={photo.thumbnailUrl}
                                                alt={`Gallery image ${index + 1}`}
                                                className="w-full h-auto object-cover cursor-pointer shadow-md rounded-sm transition-all duration-300 transform group-hover:scale-105 group-hover:shadow-xl opacity-0 animate-fade-in"
                                                onClick={() => handleClick(index)}
                                                onLoad={(e) => e.currentTarget.classList.remove("opacity-0")}
                                            />
                                        </div>
                                    );
                                })}
                            </div>

                            {totalPages > 1 && (
                                <div className="flex justify-center items-center mt-12 space-x-2">
                                    <button
                                        className={`px-4 py-2 rounded-lg ${
                                            currentPage === 1
                                                ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                                                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                                        }`}
                                        onClick={() => handlePageChange(currentPage - 1)}
                                        disabled={currentPage === 1}
                                    >
                                        이전
                                    </button>

                                    <div className="flex space-x-1">
                                        {[...Array(totalPages)].map((_, i) => (
                                            <button
                                                key={i + 1}
                                                onClick={() => handlePageChange(i + 1)}
                                                className={`px-3 py-2 rounded-lg ${
                                                    currentPage === i + 1
                                                        ? 'bg-gray-800 text-white'
                                                        : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                                                }`}
                                            >
                                                {i + 1}
                                            </button>
                                        ))}
                                    </div>

                                    <button
                                        className={`px-4 py-2 rounded-lg ${
                                            currentPage === totalPages
                                                ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                                                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                                        }`}
                                        onClick={() => handlePageChange(currentPage + 1)}
                                        disabled={currentPage === totalPages}
                                    >
                                        다음
                                    </button>
                                </div>
                            )}
                        </>
                    ) : (
                        <div className="text-center py-16">
                            <p className="text-gray-500 text-lg">해당 카테고리에 사진이 없습니다.</p>
                        </div>
                    )}

                    <div className="mt-16 text-center">
                        <div className="border-t border-gray-200 mb-12"></div>
                        <div className="space-y-6">
                            {/*<p className="lg:w-4/5 mx-auto leading-relaxed text-gray-600 text-base md:text-lg">*/}
                                {/*That’s why we called it Snap The Title — because every moment deserves its own chapter.*/}
                                {/*<br className="hidden sm:block" />*/}
                                {/*두 분만의 특별한 순간을 함께 만들어갑니다.*/}
                            {/*</p>*/}
                            <p className="lg:w-4/5 mx-auto leading-relaxed text-gray-700 text-base md:text-lg font-medium">
                                That’s why we called it Snap The Title — because every moment deserves its own chapter.
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Lightbox 영역 */}
            {isOpen && currentPhotos.length > 0 && (
                <Lightbox
                    open={isOpen}
                    close={() => setIsOpen(false)}
                    index={currentIndex}
                    slides={currentPhotos.map(photo => ({
                        src: photo.originalUrl
                    }))}
                />
            )}
        </section>
    );
};

export default GalleryComponent;
