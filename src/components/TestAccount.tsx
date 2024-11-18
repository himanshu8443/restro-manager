"use client";

import { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Copy, Check } from "lucide-react";

type Credential = {
  role: string;
  email: string;
  password: string;
};

const credentials: Credential[] = [
  { role: "Admin", email: "admin@mail.com", password: "123" },
  { role: "Employee", email: "staff@mail.com", password: "123" },
];

export default function TestCredentials() {
  const [copiedStates, setCopiedStates] = useState<{ [key: string]: boolean }>(
    {}
  );

  const copyToClipboard = async (text: string, field: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedStates((prev) => ({ ...prev, [field]: true }));
      setTimeout(
        () => setCopiedStates((prev) => ({ ...prev, [field]: false })),
        2000
      );
    } catch (err) {
      console.error("Failed to copy text: ", err);
    }
  };

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle>Test Credentials</CardTitle>
        <CardDescription>
          Use these credentials for testing purposes
        </CardDescription>
      </CardHeader>
      <CardContent>
        {credentials.map((cred, index) => (
          <div key={index} className="mb-6 last:mb-0">
            <h3 className="text-lg font-semibold mb-2">{cred.role}</h3>
            <div className="grid grid-cols-[1fr,auto] gap-2 items-center">
              <div className="font-medium">Email:</div>
              <Button
                variant="outline"
                size="sm"
                className="w-24"
                onClick={() =>
                  copyToClipboard(cred.email, `${cred.role}-email`)
                }
              >
                {copiedStates[`${cred.role}-email`] ? (
                  <Check className="h-4 w-4" />
                ) : (
                  <Copy className="h-4 w-4" />
                )}
                <span className="ml-2">
                  {copiedStates[`${cred.role}-email`] ? "Copied!" : "Copy"}
                </span>
              </Button>
              <div className="font-mono">{cred.email}</div>
              <div></div>
              <div className="font-medium">Password:</div>
              <Button
                variant="outline"
                size="sm"
                className="w-24"
                onClick={() =>
                  copyToClipboard(cred.password, `${cred.role}-password`)
                }
              >
                {copiedStates[`${cred.role}-password`] ? (
                  <Check className="h-4 w-4" />
                ) : (
                  <Copy className="h-4 w-4" />
                )}
                <span className="ml-2">
                  {copiedStates[`${cred.role}-password`] ? "Copied!" : "Copy"}
                </span>
              </Button>
              <div className="font-mono">{cred.password}</div>
              <div></div>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}
