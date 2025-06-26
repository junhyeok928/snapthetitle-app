// src/App.js
import React, { useEffect } from "react";
import { BrowserRouter, Routes, Route, Navigate, useLocation } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext";
import PrivateRoute from "./components/common/PrivateRoute";

// 레이아웃 컴포넌트
import UserLayout  from "./components/common/UserLayout";
import AdminLayout from "./components/common/AdminLayout";

// 사용자 페이지
import Home        from "./components/pages/Home";
import About       from "./components/pages/About";
import Gallery     from "./components/pages/Gallery";
import Product     from "./components/pages/Product";
import Reservation from "./components/pages/Reservation";
import Faq         from "./components/pages/notice/Faq";
import Guide       from "./components/pages/notice/Guide";
import Partner     from "./components/pages/notice/Partner";

// 관리자 페이지
import Login             from "./components/admin/Login";
import Dashboard         from "./components/admin/Dashboard";
import GalleryManagement from "./components/admin/GalleryManagement";
import ProductManagement from "./components/admin/ProductManagement";
import FaqManagement     from "./components/admin/FaqManagement";
import GuideManagement   from "./components/admin/GuideManagement";
import PartnerManagement from "./components/admin/PartnerManagement";
import MainManagement    from "./components/admin/MainManagement";

const TrackVisitWrapper = ({ children }) => {
    const location = useLocation();

    useEffect(() => {
        fetch("/api/track/visit", { method: "POST" }).catch(() => {});
    }, [location.pathname]); // 사용자가 사용자 페이지 내에서 이동할 때도 기록하고 싶다면 이렇게 가능

    return children;
};

const App = () => (
    <AuthProvider>
        <BrowserRouter>
            <Routes>
                {/* 사용자 레이아웃: Header/Footer 포함 */}
                <Route element={
                    <TrackVisitWrapper>
                        <UserLayout />
                    </TrackVisitWrapper>
                }>
                    <Route path="/"               element={<Home />} />
                    <Route path="/about"          element={<About />} />
                    <Route path="/gallery"        element={<Gallery />} />
                    <Route path="/product"        element={<Product />} />
                    <Route path="/reservation"    element={<Reservation />} />
                    <Route path="/notice/faq"     element={<Faq />} />
                    <Route path="/notice/guide"   element={<Guide />} />
                    <Route path="/notice/partner" element={<Partner />} />
                </Route>

                {/* 관리자 로그인 */}
                <Route path="/admin/login" element={<Login />} />

                {/* 관리자 레이아웃: 사이드바만, PrivateRoute로 보호 */}
                <Route
                    path="/admin/*"
                    element={
                        <PrivateRoute>
                            <AdminLayout />
                        </PrivateRoute>
                    }
                >
                    <Route index            element={<Navigate to="dashboard" replace />} />
                    <Route path="main"      element={<MainManagement />} />
                    <Route path="dashboard" element={<Dashboard />} />
                    <Route path="gallery"   element={<GalleryManagement />} />
                    <Route path="product"   element={<ProductManagement />} />
                    <Route path="faq"       element={<FaqManagement />} />
                    <Route path="guide"     element={<GuideManagement />} />
                    <Route path="partner"   element={<PartnerManagement />} />
                </Route>
            </Routes>
        </BrowserRouter>
    </AuthProvider>
);

export default App;
