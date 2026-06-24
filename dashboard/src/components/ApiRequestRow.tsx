"use client";

import { useState } from "react";

interface Props {
  log: any;
}

export default function ApiRequestRow({
  log,
}: Props) {
  const [open, setOpen] =
    useState(false);

  const statusColor =
    log.status >= 500
      ? "text-red-400"
      : log.status >= 400
      ? "text-orange-400"
      : "text-green-400";

  const formatJson = (
    value: any
  ) => {
    try {
      return JSON.stringify(
        typeof value === "string"
          ? JSON.parse(value)
          : value,
        null,
        2
      );
    } catch {
      return value || "N/A";
    }
  };

  return (
    <div className="border-b border-slate-800">
      <button
        onClick={() =>
          setOpen(!open)
        }
        className="flex w-full items-center justify-between px-4 py-4 hover:bg-slate-900 gap-4"
      >
        <div className="flex items-center gap-4 min-w-0 flex-1">
          <span className="font-medium shrink-0">
            {log.method}
          </span>

          <span className="text-slate-400 truncate"
            title={log.url}
          >
            {log.url}
          </span>
        </div>

        <span className={`${statusColor} shrink-0 font-medium ml-4`}
        >
          {log.status}
        </span>
      </button>

      {open && (
        <div className="space-y-6 bg-slate-950 p-6">
          <div>
            <h4 className="mb-2 font-semibold">
              Request Headers
            </h4>

            <pre className="overflow-auto rounded-xl bg-black p-4 text-sm">
              {formatJson(
                log.request.headers
              )}
            </pre>
          </div>

          <div>
            <h4 className="mb-2 font-semibold">
              Request Body
            </h4>

            <pre className="overflow-auto rounded-xl bg-black p-4 text-sm">
              {formatJson(
                log.request.body
              )}
            </pre>
          </div>

          <div>
            <h4 className="mb-2 font-semibold">
              Response Headers
            </h4>

            <pre className="overflow-auto rounded-xl bg-black p-4 text-sm">
              {formatJson(
                log.response.headers
              )}
            </pre>
          </div>

          <div>
            <h4 className="mb-2 font-semibold">
              Response Body
            </h4>

            <pre className="overflow-auto rounded-xl bg-black p-4 text-sm">
              {formatJson(
                log.response.body
              )}
            </pre>
          </div>
        </div>
      )}
    </div>
  );
}