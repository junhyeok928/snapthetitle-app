// src/hooks/useSafeAsyncEffect.js
import { useEffect } from 'react';

let is401Handled = false; // ✅ 401 응답에 대한 중복 처리 방지용 플래그

export function useSafeAsyncEffect(effectFn, deps = []) {
    useEffect(() => {
        (async () => {
            try {
                await effectFn();
            } catch (err) {
                if (err?.response?.status === 401) {
                    if (!is401Handled) {
                        is401Handled = true; // 첫 401 에서만 처리
                        alert('로그인 세션이 만료되었습니다. 다시 로그인해주세요.');
                        localStorage.removeItem('token');
                        setTimeout(() => {
                            window.location.href = '/admin/login';
                        }, 100);
                    }
                } else {
                    console.error('비동기 처리 중 에러 발생:', err);
                }
            }
        })();
    }, deps);
}
