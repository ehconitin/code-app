"use client";
import CodeTable from "@/components/table";
import axios from "axios";
import React, { useEffect, useState } from "react";

const Table = () => {
  return (
    <div>
      <div className="border-b bg-headerbackground border-outline h-[50px] text-white text-center text-4xl py-2"></div>
      <CodeTable />
    </div>
  );
};

export default Table;
