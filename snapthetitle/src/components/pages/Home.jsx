import { useEffect, useState } from 'react';
import ImageSlider from './ImageSlider';

const Home = () => {
    const [images, setImages] = useState([]);

    useEffect(() => {
        fetch('/api/main-photos')
            .then(res => res.json())
            .then(data => {
                // ✅ imageUrl만 추출해서 슬라이더에 넘기기
                const urls = data.map(photo => photo.imageUrl).filter(Boolean);
                setImages(urls);
            })
            .catch(err => {
                console.error('메인 이미지 로딩 오류:', err);
            });
    }, []);

    return (
        <div className="text-center">
            <ImageSlider images={images} />
            <p className="mt-5 font-light">Our movie, Moody title.</p>
        </div>
    );
};

export default Home;
