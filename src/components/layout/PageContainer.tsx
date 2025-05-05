
import { ReactNode } from "react";
import Header from "./Header";

interface PageContainerProps {
  children: ReactNode;
  className?: string;
}

export default function PageContainer({ children, className = "" }: PageContainerProps) {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className={`flex-1 container py-6 ${className}`}>
        {children}
      </main>
      <footer className="py-6 border-t">
        <div className="container text-center text-muted-foreground text-sm">
          © {new Date().getFullYear()} WasteWise Predict • Reducing Food Waste Through Prediction
        </div>
      </footer>
    </div>
  );
}
