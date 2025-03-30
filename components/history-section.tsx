import { useState, useEffect } from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Clock, FileText, CheckCircle2, AlertCircle } from "lucide-react";

// Define the interface for history items
interface HistoryItem {
  id: string;
  patientId: string;
  date: string;
  imageName: string;
  prediction: string;
  confidence: number;
}

export default function HistorySection() {
  const [historyItems, setHistoryItems] = useState<HistoryItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchHistory();
  }, []);

  const fetchHistory = async () => {
    try {
      setLoading(true);
      const apiUrl = "/api/history"
      const response = await fetch(apiUrl);

      const data = await response.json();
      setHistoryItems(data as HistoryItem[]);
    } catch (error) {
      console.error('Error fetching history:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <div>Loading history...</div>;
  }

  return (
      <div className="max-w-4xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">Analysis History</h1>
          <Button variant="outline" onClick={fetchHistory}>Refresh</Button>
        </div>

        <div className="space-y-4">
          {historyItems.map((item) => (
              <Card key={item.id}>
                <CardContent className="p-6">
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div className="flex items-start gap-4">
                      <div className="rounded-md bg-muted p-2 hidden sm:block">
                        <FileText className="h-6 w-6 text-muted-foreground" />
                      </div>
                      <div>
                        <h3 className="font-medium">{item.imageName}</h3>
                        <p className="text-sm text-muted-foreground">Patient ID: {item.patientId}</p>
                        <div className="flex items-center gap-1 mt-1">
                          <Clock className="h-3 w-3 text-muted-foreground" />
                          <span className="text-xs text-muted-foreground">
                        {new Date(item.date).toLocaleString()}
                      </span>
                        </div>
                      </div>
                    </div>

                    <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
                      <div className="flex items-center gap-2">
                        {item.prediction.includes("not") ? (
                            <CheckCircle2 className="h-4 w-4 text-green-500" />
                        ) : (
                            <AlertCircle className="h-4 w-4 text-destructive" />
                        )}
                        <span className="text-sm font-medium">
                      {item.prediction.includes("not") ? "No Fracture" : "Fracture Detected"}
                    </span>
                        <span className="text-xs text-muted-foreground">
                      ({(item.confidence * 100).toFixed(0)}% confidence)
                    </span>
                      </div>
                      <Button variant="ghost" size="sm">
                        View Details
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
          ))}
        </div>
      </div>
  );
}