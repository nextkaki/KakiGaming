"use client";

import { useState, useEffect } from "react";
import { UpdateItem } from "@/app/utils/githubApi";

interface UpdatesSectionProps {
    updates: UpdateItem[];
    title: string;
}

export default function UpdatesSection({ updates, title }: UpdatesSectionProps) {
    const [isExpanded, setIsExpanded] = useState(false);
    const displayUpdates = isExpanded ? updates : updates.slice(0, 3);

    return (
        <div className="bg-gradient-to-r from-indigo-700 to-purple-800 text-white rounded-lg p-6 mb-8 shadow-lg">
            <div className="flex justify-between items-center mb-4">
                <h2 className="text-2xl font-bold">{title}</h2>
                {updates.length > 3 && (
                    <button onClick={() => setIsExpanded(!isExpanded)} className="text-sm bg-white bg-opacity-20 hover:bg-opacity-30 px-3 py-1 rounded-full transition">
                        {isExpanded ? "접기" : "더 보기"}
                    </button>
                )}
            </div>

            <div className="space-y-3">
                {displayUpdates.length > 0 ? (
                    displayUpdates.map((update, index) => (
                        <div key={index} className="bg-black bg-opacity-20 rounded-lg p-3 hover:bg-opacity-30 transition">
                            <div className="flex justify-between items-center mb-1">
                                <h3 className="font-medium text-lg">{update.title}</h3>
                                <span className="text-xs bg-purple-900 px-2 py-1 rounded-full">{update.date}</span>
                            </div>
                            {update.description && <p className="text-sm text-gray-200">{update.description}</p>}
                        </div>
                    ))
                ) : (
                    <div className="text-center py-4">
                        <p>최신 업데이트 정보가 없습니다.</p>
                    </div>
                )}
            </div>
        </div>
    );
}
