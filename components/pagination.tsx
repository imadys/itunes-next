"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Button } from "./ui/button";

export default function Pagination({ slug, page, pages, total }: { slug: string, page: number, pages: number, total : number }) {
    const router = useRouter();
    const [currentPage, setCurrentPage] = useState(page);

    const generatePageNumbers = () => {
        const delta = 2;
        const range = [];
        const rangeWithDots = [];

        range.push(1);

        // Add pages around current page
        for (let i = Math.max(2, currentPage - delta); i <= Math.min(pages - 1, currentPage + delta); i++) {
            range.push(i);
        }

        if (pages > 1) {
            range.push(pages);
        }

        const uniqueRange = [...new Set(range)].sort((a, b) => a - b);

        let prev = 0;
        for (const current of uniqueRange) {
            if (current - prev > 1) {
                rangeWithDots.push('...');
            }
            rangeWithDots.push(current);
            prev = current;
        }

        return rangeWithDots;
    };

    if(total <= 10) {
        return null;
    }

    const pageNumbers = generatePageNumbers();

    return (
        <div className="flex justify-center gap-4">

            <Button disabled={currentPage == 1} variant="outline" onClick={() => {
                router.replace(`/podcast/${slug}?page=${currentPage - 1}`);
                setCurrentPage(currentPage - 1);
            }}>
                <ChevronRight className="w-4 h-4" />
                السابق
            </Button>
            <div className="lg:flex hidden gap-1 items-center">
                {pageNumbers.map((pageNum, index) => (
                    pageNum === '...' ? (
                        <span key={`ellipsis-${index}`} className="px-2 text-gray-400">
                            ...
                        </span>
                    ) : (
                        <Button
                            key={pageNum}
                            variant={currentPage === pageNum ? "default" : "outline"}
                            size="sm"
                            onClick={() => {
                                router.replace(`/podcast/${slug}?page=${pageNum}`);
                                setCurrentPage(pageNum as number);
                            }}
                        >
                            {pageNum}
                        </Button>
                    )
                ))}
            </div>
            <Button variant="outline" disabled={currentPage == pages} onClick={() => {
                router.replace(`/podcast/${slug}?page=${currentPage + 1}`);
                setCurrentPage(currentPage + 1);
            }}>
                التالي
                <ChevronLeft className="w-4 h-4" />
            </Button>
        </div>
    )
}