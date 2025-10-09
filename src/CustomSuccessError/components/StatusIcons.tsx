import "./StatusIcons.css";

export const RocketIcon = () => {
  return (
    <div className="status-icon-container">
      <svg
        className="status-icon-svg"
        viewBox="0 0 120 120"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Sparkles */}
        <circle cx="95" cy="25" r="2" fill="white" opacity="0.8">
          <animate attributeName="opacity" values="0.3;1;0.3" dur="2s" repeatCount="indefinite" />
        </circle>
        <circle cx="85" cy="15" r="1.5" fill="white" opacity="0.6">
          <animate attributeName="opacity" values="0.2;0.8;0.2" dur="2.5s" repeatCount="indefinite" />
        </circle>
        <circle cx="105" cy="35" r="1" fill="white" opacity="0.7">
          <animate attributeName="opacity" values="0.4;1;0.4" dur="1.8s" repeatCount="indefinite" />
        </circle>
        
        {/* Flame */}
        <path
          d="M45 75 L50 90 L55 75 L60 90 L65 75"
          stroke="#10b981"
          strokeWidth="4"
          strokeLinecap="round"
          fill="none"
        >
          <animate attributeName="stroke-opacity" values="0.6;1;0.6" dur="0.8s" repeatCount="indefinite" />
        </path>
        
        {/* Rocket Body */}
        <ellipse cx="60" cy="45" rx="18" ry="35" fill="#60a5fa" />
        
        {/* Rocket Tip */}
        <path
          d="M42 20 L60 5 L78 20 L60 30 Z"
          fill="#3b82f6"
        />
        
        {/* Window */}
        <circle cx="60" cy="40" r="8" fill="#dbeafe" />
        <circle cx="60" cy="40" r="5" fill="#1e40af" opacity="0.3" />
        
        {/* Fins */}
        <path d="M42 60 L35 75 L42 70 Z" fill="#34d399" />
        <path d="M78 60 L85 75 L78 70 Z" fill="#34d399" />
        
        {/* Details */}
        <circle cx="60" cy="55" r="2" fill="#1e40af" opacity="0.4" />
        <circle cx="60" cy="62" r="2" fill="#1e40af" opacity="0.4" />
      </svg>
    </div>
  );
};

export const AlertIcon = () => {
  return (
    <div className="status-icon-container">
      <svg
        className="status-icon-svg"
        viewBox="0 0 120 120"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Ripple circles */}
        <circle cx="60" cy="60" r="50" stroke="#60a5fa" strokeWidth="2" fill="none" opacity="0.2">
          <animate attributeName="r" values="50;55;50" dur="2s" repeatCount="indefinite" />
          <animate attributeName="opacity" values="0.2;0.4;0.2" dur="2s" repeatCount="indefinite" />
        </circle>
        <circle cx="60" cy="60" r="40" stroke="#60a5fa" strokeWidth="2" fill="none" opacity="0.3">
          <animate attributeName="opacity" values="0.3;0.5;0.3" dur="1.5s" repeatCount="indefinite" />
        </circle>
        <circle cx="60" cy="60" r="30" stroke="#60a5fa" strokeWidth="2" fill="none" opacity="0.4" />
        
        {/* Center circle with exclamation */}
        <circle cx="60" cy="60" r="20" fill="#3b82f6" />
        
        {/* Exclamation mark */}
        <path
          d="M60 48 L60 60"
          stroke="white"
          strokeWidth="4"
          strokeLinecap="round"
        />
        <circle cx="60" cy="68" r="2.5" fill="white" />
      </svg>
    </div>
  );
};
