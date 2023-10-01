import Button from "./Button";
import { useNavigate } from "react-router-dom";
export default function BackButton() {
  const navigate = useNavigate();
  return (
    <div>
      <Button
        type="back"
        onClick={(e) => {
          e.preventDefault();
          navigate(-1);
          // here you can mention how many steps you want to go further or backward;
        }}
      >
        &larr;Back
      </Button>
    </div>
  );
}
