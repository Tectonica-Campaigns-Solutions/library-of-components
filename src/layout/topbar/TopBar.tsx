import React from 'react';
import './TopBar.css';

interface TopBarProps {
  bgColor?: string;
  logo: string;
  title: string;
  buttonLabel: string;
  page: string;
  onButtonClick: () => void;
}

const TopBar: React.FC<TopBarProps> = ({ bgColor, logo, title, buttonLabel, page = 'builder', onButtonClick }) => {
  return (
    <div className="top-bar" style={{ backgroundColor: bgColor }}>
      <div className="logo">{logo} <span>{title}</span></div>
      <button className="btn btn-primary top-bar-button" onClick={onButtonClick}>
        {page === 'builder' ? (
        <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
          <g id="Component" clip-path="url(#clip0_966_1255)">
            <g id="Group 58">
              <path
                id="Vector"
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M7.03496 9.26781L5.52026 10.7825L7.03496 12.297L8.54954 10.7825L7.03496 9.26781ZM4.76291 10.0251C4.34465 10.4434 4.34465 11.1215 4.76291 11.5396L6.27761 13.0543C6.69587 13.4726 7.37399 13.4726 7.79231 13.0543L9.30689 11.5396C9.7252 11.1215 9.7252 10.4433 9.30689 10.0251L7.33785 8.05615C7.17057 7.88883 6.89929 7.88883 6.73202 8.05615L4.76291 10.0251Z"
                fill="#F8F8F8"
              />
              <path
                id="Vector_2"
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M9.26814 7.03493L10.7828 8.54958L12.2975 7.03493L10.7828 5.52028L9.26814 7.03493ZM8.05637 6.73202C7.88909 6.89935 7.88909 7.17057 8.05637 7.33788L10.0254 9.30685C10.4437 9.7251 11.1218 9.7251 11.5401 9.30685L13.0548 7.7922C13.473 7.37396 13.473 6.69581 13.0548 6.27755L11.5401 4.7629C11.1218 4.34466 10.4437 4.34466 10.0254 4.7629L8.05637 6.73202Z"
                fill="#F8F8F8"
              />
              <path
                id="Vector_3"
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M7.03496 1.77244L5.52026 3.28709L7.03496 4.80174L8.54954 3.28709L7.03496 1.77244ZM4.76291 2.52975C4.34465 2.948 4.34465 3.62614 4.76291 4.0444L6.73195 6.01337C6.89927 6.18069 7.17051 6.18069 7.33783 6.01337L9.30686 4.0444C9.72517 3.62615 9.72517 2.94801 9.30686 2.52975L7.79229 1.0151C7.37403 0.596854 6.69586 0.596854 6.27759 1.0151L4.76291 2.52975Z"
                fill="#F8F8F8"
              />
              <path
                id="Vector_4"
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M3.28732 5.52025L1.77274 7.03478L3.28732 8.54943L4.80202 7.03478L3.28732 5.52025ZM1.01539 6.27757C0.597083 6.69581 0.597083 7.37391 1.01539 7.79209L2.52997 9.30674C2.94823 9.72499 3.62639 9.72499 4.04467 9.30674L6.0137 7.33777C6.18103 7.17045 6.18103 6.89917 6.0137 6.73191L4.04467 4.76294C3.62641 4.34464 2.94829 4.34464 2.52997 4.76294L1.01539 6.27757Z"
                fill="#F8F8F8"
              />
            </g>
          </g>
          <defs>
            <clipPath id="clip0_966_1255">
              <rect width="13.3333" height="13.3333" fill="white" transform="translate(0.333252 0.333252)" />
            </clipPath>
          </defs>
        </svg>
        ) : (
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
            <path d="M13.6857 2.31426L13.6857 2.31418C13.5378 2.16634 13.3373 2.08327 13.1281 2.08327H10.0512C9.84201 2.08327 9.64144 2.16634 9.49356 2.31422C9.34569 2.46208 9.26261 2.66263 9.26261 2.87172V4.92305C9.26261 5.13206 9.34564 5.33257 9.49352 5.48051C9.49354 5.48054 9.49357 5.48057 9.4936 5.48059M13.6857 2.31426L14.216 1.78388C14.5046 2.07238 14.6666 2.4637 14.6666 2.87172V4.92305C14.6666 5.33108 14.5046 5.72236 14.216 6.01089C13.9275 6.29939 13.5362 6.4615 13.1281 6.4615H10.0512C9.64311 6.4615 9.25179 6.29939 8.96324 6.01089L9.4936 5.48059M13.6857 2.31426C13.8336 2.46207 13.9166 2.66259 13.9166 2.87172V4.92305C13.9166 5.13216 13.8336 5.33266 13.6857 5.48054L13.6857 5.48055C13.5378 5.62841 13.3373 5.7115 13.1281 5.7115H10.0512C9.84209 5.7115 9.64153 5.62845 9.4936 5.48059M13.6857 2.31426L9.4936 5.48059M2.3143 8.55745L2.31422 8.55737C2.16638 8.40956 2.08331 8.20904 2.08331 7.99991V2.8717C2.08331 2.66256 2.16638 2.46205 2.31422 2.31424L2.3143 2.31416C2.46212 2.16633 2.66266 2.08325 2.87182 2.08325H5.9488C6.15796 2.08325 6.35851 2.16632 6.5064 2.3142C6.65427 2.46206 6.73735 2.66262 6.73735 2.8717V7.99991C6.73735 8.209 6.65427 8.40955 6.5064 8.55741C6.35852 8.70529 6.15795 8.78836 5.9488 8.78836H2.87182C2.66265 8.78836 2.46212 8.70529 2.3143 8.55745ZM2.31431 13.6857L2.31423 13.6856C2.16639 13.5378 2.08332 13.3373 2.08332 13.1281V12.1025C2.08332 11.8933 2.16639 11.6928 2.31423 11.545L2.31431 11.5449C2.46213 11.3971 2.66267 11.314 2.87183 11.314H5.94881C6.15797 11.314 6.35852 11.3971 6.50641 11.545C6.65428 11.6928 6.73736 11.8934 6.73736 12.1025V13.1281C6.73736 13.3372 6.65428 13.5378 6.50641 13.6856C6.35853 13.8335 6.15796 13.9166 5.94881 13.9166H2.87183C2.66266 13.9166 2.46213 13.8335 2.31431 13.6857ZM13.6857 8.46805L13.6857 8.46813C13.8336 8.61594 13.9166 8.81646 13.9166 9.02559V13.1281C13.9166 13.3373 13.8336 13.5378 13.6857 13.6856L13.6857 13.6857C13.5378 13.8335 13.3373 13.9166 13.1281 13.9166H10.0512C9.842 13.9166 9.64144 13.8335 9.49356 13.6856C9.34569 13.5378 9.26261 13.3372 9.26261 13.1281V9.02559C9.26261 8.8165 9.34569 8.61595 9.49356 8.46809C9.64144 8.32021 9.84201 8.23714 10.0512 8.23714H13.1281C13.3373 8.23714 13.5378 8.32021 13.6857 8.46805Z" stroke="#262626" stroke-width="1.5"/>
          </svg>
        )}
        {buttonLabel}
      </button>
    </div>
  );
};

export default TopBar;