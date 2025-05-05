
import PageContainer from "@/components/layout/PageContainer";
import DataManagement from "@/components/data/DataManagement";

export default function Data() {
  return (
    <PageContainer>
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Data Management</h1>
        <p className="text-muted-foreground">
          Manage your food waste data records
        </p>
      </div>

      <DataManagement />
    </PageContainer>
  );
}
