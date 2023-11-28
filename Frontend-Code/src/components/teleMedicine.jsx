import { ZegoUIKitPrebuilt } from "@zegocloud/zego-uikit-prebuilt";
import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const CreateCall = () => {
  const { appointmentId } = useParams();
  const empty = () => {};

  const [loading, setLoading] = useState(true);
  const [denied, setDenied] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const meeting = async (element) => {
    const appID = 1681553209;
    const serverSecret = "528000bf7e38c8f2f7ce27b08034f7f3";
    const kitToken = ZegoUIKitPrebuilt.generateKitTokenForTest(
      appID,
      serverSecret,
      appointmentId,
      Date.now().toString(),
      "Type your name"
    );
    const zc = ZegoUIKitPrebuilt.create(kitToken);
    zc.joinRoom({
      container: element,
      scenario: { mode: ZegoUIKitPrebuilt.OneONoneCall },
      sharedLinks: [
        {
          name: "Copy link",
          url: `http://localhost:3000/common/call/${appointmentId}`,
        },
      ],
    });
  };

  useEffect(() => {
    const url = `http://localhost:8081/api/v2/verify/${appointmentId}`;

    // Get the token from local storage or wherever you store it
    const token = localStorage.getItem("token");

    axios
      .get(url, {
        headers: {
          Authorization: `Bearer ${token}`, // Add the Authorization header with the token
        },
      })
      .then((result) => {
        setLoading(false);
      })
      .catch((error) => {
        setDenied(true);
        setErrorMessage(error.response.data.message);

        // REMOVE THE NEXT LINE! Added for testing purpose.
        // setLoading(false);
      });
  }, [appointmentId]);
  return (
    <div>
      <div ref={loading ? empty : meeting} style={{ width: "100%" }} />
      {loading && (
        <div className="card m-4 p-4">
          {denied ? (
            <div style={{ color: "red" }}>{errorMessage}</div>
          ) : (
            <div>
              Please wait while your access to appointment{" "}
              <b>{appointmentId}</b> is being verified.
            </div>
          )}
        </div>
      )}
      <br />
      <br />
      <br />
    </div>
  );
};
export default CreateCall;
