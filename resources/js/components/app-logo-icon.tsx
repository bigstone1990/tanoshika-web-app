import { SVGAttributes } from 'react';

export default function AppLogoIcon(props: SVGAttributes<SVGElement>) {
    return (
        <svg {...props} viewBox="0 0 790 85.5" xmlns="http://www.w3.org/2000/svg">
            <g>
                <rect x="5.335" y="5.335" width="74.665" height="74.665" rx="15" ry="15" fill="#096FC6" />

                <g fill="white">
                    <rect x="18.665" y="21.335" width="48" height="12" rx="2" ry="2" />
                    <rect x="36.665" y="21.335" width="12" height="48" rx="2" ry="2" />
                </g>
            </g>

            <text
                x="91.665"
                y="74.665"
                fontFamily="Arial, sans-serif"
                fontSize="85.335"
                fontWeight="bold"
                fill="#096FC6"
                dominantBaseline="text-bottom"
            >
                TANOSHIKA APP
            </text>
        </svg>
    );
}
