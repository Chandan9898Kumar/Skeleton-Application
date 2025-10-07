import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import TransactionAccount from "./pages/Transaction";
import AccountSelection from "./pages/AccountSelection";
import AmountEntry from "./pages/AmountEntry";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import PayeeSelection from "./pages/PayeeSelection";
import ReviewTransfer from "./pages/ReviewTransfer";
import TransferError from "./pages/TransferError";
import TransferSuccess from "./pages/TransferSuccess";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="/account" element={<AccountSelection />} />
        <Route path="/payee" element={<PayeeSelection />} />
        <Route path="/amount" element={<AmountEntry />} />
        <Route path="/review" element={<ReviewTransfer />} />
        <Route path="/success" element={<TransferSuccess />} />
        <Route path="/error" element={<TransferError />} />
        <Route path="/transactions" element={<TransactionAccount />} />
        {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  </QueryClientProvider>
);

export default App;
