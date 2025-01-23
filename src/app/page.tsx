"use client";

import { AnimatePresence, motion } from "framer-motion";
import { getBoardColumns, getBoardItems } from "@/lib/monday";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";

import { CategoryFilter } from "./_components/CategoryFilter";
import { ExportButton } from "./_components/ExportButton";
import { MondayCard } from "./_components/MondayCard";

type MondayColumn = {
  id: string;
  title: string;
  type: string;
};

type MondayItem = {
  id: string;
  name: string;
  column_values: {
    id: string;
    text: string;
    value: string;
  }[];
};

export default function MondayPage() {
  const contentRef = useRef<HTMLDivElement>(null);
  const [columns, setColumns] = useState<MondayColumn[]>([]);
  const [items, setItems] = useState<MondayItem[]>([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [loading, setLoading] = useState(true);
  const [boardDescription, setBoardDescription] = useState("");

  // Fetch data
  useEffect(() => {
    async function fetchData() {
      try {
        const { description, columns: columnsData } =
          await getBoardColumns(8312502144);
        setBoardDescription(description);
        const itemsData = await getBoardItems(
          8312502144,
          columnsData.map((col: { id: any }) => col.id),
        );
        console.log("Columns:", columnsData);
        console.log("Items:", itemsData);
        setColumns(columnsData);
        setItems(itemsData);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, []);

  // Get unique categories
  const categories = useMemo(() => {
    // Find the category column
    const categoryColumn = columns.find(
      (col) => col.title.toLowerCase() === "category",
    );
    if (!categoryColumn) return [];

    // Get all category values and filter out empty ones
    const categoryValues = items
      .map((item) => {
        const value = item.column_values.find(
          (v) => v.id === categoryColumn.id,
        );
        return value?.text ?? "";
      })
      .filter(Boolean);

    // Get unique values
    return Array.from(new Set(categoryValues)).sort();
  }, [columns, items]);

  // Get column value helper
  const getColumnValue = useCallback(
    (item: MondayItem, title: string) => {
      const column = columns.find(
        (c) => c.title.toLowerCase() === title.toLowerCase(),
      );
      if (!column) return "";
      const value = item.column_values.find((v) => v.id === column.id);
      return value?.text ?? "";
    },
    [columns],
  );

  // Filter items
  const filteredItems = items.filter((item) => {
    if (!selectedCategory) return true;
    const itemCategory = getColumnValue(item, "category");
    console.log("Item category:", itemCategory, "Selected:", selectedCategory);
    return itemCategory === selectedCategory;
  });

  if (loading) {
    return (
      <div className="container py-8">
        <p>Loading...</p>
      </div>
    );
  }

  return (
    <div className="container bg-slate-50 py-8">
      <div ref={contentRef} className="flex flex-col gap-10">
        <div className="mb-6 flex gap-20">
          <div className="flex flex-col">
            <h1 className="text-3xl font-bold">Monday.com Board Items</h1>
            {boardDescription && (
              <p className="mt-2 text-gray-600">{boardDescription}</p>
            )}
          </div>
          <div className="mt-4 flex justify-end print:hidden">
            <ExportButton contentRef={contentRef} />
          </div>
        </div>
        <div>
          <CategoryFilter
            categories={categories}
            selectedCategory={selectedCategory}
            onCategoryChange={setSelectedCategory}
            className="print:hidden"
          />

          <motion.div
            layout
            className="motion-div grid gap-4 md:grid-cols-2 lg:grid-cols-3 print:grid-cols-3"
          >
            <AnimatePresence mode="popLayout">
              {filteredItems.map((item) => (
                <MondayCard
                  key={item.id}
                  resource={item.name}
                  website={getColumnValue(item, "website")}
                  phone={getColumnValue(item, "phone")}
                  email={getColumnValue(item, "email")}
                  content={getColumnValue(item, "content")}
                  category={getColumnValue(item, "category")}
                />
              ))}
            </AnimatePresence>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
