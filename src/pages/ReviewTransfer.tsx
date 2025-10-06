import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { mockBankApi } from "../api/mockBankApi";
import { useTransferStore } from "../stores/transferStore";
import { ReviewDetails } from "../components/ReviewDetails";
import ComponentErrorBoundary from "../components/ComponentErrorBoundary";
import "../styles/reviewTransfer.css";

const ReviewTransfer: React.FC = () => {
  const navigate = useNavigate();
  const [isProcessing, setIsProcessing] = useState(false);

  const selectedAccount = useTransferStore((state) => state.selectedAccount);
  const selectedPayee = useTransferStore((state) => state.selectedPayee);
  const amount = useTransferStore((state) => state.amount);
  const purpose = useTransferStore((state) => state.purpose);
  const description = useTransferStore((state) => state.description);
  const canAccessReview = useTransferStore((state) => state.canAccessReview);
  const setTransactionResult = useTransferStore(
    (state) => state.setTransactionResult
  );
  const resetToAmount = useTransferStore((state) => state.resetToAmount);

  useEffect(() => {
    // Route guard
    if (!canAccessReview()) {
      navigate("/account", { replace: true });
    }
  }, [canAccessReview, navigate]);

  const handleTransfer = async () => {
    if (!selectedAccount || !selectedPayee || !amount) return;

    setIsProcessing(true);

    try {
      const result = await mockBankApi.processTransfer({
        fromAccount: selectedAccount,
        toPayee: selectedPayee,
        amount,
        purpose,
        description,
      });

      if (result.success) {
        setTransactionResult(true, result.transactionId);
        navigate("/success", { replace: true });
      } else {
        setTransactionResult(false, "", result.error);
        navigate("/error", { replace: true });
      }
    } catch (error) {
      setTransactionResult(
        false,
        "",
        `An unexpected error occurred. Please try again.${
          error instanceof Error ? " " + error.message : ""
        }`
      );
      navigate("/error", { replace: true });
    }
  };

  const handleBack = () => {
    resetToAmount();
    navigate("/amount");
  };

  if (!selectedAccount || !selectedPayee || !amount) {
    return null;
  }

  return (
    <div className="review-container">
      <div className="review-header">
        <button
          className="back-button"
          onClick={handleBack}
          disabled={isProcessing}
        >
          ← Back
        </button>
        <h1 className="review-title">Review Transfer</h1>
      </div>

      <div className="review-content">
        <ComponentErrorBoundary componentName="Review Details">
          <ReviewDetails
            selectedAccount={selectedAccount}
            selectedPayee={selectedPayee}
            amount={amount}
            purpose={purpose}
            description={description}
            isProcessing={isProcessing}
            onConfirm={handleTransfer}
          />
        </ComponentErrorBoundary>
      </div>
    </div>
  );
};

export default ReviewTransfer;
