
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Leaf } from "lucide-react";

export default function Header() {
  const navigate = useNavigate();

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center">
        <div className="mr-4 flex items-center gap-2" onClick={() => navigate("/")} role="button">
          <Leaf className="h-6 w-6 text-eco-green-500" />
          <span className="text-lg font-bold">WasteWise Predict</span>
        </div>
        <nav className="flex flex-1 items-center justify-end space-x-4">
          <Button variant="ghost" onClick={() => navigate("/")}>Dashboard</Button>
          <Button variant="ghost" onClick={() => navigate("/history")}>History</Button>
          <Button variant="ghost" onClick={() => navigate("/data")}>Data</Button>
        </nav>
      </div>
    </header>
  );
}
