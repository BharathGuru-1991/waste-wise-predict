
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Leaf, User } from "lucide-react";
import { useAuth } from "@/components/auth/AuthProvider";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export default function Header() {
  const navigate = useNavigate();
  const { user, signOut } = useAuth();

  const handleSignOut = async () => {
    await signOut();
    navigate("/auth");
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center">
        <div className="mr-4 flex items-center gap-2" onClick={() => navigate("/")} role="button">
          <Leaf className="h-6 w-6 text-eco-green-500" />
          <span className="text-lg font-bold">WasteWise Predict</span>
        </div>
        <nav className="flex flex-1 items-center justify-end space-x-4">
          {user ? (
            <>
              <Button variant="ghost" onClick={() => navigate("/")}>Dashboard</Button>
              <Button variant="ghost" onClick={() => navigate("/history")}>History</Button>
              <Button variant="ghost" onClick={() => navigate("/data")}>Data</Button>
              
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" size="icon">
                    <User className="h-5 w-5" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuLabel>Account</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={() => navigate("/profile")}>
                    Profile
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={handleSignOut}>
                    Sign out
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </>
          ) : (
            <Button onClick={() => navigate("/auth")}>Sign In</Button>
          )}
        </nav>
      </div>
    </header>
  );
}
