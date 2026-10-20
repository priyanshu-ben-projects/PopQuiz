import { useLocation, useNavigate } from "react-router-dom";

export default function ResultPage() {
  const navigate = useNavigate();
  const state = useLocation();

  console.log(state);

  return <></>;
}
