import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

import { Button } from "@/components/ui/button";

export function NFTLinks({ links }: { links: string[] }) {
  if (!links?.length) return null;

  return (
    <div className="mt-8">
      <Card className="bg-theme-card/40 border-0">
        <CardHeader>
          <CardTitle>Links</CardTitle>
        </CardHeader>
        <CardContent className="flex flex-wrap gap-4">
          {links.map((link, index) => (
            <Button
              key={index}
              asChild
              className="bg-gradient-to-r from-pink-500 to-purple-500 text-white hover:from-pink-600 hover:to-purple-600"
            >
              <a
                href={link}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2"
              >
                Link {index + 1}
              </a>
            </Button>
          ))}
        </CardContent>
      </Card>
    </div>
  );
}
