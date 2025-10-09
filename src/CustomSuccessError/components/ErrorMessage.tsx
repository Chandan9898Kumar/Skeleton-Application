import "./ErrorMessage.css";

export interface ErrorMessageProps {
  title: string;
  description: string;
  contactInfo?: string;
}

export const ErrorMessage = ({
  title,
  description,
  contactInfo,
}: ErrorMessageProps) => {
  return (
    <div className="error-message">
      <h2 className="error-message-title">{title}</h2>
      <p className="error-message-description">{description}</p>
      {contactInfo && (
        <p className="error-message-contact">{contactInfo}</p>
      )}
    </div>
  );
};
