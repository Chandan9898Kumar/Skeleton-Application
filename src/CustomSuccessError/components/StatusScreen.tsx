import type {ReactNode } from "react";
import "./StatusScreen.css";

export interface StatusButton {
  label: string;
  onClick: () => void;
  variant?: "default" | "outline" | "destructive" | "secondary" | "ghost" | "link";
}

export interface StatusScreenProps {
  icon: ReactNode;
  title: string;
  referenceId?: string;
  statusBadge?: {
    label: string;
    variant: "success" | "error";
  };
  children: ReactNode;
  buttons: StatusButton[];
  className?: string;
}

export const StatusScreen = ({
  icon,
  title,
  referenceId,
  statusBadge,
  children,
  buttons,
  className,
}: StatusScreenProps) => {
  return (
    <div className={`status-screen ${className || ''}`}>
      <div className="status-screen-container">
        {/* Icon Section */}
        <div className="status-screen-icon">
          {icon}
        </div>

        {/* Title */}
        <h1 className="status-screen-title">
          {title}
        </h1>

        {/* Content Card */}
        <div className="status-screen-card">
          {/* Status Badge and Reference ID */}
          {(statusBadge || referenceId) && (
            <div className="status-screen-header">
              {statusBadge && (
                <span className={`status-badge status-badge-${statusBadge.variant}`}>
                  {statusBadge.label}
                </span>
              )}
              {referenceId && (
                <span className="status-reference">
                  Ref ID: {referenceId}
                </span>
              )}
            </div>
          )}

          {/* Main Content */}
          <div className="status-screen-content">
            {children}
          </div>

          {/* Action Buttons */}
          <div className="status-screen-buttons">
            {buttons.map((button, index) => (
              <button
                key={index}
                onClick={button.onClick}
                className={`btn btn-full btn-${button.variant || 'default'}`}
              >
                {button.label}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
