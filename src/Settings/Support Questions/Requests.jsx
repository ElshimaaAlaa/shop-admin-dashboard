import { useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import { IoMdAddCircleOutline } from "react-icons/io";
import { getRequests } from "../../ApiServices/Requests";
import AddRequest from "./AddRequest";
import { ClipLoader } from "react-spinners";
import { useTranslation } from "react-i18next";
function Requests() {
  const [showModal, setShowModal] = useState(false);
  const [requestData, setRequestData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedQuestionId, setSelectedQuestionId] = useState(null);
  const [error, setError] = useState(null);
  const { t } = useTranslation();
  useEffect(() => {
    const fetchRequests = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const response = await getRequests();
        setRequestData(response.data || []);
      } catch (error) {
        console.error("Failed to fetch requests:", error);
        setError("Failed to load requests. Please try again.");
        setRequestData([]);
      } finally {
        setIsLoading(false);
      }
    };
    fetchRequests();
  }, []);

  const handleAddResponse = (questionId) => {
    setSelectedQuestionId(questionId);
    setShowModal(true);
  };

  const handleResponseAdded = () => {
    const fetchRequests = async () => {
      try {
        const response = await getRequests();
        setRequestData(response.data || []);
      } catch (error) {
        console.error("Failed to refresh requests:", error);
      }
    };
    fetchRequests();
  };

  return (
    <div className="bg-gray-100 flex flex-col min-h-[90vh]">
      <Helmet>
        <title>
          {t("requests")} | {t("vertex")}
        </title>
      </Helmet>
      <div className="rounded-md p-5 mx-5 bg-white mt-5 flex items-center justify-between">
        <div>
          <p className="text-gray-400 text-13">{t("requestMenu")}</p>
          <h1 className="text-17 font-bold mt-2">{t("requests")}</h1>
        </div>
      </div>

      <AddRequest
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        onSuccess={handleResponseAdded}
        questionId={selectedQuestionId}
      />

      <div className="bg-white rounded-md p-4 mx-5 mt-3">
        {isLoading ? (
          <div className="flex justify-center">
            <ClipLoader color="#E0A75E" size={30} />
          </div>
        ) : error ? (
          <div className="text-red-500 text-center">{error}</div>
        ) : requestData.length > 0 ? (
          requestData.map((request) => (
            <div
              key={request.id}
              className="flex items-center justify-between gap-3 mb-3"
            >
              <div className="bg-gray-50 rounded-md w-full p-5 font-bold">
                {request.question}
              </div>
              <div
                className="font-bold text-primary flex items-center gap-2 w-44 cursor-pointer"
                onClick={() => handleAddResponse(request.id)}
              >
                <IoMdAddCircleOutline size={23} />
                {t("addResponse")}
              </div>
            </div>
          ))
        ) : (
          <p className="text-gray-400 text-center text-14">{t("noRequest")}</p>
        )}
      </div>
    </div>
  );
}
export default Requests;
