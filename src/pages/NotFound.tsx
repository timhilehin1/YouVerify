import { useNavigate } from "react-router-dom";

const NotFound = () => {
  const navigate = useNavigate();

  const handleGoToInvoice = () => {
    navigate("/invoice");
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 p-4 sm:p-6">
      <div className="bg-white p-8 sm:p-10 rounded-xl shadow-lg text-center">
        <h1 className="text-9xl font-extrabold text-[#003EFF]">404</h1>

        <p className="text-2xl font-semibold text-coal mt-4">
          Oops! Page Not Found
        </p>

        <p className="text-coal mt-2 mb-6">
          The page you are looking for might have been removed, had its name
          changed, or is temporarily unavailable.
        </p>

        <button
          onClick={handleGoToInvoice}
          className="px-6 py-3 bg-[#003EFF] text-white font-medium rounded-full hover:bg-[#002BCC] transition duration-200 shadow-md cursor-pointer"
        >
          Go Back to Invoices
        </button>
      </div>
    </div>
  );
};

export default NotFound;
