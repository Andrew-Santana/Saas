import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import React from 'react';
const OptimizedImage = ({ src, alt, webpSrc, lazy = true, ...props }) => {
    return (_jsxs("picture", { children: [webpSrc && _jsx("source", { srcSet: webpSrc, type: "image/webp" }), _jsx("img", { src: src, alt: alt, loading: lazy ? 'lazy' : 'eager', ...props })] }));
};
export default OptimizedImage;
