"use client"

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Loader2, Plus } from "lucide-react";
import React from "react";
import { columns } from "./columns";
import { DataTable } from "@/components/data-table";
import { Skeleton } from "@/components/ui/skeleton";
import { useBulkDeleteCategories } from "@/features/categories/api/use-bulk-delete-categories";
import { useNewCategory } from "@/features/categories/hooks/use-new-category";
import { useGetCategories } from "@/features/categories/api/use-get-categories";


const CategoriesPage = () => {
    const deleteCategories = useBulkDeleteCategories()
    const newCategory = useNewCategory()
    const categoryQuery = useGetCategories()

    const categories = categoryQuery.data || []

    const isDisable = categoryQuery.isLoading || deleteCategories.isPending;

    if(categoryQuery.isLoading){
      return(
        <div className="max-w-screen-2xl mx-auto w-full pb-10 -mt-24">
          <Card className="border-none drop-shadow-sm">
            <CardHeader>
              <Skeleton className="h-8 w-48"/>
            </CardHeader>
            <CardContent className="h-[500px] w-full flex items-center justify-center">
              <Loader2 className="size-6 text-slate-300 animate-spin"/>
            </CardContent>
          </Card>
        </div>
      )
    }

  return (
    <div className="max-w-screen-2xl mx-auto w-full pb-10 -mt-24">
      <Card className="border-none drop-shadow-sm">
        <CardHeader className="gap-y-2 lg:flex-row lg:items-center lg:justify-between">
          <CardTitle className="text-xl line-clamp-1">
          Categories Page
          </CardTitle>
          <Button onClick={newCategory.onOpen} size="sm">
            <Plus className="size-4 mr-2"/>
            Add New
          </Button>
        </CardHeader>
        <CardContent>
            <DataTable onDelete={(row) => {
              const ids = row.map((r) => r.original.id)
              deleteCategories.mutate({ids})
            }} disables={isDisable} filterKey="name" columns={columns} data={categories} />
        </CardContent>
      </Card>
    </div>
  );
};

export default CategoriesPage;
