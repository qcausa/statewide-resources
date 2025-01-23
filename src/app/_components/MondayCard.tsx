"use client";

import Link from "next/link";
import { motion } from "framer-motion";

type MondayCardProps = {
  resource: string;
  website: string;
  phone: string;
  email: string;
  content: string;
  category: string;
};

export function MondayCard({
  resource,
  website,
  phone,
  email,
  content,
  category,
}: MondayCardProps) {
  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      transition={{ duration: 0.2 }}
      className="overflow-hidden rounded-lg border border-gray-200 bg-white shadow-sm"
    >
      <div className="flex flex-col space-y-4 p-4">
        {/* Header */}
        <div className="space-y-1">
          <h3 className="font-medium text-gray-900">{resource}</h3>
          <span className="inline-flex rounded-full bg-blue-50 px-3 py-1 text-sm text-blue-600">
            {category}
          </span>
        </div>

        {/* Content */}
        <p className="text-sm text-gray-600">{content}</p>

        {/* Contact Info */}
        <div className="space-y-2 text-sm">
          {website && (
            <div className="flex items-center gap-2">
              <span className="text-gray-500">Website:</span>
              <Link
                href={website}
                target="_blank"
                className="text-blue-600 hover:underline"
              >
                {new URL(website).hostname}
              </Link>
            </div>
          )}

          {phone && (
            <div className="flex items-center gap-2">
              <span className="text-gray-500">Phone:</span>
              <span className="text-gray-700">{phone}</span>
            </div>
          )}

          {email && (
            <div className="flex items-center gap-2">
              <span className="text-gray-500">Email:</span>
              <Link
                href={`mailto:${email}`}
                className="text-blue-600 hover:underline"
              >
                {email}
              </Link>
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
}
