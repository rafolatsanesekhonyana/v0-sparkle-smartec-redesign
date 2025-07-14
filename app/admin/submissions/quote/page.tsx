"use client"

import { useState, useEffect } from 'react';
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";

interface Quote {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  company: string;
  projectTitle: string;
  services: string[];
  projectDescription: string;
  budget: string;
  timeline: string;
  submittedAt: string;
}

export default function QuoteSubmissionsPage() {
  const [quotes, setQuotes] = useState<Quote[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchQuotes = async () => {
      try {
        const res = await fetch('/api/quote');
        if (!res.ok) {
          throw new Error('Failed to fetch quotes');
        }
        const data = await res.json();
        setQuotes(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchQuotes();
  }, []);

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <main className="py-12 px-4">
        <div className="max-w-7xl mx-auto">
          <Card>
            <CardHeader>
              <CardTitle>Quote Submissions</CardTitle>
            </CardHeader>
            <CardContent>
              {loading && <p>Loading...</p>}
              {error && <p className="text-red-500">{error}</p>}
              {!loading && !error && (
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Name</TableHead>
                      <TableHead>Email</TableHead>
                      <TableHead>Company</TableHead>
                      <TableHead>Project Title</TableHead>
                      <TableHead>Services</TableHead>
                      <TableHead>Budget</TableHead>
                      <TableHead>Timeline</TableHead>
                      <TableHead>Submitted At</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {quotes.map((quote) => (
                      <TableRow key={quote.id}>
                        <TableCell>{`${quote.firstName} ${quote.lastName}`}</TableCell>
                        <TableCell>{quote.email}</TableCell>
                        <TableCell>{quote.company}</TableCell>
                        <TableCell>{quote.projectTitle}</TableCell>
                        <TableCell>
                          {quote.services.map((service) => (
                            <Badge key={service} className="mr-1">{service}</Badge>
                          ))}
                        </TableCell>
                        <TableCell>{quote.budget}</TableCell>
                        <TableCell>{quote.timeline}</TableCell>
                        <TableCell>{new Date(quote.submittedAt).toLocaleString()}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              )}
            </CardContent>
          </Card>
        </div>
      </main>
      <Footer />
    </div>
  );
}
