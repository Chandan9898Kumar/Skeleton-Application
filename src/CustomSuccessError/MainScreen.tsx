import { useState } from "react";
import { StatusScreen } from "./components/StatusScreen";
import { TransactionDetails } from "./components/TransactionDetails";
import { ErrorMessage } from "./components/ErrorMessage";
import { RocketIcon, AlertIcon } from "./components/StatusIcons";
import { Share2 } from "lucide-react";
import { toast } from "sonner";
import "./main.css";

const MainScreen = () => {
  const [screenType, setScreenType] = useState<"success" | "error" | "demo">(
    "demo"
  );

  // Success screen example
  const successScreen = (
    <StatusScreen
      icon={<RocketIcon />}
      title="Okay all set!"
      referenceId="7435 3288 6174 740"
      statusBadge={{ label: "Successful", variant: "success" }}
      buttons={[
        {
          label: "Share",
          variant: "outline",
          onClick: () => toast.success("Share functionality triggered"),
        },
        {
          label: "Done",
          onClick: () => {
            toast.success("Transaction completed");
            setScreenType("demo");
          },
        },
      ]}
    >
      <TransactionDetails
        from={{
          label: "From",
          account: "Current account *8788",
          amount: "BHD 1,000.000",
        }}
        to={{
          name: "Fatima Ali 1",
          bank: "National Bank of Bahrain",
          iban: "BH64787635554332654711",
          mobile: "+973 39123456",
        }}
        details={{
          transferType: "Fawri+",
          purpose: "Ordinary Transfer",
          note: "Shared Gift",
          date: "3 Mar 2024",
        }}
      />
    </StatusScreen>
  );

  // Error screen example
  const errorScreen = (
    <StatusScreen
      icon={<AlertIcon />}
      title="We're sorry."
      referenceId="7435 3288 6174 740"
      buttons={[
        {
          label: "OK",
          onClick: () => {
            toast.info("Returning to main screen");
            setScreenType("demo");
          },
        },
      ]}
    >
      <ErrorMessage
        title="We are unable to process your request."
        description="Please try again later. If problem still persist, please contact our Customer Service Centre at +973 17531532 for assistance."
      />
    </StatusScreen>
  );

  // Demo selector screen
  const demoScreen = (
    <div className="demo-screen">
      <div className="demo-container">
        <div className="demo-header">
          <h1 className="demo-title">Reusable Status Screen Component</h1>
          <p className="demo-subtitle">
            A single component that handles both success and error states with
            full customization
          </p>
        </div>

        <div className="demo-card">
          <h2 className="demo-features-title">Component Features:</h2>
          <ul className="demo-features-list">
            <li className="demo-feature-item">
              <Share2 className="demo-feature-icon" />
              <span>Customizable icons, titles, and content</span>
            </li>
            <li className="demo-feature-item">
              <Share2 className="demo-feature-icon" />
              <span>Flexible button configurations (single or multiple)</span>
            </li>
            <li className="demo-feature-item">
              <Share2 className="demo-feature-icon" />
              <span>Status badges and reference IDs</span>
            </li>
            <li className="demo-feature-item">
              <Share2 className="demo-feature-icon" />
              <span>Smooth animations and transitions</span>
            </li>
            <li className="demo-feature-item">
              <Share2 className="demo-feature-icon" />
              <span>Responsive design with beautiful gradients</span>
            </li>
          </ul>

          <div className="demo-buttons">
            <button
              onClick={() => setScreenType("success")}
              className="demo-btn demo-btn-success"
            >
              View Success Example
            </button>
            <button
              onClick={() => setScreenType("error")}
              className="demo-btn demo-btn-error"
            >
              View Error Example
            </button>
          </div>
        </div>

        <div className="demo-code-card">
          <p className="demo-code-label">Usage Example:</p>
          <pre className="demo-code-block">
            {`<StatusScreen
  icon={<RocketIcon />}
  title="Okay all set!"
  referenceId="7435 3288 6174 740"
  statusBadge={{ label: "Successful", variant: "success" }}
  buttons={[
    { label: "Share", variant: "outline", onClick: handleShare },
    { label: "Done", onClick: handleDone }
  ]}
>
  <YourCustomContent />
</StatusScreen>`}
          </pre>
        </div>
      </div>
    </div>
  );

  return (
    <>
      {screenType === "demo" && demoScreen}
      {screenType === "success" && successScreen}
      {screenType === "error" && errorScreen}
    </>
  );
};

export default MainScreen;
