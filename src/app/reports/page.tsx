"use client";

import { useEffect, useState } from "react";

type ReportStatus = "PENDING" | "REVIEWED" | "RESOLVED";

interface Report {
  id: string;
  user: string;
  consultant: string;
  reason: string;
  date: string;
  status: ReportStatus;
}

export default function AdminReportsPage() {
  const [reports, setReports] = useState<Report[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // TODO: replace with real API
    setTimeout(() => {
      setReports([
        {
          id: "1",
          user: "john@example.com",
          consultant: "sarah@consult.com",
          reason: "Unprofessional behavior",
          date: "2026-01-06",
          status: "PENDING",
        },
        {
          id: "2",
          user: "amy@example.com",
          consultant: "mike@consult.com",
          reason: "Missed appointment",
          date: "2026-01-05",
          status: "REVIEWED",
        },
      ]);
      setLoading(false);
    }, 500);
  }, []);

  const updateStatus = (id: string, status: ReportStatus) => {
    setReports((prev) => prev.map((r) => (r.id === id ? { ...r, status } : r)));

    // TODO: POST to backend
    // fetch(`/api/admin/reports/${id}`, { method: "PATCH", body: JSON.stringify({ status }) })
  };

  if (loading) return <p className="p-6">Loading reports...</p>;

  return (
    <div className="bg-background min-h-screen">
      {/* Top header */}
      <div className="bg-primary text-primary-foreground rounded-t-lg p-6">
        <h1 className="text-lg font-semibold">User Reports</h1>
      </div>

      {/* Table area */}
      <div className="bg-card border-border overflow-x-auto rounded-b-lg border shadow-sm">
        <table className="min-w-full">
          <thead className="bg-muted/50">
            <tr>
              <th className="text-muted-foreground px-6 py-4 text-left text-xs font-medium tracking-wider uppercase">
                User
              </th>
              <th className="text-muted-foreground px-6 py-4 text-left text-xs font-medium tracking-wider uppercase">
                Consultant
              </th>
              <th className="text-muted-foreground px-6 py-4 text-left text-xs font-medium tracking-wider uppercase">
                Reason
              </th>
              <th className="text-muted-foreground px-6 py-4 text-left text-xs font-medium tracking-wider uppercase">
                Date
              </th>
              <th className="text-muted-foreground px-6 py-4 text-left text-xs font-medium tracking-wider uppercase">
                Status
              </th>
              <th className="text-muted-foreground px-6 py-4 text-left text-xs font-medium tracking-wider uppercase">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-border divide-y">
            {reports.map((r) => (
              <tr key={r.id} className="hover:bg-muted/30 transition-colors">
                <td className="px-6 py-4 whitespace-nowrap">{r.user}</td>
                <td className="px-6 py-4 whitespace-nowrap">{r.consultant}</td>
                <td className="px-6 py-4 whitespace-nowrap">{r.reason}</td>
                <td className="px-6 py-4 whitespace-nowrap">{r.date}</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span
                    className={`rounded px-2 py-1 text-xs font-medium ${
                      r.status === "PENDING"
                        ? "bg-yellow-100 text-yellow-700"
                        : r.status === "REVIEWED"
                          ? "bg-blue-100 text-blue-700"
                          : "bg-green-100 text-green-700"
                    }`}
                  >
                    {r.status}
                  </span>
                </td>
                <td className="space-x-2 px-6 py-4 whitespace-nowrap">
                  {r.status !== "REVIEWED" && (
                    <button
                      onClick={() => updateStatus(r.id, "REVIEWED")}
                      className="text-blue-600 hover:underline"
                    >
                      Mark Reviewed
                    </button>
                  )}
                  {r.status !== "RESOLVED" && (
                    <button
                      onClick={() => updateStatus(r.id, "RESOLVED")}
                      className="text-green-600 hover:underline"
                    >
                      Resolve
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
