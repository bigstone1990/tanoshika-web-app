import { SVGAttributes } from 'react';

export default function AppLogoIcon(props: SVGAttributes<SVGElement>) {
    return (
        <svg {...props} viewBox="0 0 166 166" xmlns="http://www.w3.org/2000/svg">
            <rect width="166" height="166" rx="24" ry="24" fill="#096FC6" />

            <path d="M30 30 H136 V60 H98 V136 H68 V60 H30 Z" fill="#FFFFFF" />
        </svg>
    );
}
