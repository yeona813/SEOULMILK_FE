const LoadingSpinner = () => {
  return (
    <div className="flex items-center justify-center">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="50"
        height="49"
        viewBox="0 0 50 49"
        fill="none"
        className="animate-spin"
      >
        <path
          d="M25 2V9.5"
          stroke="#009857"
          strokeWidth="4"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          opacity="0.8"
          d="M47.5 24.5H40"
          stroke="#009857"
          strokeWidth="4"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          opacity="0.7"
          d="M40.9136 40.4141L35.6167 35.1172"
          stroke="#009857"
          strokeWidth="4"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          opacity="0.6"
          d="M25 47V39.5"
          stroke="#009857"
          strokeWidth="4"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          opacity="0.5"
          d="M9.08594 40.4141L14.3828 35.1172"
          stroke="#009857"
          strokeWidth="4"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          opacity="0.4"
          d="M2.5 24.5H10"
          stroke="#009857"
          strokeWidth="4"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          opacity="0.3"
          d="M9.08594 8.58496L14.3828 13.8818"
          stroke="#009857"
          strokeWidth="4"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          opacity="0.9"
          d="M40.2966 8.58496L34.9998 13.8818"
          stroke="#009857"
          strokeWidth="4"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </div>
  );
};

export default LoadingSpinner;
