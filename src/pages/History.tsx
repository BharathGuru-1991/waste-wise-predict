
import PageContainer from "@/components/layout/PageContainer";
import HistoricalData from "@/components/history/HistoricalData";

export default function History() {
  return (
    <PageContainer>
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Historical Waste Data</h1>
        <p className="text-muted-foreground">
          Analyze past food waste patterns and trends
        </p>
      </div>

      <HistoricalData />
    </PageContainer>
  );
}
